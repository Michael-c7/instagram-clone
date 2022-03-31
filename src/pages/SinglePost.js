import React, { useState, useEffect } from 'react';
import styled from "styled-components"

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { FiMessageSquare } from "react-icons/fi"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { usePostContext } from "../context/post_context"
import {  useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { focusInput } from "../utils/helper"

import Navbar from '../components/Navbar';
import CreatePost from '../components/createPost';
import AreYouSureModal from '../components/AreYouSureModal';
import defaultImage from "../utils/images/default-user.jpg"


const SinglePost = () => {
  const [likedPost, setLikedPost] = useState(false)
  const [showMore, setShowMore] = useState(true)
  const [showDeleteButton, setShowDeleteButton] = useState(true)
  const [showCommentEl, setShowCommentEl] = useState(true)
  const [areYouSureModalData, setAreYouSureModalData] = useState({})
  const [loggedInUserPost, setLoggedInUserPost] = useState(false)
  const [postACommentInput, setPostACommentInput] = useState("")

  let testPostImg = "https://images.unsplash.com/photo-1643304842006-44079673c553?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"

  

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

  
  // useEffect(() => {
  //   var docWidth = document.documentElement.offsetWidth;
  //   [].forEach.call(
  //     document.querySelectorAll('*'),
  //     function(el) {
  //       if (el.offsetWidth > docWidth) {
  //         console.log(el);
  //       }
  //     }
  //   );
  // }, [])


  return (
    <Wrapper>
      <AreYouSureModal AreYouSureModalData={AreYouSureModalData} />
      
      {isCreatePostModalOpen ? <CreatePost/> : ""}

      <Navbar/>

      <section className="post">
        <header className="post__header post__header__mobile">
          <img className="post__header__img" src={defaultImage} alt=""/>
          <h2 className="post__header__username">username here</h2>
          <button className="post__header__action-btn">
              <BiDotsHorizontalRounded className="post__details__icon horizontal-dots-icon"/>
          </button>
        </header>
        <div className="post__img-container">
          <img className="post__img" src={testPostImg} alt="post"/>
        </div>

        <div className="post__details">
          {/* header */}
          <header className="post__header">
            <img className="post__header__img" src={defaultImage} alt=""/>
            <h2 className="post__header__username">username here</h2>
            <button className="post__header__action-btn">
              <BiDotsHorizontalRounded className="post__details__icon horizontal-dots-icon"/>
            </button>
          </header>
          {/* comments */}
          <div className="post__comments-outer">
            <div className="post__comments-inner">
              <div className="post__comments">
                <ul className="post__comments__list">
                  {/*first item is the description of the post*/}
                  <li className="comments__list__comment">
                    <Link className="comment__profile-img-container" to="/the users profile">
                      <img className="comment__profile-img" src={defaultImage} alt="profile"/>
                    </Link>

                    <div className="comment__info">
                      <Link className="comment__info__link" to="/the users profile">
                        <h2 className="comment__info__username">Username here</h2>
                      </Link>

                      <p className="comment__info__text">this is the description</p>
                    </div>
                  </li>
                  {/*every other item is a comment*/}
                  <li className="comments__list__comment">
                    <Link className="comment__profile-img-container" to="/the users profile">
                      <img className="comment__profile-img" src={defaultImage} alt="profile"/>
                    </Link>

                    <div className="comment__info">
                      <Link className="comment__info__link" to="/the users profile">
                        <h2 className="comment__info__username">Username here</h2>
                      </Link>

                      <p className="comment__info__text">this is a comment.this is a comment.this is a comment.this is a comment.this is a comment.</p>
                    </div>
                  </li>
                  <li className="comments__list__comment">
                    <Link className="comment__profile-img-container" to="/the users profile">
                      <img className="comment__profile-img" src={defaultImage} alt="profile"/>
                    </Link>

                    <div className="comment__info">
                      <Link className="comment__info__link" to="/the users profile">
                        <h2 className="comment__info__username">Username here</h2>
                      </Link>

                      <p className="comment__info__text">this is a comment.this is a comment.this is a comment.this is a comment.this is a comment.</p>
                    </div>
                  </li>
                  <li className="comments__list__comment">
                    <Link className="comment__profile-img-container" to="/the users profile">
                      <img className="comment__profile-img" src={defaultImage} alt="profile"/>
                    </Link>

                    <div className="comment__info">
                      <Link className="comment__info__link" to="/the users profile">
                        <h2 className="comment__info__username">Username here</h2>
                      </Link>

                      <p className="comment__info__text">this is a comment.this is a comment.this is a comment.this is a comment.</p>
                    </div>
                  </li>
                  <li className="comments__list__comment">
                    <Link className="comment__profile-img-container" to="/the users profile">
                      <img className="comment__profile-img" src={defaultImage} alt="profile"/>
                    </Link>

                    <div className="comment__info">
                      <Link className="comment__info__link" to="/the users profile">
                        <h2 className="comment__info__username">Username here</h2>
                      </Link>

                      <p className="comment__info__text">this is a comment.this is a comment.this is a comment.this is a comment.this is a comment.</p>
                    </div>
                  </li>
                  <li className="comments__list__comment">
                    <Link className="comment__profile-img-container" to="/the users profile">
                      <img className="comment__profile-img" src={defaultImage} alt="profile"/>
                    </Link>

                    <div className="comment__info">
                      <Link className="comment__info__link" to="/the users profile">
                        <h2 className="comment__info__username">Username here</h2>
                      </Link>

                      <p className="comment__info__text">this is a comment.this is a comment.this is a comment.this is a comment.this is a comment.</p>
                    </div>
                  </li>
                  <li className="comments__list__comment">
                    <Link className="comment__profile-img-container" to="/the users profile">
                      <img className="comment__profile-img" src={defaultImage} alt="profile"/>
                    </Link>

                    <div className="comment__info">
                      <Link className="comment__info__link" to="/the users profile">
                        <h2 className="comment__info__username">Username here</h2>
                      </Link>

                      <p className="comment__info__text">this is a comment.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* details */}
          <div className="post__info__details">
            <div className="post__info__details__icons">
              <button className="post_info__like-btn">
                <AiOutlineHeart className="post__info__icon post__heart-icon"/>
              </button>
              <button className="post-info__comment-btn" onClick={() => focusInput("post-a-comment__input", "class")}>
                <FiMessageSquare className="post__info__icon post__msg-icon"/>
              </button>
            </div>
            <div className="post__info__likes">19,286 likes</div>
            <div className="post__info__date">1 DAY</div>
          </div>

          {/* pos-a-comment */}
          <div className="post__info__post-a-comment">
            <label className="post-a-comment__label">
              <input className="post-a-comment__input" placeholder="Add a comment..." value={postACommentInput}  onChange={(e) => setPostACommentInput(e.target.value)}/>
            </label>

            <button className={ postACommentInput.length > 0 ? "post-a-comment__btn post-a-comment__btn--validated" : "post-a-comment__btn"}>Post</button>
          </div>

        </div>
      </section>
    </Wrapper>
  )
};

