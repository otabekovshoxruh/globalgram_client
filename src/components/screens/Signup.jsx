import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import M from "materialize-css";


export default function SignUp() {
  const history = useHistory();
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [image, setImage] = useState(undefined);
  const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "lifegram");
    data.append("cloud_name", "di2mslul8");
    fetch("https://api.cloudinary.com/v1_1/di2mslul8/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const ourFields = () => {
    fetch("https://globalgramserver-production.up.railway.app/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: regName,
        email: regEmail,
        password: regPassword,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#ff1744 red accent-3" });
        } else {
          M.toast({ html: data.msg, classes: "#2e7d32 green darken-3" });
          history.push("/signIn");
        }
      });
  }

  const postData = () => {
    if(image) {
      uploadImage();
    } else {
      ourFields();  
    }
  };

  useEffect(() => {
    if (url) {
      ourFields();
    }
    /* eslint-disable-next-line */
  }, [url])

  return (
    <div className="m-auto my-16">
      <div className=" card bg-slate-500 rounded-full w-[33rem] h-[33rem] p-6 shadow-shox">
        <div className="container ml-44">
          <img
            src="https://i.ibb.co/BK7Q8Qb/Images.pnghttps://i.ibb.co/hyBDQy7/images-removebg-preview.png"
            alt="Avatar"
            className=""
            style={{ width: 90 }}
          />
          <div className="middle">
            <button
              onClick={() => setIsOpenModal(true)}
              className="btn #0d47a1 blue darken-1 ml-6 "
            >
              <i className="material-icons">add_a_photo</i>
            </button>
          </div>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix ">account_circle</i>
          <input
            id="icon_prefix"
            type="text"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            className="validate"
          />
          <label htmlFor="icon_prefix ">Your name</label>
        </div>
        <div className="input-field col s6 ">
          <i className="material-icons prefix">email</i>
          <input
            id="icon_prefix"
            type="email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            className="validate"
          />
          <label htmlFor="icon_prefix">Your email</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">password</i>
          <input
            id="icon_prefix"
            type="text"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            className="validate"
          />
          <label htmlFor="icon_prefix">Your password</label>
        </div>
        <button
          type="submit"
          className="waves-effect waves-light btn bg-green-700 ml-44 m-3" 
          onClick={() => postData()}
        >
          Sign Up
        </button>
        <p className="p text-center">
          <Link to="/signIn">Already have an account?</Link>
        </p>
      </div>
      {isOpenModal ? (
        <div className="modalS" onClick={() => setIsOpenModal(false)}>
          <div className="modalS_content" onClick={(e) => e.stopPropagation()}>
            <div className="modalS_header">
              <h4>Add your account photo</h4>

              <i
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => setIsOpenModal(false)}
                className="material-icons"
              >
                close
              </i>
            </div>
            <div className="modalS_content">
              <div className="file-field input-field">
                <div className="btn #0d47a1 blue darken-4">
                  <span><i className="material-icons">add_a_photo</i></span>
                  <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" type="text" placeholder="Your photo" />
                </div>
              </div>
            </div>
            <div className="modalS_footer">
              <button className="saveImgBtn" onClick={() => setIsOpenModal(false)}><i className="material-icons">done</i></button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
