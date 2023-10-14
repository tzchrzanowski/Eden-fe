
export async function getAllUsers() {
    const apiUrl = 'http://localhost:8080/api/public/users';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
