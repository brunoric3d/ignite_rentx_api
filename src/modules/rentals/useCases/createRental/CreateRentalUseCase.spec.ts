import dayjs from "dayjs";

import { AppError } from "../../../../errors/AppError";
import { DateProvider } from "../../../../shared/providers/DateProvider";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import CategoriesRepositoryInMemory from "../../../cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;
let carsRepository: CarsRepositoryInMemory;
let categoriesRepository: CategoriesRepositoryInMemory;
let dateProvider: DateProvider;

describe("Create rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    carsRepository = new CarsRepositoryInMemory();
    dateProvider = new DateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      carsRepository,
      dateProvider
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepository.create({
      description: "asdasdasd",
      brand: "VW",
      name: "Jetta",
      category_id: "566456",
      daily_rate: 50,
      fine_amount: 50,
      license_plate: "asdasd564654",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("SShould not be able to create a new rental if return date is less that minimum", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "123456",
        expected_return_date: dateProvider.dateNow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  /* it("Should not be able to create a new rental if the car is already rented", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "123456",
        expected_return_date: dayAdd24Hours,
      });

      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "123456",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  }); */
});
