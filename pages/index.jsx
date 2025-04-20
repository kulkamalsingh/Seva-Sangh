// Example inside your login handler
const handleLogin = async () => {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    // ✅ Store the JWT token in localStorage
    localStorage.setItem('token', data.token);

    // ✅ Redirect to home/dashboard
    router.push('/home'); // or wherever you want
  } else {
    alert(data.message || 'Login failed');
  }
};
