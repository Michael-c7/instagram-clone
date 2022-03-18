import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Search from './Search';

import { useAuthContext } from '../Auth/AuthContext';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiFillHome, AiOutlineHome, AiFillCompass, AiOutlineCompass } from "react-icons/ai"
import { IoMdAddCircleOutline, IoMdAddCircle } from "react-icons/io"
import { MdExitToApp } from "react-icons/md"
import { FiUser } from "react-icons/fi"
// import aboutImg from '../assets/hero-bcg.jpeg'
import { usePostContext } from "../context/post_context"
import { Link } from 'react-router-dom';


import { getSpecificUser } from "../utils/helper"


const Navbar = () => {
  const { logoutUser } = useAuthContext()
  const [currentUser, setCurrentUser] = useState({})


  const {
    openCreatePostModal,
    isCreatePostModalOpen,
    navigationIconHome,
    navigationIconExplore,
    toggleProfileDropdown,
    showProfileDropdown,
    toggleNavigationIconHome,
    toggleNavigationIconExplore,
    getLoggedInUserData,
    loggedInUid,
    loggedInUserData,
    usersData,
    getUsersData,
   } = usePostContext()


   useEffect(() => {
    getUsersData()
  }, [])

   useEffect(() => {
    let data = usersData?.filter((item) => loggedInUid === item?.uid)[0]
    setCurrentUser(data)
  }, [usersData])


  const test = _ => {
    console.log("this is a test func")
    toggleProfileDropdown()

  }

  return (
    <Wrapper>
      <nav className="navbar">
        <div className="navbar__inner">
          <Search className="search"/>
          <ul className="navigation">
            <li className="navigation__item">
              <Link to="/" onClick={() => toggleNavigationIconHome(true)}>
                {navigationIconHome ? <AiFillHome className="icon"/> : <AiOutlineHome className="icon"/>}
              </Link>
              </li>
            <li className="navigation__item" onClick={openCreatePostModal}>
              {isCreatePostModalOpen ? <IoMdAddCircle className="icon"/> : <IoMdAddCircleOutline className="icon"/>}
            </li>
            <li className="navigation__item">
              <Link to="/">
                {navigationIconExplore ? <AiFillCompass className="icon"/> : <AiOutlineCompass className="icon"/>}
              </Link>
            </li>
            <li className="navigation__item">
              <button className="profile-photo-btn" onClick={toggleProfileDropdown}>
                <FiUser className="profile-icon"/>
              </button>

              <ul className={showProfileDropdown ? "dropdown show-dropdown" : "dropdown"}>
                <li className="dropdown__item" onClick={toggleProfileDropdown}>
                  <Link to={`/${currentUser?.uid}`}>
                    <FaRegUserCircle className="dropdown-icon"/>
                    <span>Profile</span>
                  </Link>
                </li>
                <li className="dropdown__item">
                  <button onClick={logoutUser}>
                    <MdExitToApp className="dropdown-icon"/>
                    <span>Log Out</span>
                  </button>
                </li>
              </ul>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </nav>
    </Wrapper>
  )
};

export default Navbar;



const Wrapper = styled.section`
  .navbar {
    display:grid;
    grid-template-columns:0.75fr 1fr 0.75fr;
    justify-content:space-around;
    align-items:center;
    background:#fff;
    border-bottom:1px solid var(--gray-db);
    padding:1rem 0;
  }

  .navbar__inner {
    grid-column-start: 2;
    grid-column-end: 3;
    display:flex;
    justify-content:space-between;
    align-items:center;
  }


  @media screen and (max-width:1050px) {
    .navbar {
      display:flex;
      justify-content:center;
      align-items:center;
      background:#fff;
      border-bottom:1px solid var(--gray-db);
      padding:1rem 0;
      
    }

    .navbar__inner {
      display:flex;
      justify-content:space-around;
      align-items:center;
      width:100%;
    }
  }


  @media screen and (max-width:500px) {
    .navbar {
      display:flex;
      justify-content:center;
      align-items:center;
      background:#fff;
      border-bottom:1px solid var(--gray-db);
      padding:1rem 0;
    }

    .navbar__inner {
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
    }

    .navbar__inner > * {
      margin:0.5rem 0;
    }
  }




  .navigation {
    display:flex;
    justify-content:center;
    align-items:center;
  }

  .navigation__item {
    font-size:1.75rem;
    margin:0 0.5rem;
  }

  .navigation__item .icon {
    cursor:pointer;
  }

  .profile-photo-btn {
    cursor:pointer;
    z-index:-1;
    background:none;
    border:none;
    font-size:1.5rem;
    margin-bottom:0.5rem;
  }

  
ul {
	list-style: none;
	margin: 0;
	padding-left: 0;
}

li {
	display: block;
	float: left;
	padding: 0.25rem;
	position: relative;
	text-decoration: none;
  transition-duration: 0.5s;
}

.dropdown {
	visibility: hidden;
  display: none;
  opacity: 0;
  min-width: 10rem;
	position: absolute;
  transition: all 0.5s ease;
  margin-top: 1rem;
	left: -100px;
  background:#fff;
  border-radius:5px;
  filter:drop-shadow(0px 0px 10px var(--gray-db));
  z-index:-10;
}

.dropdown:after {
  position: absolute;
  left: 75.5%;
  margin-left: -20px;
  top: -15px;
  width: 0;
  height: 0;
  content:'';
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid #fff;
}


.show-dropdown {
  visibility: visible;
  opacity: 1;
  display: block;
  z-index:10;
}

.dropdown__item {
	clear: both;
  width: 100%;
  cursor:pointer;
  padding:0.5rem;
  border-radius:inherit;
}

.dropdown__item:hover {
  background:#fafafa;
}

.dropdown-icon {
  margin-right:1rem;
}

.dropdown__item button,
.dropdown__item a {
  border:none;
  background:none;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  cursor:pointer;
  font-size:1rem;
}

`