export default SinglePost;


const Wrapper = styled.div`
 --post-height:40rem;
 --post-comments-height:25rem;

  width:100vw;
  position:relative;

  // post 
    .post {
      background:#fff;
      width:60rem;
      max-width:100%;
      height:var(--post-height);
      position:relative;
      top:5rem;
      left:50%;
      transform:translateX(-50%);
      border:1px solid var(--gray-db);
      display:grid;
      grid-template-columns:1fr 0.5fr;
    }


    


    // post img
      .post__img-container {
        position:relative;
        width:max-content;
        height:calc(var(--post-height) - 0.1rem);
        left:50%;
        transform:translate(-50%);
      }

      .post__img {
        width:auto;
        height:100%;
      }

    



    // post details
      .post__details {
        border-left:1px solid var(--gray-db);
        display:grid;
        grid-template-rows:auto var(--post-comments-height) auto auto;
      }

    


    // header
     .post__header {
       display:flex;
       align-items:center;
       padding:1rem;
     }
     .post__header__img {
       width:30px;
       height:30px;
       border-radius:100px;
       border:none;
       cursor:pointer;
       margin-right:1rem;
       object-fit:cover;
     }

     .post__header__username {
      font-weight:500;
      font-size:1rem;
      color:#000;
     }

     .post__header__action-btn {
      position:relative;
      background:none;
      border:none;
      font-size:1.25rem;
      display:flex;
      justify-content:center;
      align-items:center;
      top:2px;
      cursor:pointer;
      margin-left:auto;
     }




     // comments
    .post__comments-outer,
    .post__comments {
      width:auto;
      height:var(--post-comments-height);
    }

    .post__comments-outer {
      border-top:1px solid var(--gray-divider);
      border-bottom:1px solid var(--gray-divider);
      position:relative;
      overflow:hidden;
    }

    .post__comments-inner {
      position:absolute;
      left:0;
      overflow-x:hidden;
      overflow-y:scroll;
    }

    .post__comments-inner::-webkit-scrollbar {
      display:none;
    }

    // ul
    .post__comments__list {
      padding:1rem;
    }
    // li
    .comments__list__comment {
      padding:0.5rem 0rem;
      display:grid;
      grid-template-columns:auto 1fr;
    }

    .comment__profile-img {
      width:30px;
      height:30px;
      border-radius:100px;
      border:none;
      cursor:pointer;
      margin-right:1rem;
      object-fit:cover;
    }


    .comment__info__username {
      font-weight:500;
      font-size:1rem;
      color:#000;
      margin-right:0.5rem;
      display:inline;
    }

    .comment__info__text {
      display:inline;
    }





    // post info
    .post__info__details {
      display:flex;
      flex-direction:column;
      padding:1rem;
      position:relative;
    }


    .post_info__like-btn,
    .post-info__comment-btn {
      border:none;
      background:none;
      font-size:2rem;
      cursor:pointer;
    }

    .post_info__like-btn {

    }

    .post_info__like-btn--liked {
      color:#ED4956;
    }


    .post-info__comment-btn {
      margin-left:0.5rem;
    }

    .post__info__likes {
      margin:0.25rem 0;
      font-weight:500;
    }

    .post__info__date {
      font-size:0.85rem;
      color:gray;
    }





    // post a comment
    .post__info__post-a-comment {
      position:relative;
      border-top:1px solid var(--gray-divider);
      // align-items:center;
      padding:0.5rem;

      width:100%;
      display:flex;
    }



    .post-a-comment__label {
      flex:1;
    }

    .post-a-comment__input {
      width:100%;
      height:100%;
      border:none;
      outline:none;
    }
    
    .post-a-comment__btn {
      border:none;
      background:none;
      color:var(--login-btn-bg);
      margin-left:0.25rem;
    }

    .post-a-comment__btn--validated {
      color:var(--login-btn-bg-validated);
      cursor:pointer;
    }





    // misc
    .post__header__mobile {
      display:none;
    }



    // mobile view
    @media only screen and (max-width: 1000px) {
      .post {
        width:95%;
      }
    }

    @media only screen and (max-width: 750px) {
      .post {
        width:100%;
        display:grid;
        grid-template-columns:1fr;
        grid-template-rows:1fr 0.5fr;
        top:0rem;
      }
      .post__header {
        display:none;
      }

      .post__header__mobile {
        display:flex;
      }

      .post__details {
        border-left:1px solid var(--gray-db);
        display:grid;
        grid-template-rows:var(--post-comments-height) auto auto;
      }

      .post__img-container {
        position:relative;
        width:max-content;
        height:calc(var(--post-height) - 0.1rem);
        left:50%;
        transform:translate(-50%);
      }

      .post__img {
        width:auto;
        height:90.25%;
      }

      .post__info__post-a-comment {
        position:relative;
        border-top:1px solid var(--gray-divider);
        // align-items:center;
        padding:0.5rem;
  
        width:100%;
        display:flex;
        flex-direction:column;
      }

      .post-a-comment__btn {
        border:none;
        // background:var(--login-btn-bg);
        background-color:var(--login-btn-bg-validated);
        color:#fff;
        margin-left:0.0rem;
        margin-top:0.5rem;
        padding:0.5rem;
        cursor:pointer;
      }
    }


    @media only screen and (max-width: 375px) {
      .post__img-container {
        position:relative;
        width:100%;
        height:calc(var(--post-height) - 0.1rem);
        left:50%;
        transform:translate(-50%);
        object-fit:contain;
      }

      .post__img {
        width:100%;
        height:100%;
      }
    }

`