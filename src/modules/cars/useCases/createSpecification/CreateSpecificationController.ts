import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateSpecificationUseCase from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      const createSpecificationsUseCase = container.resolve(
        CreateSpecificationUseCase
      );
      await createSpecificationsUseCase.execute({ name, description });

      return response.status(201).send();
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
}

export default CreateSpecificationController;
