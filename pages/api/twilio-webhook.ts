import { NowRequest, NowResponse } from "@now/node";
import { Twilio, twiml, validateRequest } from "twilio";
import firebase from "firebase-admin";

import { decodeCreds } from "../../utils/secrets";

const gcloudCredentials = decodeCreds(process.env.GCLOUD_CREDENTIALS);

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(gcloudCredentials)
  });
}

const db = firebase.firestore();

const twilio = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const getHost = request => {
  const proto = request.headers["x-forwarded-proto"].startsWith("https")
    ? "https"
    : "http";

  return `${proto}://${request.headers["x-forwarded-host"]}`;
};

type Intent =
  | { type: "START"; startedAt: Date }
  | {
      type: "END";
      endedAt: Date;
      currentPeriod: firebase.firestore.DocumentSnapshot;
    };

const startRE = /来(?:了|啦|咯|的)/;
const endRE = /走(?:了|啦|咯|的)/;

const extractDate = (message: string): Date => {
  return new Date();
};

const getIntent = (currentPeriods, message: string): null | Intent => {
  if (startRE.test(message)) {
    return {
      type: "START",
      startedAt: extractDate(message)
    };
  }

  const currentPeriod = currentPeriods.docs.find(doc => !doc.get("endedAt"));

  if (currentPeriod && endRE.test(message)) {
    return {
      type: "END",
      endedAt: extractDate(message),
      currentPeriod
    };
  }
};

const figureOutResponse = async ({ host, phone, message }): Promise<string> => {
  const userDocs = await db
    .collection("users")
    .where("phone", "==", phone)
    .limit(1)
    .get();

  if (userDocs.size === 0) {
    return `你谁呀？去${host}注册一下`;
  }

  const uid = userDocs.docs[0].id;
  const periodsRef = db.collection("periods");

  const currentPeriods = await periodsRef.where("uid", "==", uid).get();

  const intent = getIntent(currentPeriods, message);

  if (!intent) {
    return `你说啥？我怎么看不懂？`;
  }

  switch (intent.type) {
    case "START": {
      const { startedAt } = intent;
      const doc = await periodsRef.add({
        uid,
        startedAt,
        endedAt: null
      });
      return `妮儿！我来了呀！（${startedAt}）`;
    }
    case "END": {
      const { currentPeriod, endedAt } = intent;
      await currentPeriod.ref.update({ endedAt });
      return `走啦闺女！你别想我太多了。`;
    }
  }
};

export default async (request: NowRequest, response: NowResponse) => {
  const twilioSignature = request.headers["x-twilio-signature"];

  if (!twilioSignature || Array.isArray(twilioSignature)) {
    response.status(400).send("Bad request");
    return;
  }

  const { body } = request;

  const host = getHost(request);

  const requestIsValid = validateRequest(
    process.env.TWILIO_AUTH_TOKEN,
    twilioSignature,
    `${host}/api/twilio-webhook`,
    body
  );

  if (!requestIsValid) {
    response.status(401).send("Unauthorized");
    return;
  }

  const twilioResponse = new twiml.MessagingResponse();
  const message = await figureOutResponse({
    host,
    phone: body.From,
    message: body.Body
  });
  twilioResponse.message(message);

  response.writeHead(200, {
    "Content-Type": "text/xml"
  });

  response.end(twilioResponse.toString());
};
