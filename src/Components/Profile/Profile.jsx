import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'

export default function Profile() {

    const [name, setName] = useState(null);

    useEffect(() => {
      const personData = jwtDecode(localStorage.getItem('token'))
      setName(personData.name)
    }, []);


  return <>
    <div className="container">
        <h1>welcome {name}</h1>
    </div>
    </>
  
}
