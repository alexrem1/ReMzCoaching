import axios from "axios";
import { useEffect, useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(null);
  const [userID, setUserID] = useState(null);

  const whichAPI =
    window.location.hostname === "localhost"
      ? process.env.REACT_APP_API_URL
      : process.env.REACT_APP_VURL;

  // console.log(whichAPI, process.env.REACT_APP_VURL);

  axios.defaults.withCredentials = true;
  const checkAuthentication = () => {
    axios.get(`${whichAPI}`).then((res) => {
      if (res.data.Status === "You are authenticated") {
        console.log(res, "success");
        setAuth(true);
        setName(res.data.name);
        setRole(res.data.role);
        setUserID(res.data.id);
        setLoading(false);
      } else {
        console.log(res, "err");
        setAuth(false);
        setLoading(true);
      }
    });
  };
  useEffect(() => {
    checkAuthentication();
  }, [auth]);

  // useEffect(() => {
  //   console.log(auth, loading, role); // Log the value of auth after it has been updated
  // }, [auth, loading, role]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        name,
        role,
        loading,
        setAuth,
        setRole,
        userID,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useIsAuthenticated = () => useContext(AuthContext);
