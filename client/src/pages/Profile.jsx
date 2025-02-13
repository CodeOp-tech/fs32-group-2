import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";

// shows the profile of the logged user.
// it shows the user basic info (i'm thinking name, age, interests, profile pic, etc...)
// and also the events the user is registered as a volunteer or as taking a challenge.
// this for now and we build on top of that

export default function Profile() {
  const [user, setUser] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getPreferences();
  }, [user]);

  async function getUsers() {
    try {
      const response = await fetch(`/api/users/profile`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setUser(data);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  function getPreferences() {
    setPreferences(user.Keywords);
  }

  return (
    <div className="body">
      {user.organisation ? (
        <h1 className="userProfile-css">Organisation profile</h1>
      ) : (
        <h1 className="userProfile-css">User profile</h1>
      )}

      <div >
        
      
        <div >
        <h3 >Hello {user.username}!</h3>
        </div>
      
        <div >
          <img style={{width: "10%"}}  src="./public/profile_pic.png" alt="" />
        </div>
        
      </div>
      
      <div>These are your preferences:</div>

      <div style={{textAlign: "left"}}>
        {preferences?.map((e, i) => (
          <div key={i} style={{ margin: "5px" }}>
            <div key={i} className="keywordsAtProfile-css">
              {e.keyword}
            </div>
          </div>
        ))}
      </div>
      {/* <div>  //the base for when we have the requirements route
        Requirements you've completed:
        {requirements?.map((e, i) => (
          <div key={i} style={{ margin: "5px" }}>
            <div key={i}>
              {e.requirement}
            </div>
          </div>
        ))}
      </div> */}
      <div className="dateAtEntry-css">
        You have been a member since:
        {
          <div>
            {new Date(user.createdAt).toLocaleDateString("en-UK", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        }
      </div>
      <Link to="/Action/Create">
        <button
          className="btn btn-success buttonToCreateACtion-css"
          style={{ background: "rgb(108, 187, 226)", border: "transparent" }}
        >
          Create a new action!
        </button>
      </Link>
    </div>
  );
}
