import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../App";


export default function HomeSideBar() {
  const [profile, setProfile] = useState([]);
  /* eslint-disable-next-line */
  const { state, dispatch } = useContext(UserContext);

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

  //console.log(profile)
  return (
    <>
      {profile.map((item) => {
        return (
            <div className="card border-[1px] border-neutral-500  rounded-md" key={item._id}>
            <div className="w-10 gap-2 m-2  flex items-center">
              <img src={state.pic} alt="user img" />
              <p className="">{item.postedBy.name}</p>
            </div>
            <div className="card-image border-[1px] border-y-1 border-neutral-500">
              <img src={item.photo} alt={item._id} />
            </div>
            <div className="card-content bg-neutral-300">
              <b>{item.title}</b>
              <p>
                {item.body}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
