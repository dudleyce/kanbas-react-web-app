import React, { useEffect, useState } from "react";
import * as client from "./client";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const profile = await client.profile();
      setProfile(profile);
      console.log(profile);
    } catch (e) {
      console.log(e);
      navigate("/Kanbas/Account/Signin");
    }
  };
  const logout = async () => {
    await client.logoutUser();
    navigate("/Kanbas/Account/login");
  };

  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };

  
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      <pre>
        <code>{JSON.stringify(profile, null, 2)}</code>
      </pre>
      <button onClick={logout} className="btn btn-danger">
        Logout
      </button>
      <button onClick={signout}>
        Signout
      </button>

      <br />
            <Link to="/Kanbas/Account/Admin/Users"
                className="btn btn-warning w-100">
                Users Table
            </Link>
    </div>
  );
}