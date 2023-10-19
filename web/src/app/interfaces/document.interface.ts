import Company from "./company.interface";
import User from "./user.interface";

export default interface Document {
  id: number;
  name: string;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
  limit_date: Date;
  signed: boolean;
  company: Company;
  created_by: User;
}
