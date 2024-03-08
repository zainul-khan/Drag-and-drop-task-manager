import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { userProfileApiFunc } from '../../api/api';
import { getConfig } from '../../services/config';

const Sidebar = () => {
  let config = getConfig();
  // const apiKey = process.env.REACT_APP_IMAGE;
  // console.log(`API Key: ${apiKey}`);

  const [details, setDetails] = useState({
    name: '',
    profile: ''
  });

  const [error, setError] = useState('');


  useEffect(() => {
    userProfile();
  }, []);

  const userProfile = async () => {
    try {

      const response = await userProfileApiFunc(config);

      // if (responsedata)
      if (response.status === 200) {

        setDetails({
          name: response.data.data.name,
          profile: response.data.data.profile
        })
      }

    } catch (error) {

      console.log("error=>", error);
      if (error.response.status === 400) setError(error.response.data.error);
      // else if (error.response.status === 401) setError(error.response.data.error);
      else setError("Something went wrong");

    }
  }

  return (
    <>
      <div className='page-sidebar'>
        <p>{error}</p>
        <img src={`http://localhost:8000${details?.profile}`} alt="profile" className="profile" />
        <p className='sidebar-heading'>{details?.name}'s Workspace</p>
        <div className='logout-btn'>
          Logout
        </div>
      </div>
    </>
  )
}

export default Sidebar