import { NowRequest, NowResponse } from "@now/node";
import { Twilio, twiml } from "twilio";
import firebase from "firebase-admin";

import { decodeCreds } from "../../utils/secrets";

const gcloudCredentials = decodeCreds(process.env.GCLOUD_CREDENTIALS);

firebase.initializeApp({
  credential: firebase.credential.cert(gcloudCredentials)
});

const db = firebase.firestore();

const twilio = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async (request: NowRequest, response: NowResponse) => {
  const twilioResponse = new twiml.MessagingResponse();

  const doc = await db.collection("periods").add({
    uid: "NqKIn0BwG8OgClbgeoTM8Jl8ikA2",
    startedAt: new Date(),
    endedAt: new Date()
  });

  console.log("doc");

  twilioResponse.message(`Pong ${doc.id}`);

  response.writeHead(200, {
    "Content-Type": "text/xml"
  });

  response.end(twilioResponse.toString());
};
