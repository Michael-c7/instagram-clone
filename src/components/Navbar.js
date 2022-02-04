import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Search from './Search';

import { useAuthContext } from '../Auth/AuthContext';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiFillHome, AiOutlineHome, AiFillCompass, AiOutlineCompass } from "react-icons/ai"
import { IoMdAddCircleOutline, IoMdAddCircle } from "react-icons/io"
// import aboutImg from '../assets/hero-bcg.jpeg'
import { usePostContext } from "../context/post_context"


const Navbar = () => {
  const { logoutUser } = useAuthContext()
  const [navigationIconState, setNavigationIconState] = useState({
    home:false,
    createAPost:false,
    explore:false,
  })

  const { openCreatePostModal, isCreatePostModalOpen } = usePostContext()

  // useEffect(() => {
  //   if(isCreatePostModalOpen) {
  //     setNavigationIconState({...navigationIconState, createAPost:true})
  //   } else {
  //     setNavigationIconState({...navigationIconState, createAPost:false})
  //   }
  // }, [navigationIconState])

  return (
    <Wrapper>
      <nav className="navbar">
        <div className="navbar__inner">
          <Search className="search"/>
          <ul className="navigation">
            <li className="navigation__item">{navigationIconState.home ? <AiFillHome className="icon"/> : <AiOutlineHome className="icon"/>}</li>
            <li className="navigation__item" onClick={openCreatePostModal}>{navigationIconState.createAPost ? <IoMdAddCircle className="icon"/> : <IoMdAddCircleOutline className="icon"/>}</li>
            <li className="navigation__item">{navigationIconState.explore ? <AiFillCompass className="icon"/> : <AiOutlineCompass className="icon"/> }</li>
            <li className="navigation__item">
              <button className="profile-photo-btn">
                <img className="profile-photo" src="https://images.unsplash.com/photo-1531437888464-205744295d14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=669&q=80" alt="profile"/>
              </button>
              <div className="menu">
                <ul>
                  <li><a href="/"><FaRegUserCircle/> Profile</a></li>
                  <li><hr/></li>
                  <li><button onClick={logoutUser}>Log Out</button></li>
                </ul>
              </div>
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
  }

  .profile-photo {
    width:100%;
    height:100%;
    border-radius:inherit;
    object-fit: cover;
  }

  .menu {
    display:none;
    background:#fff;
  }

`