import type { setUserRequest, setUserResponse } from "../../models/UsersApi";

const ENV = import.meta.env;

export const setUser = ({ email, companyName, companyBudget, companyDescription, companyLocation }: setUserRequest): Promise<setUserResponse> => {
    return fetch(ENV.VITE_SET_USER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            companyName,
            companyBudget,
            companyDescription,
            companyLocation,
        }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            return Promise.reject(error);
        });
};