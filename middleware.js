import nc from "next-connect";

import upload from './profilepicture';

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end("Page is not found");
  },
})
handler.use(upload.single('fileimage'));

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
export default handler;