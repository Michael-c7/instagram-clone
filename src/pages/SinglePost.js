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



  return (
    <Wrapper>
      <AreYouSureModal AreYouSureModalData={AreYouSureModalData} />
      
      {isCreatePostModalOpen ? <CreatePost/> : ""}

      <Navbar/>

      <section className="post">
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
              <button className="post-info__comment-btn">
                <FiMessageSquare className="post__info__icon post__msg-icon"/>
              </button>
            </div>
            <div className="post__info__likes">19,286 likes</div>
            <div className="post__info__date">1 DAY</div>
          </div>

          {/* pos-a-comment */}
          <div className="post__info__post-a-comment">
            <label className="post-a-comment__label">
              <input className="post-a-comment__input" placeholder="Add a comment..."/>
            </label>

            <button className="post-a-comment__btn">Post</button>
          </div>

        </div>
      </section>
    </Wrapper>
  )
};

export default SinglePost;


const Wrapper = styled.div`
  width:100vw;
  position:relative;



  .img-temp  {
    width:100px;
  }

  // post 
    .post {
      background:#fff;
      width:60rem;
      height:40rem;
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
        height:39.9rem;
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
        grid-template-rows:auto 25rem auto auto;
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
      height:25rem;
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



    .post-a-comment__label{
      background:red;
      flex:1;
    }

    .post-a-comment__input {
      width:100%;
      height:100%;
      border:none;
      outline:none;
    }
    
    .post-a-comment__input::placeholder {

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

`