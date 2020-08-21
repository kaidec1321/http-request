import { User } from "./user";

export interface Response {
    page: number,
    per_page: number,
    total: number,
    total_page: number,
    data: User[],
    ad: any
}