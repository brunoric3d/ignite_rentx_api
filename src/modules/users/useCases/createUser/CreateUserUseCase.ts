import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import {
  IUsersRepository,
  ICreateUserDTO,
} from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 10);
    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists) {
      throw new AppError("A category with the same email already exists");
    }

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}

export default CreateUserUseCase;
