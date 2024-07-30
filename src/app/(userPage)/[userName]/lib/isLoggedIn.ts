const isLoggedIn = async (userName: string) => {
    try {
        const response = await fetch(`http://localhost:3001/api/login/${userName}`, {
            method: 'GET',
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('Network error. Please try again later.')
        return false;
    }
}

export default isLoggedIn;