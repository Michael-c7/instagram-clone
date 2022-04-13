import React, { useState } from 'react';

// components
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import styled from "styled-components"
import CreatePost from '../components/createPost';
import { usePostContext } from "../context/post_context"
import ErrorModal from "../components/modals/ErrorModal"

const Dashboard = () => {
  const { 
    isCreatePostModalOpen,
    isErrorModalOpen,
    openErrorModal,
   } = usePostContext()
   
  return (
    <Wrapper>
      { isErrorModalOpen ? <ErrorModal/> : ""}
      {isCreatePostModalOpen ? <CreatePost/> : ""}
      <Navbar/>
      <section className="main-feed">
        <div className="feed"> 
          <Feed />
        </div>
      </section>
    </Wrapper>
  )
};

export default Dashboard;


const Wrapper = styled.div`
  .main-feed {
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
  }

  .feed {
    grid-column-start: 2;
    grid-column-end: 3;
  }
`