import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Search from './Search';

import { useAuthContext } from '../Auth/AuthContext';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiFillHome, AiOutlineHome, AiFillCompass, AiOutlineCompass } from "react-icons/ai"
import { IoMdAddCircleOutline, IoMdAddCircle } from "react-icons/io"
import { MdExitToApp } from "react-icons/md"
// import aboutImg from '../assets/hero-bcg.jpeg'
import { usePostContext } from "../context/post_context"
import { Link } from 'react-router-dom';


const Navbar = () => {
  const { logoutUser } = useAuthContext()

  const {
    openCreatePostModal,
    isCreatePostModalOpen,
    navigationIconHome,
    navigationIconExplore,
    toggleProfileDropdown,
    showProfileDropdown,
   } = usePostContext()


  return (
    <Wrapper>
      <nav className="navbar">
        <div className="navbar__inner">
          <Search className="search"/>
          <ul className="navigation">
            <li className="navigation__item">{navigationIconHome ? <AiFillHome className="icon"/> : <AiOutlineHome className="icon"/>}</li>
            <li className="navigation__item" onClick={openCreatePostModal}>{isCreatePostModalOpen ? <IoMdAddCircle className="icon"/> : <IoMdAddCircleOutline className="icon"/>}</li>
            <li className="navigation__item">{navigationIconExplore ? <AiFillCompass className="icon"/> : <AiOutlineCompass className="icon"/> }</li>
            <li className="navigation__item">
              <button className="profile-photo-btn" onClick={toggleProfileDropdown}>
                <img className="profile-photo" src="https://images.unsplash.com/photo-1531437888464-205744295d14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=669&q=80" alt="profile"/>
              </button>

              <ul className={showProfileDropdown ? "dropdown show-dropdown" : "dropdown"}>
                <li className="triangle"></li>
                <li className="dropdown__item">
                  <Link to="/testUser">
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
    width:27px;
    height:27px;
    border-radius:100px;
    border:none;
    cursor:pointer;
    z-index:-1;
  }

  .profile-photo {
    width:100%;
    height:100%;
    border-radius:inherit;
    object-fit: cover;
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

.triangle {
  position:absolute;
  width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  
  border-bottom: 10px solid #fff;
  top:-18px;
  left:77%;
  transform:translate(-77%);
}

.dropdown {
	visibility: hidden;
  opacity: 0;
  min-width: 10rem;
	position: absolute;
  transition: all 0.5s ease;
  margin-top: 1rem;
	left: -100px;
  display: none;
  background:#fff;
  border-radius:5px;
  filter:drop-shadow(0px 0px 10px var(--gray-db));
  z-index:-10;
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
  background:#efefef;
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