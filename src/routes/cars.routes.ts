import { Router } from "express";
import multer from "multer";

import UploadConfig from "../config/upload";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import CreateCarController from "../modules/cars/useCases/createCar/CreateCarController";
import ListCarsController from "../modules/cars/useCases/listCars/ListCarsController";
import UploadCarImageController from "../modules/cars/useCases/uploadCarImage/UploadCarImageController";

const carsRoutes = Router();

const uploadCarImages = multer(UploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/", ensureAuthenticated, listCarsController.handle);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array("images"),
  uploadCarImageController.handle
);

export { carsRoutes };
