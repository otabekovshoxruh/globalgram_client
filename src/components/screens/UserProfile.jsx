import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import "./Profile.css";
import Loader from "./Loader";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  /* eslint-disable-next-line */
  const { state, dispatch } = useContext(UserContext);
  const [showFollowers, setShowFollowers] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    fetch(`https://globalgramserver-production.up.railway.app/user/${userId}`, {
      headers: {
        Authorization: "Shoh " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      });
  });

  const followUser = () => {
    fetch(`https://globalgramserver-production.up.railway.app/follow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Shoh " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollowers(false);
      });
  };

  const unFollowUser = () => {
    fetch(`https://globalgramserver-production.up.railway.app/unFollow`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Shoh " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unFollowId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          const newFollowers = prevState.user.followers.filter(
            (s) => s !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollowers,
            },
          };
        });
        setShowFollowers(true);
      });
  };

  return (
    <>
      {profile ? (
        <div className="m-auto  w-[44rem]">
          <div className="flex my-5 m-auto justify-around border-b">
            <div className="  rounded-[50%] border-x-blue-600 border-purple-600 border-[3px]">
              <img
                className="w-[160px] h-[160px] bject-cover rounded-[50%]"
                src={profile.user.pic}
                alt="person"
              ></img>
            </div>
            <div>
              <h4>{profile.user.name}</h4>
              <div className="infoProfile flex p-4">
                <p>{profile.posts.length} posts</p>
                <p>{profile.user.followers.length} followers</p>
                <p>{profile.user.following.length} following</p>
              </div>
              <div>
                {showFollowers ? (
                  <button className="btn #0d47a1 blue darken-4" onClick={() => followUser()}>
                    Follow
                  </button>
                ) : (
                  <button className="btn #0d47a1 blue darken-4" onClick={() => unFollowUser()}>
                    Unfollow
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="gallery">
            {profile.posts.map((item) => {
              return (
                <div className="img-item">
                  <img src={item.photo} alt={item._id} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
