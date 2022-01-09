import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./profileUserUseCase";

export class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    const { id } = request.user;

    const user = await profileUserUseCase.execute(id);
    return response.json(user);

    return response.status(201).send();
  }
}
