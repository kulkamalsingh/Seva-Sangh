import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/auth.css';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill out all fields.');
    } else {
      setError('');
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      // Call your signup API
      await axios.post('/api/auth/signup', formData);

      // Then auto-login using NextAuth credentials provider
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password
      });

      if (res.ok) {
        router.push('/donate');
      } else {
        setError('Login after signup failed. Please try logging in manually.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}

          {step === 1 && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
              <button
                type="button"
                onClick={handleNext}
                className="w-full p-2 bg-blue-500 text-white rounded mt-4"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-2"
                required
              />
              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded mt-4"
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full p-2 bg-gray-300 text-black rounded mt-2"
              >
                Back
              </button>
            </>
          )}

          <p className="text-center mt-4">
            Already have an account?{' '}
            <a href="/auth/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}