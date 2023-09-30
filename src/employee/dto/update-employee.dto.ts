import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateEmployeeDto } from "./create-employee.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { GenderEnum } from "../types/types";

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @ApiProperty({
    required: false,
    description: "Employee first name",
    type: String,
    default: "John",
    example: "John",
  })
  @IsString()
  @IsOptional()
  firstName: string;
  @ApiProperty({
    required: false,
    description: "Employee last name",
    type: String,
    default: "Doe",
    example: "Doe",
  })
  @IsString()
  @IsOptional()
  lastName: string;
  @ApiProperty({
    required: false,
    description: "Employee email",
    type: String,
    default: "user@user.com",
    example: "user@user.com",
  })
  @IsString()
  @IsOptional()
  email: string;
  @ApiProperty({
    required: false,
    description: "Employee gender",
    type: String,
    default: "male",
    example: "male",
  })
  @IsEnum(GenderEnum)
  @IsOptional()
  gender: GenderEnum;
  @ApiProperty({
    required: false,
    description: "Employee phone number",
    type: String,
    default: "071624947",
    example: "071624947",
  })
  @IsString()
  @IsOptional()
  phoneNumber: string;
}
