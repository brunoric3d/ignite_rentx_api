import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { DateProvider } from "../../../../shared/providers/DateProvider";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DateProvider")
    private dateProvider: DateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumInterval = 24;

    const isCarUnavailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id
    );

    if (isCarUnavailable) {
      throw new AppError("Car is unavailable");
    }

    const userHasOpenRental =
      await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (userHasOpenRental) {
      throw new AppError("User already has open rental");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minimumInterval) {
      throw new AppError("Invalid return time");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}
export { CreateRentalUseCase };
