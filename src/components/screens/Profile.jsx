import "./Profile.css";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import M from "materialize-css";
import Not from "./Not";

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [myName, setMyName] = useState("");

  useEffect(() => {
    if (image) {
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
          fetch("https://globalgramserver-production.up.railway.app/updatePic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Shoh " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    /* eslint-disable-next-line */
  }, [image]);

  const updatePhoto = (file) => {
    setImage(file);
  };

  const editProfile = () => {
    if (myName) {
      fetch("https://globalgramserver-production.up.railway.app/editName", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Shoh " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({ myName }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state, name: data.name })
          );
          dispatch({ type: "EDITPROFILE", payload: data.name });
          M.toast({
            html: "Profile was changed",
            classes: "#2e7d32 green darken-3",
          });
        });
    }
    setIsEdit(false);
  };

  useEffect(() => {
    fetch("https://globalgramserver-production.up.railway.app/myPost", {
      headers: {
        Authorization: "Shoh " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result.myPost);
      });
  });


  return (
    <div className="m-auto max-w-[80%]">
      <div className="flex my-5 m-auto justify-around border-b-[2px]  ">
        <div>
          <div className=" rounded-[50%]  border-x-blue-600 border-purple-600 border-[3px]">
            <img
              src={state ? state.pic : "loading.."}
              alt="Avatar"
              className="rounded-[50%] object-cover w-[160px] h-[160px] bject-cover "
            />
            <div className="middle"></div>
          </div>
        </div>
        <div>
          <div className="h-2 flex justify-around items-center my-9">
            <h4>{state ? state.name : "Loading"}</h4>
            <button
              onClick={() => setIsEdit(true)}
              className="btn text-red-600 darken-1"
            >
              <i className="material-icons text-red-600">settings</i>
            </button>
          </div>
          <div className="w-full flex justify-between my-9 m-4">
            <p>{profile.length} posts </p>
            <p>{state ? state.followers.length : "0"} followers</p>
            <p>{state ? state.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <div className="gallery">
        {!profile.length ? (
          <Not />
        ) : (
          profile.map((item) => {
            return (
              <div className="img-item w-[9rem] grid-flow-row flex">
                <img src={item.photo} alt={item._id} />
              </div>
            );
          })
        )}

        {isEdit ? (
          <div className="w-[30rem] h-[18rem] p-3 top-5 rounded-lg absolute text-red-600 bg-slate-500 w" onClick={() => setIsEdit(false)}>
            <div
              className="modalS_content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modalS_header flex justify-between">
                <h4>Change account profile</h4>

                <i
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => setIsEdit(false)}
                  className="material-icons"
                >
                  close
                </i>
              </div>
              <div className="modalS_content">
                <div className="file-field input-field">
                  <div className="btn #0d47a1 blue darken-4">
                    <span>
                      <i className="material-icons">add_a_photo</i>
                    </span>
                    <input
                      type="file"
                      onChange={(e) => updatePhoto(e.target.files[0])}
                    />
                  </div>
                  <div className="file-path-wrapper">
                    <input
                      className="file-path validate"
                      type="text"
                      placeholder="Your new photo"
                    />
                  </div>
                </div>
                <div class="input-field col s6">
                  <i class="material-icons prefix #0d47a1">account_circle</i>
                  <input
                    onChange={(e) => setMyName(e.target.value)}
                    id="icon_prefix"
                    type="text"
                    class="validate"
                  />
                  <label for="icon_prefix">Write new name</label>
                </div>
              </div>
              <div className=" ">
                <button className="ml-[50%] bg-slate-400 text-current p-2" onClick={() => editProfile()}>
                  <i className="material-icons ">done</i>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
