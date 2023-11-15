import {endPointUrl} from "./staticData";
import {UserObject} from "../object-types/user-interfaces";

interface LoginResponse {
    status: string;
    token: string;
    role_id: string;
    user_photo: string;
    user_id: string;
    username: string;
}

export async function loginUser(username: String, password: String) {
    const apiUrl = endPointUrl + '/api/public/login';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`Authentication failed with status: ${response.status}`);
        }
        const resp: LoginResponse = await response.json()
        localStorage.setItem('token', resp.token);
        sessionStorage.setItem('token', resp.token);
        return resp;

    } catch (error) {
        console.error('Error authenticating:', error);
    }
}

export async function logoutUser() {
    const apiUrl = endPointUrl + '/api/public/logout';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Authentication failed with status: ${response.status}`);
        }
        const resp: LoginResponse = await response.json()
        localStorage.setItem('token', resp.token);
        sessionStorage.setItem('token', resp.token);
        return resp;

    } catch (error) {
        console.error('Error authenticating:', error);
    }
}

export async function addNewPackageUser (newUser: UserObject) {
    const apiUrl = endPointUrl + '/api/public/users/add-new-user';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });

        if (!response.ok) {
            throw new Error(`Authentication failed with status: ${response.status}`);
        }
        const resp: any = await response.json()
        console.log("create new user package response: ", resp);
        return resp;

    } catch (error) {
        console.error('Error authenticating:', error);
    }
}
