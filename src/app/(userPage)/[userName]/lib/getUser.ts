
const getUser = async (username: string) => {

  try {
    const response = await fetch(`http://localhost:3001/api/users/${username}`, {
      method: 'GET',
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errorData = await response.json();
      console.log(errorData);
    }
  } catch (error) {
    console.log('Network error. Please try again later.');
  }
}

export default getUser;