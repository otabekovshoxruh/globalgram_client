
import { useContext, useEffect, useState } from "react";
import HomeSideBar from "./HomeSideBar";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  /* eslint-disable-next-line */
  const { state, dispatch } = useContext(UserContext);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetch("https://globalgramserver-production.up.railway.app/allPost", {
      headers: {
        Authorization: "Shoh " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("https://globalgramserver-production.up.railway.app/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Shoh " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.error(err));
  };

  const unlikePost = (id) => {
    fetch("https://globalgramserver-production.up.railway.app/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Shoh " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.error(err));
  };

  const commentToPost = (text, postId) => {
    fetch("https://globalgramserver-production.up.railway.app/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Shoh " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
    
    <div className="homw-full min-h-[90vh] container ml-[40%] mt-3 ">
      <div className="flex justify-around">
        <div className="w-96 mt-3">
          {data
            .map((item) => {
              return (
                <>
                  
                  <div className=" " key={item._id}>
                    <Link
                      key={item._id}
                      to={
                        item.postedBy._id !== state._id
                          ? "/profile/" + item.postedBy._id
                          : "/profile"
                      }
                    >
                      <p className="mt-6 p-2 bg-slate-200 border-[2px]">{item.postedBy.name}</p>
                    </Link>
                    <div className="border-x-2">
                      <img className="w-full object-contain " src={item.photo} alt={item._id} />
                    </div>
                    <div className="border-[2px] bg-slate-200 ">
                      {item.likes.includes(state._id) ? (
                        <button style={{backgroundColor: "transparent", border: "none"}} >
                          <i
                            className="material-icons text-rose-600 "
                            onClick={() => unlikePost(item._id)}
                          >
                            favorite
                          </i>
                        </button>
                      ) : (
                        <button style={{backgroundColor: "transparent", color: "black", border: "none"}}>
                          <i
                            className="material-icons"
                            onClick={() => likePost(item._id)}
                          >
                            favorite_border
                          </i>
                        </button>
                      )}
                      <i
                        onClick={() => setShowComments(!showComments)}
                        style={{ marginLeft: 15 }}
                        className="material-icons iconComment"
                      >
                        {" "}
                        comment
                      </i>

                      <p>{item.likes.length} likes</p>
                      <h4>{item.title}</h4>
                      <p>{item.body}</p>
                      {showComments ? (
                        item.comments.map((s) => (
                          <p key={s._id}>
                            <b>{s.postedBy.name} </b>
                            {s.text}
                          </p>
                        ))
                      ) : (
                        <p style={{ opacity: 0.5 }}>
                          Comments : {item.comments.length}
                        </p>
                      )}

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          commentToPost(e.target[0].value, item._id);
                          e.target[0].value = "";
                        }}
                      >
                        <input type="text" placeholder="add a comment" />
                      </form>
                    </div>
                  </div>
                </>
              );
            })
            .reverse()}
        </div>
        <div className='w-60 ' key="4">
          <h4 >My posts</h4>
          <HomeSideBar />
        </div>
      </div>
    </div>
    </>
  );
}
