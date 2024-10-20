export interface User{
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface PageRequestDto{
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
    support: string;
}

export interface UserDetails{
    data: User;
    support: string;
}







