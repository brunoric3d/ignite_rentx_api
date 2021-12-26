import { Router } from "express";
import multer from "multer";

import UploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import CreateUserController from "../modules/users/useCases/createUser/CreateUserController";
import ListUsersController from "../modules/users/useCases/listUsers/ListUsersController";
import UpdateUserAvatarController from "../modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(UploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
usersRoutes.get("/", listUsersController.handle);

export { usersRoutes };
