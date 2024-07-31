"use server"
const getAllUsers = async () => {
    try {
        const response = await fetch(`${process.env.SERVER_URL}/api/users/all`, {
            method: 'GET',
        });

        if (!response.ok) {
            // Get error message from server
            const errorData = await response.json();
            return { error: errorData.error };
        }

        const users = await response.json();
        return users;
    } catch (error) {
        return { error: 'Network error. Please try again later.' };
    }
}
export default getAllUsers;