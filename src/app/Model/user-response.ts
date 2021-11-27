import { User } from './user';
export interface UserResponse {
    page: number,
    per_page: number,
    total: number,
    total_page: number,
    data: User[]
}
