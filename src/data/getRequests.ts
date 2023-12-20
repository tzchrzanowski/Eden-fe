import {endPointUrl, isProductionEnvironment, endPointUrlProd} from "./staticData";
import {getToken} from "../helpers/Helpers";

export async function getUser(userId: number | string) {
    const usedEndPointUrl = isProductionEnvironment ? endPointUrlProd : endPointUrl;

    const apiUrl = usedEndPointUrl + '/api/public/users/' + userId + '/get_user_details';
    const token = getToken();

    if (token.length > 0) {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': token
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            const user = await response.json();
            console.log("user: ", user);
            return user;
        } catch (error) {
            console.error('Error fetching single user:', error);
        }
    }
}

export async function getAllUsers() {
    const apiUrl = endPointUrl + '/api/public/users/get-all-users';
    const token = getToken();

    if (token.length > 0) {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': token
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const users = await response.json();
            // const allUsersExceptAccountants = users.filter((user: any) => user.role_id !== 3);
            // return allUsersExceptAccountants;
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
}

export async function getAllCashOutUsers() {
    const apiUrl = endPointUrl + '/api/public/users/get-all-cash-out-users';
    const token = getToken();

    if (token.length > 0) {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': token
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Request to get cash out users failed with status: ${response.status}`);
            }

            const users = await response.json();
            // const allUsersExceptAccountants = users.filter((user: any) => user.role_id !== 3);
            // return allUsersExceptAccountants;
            return users;
        } catch (error) {
            console.error('Error fetching cash out users:', error);
        }
    }
}

export async function getUserNetwork(userId: number) {
    const apiUrl = endPointUrl + '/api/public/users/' +userId + '/get-network';
    const token = localStorage.getItem("token");

    if (typeof token == 'string') {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': token
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const users = await response.json();
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }
}

