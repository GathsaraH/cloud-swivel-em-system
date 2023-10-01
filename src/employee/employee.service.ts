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
import { SearchTypeEnum } from "./types/types";

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
      await this.employeeRepository
        .createQueryBuilder("employee")
        .insert()
        .into(EmployeeEntity)
        .values({
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          gender: dto.gender,
          phoneNumber: dto.phoneNumber,
        })
        .execute();
    } catch (error) {
      this.logger.debug(`Error while creating employee ${error.message}`);
      throw new HttpException(error.message, error.status ?? 400);
    }
  }

  async findAllEmployee(searchTerm: string): Promise<EmployeeEntity[]> {
    try {
      this.logger.debug(`Get all employee`);
      const query = this.employeeRepository.createQueryBuilder("employee");
      if (searchTerm !== SearchTypeEnum.NO_QUERY) {
        query.where(
          "LOWER(employee.firstName) LIKE LOWER(:searchTerm) OR LOWER(employee.lastName) LIKE LOWER(:searchTerm) OR LOWER(employee.email) LIKE LOWER(:searchTerm) OR LOWER(employee.phoneNumber) LIKE LOWER(:searchTerm)",
          { searchTerm: `%${searchTerm.toLowerCase()}%` }
        );
      }
      query.orderBy("employee.updatedAt", "DESC");
      return await query.getMany();
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

  async deleteEmployee(id: string): Promise<void> {
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
