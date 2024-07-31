"use server"
const getUser = async (username: string) => {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/users/${username}`, {
      method: 'GET',
    });

    if (response.ok) {
      const user = await response.json();
      return user;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error getting user');
    }
  } catch (error) {
    throw new Error('Network error. Please try again later.');
  }
}

export default getUser;