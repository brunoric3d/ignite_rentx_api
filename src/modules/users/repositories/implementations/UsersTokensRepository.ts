import { getRepository, Repository } from "typeorm";

import { UserToken } from "../../entities/UserToken";
import {
  ICreateUserTokenDTO,
  IUsersTokensRepository,
} from "../IUsersTokensRepository";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({ refresh_token });

    console.log(userToken);

    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = await this.repository.findOne({ user_id, refresh_token });

    return userToken;
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);
    return userToken;
  }
}

export { UsersTokensRepository };
