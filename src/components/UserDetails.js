import { Spinner } from "react-bootstrap";

const UserDetails = (props) => {
  const { user, handleImageError, handleImageLoad, imageLoading } = props.a;

  console.log(user);
  return (
    <section className="w-75 pr-5" style={{ marginRight: "20px" }}>
      <h1
        className="fs-4 m-0 p-3 text-center"
        style={{ backgroundColor: "#F9E795" }}
      >
        User Details
      </h1>
      <div className="d-flex flex-column align-items-center">
        {imageLoading ? (
          <div className="img-circle2 mt-3 d-flex align-items-center justify-content-center">
            <Spinner
              animation="border"
              variant="dark"
              style={{ width: "3rem", height: "3rem" }}
              className=""
            />
          </div>
        ) : (
          <img
            className="img-circle2 mt-2"
            src={user?.avatar}
            onError={handleImageError}
            onLoad={handleImageLoad}
            alt=""
          />
        )}

        <p className="m-0 fs-6 pb-3">@{user?.profile?.username}</p>

        <p
          className="m-0 p-2 w-100 fs-5"
          style={{ border: "2px solid #808080" }}
        >
          {user?.Bio}
        </p>

        <div className="w-100 mt-4">
          <p className="text-start m-0 fs-5">Full Name</p>
          <p
            className="text-start m-0 p-2 border border-dark-subtle bg-opacity-10 fs-5"
            style={{ backgroundColor: "#F96167" }}
          >
            <span>{user?.profile?.firstName}</span> {user?.profile?.lastName}
          </p>
        </div>

        <div className="w-100 mt-3">
          <p className="text-start m-0 fs-5">Job Title</p>
          <p
            className="text-start m-0 p-2 border border-dark-subtle bg-opacity-10 fs-5"
            style={{ backgroundColor: "#F96167" }}
          >
            {" "}
            {user?.jobTitle}
          </p>
        </div>

        <div className="w-100 mt-3">
          <p className="text-start m-0 fs-5">Email</p>
          <p
            className="text-start m-0 text-lowercase p-2 border border-dark-subtle bg-opacity-10 fs-5"
            style={{ backgroundColor: "#F96167" }}
          >
            {user?.profile?.email}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
