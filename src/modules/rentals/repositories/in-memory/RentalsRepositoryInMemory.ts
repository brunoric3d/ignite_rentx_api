import { Rental } from "../../entities/Rental";
import {
  IRentalsRepository,
  ICreateRentalDTO,
  IUpdateRentalDTO,
} from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }
  async update({ id, end_date, total }: IUpdateRentalDTO): Promise<Rental> {
    const rentalIndex = this.rentals.findIndex((rental) => rental.id === id);

    this.rentals[rentalIndex].end_date = end_date;
    this.rentals[rentalIndex].total = total;

    return this.rentals[rentalIndex];
  }

  async findByUser(id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === id);
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }
}

export { RentalsRepositoryInMemory };
