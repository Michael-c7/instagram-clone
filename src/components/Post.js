import React, { useState, } from 'react';
import styled from "styled-components"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { FiMessageSquare } from "react-icons/fi"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { usePostContext } from "../context/post_context"
import {  useParams } from "react-router-dom";
import AreYouSureModal  from "./modals/AreYouSureModal"
import { Link, useNavigate } from "react-router-dom"
import defaultImage from "../utils/images/default-user.jpg"

const Post = () => {
  const [likedPost, setLikedPost] = useState(false)
  const [showMore, setShowMore] = useState(true)
  const [showCommentEl, setShowCommentEl] = useState(true)  
  
  let descriptionText = "Unlike normal “Chirashi,” where the fish is normally sliced up more like sashimi, the fish in Bara Chirashi, however, is diced up into smaller pieces, making each a perfect size to enjoy in one bite. We hope that you’ll enjoy Chef Kawabe’s own upgraded version of this classic dish."
  
  
  let navigate = useNavigate();
  
  const {
    loggedInUid,
    checkCurrentUser,
    openAreYouSureModal,
    closeAreYouSureModal,
    deletePost,
    unFollowUser
  } = usePostContext()


  const goToPost = _ => {
    closeAreYouSureModal()
    navigate(`/p/go to current post here`)
  }


  // will get post data from the data put in when working on the feed

/*
THIS POST IS MEANT TO BE USED IN THE FEED
*/
  const AreYouSureModalData = {
    headingMessage:"",
    bodyMessage:"",
    buttons:[
      {
        text:"Unfollow",
        function:unFollowUser,
        /*args for unFollow user are: currentProfileUserData, loggedInUserData */
        functionArguments:[],
        giveBoldStyle:true,
      },
      {
        text:"Go to post",
        function:goToPost,
        functionArguments:[],
        giveBoldStyle:false,
      }
    ]
  }

  return (
    <Wrapper>
      {/*Are you sure modal goes here*/}
      {/*modal go to post */}
      <AreYouSureModal AreYouSureModalData={AreYouSureModalData} />

      <section className="post">
        <header className="header">
          <Link className="header__info" to="/the users profile">
            <img className="profile-img" src={defaultImage} alt="profile"/>
            <h2 className="username">Username here</h2>
          </Link>

          <button className="delete-post-btn" onClick={() => openAreYouSureModal()}>
            <BiDotsHorizontalRounded className="delete-post-icon"/>
          </button>
        </header>
        <hr className="divider"/>
        <div className="post-content">
          <img className="post-img" src="https://images.unsplash.com/photo-1643304842006-44079673c553?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="post"/>
        </div>
        <div className="post-details">
          <ul className="post-details__items">
            <li className="post-details__item">
              <button className="post-btn like-btn">{likedPost ? <AiFillHeart className="like-btn--liked"/> : <AiOutlineHeart/>}</button>
            </li>

            <li className="post-details__item">
              <button className="post-btn like-btn" onClick={() => goToPost()}><FiMessageSquare/></button>
            </li>
          </ul>
          <div className="post-likes">9,037 likes</div>
          <p className="post-description">
            {showMore ? descriptionText.slice(0,15).trim() : descriptionText}
            {showMore ? <button className="more-description-btn" onClick={() => setShowMore(false)}>...more</button> : ""}
          </p>
          {/*if no comments dont show the view-comments-btn */}
          {showCommentEl ? (
            <Link className="view-comments-btn" to="/p/link to the post">View all 12345 comments</Link>
          ) : ""}
          <div className="date-posted">1 HOUR AGO</div>
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
    margin:1.5rem 0;

    width:40rem;
    height:auto;
    position:relative;
    left:50%;
    transform:translateX(-50%);
    display:grid;
    grid-template-rows:auto 1fr auto;
  }

  .header {
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:0.75rem 0.75rem;
  }

  .header__info {
    display:flex;
    justify-content:center;
    align-items:center;
  }

  .profile-img {
    width:38px;
    height:38px;
    border-radius:100px;
    border:none;
    cursor:pointer;
    margin-right:1rem;
    object-fit:cover;
  }

  .username {
    font-weight:400;
    font-size:1.15rem;
    color:#000;
  }

  .delete-post-btn {
    position:relative;
    background:none;
    border:none;
    font-size:1.25rem;
    display:flex;
    justify-content:center;
    align-items:center;
    top:2px;
    cursor:pointer;
  }

  .post-img {
    width:100%;
    height:auto;
    max-height:50rem;
    object-fit:cover;
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
  }

  .more-description-btn {
    display:inline;
    cursor:pointer;
  }

  .view-comments-btn  {
    margin:0.25rem 0;
    font-size:1rem;
  }

  .date-posted {
    font-size:0.75rem;
    margin-top:0.25rem;
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