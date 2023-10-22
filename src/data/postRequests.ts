import {endPointUrl} from "./staticData";

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

        await response.json().then((resp)=> {
            localStorage.setItem('token', resp.token);
            sessionStorage.setItem('token', resp.token);
        });

    } catch (error) {
        console.error('Error authenticating:', error);
    }
}
