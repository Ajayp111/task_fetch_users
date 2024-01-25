const AllUsers = ({ users, handleShowUserInfo, handleImageError }) => {
  return (
    <section className="w-100">
      <h1
        className="fs-4 mb-2 p-3 border text-center bg-opacity-10"
        style={{ backgroundColor: "#F96167" }}
      >
        Users List
      </h1>

      <div className="users-container border-gray-500">
        {users &&
          users?.map((user, index) => (
            <div
              key={user?.profile?.username}
              onClick={() => handleShowUserInfo(index)}
              className="img-div p-2  d-flex gap-3 align-items-center border-gray-500 border-b-2 "
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
      </div>
    </section>
  );
};

export default AllUsers;
