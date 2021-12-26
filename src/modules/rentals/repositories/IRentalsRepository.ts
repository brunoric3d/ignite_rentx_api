import { Rental } from "../entities/Rental";

interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

interface IUpdateRentalDTO {
  id: string;
  end_date: Date;
  total: number;
}

interface IRentalsRepository {
  findOpenRentalByCarId(car_id: string): Promise<Rental>;
  findOpenRentalByUserId(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  update(data: IUpdateRentalDTO): Promise<Rental>;
  findByUser(id: string): Promise<Rental[]>;
}

export { IRentalsRepository, ICreateRentalDTO, IUpdateRentalDTO };
