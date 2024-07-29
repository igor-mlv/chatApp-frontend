interface Props {
    value: string;
    setError: (error: string) => void;
}

const handleRegister = async ({ value, setError }: Props) => {
    if (value === '') {
        setError('Please enter a user name');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/api/register/${value}`, {
            method: 'GET',
        });

        if (response.ok) {
            const user = await response.json();
            return user;
        } else {
            const errorData = await response.json();
            setError(errorData.error || 'Error registering user');
        }
    } catch (error) {
        setError('Network error. Please try again later.');
    }
};

export default handleRegister;
