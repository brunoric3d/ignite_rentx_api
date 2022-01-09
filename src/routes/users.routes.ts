import { Router } from "express";
import multer from "multer";

import UploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import CreateUserController from "../modules/users/useCases/createUser/CreateUserController";
import ListUsersController from "../modules/users/useCases/listUsers/ListUsersController";
import { ProfileUserController } from "../modules/users/useCases/profileUser/profileUserController";
import UpdateUserAvatarController from "../modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const fileUpload = multer(UploadConfig);

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  fileUpload.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.get("/", listUsersController.handle);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
