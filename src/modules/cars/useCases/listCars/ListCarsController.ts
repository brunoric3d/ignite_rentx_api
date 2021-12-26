import { Request, Response } from "express";
import { container } from "tsyringe";

import ListCarsUseCase from "./ListCarsUseCase";

class ListCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCarsUseCase = container.resolve(ListCarsUseCase);

    const { brand, name, category_id } = request.body;
    const cars = await listCarsUseCase.execute({ brand, name, category_id });

    return response.status(201).json(cars);
  }
}

export default ListCarsController;
