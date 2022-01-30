import React from 'react';
import styled from "styled-components"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { FiMessageSquare } from "react-icons/fi"

const Post = () => {
  const [likedPost, setLikedPost] = React.useState(false)
  return (
    <Wrapper>
      <section className="post">
        <header className="header">
          <img className="profile-img" src="https://images.unsplash.com/photo-1531437888464-205744295d14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=669&q=80" alt="profile"/>
          <h2 className="username">Username here</h2>
        </header>
        <hr/>
        <div className="post-content">
          <img className="post-img" src="https://images.unsplash.com/photo-1643304842006-44079673c553?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="post"/>
        </div>
        <div className="post-details">
          <ul className="post-details__items">
            <li className="post-details__item">
              <button>{likedPost ? <AiFillHeart/> : <AiOutlineHeart/>}</button>
            </li>
            <li className="post-details__item">
              <button><FiMessageSquare/></button>
            </li>
          </ul>
          <div className="post-likes">9,037 likes</div>
          <p className="post-description">
            Unlike normal “Chirashi,” where the fish is normally sliced up more like sashimi, the fish in Bara Chirashi, however, is diced up into smaller pieces, making each a perfect size to enjoy in one bite. We hope that you’ll enjoy Chef Kawabe’s own upgraded version of this classic dish.
            <button className="more-description-btn">...more</button>
          </p>
          <button className="view-comments-btn">View all 39 comments</button>
          <div className="date-posted">1 HOUR AGO</div>
        </div>
        <hr/>
        <div className="post-a-comment">
          <label>
            <input type="text" placeholder="Add a comment..."/>
          </label>
          <button className="post-a-comment-btn">Post</button>
        </div>
      </section>
    </Wrapper>
  )
};

export default Post;


const Wrapper = styled.div`

  .post {
    border-bottom:1px solid var(--gray-db);
    border-radius:5px;
  }


  .header {
    display:flex;
    align-items:center;
  }

  .profile-img {
    width:27px;
    height:27px;
    border-radius:100px;
    border:none;
    cursor:pointer;
    margin-right:1rem;
  }

  .username {
    font-weight:400;
  }


  .post-content {
  }

  .post-img {
    height:inherit;
    object-fit: cover;
  }


  .post-details__items {
    display:flex;
    align-items:center;
  }

  .post-details__item {
    border:none;
    background:none;
    font-size:1.75rem;
  }
`