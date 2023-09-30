import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { GenderEnum } from "../types/types";

export class CreateEmployeeDto {
  @ApiProperty({
    required: true,
    description: "Employee first name",
    type: String,
    default: "John",
    example: "John",
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty({
    required: true,
    description: "Employee last name",
    type: String,
    default: "Doe",
    example: "Doe",
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty({
    required: true,
    description: "Employee email",
    type: String,
    default: "user@user.com",
    example: "user@user.com",
  })
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    required: true,
    description: "Employee gender",
    type: String,
    default: "male",
    example: "male",
  })
  @IsEnum(GenderEnum)
  @IsNotEmpty()
  gender: GenderEnum;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: "Employee phone number",
    type: String,
    default: "071624947",
    example: "071624947",
  })
  phoneNumber: string;
}
