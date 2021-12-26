import { AppError } from "../../../../errors/AppError";
import CategoriesRepositoryInMemory from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it("Should create a single category", async () => {
    const category = {
      name: "Category test",
      description: "Category description test",
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });
    const newCategory = await categoriesRepositoryInMemory.findByName(
      category.name
    );
    expect(newCategory).toHaveProperty("id");
  });

  it("Should not be able to create a duplicate category", async () => {
    expect(async () => {
      const category = {
        name: "Category test",
        description: "Category description test",
      };
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
