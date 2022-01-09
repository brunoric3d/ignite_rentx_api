import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "../config/auth";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/users/repositories/implementations/UsersRepository";
import { UsersTokensRepository } from "../modules/users/repositories/implementations/UsersTokensRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Missing token", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
