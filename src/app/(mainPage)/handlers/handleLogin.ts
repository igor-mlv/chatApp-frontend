import { loginService } from "../services/loginService";
interface Props {
    value: string;
    setError: (error: string) => void;
}

const handleLogin = async ({ value, setError }: Props) => {
    if (value === '') {
        setError('Please enter a user name');
        return;
    }

    try {
        const user = await loginService(value);

        if (user.error) {
            // Display the error from the server
            setError(user.error);
            return;
        }

        return user;
    } catch (error) {
        setError('Unexpected error occurred');
    }
};

export default handleLogin;
