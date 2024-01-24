import { useQuery } from "react-query";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState } from "react";
import imagePlaceholder from "./assets/profile-placeholder.jpg";
import AllUsers from "./components/AllUsers";
import UserDetails from "./components/UserDetails";
import { Spinner } from "react-bootstrap";
import bg from "./assets/bg2.jpeg";
import Users from "./components/Users";
function App() {
  const appStyle = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const [user, setUser] = useState(null);

  const {
    data: users = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios(
        "https://602e7c2c4410730017c50b9d.mockapi.io/users"
      );
      return res.data;
    },
  });

  if (loading) {
    return (
      <div className="w-100 py-5 h-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  if (!loading && users.length > 0 && user === null) {
    setUser(users[0]);
  }

  const handleShowUserInfo = (index) => {
    setUser(users[index]);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = (event) => {
    setImageLoading(false);
    setImageError(true);
    event.target.src = imagePlaceholder;
  };

  const a = {
    user,
    handleImageError,
    handleImageLoad,
    imageLoading,
    imageError,
  };

  return (
    <>
      <div
        className="d-flex justify-content-between p-5 gap-5 h-100"
        style={appStyle}
      >
        <AllUsers
          users={users}
          handleShowUserInfo={handleShowUserInfo}
          handleImageError={handleImageError}
          handleImageLoad={handleImageLoad}
        />

        <UserDetails a={a} />
      </div>

      <Users />
    </>
  );
}

export default App;
