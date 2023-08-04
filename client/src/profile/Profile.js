const userAccount = {
  Username: '',
  Email: '',
  Role: '',
  Discipline: '',
};

async function fetchUserProfile() {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:8000/api/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    userAccount.Username = data.profile[0].username;
    userAccount.Email = data.profile[0].email;
    userAccount.Role = data.profile[0].role;
    userAccount.Discipline = data.profile[0].discipline;
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Call the function to fetch and display the profile
fetchUserProfile();

console.log(userAccount.Email);
