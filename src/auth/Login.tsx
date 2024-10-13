// import Navigation from "../pages/Navigation"
import 'bootstrap-icons/font/bootstrap-icons.css'
import { LoginTask } from "../API/apiService";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
function Login() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    LoginTask(email, password)
      .then((response) => {
        navigate('/Home');
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <>
      {/* <Navigation/> */}
      <div className="bg-dark p-5 vh-100">
        <div className="login mt-5 fw-bold shadow-lg bg-body-tertiary rounded">
            <form onSubmit={handleOnSubmit}>
            <h1 className="text-center fw-bold fs-3 m-3 p-2"><i className="bi bi-list-task"></i> Task Management Login</h1>
                <div className="mb-3 mt-5">
                <label className="form-label">Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                <label  className="form-label">Password</label>
                    <input type="password" onChange={(e) =>  setPassword(e.target.value)} className="form-control" />
                </div>
                <button type="submit" className="btn btn-warning w-100 fw-bold">Login</button>
              </form>
        </div>
      </div>
    </>
  )
}

export default Login
