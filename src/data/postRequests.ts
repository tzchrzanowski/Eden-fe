import {endPointUrl} from "./staticData";

interface LoginResponse {
    status: string;
    token: string;
    role_id: string;
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
