import { useAuth } from "../auth/Auth";
import { Navigate } from "react-router-dom";
import Logo from '../assets/logo.svg';
function Navigation() {
  const {logout} = useAuth();
  const handleLogout = () => {
    logout();
    return <Navigate to="/"/>
  }

    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary p-4 ">
        <div className="container-fluid">
            <a className="navbar-brand fw-bold" href="/Home">
            <img src={Logo} alt="Logo" width='90px'></img>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/Home">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/addTask">Create Task</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
      </>
    )
  }
  
  export default Navigation
  