import { Link } from "react-router-dom";
import { useContext, useRef, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

export default function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const searchPanel = useRef(null);
  const [search, setSearch] = useState("");
  const [userFinded, setUserFinded] = useState([]);
  const history = useHistory();

  useEffect(() => {
    M.Modal.init(searchPanel.current);
  }, []);

  const renderNav = () => {
    if (state) {
      return [
        <>
          <li className="flex items-center mr-3 cursor-pointer gap-1" key="1">
            <i
              data-target="modal1"
              className="medium material-icons modal-trigger ml-3"
              style={{ cursor: "pointer"  }}
            >
              search 
            </i>
            <h1>search</h1>
          </li>
          <li key="2">
            <Link to="profile" className="flex items-center gap-1">
              {" "}
              <i className="medium material-icons ">account_circle</i>
              <h1>profile</h1>
            </Link>
          </li>
          <li key="3">
            <Link to="CreatePost" className="flex items-center gap-1">
              <i className="medium material-icons">add_circle_outline</i>
              <h1>create</h1>
            </Link>
          </li>
          <li key="4">
            <Link
            className="flex items-center gap-1  "
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                history.push("/signIn");
              }}
              to="signIn"
            >
              <i className="medium material-icons">exit_to_app</i>
              <h1>log out</h1>
            </Link>
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <li key="5">
            <Link to="/signIn">Sign In</Link>
          </li>
          <li key="6">
            <Link to="/signUp">Sign Up</Link>
          </li>
        </>,
      ];
    }
  };

  const searchUser = (query) => {
    setSearch(query);
    fetch("globalgramserver-production.up.railway.app/searchUser", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .then((result) => setUserFinded(result.user))
      .catch((e) => console.error(e));
  };

  return (
    <nav className="bg-slate-400 w-96 h-[100vh] fixed">
      <div className="  ">
        <Link to={state ? "/" : "/signIn"} className="brand-logo">
          <i className="medium br font-disp text-center">globalgram</i>
        </Link>
        <ul id="nav-mobile" className="flex flex-col p-28">
          {renderNav()}
        </ul>
        <div id="modal1" className="modal" ref={searchPanel}>
          <div className="modal-content">
            <div className="input-field col s6">
              <i className="material-icons prefix">search</i>
              <input
                id="icon_prefix"
                type="text"
                value={search}
                onChange={(e) => searchUser(e.target.value)}
                className="validate text-black"
              />
              <label htmlFor="icon_prefix">Search...</label>
            </div>
            <div>
              <ul className="collection">
                {userFinded.map((item) => (
                  <Link
                    to={
                      item._id !== state._id
                        ? "/profile/" + item._id
                        : "/profile"
                    }
                    onClick={() => M.Modal.getInstance(searchPanel.current).close()}
                  >
                    <li key={item._id} className="collection-item avatar">
                      <img src={item.pic} alt="" className="circle" />
                      <span className="title">
                        {item.name} <br /> {item.email}{" "}
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="modal-close waves-effect waves-green btn-flat #0d47a1 blue darken-1"
              style={{ color: "#fff" }}
              onClick={() => setSearch("")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
