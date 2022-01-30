import React from 'react';
import styled from "styled-components"
import Post from './Post';

const Feed = () => {
    // map through the data from the posts and return Post component
  return (
    <div>
        <Post/>
    </div>
  )
};

export default Feed;
