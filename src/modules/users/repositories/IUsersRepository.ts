import { User } from "../entities/User";

interface ICreateUserDTO {
  id?: string;
  email: string;
  password: string;
  name: string;
  driver_license: string;
  avatar?: string;
}

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  list(): Promise<User[]>;
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository, ICreateUserDTO };
