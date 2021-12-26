import { getRepository, Repository } from "typeorm";

import { Rental } from "../../entities/Rental";
import {
  IRentalsRepository,
  ICreateRentalDTO,
  IUpdateRentalDTO,
} from "../IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }
  findByUser(id: string): Promise<Rental[]> {
    const rentals = this.repository.find({
      where: { user_id: id },
      relations: ["car"],
    });

    return rentals;
  }

  async update({ id, end_date, total }: IUpdateRentalDTO): Promise<Rental> {
    const rental = await this.repository.findOne({ id });

    rental.end_date = end_date;
    rental.total = total;

    await this.repository.save(rental);

    return rental;
  }
  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ id });
    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: null },
    });

    return rental;
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: null },
    });

    return rental;
  }
  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });
    await this.repository.save(rental);
    return rental;
  }
}

export { RentalsRepository };
