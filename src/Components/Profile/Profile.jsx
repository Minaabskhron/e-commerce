import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

export default function Profile() {
  const [name, setName] = useState(null);

  useEffect(() => {
    const personData = jwtDecode(localStorage.getItem("token"));
    setName(personData.name);
  }, []);

  return (
    <>
      <Helmet>
        <title>profile</title>
      </Helmet>
      <div className="container">
        <h1>welcome {name}</h1>
      </div>
    </>
  );
}
