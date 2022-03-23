import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components"
import { BsArrowLeft } from "react-icons/bs"
import { usePostContext } from "../context/post_context"
import { useAuthContext } from '../Auth/AuthContext';
import { doc, updateDoc } from "firebase/firestore"; 
import { db } from "../Auth/firebase"
import { stringify } from '@firebase/util';
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentDay } from "../utils/helper";


const CreatePost = () => {
  let navigate = useNavigate();
  const { user } = useAuthContext()
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const descriptionRef = useRef() 

  const { 
    closeCreatePostModal,
    usersData,
    getCurrentUserData,
    currentUserData:{username, profile_image,posts:currentUserPosts, documentId},
    currentUserData,
    generateUniqueId,
  } = usePostContext()

  const { id:uidFromUrl } = useParams()


// show the chosen image
  const onChangePicture = e => {
    if (e.target.files[0]) {
      // console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };


  useEffect(() => {
    getCurrentUserData(user.uid, usersData)
  }, [currentUserData])



  const share = async (userImage, description, datePosted, postedBy, postId) => {
    if(userImage && userImage[1].type.includes("image")) {
    // get the info to submit
      const post = {
        userImage:{
          src:userImage[0],
          name:userImage[1].name,
          size:userImage[1].size,
          type:userImage[1].type,
        },
        description,
        datePosted:datePosted(),
        postedBy:postedBy,
        postId:postId,
      }


  // Add a new document in collection "users"
    const postsDocRef = doc(db, "users", documentId);

    await updateDoc(postsDocRef, {
      posts:[...currentUserPosts, stringify(post)]
    });

  // After the data is submitted
    // close the modal
    closeCreatePostModal()

    // want to know the logged in user is on their own profile page
    if(user.uid === uidFromUrl) {
      // same
      window.location.reload(true);
    } else {
      // not same
      navigate(`/${user.uid}`)
    }
    }
  }








  return (
     <Wrapper>
        <div className="container">
          <button className="close-btn" onClick={closeCreatePostModal}>&times;</button>
          <form className={`container__inner ${!imgData ? "container__inner--start" : "container__inner--end"}`} onSubmit={(e) => {
            e.preventDefault();
            share([imgData, picture],
              descriptionRef.current.value,
              getCurrentDay,
              username,
              generateUniqueId(),
            )
          }}>
            <header className="menu__header">
              <button className="back-btn" onClick={closeCreatePostModal}><BsArrowLeft/></button>
              <h2 className="header__heading">Create new post</h2>
              <button className="share-btn" type="submit">share</button>
            </header>
            <section className="content">
              <div className="content__upload">
                {imgData?.length >= 1 ? <img className="preview-img" src={imgData} alt="file img" /> : (
                  <div>
                    <h2 className="content__upload__h2">Submit your photo here</h2>
                    <h3 className="content__upload__h3">Only submit images, nothing else</h3>
                  </div>
                  )
                }
                {!imgData?.length >= 1 ? <label htmlFor="file-upload" className="form-login-btn form-login-btn-validated">Select from computer</label> : ""}
                <input id="file-upload" type="file" onChange={onChangePicture} accept="image/*"/>
              </div>
              <div className="content__info">
                <div className="profile-container">
                  <img className="profile-img" src={profile_image} alt="profile"/>
                  <h2 className="profile-name">{username}</h2>
                </div>
                <textarea className="description" ref={descriptionRef} placeholder="Write a caption..."></textarea>
              </div>
            </section>
          </form>
        </div>
     </Wrapper>
  )
};

export default CreatePost;







const Wrapper = styled.div`
  .container {
    position:absolute;
    background:rgba(37,37,37, 0.8);
    width:100vw;
    height:100vh;
    left:0;
    top:0;
    z-index:100;
  }

  .close-btn {
    border:none;
    background:none;
    position:absolute;
    color:#fff;
    left:99%;
    transform:translateX(-99%);
    font-size:3rem;
    cursor:pointer;
  }

  .container__inner {
    background:#fff;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    border-radius:10px;
    overflow: auto;
    display:grid;
    grid-template-rows:50px auto;
  }

  .container__inner--start {
    width:50rem;
    height:35rem;
  }

  .container__inner--end {
    width:auto;
    max-width:50rem;
    min-width:25rem;
    height:auto;
    max-height:90%;
  }

  input[type="file"] {
    display: none;
  }

  .menu__header {
    display:flex;
    justify-content:space-between;
    align-items:center;
    border-bottom:1px solid var(--gray-divider);
    padding:0.5rem 1rem;
  }

  .back-btn {
    border:none;
    background:none;
    font-size:1.75rem;
    cursor:pointer;
  }

  .back-btn > * {
    display:block;
  }

  .header__heading {
    font-weight:400;
    font-size:1rem;
  }

  .share-btn {
    border:none;
    background:none;
    font-weight:600;
    color:var(--login-link-light);
    cursor:pointer;
  }

  .content {
    position:relative;
    display:grid;
    grid-template-columns:1fr 0.5fr;
    grid-template-rows:1fr;
    height:100%;
    border-radius:inherit;
    background:#fff;
  }

  .content__upload {
    position:relative;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    text-align:center;
    width:inherit;
    border-radius:inherit;
    height:100%;
  }

  .content__upload__h3 {
    font-weight:400;
    font-size:0.85rem;
  }

  .content__info {
    padding:0.75rem 0.7rem 0.25rem 0.75rem;
    border-left:1px solid var(--gray-divider);
    height:100%;
    display:grid;
    grid-template-rows:auto 1fr auto;
  }

  .preview-img {
    width:100%;
    height:100%;
    object-fit:cover;
    object-position: 50% 50%;
    border-radius:0px 0px 0px 10px;
  }

  .profile-container {
    display:flex;
    align-items:center;
    margin-bottom:1rem;
  }

  .profile-img {
    width:30px;
    height:30px;
    border-radius:100px;
    border:none;
    cursor:pointer;
    margin-right:1rem;
    object-fit:cover;
    object-position: 50% 50%;
  }

  .profile-name {
    font-weight:500;
    font-size:1rem;
  }


  .description {
    background:none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    border:none;
    resize: none;
    outline:none;
    width:100%;
  }

  @media screen and (max-width: 825px),(max-height: 700px) {
    .container__inner--start {
      width:90%;
      height:90%;
    }
  
    .container__inner--end {
      width:90%;
      max-width:90%;
      min-width:90%;
      height:90%;
      max-height:90%;
    }
`