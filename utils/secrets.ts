export const decodeCreds = data => {
  const json = Buffer.from(data, "base64").toString("ascii");
  return JSON.parse(json);
};
