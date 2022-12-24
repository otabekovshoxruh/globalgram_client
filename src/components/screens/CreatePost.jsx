import { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";

export default function CreatePost() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("globalgramserver-production.up.railway.app/createPost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Shoh " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title,
        body,
        picture: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#ff1744 red accent-3" });
        } else {
          M.toast({
            html: "Successfully added",
            classes: "#2e7d32 green darken-3",
          });
          history.push("/");
        }
      });
    }
    
      /* eslint-disable-next-line */
  }, [url]);

  const postDetails = () => {
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
  };

  return (
    <div className="card cardPost w-2/4 m-auto">
      <div className="card-image ">
        <img 
        className="h-96"
          src="https://blog.logrocket.com/wp-content/uploads/2021/05/reactnative.png"
          alt="any user img"
        />
        <span className="card-title">Add Photo</span>
      </div>
      <div className="card-content">
        <div className="input-field col s6">
          <i className="material-icons prefix">subtitles</i>
          <input
            id="icon_prefix"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="icon_prefix">Subtitle</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">content_paste</i>
          <input
            id="icon_prefix"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <label htmlFor="icon_prefix">Content</label>
        </div>
        <div className="file-field input-field">
          <div className="btn #0d47a1 blue darken-4">
            <span>
              <i className="material-icons">add</i>
            </span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              placeholder="Add Photo"
            />
          </div>
        </div>
        <button className="btn #0d47a1 blue darken-4" onClick={() => postDetails()}>
          Add Post
        </button>
      </div>
    </div>
  );
}
