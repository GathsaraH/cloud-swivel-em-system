import { HttpException, Injectable, Logger } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { EmployeeEntity } from "./entities/employee.entity";
import { Repository } from "typeorm";

@Injectable()
export class EmployeeService {
  private logger: Logger = new Logger(EmployeeService.name);
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>
  ) {}
  async createEmployee(dto: CreateEmployeeDto) {
    try {
      this.logger.debug(`Creating employee with data ${JSON.stringify(dto)}`);
      return this.employeeRepository.create(
        await this.employeeRepository.save({
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          gender: dto.gender,
          phoneNumber: dto.phoneNumber,
        })
      );
    } catch (error) {
      this.logger.debug(`Error while creating employee ${error.message}`);
      throw new HttpException(error.message, error.status ?? 400);
    }
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
