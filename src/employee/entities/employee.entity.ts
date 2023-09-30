import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
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
  @CreateDateColumn({
    type: "timestamp with time zone",
    nullable: false,
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: "timestamp with time zone",
    nullable: false,
    name: "updated_at",
  })
  updatedAt!: Date;
}
