import 'bootstrap-icons/font/bootstrap-icons.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Necessary styles for PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { LoginTask } from "../API/apiService";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { Toast } from 'primereact/toast';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const toast = useRef<Toast | null>(null);
  const getToken = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    if (getToken === 'true') {
      navigate('/Home'); // Redirect to Home if already authenticated
    }
  }, [getToken, navigate]);

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await LoginTask(email, password);
      console.log(response); // Log response for debugging
      if (response) {
        localStorage.setItem('userId', response.userId); // Store user ID
        localStorage.setItem('hasShownToast', 'false'); // This might need adjustment based on your requirements
        login(); // Update context for successful login
        navigate('/Home'); // Redirect to the Home page
      }
    } catch (error) {
      console.error("Login error:", error); // Log the error for debugging
      if (toast.current) {
        console.log("Attempting to show toast"); // Debugging
        toast.current.show({
          severity: 'warn',
          summary: 'Invalid Username and Password',
          life: 3000,
        });
      }
    }
  };

  return (
    <>
      <div className="bg-gray-900 p-5 min-h-screen flex items-center justify-center">
        <Toast ref={toast} position="top-right" />
        <div className="bg-white w-full max-w-sm p-8 rounded-lg shadow-lg">
          <form onSubmit={handleOnSubmit}>
            <h1 className="text-center text-2xl font-bold mb-6">
              <i className="bi bi-list-task"></i> Task Management Login
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
