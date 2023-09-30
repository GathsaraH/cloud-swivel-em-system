import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { EmployeeEntity } from "./entities/employee.entity";

@ApiTags("Employee")
@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post("add")
  @HttpCode(201)
  @ApiBody({ type: CreateEmployeeDto, required: false })
  @ApiOperation({
    summary: "Create new employee",
    description: "This api is used to create new employee",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "something went wrong",
    schema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "error",
        },
        error: {
          type: "array",
          example: [],
        },
      },
    },
  })
  @ApiConsumes("application/json")
  async createEmployee(
    @Body() createEmployeeDto: CreateEmployeeDto
  ): Promise<void> {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Get("all")
  @HttpCode(200)
  @ApiOperation({
    summary: "Get all employee",
    description: "This api is used to get all employee",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "something went wrong",
    schema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "error",
        },
        error: {
          type: "array",
          example: [],
        },
      },
    },
  })
  @ApiConsumes("application/json")
  async findAllEmployee(): Promise<EmployeeEntity[]> {
    return this.employeeService.findAllEmployee();
  }

  @Patch("edit/:employeeId")
  @HttpCode(200)
  @ApiOperation({
    summary: "Update employee",
    description: "This api is used to update employee",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "something went wrong",
    schema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "error",
        },
        error: {
          type: "array",
          example: [],
        },
      },
    },
  })
  @ApiConsumes("application/json")
  @ApiParam({ name: "employeeId", required: true, type: "string" })
  async updateEmployee(
    @Param("employeeId") employeeId: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ): Promise<void> {
    return this.employeeService.updateEmployee(employeeId, updateEmployeeDto);
  }

  @Delete("delete:/employeeId")
  @HttpCode(200)
  @ApiOperation({
    summary: "Delete employee",
    description: "This api is used to delete employee",
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "something went wrong",
    schema: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "error",
        },
        error: {
          type: "array",
          example: [],
        },
      },
    },
  })
  @ApiConsumes("application/json")
  @ApiParam({ name: "employeeId", required: true, type: "string" })
  deleteEmployee(@Param("employeeId") employeeId: string) {
    return this.employeeService.deleteEmployee(employeeId);
  }
}
