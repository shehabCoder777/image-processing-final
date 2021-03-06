import express, { Request, Response, Router } from "express";
import { checkingFolder, processingImage } from "../Data/functionality";
import fs from "fs";
import { Imag } from "../Data/data";
import path from "path";

const imageRouter: Router = express.Router();

imageRouter.get("/app", async (req: Request, res: Response) => {
  const heightUrl = Number(req.query.height);
  const widthUrl = Number(req.query.width);
  const nameUrl = String(req.query.name);
  const img = new Imag(nameUrl, heightUrl, widthUrl);

  checkingFolder();
  try {
    if (
      fs.existsSync(
        path.resolve("./src") +
          `/edited-images/${img.name}-${img.height}-${img.width}.jpg`
      )
    ) {
      res.sendFile(
        path.resolve("./src") +
          `/edited-images/${img.name}-${img.height}-${img.width}.jpg`
      );
    } else if (
      !fs.existsSync(path.resolve("./src") + `/images/${img.name}.jpg`)
    ) {
      res.send("image doesn`t exist please try Again 🌍");
    } else {
      await processingImage(img.name, img.height, img.width);

      res.sendFile(
        path.resolve("./src") +
          `/edited-images/${img.name}-${img.height}-${img.width}.jpg`
      );
    }
  } catch (e) {
    res.send("check height and width");
  }
});
export default imageRouter;
