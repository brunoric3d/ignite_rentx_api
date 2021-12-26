import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("User not found");
    }

    const tokenExpirationTime = this.dateProvider.compareInHours(
      userToken.expires_date,
      this.dateProvider.dateNow()
    );

    if (tokenExpirationTime >= 0) {
      throw new AppError("Token expired");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    const hashedPassword = await hash(password, 10);

    await this.usersRepository.create({ ...user, password: hashedPassword });

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}
