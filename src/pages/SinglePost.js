import React, { useState, } from 'react';
import styled from "styled-components"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { FiMessageSquare } from "react-icons/fi"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { usePostContext } from "../context/post_context"
import {  useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from '../components/Navbar';
import CreatePost from '../components/createPost';
import AreYouSureModal from '../components/AreYouSureModal';
import defaultImage from "../utils/images/default-user.jpg"


const SinglePost = () => {
  const [likedPost, setLikedPost] = useState(false)
  const [showMore, setShowMore] = useState(true)
  const [showDeleteButton, setShowDeleteButton] = useState(true)
  const [showCommentEl, setShowCommentEl] = useState(true)
  let descriptionText = "Unlike normal “Chirashi,” where the fish is normally sliced up more like sashimi, the fish in Bara Chirashi, however, is diced up into smaller pieces, making each a perfect size to enjoy in one bite. We hope that you’ll enjoy Chef Kawabe’s own upgraded version of this classic dish."

  const {
    loggedInUid,
    checkCurrentUser,
    openAreYouSureModal,
    isCreatePostModalOpen,
  } = usePostContext()

  const { id:postIdFromUrl } = useParams()


  React.useEffect(() => {
    console.log(postIdFromUrl)

    // console.log(checkCurrentUser(loggedInUid))
  }, [])

  const AreYouSureModalData = {
    headingMessage:"Delete Post?",
    bodyMessage:"Are you sure you want to delete the post?",
    buttons:[
      {
        text:"Delete",
        function:"",
        functionArguments:[],
        giveBoldStyle:true,
      },
    ]
  }



  return (
    <Wrapper>
      <AreYouSureModal AreYouSureModalData={AreYouSureModalData} />
      
      {isCreatePostModalOpen ? <CreatePost/> : ""}

      <Navbar/>

      <section className="post">
        <div className="post-content">
          <img className="post-img" src="https://images.unsplash.com/photo-1643304842006-44079673c553?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="post"/>
        </div>

        <div className="post__info">
          <header className="header">
            <Link className="header__info" to="/the users profile">
              <img className="profile-img" src={defaultImage} alt="profile"/>
            </Link>
            <div className="post__info__data">
              <Link className="header__info" to="/the users profile">
                <h2 className="username">Username here</h2>
              </Link>

              <div className="post__info__data__dot">•</div>
              {/*blue follow btn text or black following text */}
              <div className="post__is-following">Following</div>
            </div>
            <button className="delete-post-btn" onClick={() => openAreYouSureModal()}>
              <BiDotsHorizontalRounded className="delete-post-icon"/>
            </button>
          </header>

          {/* <hr className="divider"/> */}

          <section className="post__comments">
            <ul className="comments_list">
              {/*this is the post description */}
              <li className="comment">
                <Link className="header__info" to="/the users profile">
                  <img className="profile-img" src={defaultImage} alt="profile"/>
                  <h2 className="username">Username here</h2>
                </Link>
                <p>this is the description</p>
              </li>
              {/*the rest of this are user comments*/}
              <li className="comment">
                <Link className="header__info" to="/the users profile">
                  <img className="profile-img" src={defaultImage} alt="profile"/>
                  <h2 className="username">Username here</h2>
                </Link>
                <p>this is a comment from a user</p>
              </li>
            </ul>
          </section>

          {/* <hr className="divider"/> */}

          <div className="post-details">
            <ul className="post-details__items">
              <li className="post-details__item">
                <button className="post-btn like-btn">{likedPost ? <AiFillHeart className="like-btn--liked"/> : <AiOutlineHeart/>}</button>
              </li>

              <li className="post-details__item">
                <button className="post-btn like-btn" ><FiMessageSquare/></button>
              </li>
            </ul>
            <div className="post-likes">9,037 likes</div>
            <div className="date-posted">1 HOUR AGO</div>
          </div>

          {/* <hr className="divider"/> */}
          
          <div className="post-a-comment">
            <label className="post-a-comment__label">
              <input className="post-a-comment__input" type="text" placeholder="Add a comment..."/>
            </label>
            <button className="post-a-comment-btn">Post</button>
          </div>

        </div>
      </section>
    </Wrapper>
  )
};

export default SinglePost;


const Wrapper = styled.div`
  width:99vw;


  .post {
    border:1px solid var(--gray-db);
    border-radius:2px;
    background:#fff;
    margin:1.5rem 0;

    width:60rem;
    height:40rem;
    position:relative;
    left:50%;
    transform:translateX(-50%);
    display:grid;
    grid-template-columns:1fr 0.6fr;
  }

  .post__info {
    display:grid;
    grid-template-rows:auto 1fr auto auto;    
  }

  .post__info__data {
    display:flex;
    justify-content:center;
    align-items:center;
    margin-right:auto;
  }

  .post__info__data__dot {
    margin:0 0.5rem ;
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
    width:27px;
    height:27px;
    border-radius:100px;
    border:none;
    cursor:pointer;
    margin-right:1rem;
    object-fit:cover;
  }

  .username,
  .post__is-following {
    font-weight:500;
    font-size:1rem;
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
    max-height:40rem;
    object-fit:cover;
  }

  .post-details {
    padding:1rem;
    border-bottom:1px solid var(--gray-divider);
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


  .comments_list {
    padding:1rem 0;
  }

  .comment {
    display:flex;
    align-items:center;
    padding:0 0.75rem;
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
    display:flex;
    padding:1rem 1rem;
    justify-content:space-between;
    align-items:center;
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





  .post__comments {
    border-top:1px solid var(--gray-divider);
    border-bottom:1px solid var(--gray-divider);
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