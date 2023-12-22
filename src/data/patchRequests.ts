import {endPointUrlLocal, isProductionEnvironment, endPointUrlProd} from "./staticData";

// const endPointUrl = isProductionEnvironment ? endPointUrlProd : endPointUrlLocal;
const endPointUrl = endPointUrlProd;

export async function updatePhotoUrlRequest(userId: String, newProfilePictureUrl: String) {
    const usedEndPointUrl = isProductionEnvironment ? endPointUrlProd : endPointUrl;

    const apiUrl = usedEndPointUrl + '/api/public/users/' +userId + '/update-profile-picture';
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

export async function setCashOutForUser(userId: Number, cash_out_bool: boolean) {
    const apiUrl = endPointUrl + '/api/public/users/' +userId + '/set_cash_out';
    const token = localStorage.getItem("token");

    if (typeof token == 'string') {
        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': token,
                },
                body: JSON.stringify({cash_out_bool}),
            });
            if (!response.ok) {
                throw new Error(`Authentication failed with status: ${response.status}`);
            }
            const resp = await response.json();
            return resp;
        } catch (error) {
            console.error('Error on set cash out url request:', error);
        }
    }
}

export async function setCashOutBool(userId: Number, cash_out_bool: boolean) {
    const apiUrl = endPointUrl + '/api/public/users/' +userId + '/set_cash_out_bool';
    const token = localStorage.getItem("token");

    if (typeof token == 'string') {
        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': token,
                },
                body: JSON.stringify({cash_out_bool}),
            });
            if (!response.ok) {
                throw new Error(`Authentication failed with status: ${response.status}`);
            }
            const resp = await response.json();
            return resp;
        } catch (error) {
            console.error('Error on set cash out amount url request:', error);
        }
    }
}

export async function setCashOutByUser(userId: Number, cash_out_details: String) {
    const apiUrl = endPointUrl + '/api/public/users/' +userId + '/set_cash_out_by_user';
    const token = localStorage.getItem("token");

    if (typeof token == 'string') {
        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': token,
                },
                body: JSON.stringify({cash_out_details}),
            });
            if (!response.ok) {
                throw new Error(`Authentication failed with status: ${response.status}`);
            }
            const resp = await response.json();
            return resp;
        } catch (error) {
            console.error('Error on set cash out amount url request:', error);
        }
    }
}

export async function setCashOutAmountForUser(userId: Number, cash_out_amount: Number) {
    const apiUrl = endPointUrl + '/api/public/users/' +userId + '/set_cash_out_amount';
    const token = localStorage.getItem("token");

    if (typeof token == 'string') {
        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': token,
                },
                body: JSON.stringify({cash_out_amount}),
            });
            if (!response.ok) {
                throw new Error(`Authentication failed with status: ${response.status}`);
            }
            const resp = await response.json();
            return resp;
        } catch (error) {
            console.error('Error on set cash out amount url request:', error);
        }
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

export async function addMonthlyPointsToAllUsers() {
    const apiUrl = endPointUrl + '/api/public/users/add-monthly-points-for-all-users';
    const token = localStorage.getItem("token");

    if (typeof token == 'string') {
        try {
            const response = await fetch(apiUrl, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'AUTHORIZATION': token,
                },
                body: JSON.stringify({users: "all-users"}),

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
