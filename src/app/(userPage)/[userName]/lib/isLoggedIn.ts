"use server"
const isLoggedIn = async (userName: string) => {
    try {
        const response = await fetch(`${process.env.SERVER_URL}/api/login/${userName}`, {
            method: 'GET',
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

export default isLoggedIn;