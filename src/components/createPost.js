import React, { useEffect } from 'react';
import styled from "styled-components"

import { BsArrowLeft } from "react-icons/bs"

const CreatePost = () => {
  const [postOpen, setPostOpen] = React.useState(true)

  useEffect(() => {
    if(postOpen === true) {
      document.querySelector("body").style.overflow = "hidden"
      document.querySelector("body").style.position = "fixed";
    } 
  }, [postOpen])


  return (
     <Wrapper>
        <div className="container">
          <button className="close-btn">&times;</button>
          <div className="container__inner">
            <header className="menu__header">
              <button className="back-btn"><BsArrowLeft/></button>
              <h2 className="header__heading">Create new post</h2>
              <button className="share-btn">share</button>
            </header>
            <section className="content">
              <div className="content__upload">
                <h2>Drag photos and videos here</h2>
                <label htmlFor="file-upload" className="form-login-btn form-login-btn-validated">Select from computer</label>
                <input id="file-upload" type="file"/>
              </div>
              <div className="content__info">
                <div className="profile-container">
                  <img className="profile-img" src="https://images.unsplash.com/photo-1531437888464-205744295d14?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=669&q=80" alt="profile"/>
                  <h2 className="profile-name">username here</h2>
                </div>
                <textarea className="description" placeholder="Write a caption..."></textarea>
                <footer className="footer">
                  <div className="word-count">0/2,200</div>
                </footer>
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
    position:relative;
    left:50%;
    top:50%;
    transform:translate(-50%, -50%);
    width:50rem;
    height:30rem;
    border-radius:10px;
  }

  input[type="file"] {
    display: none;
  }

  .menu__content {
    // background:red;

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
    height:90%;
    border-radius:inherit;
  }

  .content__upload {
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    text-align:center;
  }

  .content__info {
    padding:0.75rem 0.7rem 0.25rem 0.75rem;
    border-left:1px solid var(--gray-divider);
    height:100%;

    display:grid;
    grid-template-rows:auto 1fr auto;
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
      grid-template-rows:1fr 0.5fr;
      height:90%;
      border:none;
      background:none;
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