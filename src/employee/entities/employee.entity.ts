import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { GenderEnum } from "../types/types";

@Entity({ name: "employee_entity" })
export class EmployeeEntity {
  @PrimaryGeneratedColumn("uuid")
  employeeId: string;
  @Column({ name: "first_name" })
  firstName: string;
  @Column({ name: "last_name" })
  lastName: string;
  @Column({ name: "email" })
  email: string;
  @Column({ name: "mobile_number" })
  phoneNumber: string;
  @Column({ name: "gender", type: "enum", enum: GenderEnum })
  gender: GenderEnum;
}
