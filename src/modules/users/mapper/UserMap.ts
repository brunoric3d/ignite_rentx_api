import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../entities/IUserResponseDTO";
import { User } from "../entities/User";

export class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}
