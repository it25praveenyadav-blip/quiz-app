const API_BASE_URL = 'http://localhost:8080/api/auth';

// 1. Sign Up (Registration)
async function handleSignup(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      alert('Account created successfully!');
      window.location.href = 'signin.html'; // Signin page par bhej do
    } else {
      alert('Signup Failed: ' + data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server connect nahi ho paya. Make sure Spring Boot running hai.');
  }
}

// 2. Sign In (Login)
async function handleSignin(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      alert('Login Successful!');
      sessionStorage.setItem('username', data.username);
      window.location.href = 'index.html'; // Home / Quiz page par redirect karein
    } else {
      alert('Login Failed: ' + data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Server connect nahi ho paya.');
  }
}