import { nanoid } from "nanoid";
import UrlModel from "../models/Url.js";
import isValidUrl from "../services/urlValidation.js";

export async function generateShortUrl(req, res) {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl)
      return res.status(400).send({ message: "Long Url is required " });
    if (!isValidUrl(originalUrl)) {
      return res.status(400).send({ message: "The Url is Invalid" });
    }

    const shortId = nanoid(6);

    //Save the url in DB
    const dataToSave = new UrlModel({ originalUrl, shortId });
    await dataToSave.save();

    res
      .status(201)
      .send({ shortUrl: `${req.protocol}://${req.get("host")}/${shortId}` });
  } catch (error) {
    res.status(500).send({
      message: "There is some error: Please come back later",
      errString: error.message,
    });
  }
}

export async function redirectToUrl(req, res) {
  try {
    const { shortId } = req.params;
    //If the url does not have the short id
    if (!shortId)
      return res.status(400).send({ message: "Short ID is required " });

    //Find th original url
    const url = await UrlModel.findOne({ shortId: shortId });

    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).send({ message: "No URL Found" });
    }
  } catch (error) {
    return res.status(500).send({
      message: "There is some error.Please come back later",
      errString: error.message,
    });
  }
}
