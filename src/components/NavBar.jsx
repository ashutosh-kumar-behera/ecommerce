import { NavLink, useNavigate} from 'react-router-dom'


export const NavBar = ({ setQuery }) => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sticky-top ml-0 mr-0">
      {auth ? (
        <div className="card text-center">
          <div className="card-header d-flex justify-content-between">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/add" className="nav-link">
                  Add Product
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="signUp" onClick={logout} className="nav-link">
                  Logout{" "}
                  <span className="font-normal">({JSON.parse(auth).name})</span>
                </NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0 d-flex pr-2">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
              /> &nbsp;
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="card text-center">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs d-flex justify-content-end">
              <li className="nav-item">
                <NavLink to="/signUp" className="nav-link">
                  SignUp
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};