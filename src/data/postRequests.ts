import {UserObject} from "../object-types/user-interfaces";
import {getToken} from "../helpers/Helpers";
import {endPointUrlLocal, isProductionEnvironment, endPointUrlProd} from "./staticData";

interface LoginResponse {
    status: string;
    token: string;
    role_id: string;
    user_photo: string;
    user_id: string;
    username: string;
}

// const endPointUrl = isProductionEnvironment ? endPointUrlProd : endPointUrlLocal;
const endPointUrl = endPointUrlProd;

export async function loginUser(username: String, password: String) {
    const usedEndPointUrl = isProductionEnvironment ? endPointUrlProd : endPointUrl;

    const apiUrl = usedEndPointUrl + '/api/public/login';

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
    const token = getToken();
    if (token.length > 0) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': token
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                throw new Error(`Authentication failed with status: ${response.status}`);
            }
            const resp: any = await response;
            return resp;
        } catch (error) {
            console.error('Error authenticating:', error);
        }
    }
    console.error("token is empty");
}

export async function validateTokenRequest (token: string) {
    const apiUrl = endPointUrl + '/api/public/validate';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'AUTHORIZATION': token
            },
        });

        if (!response.ok) {
            throw new Error(`Authentication failed with status: ${response.status}`);
        }
        const resp: any = await response.json();
        return resp;
    } catch (error) {
        console.error('Error authenticating:', error);
    }
}
