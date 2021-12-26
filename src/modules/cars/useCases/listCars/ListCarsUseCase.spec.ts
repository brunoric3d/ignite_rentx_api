import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import ListCarsUseCase from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });
  it("Should list only available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car1",
      description: "Car 1",
      daily_rate: 150,
      license_plate: "123-4567",
      fine_amount: 400,
      brand: "VW",
      category_id: "1234",
    });

    const availableCars = await listCarsUseCase.execute({});

    expect(availableCars).toEqual([car]);
  });
  it("Should list only available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car2",
      description: "Car 2",
      daily_rate: 150,
      license_plate: "123-4567",
      fine_amount: 400,
      brand: "Audi",
      category_id: "1234",
    });

    const availableCars = await listCarsUseCase.execute({ name: "car2" });

    expect(availableCars).toEqual([car]);
  });
  it("Should list only available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car3",
      description: "Car 3",
      daily_rate: 150,
      license_plate: "123-4567",
      fine_amount: 400,
      brand: "Peugeot",
      category_id: "1234",
    });

    const availableCars = await listCarsUseCase.execute({ brand: "Peugeot" });

    expect(availableCars).toEqual([car]);
  });

  it("Should list only available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car4",
      description: "Car 4",
      daily_rate: 150,
      license_plate: "123-4567",
      fine_amount: 400,
      brand: "Fiat",
      category_id: "5555",
    });

    const availableCars = await listCarsUseCase.execute({
      category_id: "5555",
    });

    expect(availableCars).toEqual([car]);
  });
});
