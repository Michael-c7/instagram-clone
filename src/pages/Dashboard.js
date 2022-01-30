import React from 'react';
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import styled from "styled-components"

const Dashboard = () => {
  return (
    <Wrapper>
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