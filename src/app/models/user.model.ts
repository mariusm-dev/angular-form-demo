export interface UserRequest {
    firstName: string,
    lastName: string,
    email: string,
}

export interface UserResponse extends UserRequest {
    _id: string;
}