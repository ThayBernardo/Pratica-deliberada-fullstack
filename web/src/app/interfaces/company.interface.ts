import User from "./user.interface";

export default interface Company {
    id?: number;
    name: string;
    created_at?: Date;
    updated_at?: Date;
    timezone: string;
    language: string;
    created_by: number;
    users?: User[];
}
