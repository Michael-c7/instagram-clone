import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import styled from "styled-components"
import CreatePost from '../components/createPost';
import { usePostContext } from "../context/post_context"

const Dashboard = () => {
  const {  isCreatePostModalOpen } = usePostContext()
  return (
    <Wrapper>
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