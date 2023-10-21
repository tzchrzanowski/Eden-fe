export async function loginUser(username: String, password: String) {
    const apiUrl = 'http://localhost:8080/api/public/login';

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

        await response.json().then((token)=> {
            localStorage.setItem('token', token);
            sessionStorage.setItem('token', token);
        });

    } catch (error) {
        console.error('Error authenticating:', error);
    }
}
