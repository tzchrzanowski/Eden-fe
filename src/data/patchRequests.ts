import {endPointUrl} from "./staticData";

export async function updatePhotoUrlRequest(userId: String, newProfilePictureUrl: String) {
    const apiUrl = endPointUrl + '/api/public/users/' +userId + '/update-profile-picture';

    try {
        const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProfilePictureUrl),
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
