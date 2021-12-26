import { Car } from "../entities/Car";

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  findAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository, ICreateCarDTO };
