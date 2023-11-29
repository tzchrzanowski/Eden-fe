import {endPointUrl} from "./staticData";

export async function updatePhotoUrlRequest(userId: String, newProfilePictureUrl: String) {
    const apiUrl = endPointUrl + '/api/public/users/' +userId + '/update-profile-picture';
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token, newProfilePictureUrl}),
        });
        if (!response.ok) {
            throw new Error(`Authentication failed with status: ${response.status}`);
        }
        const resp = await response.json()
        return resp;
    } catch (error) {
        console.error('Error on trying to change photo url request:', error);
    }
}

export async function changeUserPasswordRequest(userId: String, newPassword: String) {
    const apiUrl = endPointUrl + '/api/public/users/' +userId + '/change-password';
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({newPassword, token}),
        });
        if (!response.ok) {
            throw new Error(`Authentication failed with status: ${response.status}`);
        }
        const resp = await response.json();
        return resp;
    } catch (error) {
        console.error('Error on trying to change password url request:', error);
    }
}

export async function addPointsToUser(userId: Number, points: Number) {
    const apiUrl = endPointUrl + '/api/public/users/' +userId + '/add-points';
    const token = localStorage.getItem("token");

    if (typeof token == 'string') {
        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': token,
                },
                body: JSON.stringify({points}),
            });
            if (!response.ok) {
                throw new Error(`Authentication failed with status: ${response.status}`);
            }
            const resp = await response.json();
            return resp;
        } catch (error) {
            console.error('Error on trying to add-points url request:', error);
        }
    }
}

export async function addMonthlyPointsToUser(username: string) {
    const apiUrl = endPointUrl + '/api/public/users/add-monthly-points-for-user';
    const token = localStorage.getItem("token");

    if (typeof token == 'string') {
        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': token,
                },
                body: JSON.stringify({username}),
            });
            if (!response.ok) {
                throw new Error(`Authentication failed with status: ${response.status}`);
            }
            const resp = await response.json();
            return resp;
        } catch (error) {
            console.error('Error on trying to add monthly-points url request:', error);
        }
    }
}
