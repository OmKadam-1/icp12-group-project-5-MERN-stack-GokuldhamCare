import toast from "react-hot-toast";

const setPageTitle = (title) => {
  document.title = title;
};

 const isUserLoggedIn = () => {
   const token = localStorage.getItem("token");
  return !!token;
};

const getUserJwtToken = () => {
  return localStorage.getItem("token");
};

const getUserData = () => {
  return {
    role: localStorage.getItem("role"),
    userId: localStorage.getItem("userId"),
     name: localStorage.getItem("name"),
  };
};

const logoutUser = () => {
  localStorage.clear();
  toast.success("Logged out successfully!");

  setTimeout(() => {
    window.location.href = "/";
  }, 1500);
};

export {
  getUserData,
  getUserJwtToken,
  isUserLoggedIn,
  logoutUser,
  setPageTitle,
};
