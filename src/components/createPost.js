import React from 'react';
import styled from "styled-components"

const createPost = () => {
  return (
     <Wrapper>
        <div className="container">
          <button className="close-btn">&times;</button>
          <div className="menu">
            <header className="menu__header">
              <h2>Create new post</h2>
            </header>
            <section className="menu__content">
              <h2>Drag photos and videos here</h2>
              <label for="file-upload" class="form-login-btn form-login-btn-validated">Select from computer</label>
              <input id="file-upload" type="file"/>
            </section>
          </div>
        </div>
     </Wrapper>
  )
};

export default createPost;

/*when active make sure to disable the scroll bar for the body*/
const Wrapper = styled.div`
  .container {
    position:absolute;
    background:rgba(37,37,37, 0.8);
    width:100%;
    height:100%;
    left:0;
    top:0;
  }

  .close-btn {
    border:none;
    background:none;
    position:relative;
    color:#000;

    left:98%;
    font-size:2rem;
  }

  .menu {
    background:#fff;
    position:relative;

    left:50%;
    top:50%;
    transform:translate(-50%, -50%);
    height:50%;
    width:50%;
  }

  input[type="file"] {
    display: none;
  }

  .menu__content {
    // background:red;

  }
`