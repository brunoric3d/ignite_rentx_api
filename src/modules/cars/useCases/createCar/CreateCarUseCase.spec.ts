import { AppError } from "../../../../errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import CreateCarUseCase from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car Description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "category",
    });
    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a new car with existing license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car name 1",
        description: "Car Description 1",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 50,
        brand: "Brand",
        category_id: "category",
      });
      await createCarUseCase.execute({
        name: "Car name 2",
        description: "Car Description 2",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 50,
        brand: "Brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new car with existing license plate", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name 2",
      description: "Car Description 2",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "category",
    });
    expect(car.available).toBe(true);
  });
});
