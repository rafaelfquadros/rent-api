/* eslint-disable no-use-before-define */
import { Repository, getRepository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  ISpecificationsCreateDTO,
  ISpecificationsRepository,
} from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  constructor() {
    this.repository = getRepository(Specification);
  }

  private repository: Repository<Specification>;

  async create({
    name,
    description,
  }: ISpecificationsCreateDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: {
        name,
      },
    });

    return specification;
  }

  async list(): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
}

export { SpecificationsRepository };
