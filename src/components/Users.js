import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const AllUsers = ({ handleShowUserInfo, handleImageError }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace 'YOUR_API_URL' with the actual URL to fetch user data
    const apiUrl = "https://602e7c2c4410730017c50b9d.mockapi.io/users";

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Filter out users with missing or invalid image URLs
        const validUsers = data.filter((user) => user?.avatar);

        // Exclude the first 15 users
        const filteredUsers = validUsers.slice(15);

        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1024: { items: 3 },
  };

  const arrowStyles = {
    // Customize arrow size
    width: "60px",
    height: "60px",
  };

  const dotStyles = {
    // Customize dot size
    width: "12px",
    height: "12px",
    marginLeft: "5px",
    marginRight: "5px",
  };

  return (
    <section className="w-100">
      <h1
        className="fs-4 mb-2 p-3 border text-center bg-opacity-10"
        style={{ backgroundColor: "#F96167" }}
      >
        Users List
      </h1>

      <AliceCarousel
        responsive={responsive}
        mouseTracking
        infinite
        stagePadding={{ paddingLeft: 20, paddingRight: 20 }}
        buttonsDisabled={false}
        disableDotsControls={false}
        renderPrevButton={({ isDisabled }) => (
          <button
            style={{
              ...arrowStyles,
              left: 0,
              backgroundColor: "#F96167",
              color: "black",
            }}
            disabled={isDisabled}
          >
            Prev
          </button>
        )}
        renderNextButton={({ isDisabled }) => (
          <button
            style={{
              ...arrowStyles,
              right: 0,
              backgroundColor: "#F9E795",
              color: "white",
            }}
            disabled={isDisabled}
          >
            Next
          </button>
        )}
        renderDotsItem={({ isActive }) => (
          <span
            style={{
              ...dotStyles,
              backgroundColor: isActive ? "#000" : "#999",
            }}
          />
        )}
      >
        {users.map((user, index) => (
          <div
            key={user?.profile?.username}
            className="img-div p-2 border d-flex flex-column gap-3 align-items-center"
          >
            <img
              className="img-circle"
              src={user?.avatar}
              onError={handleImageError}
              alt=""
            />
            <div>
              <p className="m-0 fs-5 fw-semibold">
                {user?.profile?.firstName}{" "}
                <span>{user?.profile?.lastName}</span>
              </p>
              <p>{user?.jobTitle}</p>
            </div>
          </div>
        ))}
      </AliceCarousel>
    </section>
  );
};

export default AllUsers;
