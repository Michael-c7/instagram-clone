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


const Navbar = () => {
  const { logoutUser } = useAuthContext()

  const {
    openCreatePostModal,
    isCreatePostModalOpen,
    navigationIconHome,
    navigationIconExplore,
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
              <button className="profile-photo-btn">
                <img className="profile-photo" src="https://images.unsplash.com/photo-1531437888464-205744295d14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=669&q=80" alt="profile"/>
              </button>
              <div className="menu menu__show">
                <div className="menu__inner">
                  <div className="triangle"></div>
                    <ul className="menu__items">
                      <li className="menu__item">
                        <button className="menu-btn">
                          <a href="/"><FaRegUserCircle className="menu-icon"/> Profile</a>
                        </button>
                      </li>
                      <li className="menu__item">
                        <button  className="menu-btn" onClick={logoutUser}><MdExitToApp className="menu-icon"/> Log Out</button>
                      </li>
                    </ul>
                </div>
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
    position:absolute;
    z-index:2;
    left:0%;
    top:2.2rem;
    transform:translate(0%, 2.2rem);
    width:100%;
  }

  .menu__inner {
    position:relative;
    background:#fff;
    border-radius:5px;
    box-shadow: 0px 0px 10px 1px #ECECEC;
    padding:0.25rem;
    z-index:2;
    width:10rem;
    left:67.5%;
    transform:translateX(-67.5%);
  }

  .triangle {
    position:relative;
    width: 0;
    height: 0;
    border-top: 15px solid transparent;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #efefef;
    top:-30px;
    left:95%;
    transform:translate(-95%);

  }

  .menu__item {
    display:flex;
    just-content:center;
    align-items:center;
    padding:0.5rem;
    
  }
  .menu__item:hover {
    background:#fafafa;
    cursor:pointer;
  }

  .menu__show {
    display:block;
  }


  .menu-btn {
    background:none;
    border:none;
    font-size:1rem;
    display:flex;
    just-content:center;
    align-items:center;
  }

  .menu-icon {
    margin-right:0.25rem;
  }

`