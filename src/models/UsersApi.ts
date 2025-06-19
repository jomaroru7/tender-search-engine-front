export type setUserRequest = {
    email: string;
    companyName: string;
    companyLocation: string;
    companyBudget: number | string;
    companyDescription: string;
}

export type setUserResponse = {
    success: boolean;
}