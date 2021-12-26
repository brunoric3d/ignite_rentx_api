import { Request, Response, NextFunction } from "express";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/users/repositories/implementations/UsersRepository";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.admin) {
    throw new AppError("User not an admin");
  }

  return next();
}
