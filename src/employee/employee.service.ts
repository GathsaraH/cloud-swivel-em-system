import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from "@nestjs/common";
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
  async createEmployee(dto: CreateEmployeeDto): Promise<void> {
    try {
      this.logger.debug(`Creating employee with data ${JSON.stringify(dto)}`);
      this.employeeRepository.create(
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

  async findAllEmployee(): Promise<EmployeeEntity[]> {
    try {
      this.logger.debug(`Get all employee`);
      return this.employeeRepository.find();
    } catch (error) {
      this.logger.debug(`Error while get all employee ${error.message}`);
      throw new HttpException(error.message, error.status ?? 400);
    }
  }

  async updateEmployee(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto
  ): Promise<void> {
    try {
      this.logger.debug(
        `Update employee with id ${id} with data ${JSON.stringify(
          updateEmployeeDto
        )}`
      );
      const employee = await this.employeeRepository.findOne({
        where: { employeeId: id },
      });
      if (!employee) {
        throw new NotFoundException(`Employee with id ${id} not found`);
      }
      await this.employeeRepository.update(
        { employeeId: id },
        updateEmployeeDto
      );
    } catch (error) {
      this.logger.debug(`Error while update employee ${error.message}`);
      throw new HttpException(error.message, error.status ?? 400);
    }
  }

  async deleteEmployee(id: string) {
    try {
      this.logger.debug(`Delete employee with id ${id}`);
      const employee = await this.employeeRepository.findOne({
        where: { employeeId: id },
      });
      if (!employee) {
        throw new NotFoundException(`Employee with id ${id} not found`);
      }
      await this.employeeRepository.delete({ employeeId: id });
    } catch (error) {
      this.logger.debug(`Error while delete employee ${error.message}`);
      throw new HttpException(error.message, error.status ?? 400);
    }
  }
}
