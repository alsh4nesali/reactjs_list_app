import 'bootstrap-icons/font/bootstrap-icons.css';
import 'primereact/resources/themes/saga-blue/theme.css'; // Make sure to import necessary styles
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
      <div className="bg-dark p-5 vh-100">
        <Toast ref={toast} position="top-right" />
        <div className="login mt-5 fw-bold shadow-lg bg-body-tertiary rounded">
          <form onSubmit={handleOnSubmit}>
            <h1 className="text-center fw-bold fs-3 m-3 p-2">
              <i className="bi bi-list-task"></i> Task Management Login
            </h1>
            <div className="mb-3 mt-5">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-warning w-100 fw-bold">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
