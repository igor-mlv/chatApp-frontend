"use server"
export const registerService = async (username: string): Promise<any> => {
    try {
        const response = await fetch(`${process.env.SERVER_URL}/api/register/${username}`, {
            method: 'GET',
        });

        if (!response.ok) {
            // Get error message from server
            const errorData = await response.json();
            return { error: errorData.error };
        }

        const user = await response.json();
        return user;
    } catch (error) {
        return { error: 'Network error. Please try again later.' };
    }
};