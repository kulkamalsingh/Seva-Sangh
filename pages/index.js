import { useRouter } from 'next/router';

const handleLogin = async () => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Store the JWT token securely (consider using httpOnly cookies instead of localStorage)
      localStorage.setItem('token', data.token);  // This is not recommended for security reasons

      // ✅ Redirect to home/dashboard
      router.push('/home'); // or wherever you want
    } else {
      // Handle specific errors based on the message from the server
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    // Handle network or unexpected errors
    console.error('Login error:', error);
    alert('An error occurred while trying to log in. Please try again later.');
  }
};
