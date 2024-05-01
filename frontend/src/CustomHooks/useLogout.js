import axios from "axios";

export default function useLogout() {
  const handleLogout = () => {
    const whichAPI =
      window.location.hostname === "localhost"
        ? process.env.REACT_APP_API_URL
        : process.env.REACT_APP_VURL;

    axios
      .get(`${whichAPI}/logout`)
      .then((res) => {
        window.location.href = "/";
        console.log(res, "success");
      })
      .catch((err) => console.log(err, "err"));
  };

  return { handleLogout };
}
