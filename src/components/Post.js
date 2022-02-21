import React from 'react';
import styled from "styled-components"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { FiMessageSquare } from "react-icons/fi"

const Post = () => {
  const [likedPost, setLikedPost] = React.useState(false)
  const [showMore, setShowMore] = React.useState(true)
  let descriptionText = "Unlike normal “Chirashi,” where the fish is normally sliced up more like sashimi, the fish in Bara Chirashi, however, is diced up into smaller pieces, making each a perfect size to enjoy in one bite. We hope that you’ll enjoy Chef Kawabe’s own upgraded version of this classic dish."

  return (
    <Wrapper>
      <section className="post">
        <header className="header">
          <img className="profile-img" src="https://images.unsplash.com/photo-1531437888464-205744295d14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=669&q=80" alt="profile"/>
          <h2 className="username">Username here</h2>
        </header>
        <hr className="divider"/>
        <div className="post-content">
          <img className="post-img" src="https://images.unsplash.com/photo-1643304842006-44079673c553?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="post"/>
        </div>
        <div className="post-details">
          <ul className="post-details__items">
            <li className="post-details__item">
              <button className="post-btn like-btn">{likedPost ? <AiFillHeart/> : <AiOutlineHeart/>}</button>
            </li>
            <li className="post-details__item">
              <button className="post-btn"><FiMessageSquare/></button>
            </li>
          </ul>
          <div className="post-likes">9,037 likes</div>
          <p className="post-description">
            {showMore ? descriptionText.slice(0,15).trim() : descriptionText}
            {showMore ? <button className="more-description-btn" onClick={() => setShowMore(false)}>...more</button> : ""}
          </p>
          <a className="view-comments-btn" href="/">View all 39 comments</a>
          <a className="date-posted" href="/">1 HOUR AGO</a>
        </div>
        <hr className="divider"/>
        <div className="post-a-comment">
          <label className="post-a-comment__label">
            <input className="post-a-comment__input" type="text" placeholder="Add a comment..."/>
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
    border:1px solid var(--gray-db);
    border-radius:2px;
    background:#fff;
    margin:2rem 0;
  }

  


  .header {
    display:flex;
    align-items:center;
    margin:0.75rem 0.75rem;
  }

  .profile-img {
    width:38px;
    height:38px;
    border-radius:100px;
    border:none;
    cursor:pointer;
    margin-right:1rem;
  }

  .username {
    font-weight:400;
    font-size:1.15rem;
    color:#000;
  }


  .post-content {
  }

  .post-img {
    width:inherit;
    height:100%;
    object-fit: cover;
  }

  .post-details {
    padding:1rem;
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

  .divider {
    display: block; height: 1px;
    border: 0; border-top: 1px solid var(--gray-divider);
    margin:0; padding: 0;
  }

  .post-btn {
    background:none;
    border:none;
    font-size:1.65rem;
    cursor:pointer;
  }

  .like-btn {
    margin-right:0.5rem;
    cursor:pointer;
  }

  .like-btn--liked {
    color:#ED4956;
  }
  

  .post-likes {
    margin:0.35rem 0 0.25rem 0;
    font-weight:500;
  }

  .more-description-btn,
  .date-posted,
  .view-comments-btn {
    border:none;
    background:none;
    color:gray;
    display:block;
    cursor:pointer;
  }

  .more-description-btn {
    display:inline;
  }

  .view-comments-btn  {
    margin:0.25rem 0;
  }

  .date-posted {
    font-size:0.75rem;
  }

  .post-a-comment {
    display:grid;
    grid-template-columns:1fr 50px;
    padding:0.75rem 1rem;
  }

  .post-a-comment__label {
    height:inherit;
    display:block;
  }

  .post-a-comment__input {
    height:100%;
    border:none;
    outline:none;
  }

  .post-a-comment-btn {
    border:none;
    background:none;
    color:var(--login-btn-bg);
  }

  .post-a-comment-btn--validated {
    color:var(--login-btn-bg-validated);
    cursor:pointer;
  }









  @media screen and (max-width:700px) {
    .post {
      min-width:20rem;
      width:100%;
    }

    .post-img {
      width:100%;
      height:100%;
      object-fit: cover;
    }
  }
`