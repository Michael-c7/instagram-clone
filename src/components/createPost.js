import React, { useEffect,useState, useRef } from 'react';
import styled from "styled-components"
import { BsArrowLeft } from "react-icons/bs"
import { usePostContext } from "../context/post_context"
import { useAuthContext } from '../Auth/AuthContext';
import { doc, setDoc,updateDoc } from "firebase/firestore"; 
import { db } from "../Auth/firebase"
import { stringify } from '@firebase/util';


const CreatePost = () => {
  const { user } = useAuthContext()

  const { 
    isCreatePostModalOpen,
    closeCreatePostModal,
    usersData,
    getCurrentUserData,
    currentUserData:{username, profile_image,posts:currentUserPosts, documentId},
    currentUserData,
    generateUniqueId,
  } = usePostContext()
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const descriptionRef = useRef() 


// open the modal
  useEffect(() => {
    if(isCreatePostModalOpen === true) {
      document.querySelector("body").style.overflow = "hidden"
      document.querySelector("body").style.position = "fixed";
    } 
  }, [isCreatePostModalOpen])

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

  const getCurrentDay = () => {
    var objToday = new Date(),
    weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
    dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
    curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
    curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
  // today
    var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
  
    return {
      curHour,
      curMinute,
      curSeconds,
      curMeridiem,
      dayOfWeek,
      dayOfMonth,
      curMonth,
      curYear,
    }
  }

  useEffect(() => {
    getCurrentUserData(user.uid, usersData)
  }, [])



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
        postId:postId(),
      }

    // get metadata for user




      // Add a new document in collection "users"
      const frankDocRef = doc(db, "users", documentId);

    //   await setDoc(frankDocRef, {
    //     posts:"test value 123",

    // });

    // To update age and favorite color:
    await updateDoc(frankDocRef, {
      posts:[...stringify(post)],
    });



      // await setDoc(doc(db, "users", "posts"), post);

      // redirect to the users profile

      // currentUserPosts.push(post)

    }
  // dont get the data
  }

  return (
     <Wrapper>
        <div className="container">
          <button className="close-btn" onClick={closeCreatePostModal}>&times;</button>
          <div className={`container__inner ${!imgData ? "container__inner--start" : "container__inner--end"}`}>
            <header className="menu__header">
              <button className="back-btn" onClick={closeCreatePostModal}><BsArrowLeft/></button>
              <h2 className="header__heading">Create new post</h2>
              <button className="share-btn" onClick={
                () => share(
                [imgData, picture],
                descriptionRef.current.value,
                getCurrentDay,
                username,
                generateUniqueId,
                )}
              >share</button>
            </header>
            <section className="content">
              <div className="content__upload">
                {imgData?.length >= 1 ? <img className="preview-img" src={imgData} alt="file img" /> : (
                  <div>
                    <h2 className="content__upload__h2">Submit your photo here</h2>
                    <h3 className="content__upload__h3">Only submit images, nothing else</h3>
                  </div>)
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
          </div>
        </div>
     </Wrapper>
  )
};

export default CreatePost;

/*when active make sure to disable the scroll bar for the body*/
const Wrapper = styled.div`
  .container {
    position:absolute;
    background:rgba(37,37,37, 0.8);
    width:100vw;
    height:100vh;
    left:0;
    top:0;
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
    overflow: hidden;
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
    max-height:100rem;
  }

  input[type="file"] {
    display: none;
  }

  .menu__content {
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


  .content__upload__h2 {

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

  .word-count {
    display:flex;
    justify-content:flex-end;
    font-size:0.75rem;
    color:gray;
  }


  @media screen and (max-width: 900px) {
    .container__inner {
      width:90%;
      height:100%:
    }

    .content {
      position:relative;
      display:grid;
      grid-template-columns:1fr;
      grid-template-rows:minmax(0.5fr, 1fr) minmax(200px, 1fr);
      height:100%;
      border:none;
    }

    .content__info {
      padding:0.75rem 0.7rem 0.25rem 0.75rem;
      border-left:none;
      border-top:1px solid var(--gray-divider);
      height:100%;
  
      display:grid;
      grid-template-rows:auto 1fr auto;
    }
`