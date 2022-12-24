import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import { useEffect ,createContext, useReducer, useContext } from "react";
import Navbar from "./components/Navbar";
import SignIn from "./components/screens/SignIn";
import SignUp from "./components/screens/Signup";
import Home from "./components/screens/Home";
import Profile from "./components/screens/Profile";
import UserProfile from "./components/screens/UserProfile";
import CreatePost from "./components/screens/CreatePost";
import {reducer, initialState} from "./reducers/userReducer";
import "./App.css";


export const UserContext = createContext();

const Routing = () => {
  const history = useHistory()
  /* eslint-disable-next-line */
  const {state , dispatch} = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({type: "USER", payload: user})
    } else {
      history.push("/signIn")
    }
    /* eslint-disable-next-line */
  }, [])
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/createPost" component={CreatePost} />
      <Route path="/profile/:userId" exact component={UserProfile} />
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserContext.Provider className="flex"  value={{state, dispatch}}>
    <Router className="flex" >
      <Navbar  />
      <Routing />
    </Router>
    </UserContext.Provider>
  );
}

export default App;
