import { container } from "tsyringe";

import { ICarsImagesRepository } from "../../modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CarsImagesRepository } from "../../modules/cars/repositories/implementations/CarsImagesRepository";
import { CarsRepository } from "../../modules/cars/repositories/implementations/CarsRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { RentalsRepository } from "../../modules/rentals/repositories/implementations/RentalsRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";
import { UsersRepository } from "../../modules/users/repositories/implementations/UsersRepository";
import { UsersTokensRepository } from "../../modules/users/repositories/implementations/UsersTokensRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../modules/users/repositories/IUsersTokensRepository";
import { DateProvider } from "../providers/DateProvider";
import { EtherealMailProvider } from "../providers/EtherealMailProvider";
import { IDateProvider } from "../providers/IDateProvider";
import { IMailProvider } from "../providers/IMailProvider";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IDateProvider>("DateProvider", DateProvider);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);
