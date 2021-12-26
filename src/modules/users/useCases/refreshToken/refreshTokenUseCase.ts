import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/providers/IDateProvider";
import { UserToken } from "../../entities/UserToken";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<UserToken> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    console.log(sub);
    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token invalid or missing");
    }
    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const newRefreshToken = await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date: this.dateProvider.addDays(
        parseInt(auth.expires_in_refresh_token.slice(0), 10)
      ),
    });

    return newRefreshToken;
  }
}
