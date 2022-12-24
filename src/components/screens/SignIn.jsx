
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import {UserContext} from "../../App"
import { useHistory } from "react-router-dom";
  import M from "materialize-css";

export default function SignIn() {
  /* eslint-disable-next-line */
  const {state, dispatch} = useContext(UserContext)
  const history = useHistory();
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");


  const logData = () => {
    fetch("https://globalgramserver-production.up.railway.app/signIn", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: logEmail,
        password: logPassword
      })
    }).then(res=>res.json())
      .then(data => {
        if ( data.error) {
          M.toast({html: data.error, classes: "#ff1744 red accent-3"})
        } else {
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          dispatch({type: "USER", payload: data.user})
          M.toast({html: "Successfully Login", classes: "#2e7d32 green darken-3"})
          history.push("/")
        }
      })
  }

  return (
    <div className="m-auto my-40">
      <div className="card bg-slate-500 rounded-full w-96 h-80 p-6 shadow-shox " >
        <h2 className="font-disp text-center text-3xl">glabalgram</h2>
        <div className="input-field col s6 bg">
          <i className="material-icons prefix">email</i>
          <input
            id="icon_prefix"
            type="text"
            value={logEmail}
            onChange={(e) => setLogEmail(e.target.value)}
            className="validate"
          />
          <label htmlFor="icon_prefix">Your email</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">password</i>
          <input
            id="icon_prefix"
            type="text"
            value={logPassword}
            onChange={(e) => setLogPassword(e.target.value)}
            className="validate"
          />
          <label htmlFor="icon_prefix">Your password</label>
        </div>
        <button className="waves-effect waves-light btn ml-32 m-2 " onClick={() => logData()}>
          Login
        </button>
        <p className="text-center">
          <Link to="/signUp">Don't have an account?</Link>
        </p>
      </div>
    </div>
  );
}
