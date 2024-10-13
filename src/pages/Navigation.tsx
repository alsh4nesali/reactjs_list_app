

function Navigation() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary p-4">
        <div className="container-fluid">
            <a className="navbar-brand fw-bold" href="/">ReactJS</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/Home">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/addTask">Create Task</a>
                </li>
                <li className="nav-item">
                <a className="nav-link " >sample</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
      </>
    )
  }
  
  export default Navigation
  