import Document from "./document.interface";
import Company from "./company.interface";

export default interface User {
    id: number;
    email: string;
    password_reseted_at: Date;
    verified_email: boolean;
    password: string;
    created_at: Date;
    updated_at: Date;
    company: Company;
    documents: Document[];
}

export interface UserToCreate {
  email: string;
  password: string;
}
