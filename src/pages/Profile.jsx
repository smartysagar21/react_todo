import React, { useContext, useEffect } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { server } from "../main";

const Profile = () => {
  const {
    setUser,
    setIsAuthenticated,
    loading,
    user,
    setLoading,
    isAuthenticated,
  } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
        toast.error(error.response.data.message);
      });
  }, []);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
