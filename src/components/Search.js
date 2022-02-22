import React from 'react';
import styled from "styled-components"
import { CgSearch } from "react-icons/cg"

const Search = () => {
  const [userInput, setUserInput] = React.useState("")
  React.useEffect(() => {
    if(userInput.length > 1) {
      /*send request to get the user data
      the corresponds w/ the search term*/
      console.log(userInput)
    }
  }, [userInput])


  return (
    <Wrapper>
        <div className="search-container">
            <CgSearch className="icon"/>
            <label className="search-label">
                <input className="search-input"type="text" placeholder="Search" onChange={(e) => setUserInput(e.target.value)}/>
            </label>
        </div>
        <div className="search-users-container show-search-users">
            <div className="triangle-2"></div>
            <ul className="search-users">
              {/*make sure to cap the name length at 15 characters long*/}
                <li className="search-user">
                    <a className="search-user__link" href="/">
                        <h2 className="search-user__name">users name</h2>
                    </a>
                </li>
                <li className="search-user">
                    <a className="search-user__link" href="/">
                        <h2 className="search-user__name">users name</h2>
                    </a>
                </li>

                <li className="search-user">
                    <a className="search-user__link" href="/">
                        <h2 className="search-user__name">max amt of char...</h2>
                    </a>
                </li>
                <li className="search-user">
                    <a className="search-user__link" href="/">
                        <h2 className="search-user__name">users</h2>
                    </a>
                </li>
            </ul>
        </div>
    </Wrapper>
  )
};

export default Search;

const Wrapper = styled.section`
  .search-container {
    position:relative;
    background:#EFEFEF;
    border-radius:7px;
    padding:0.4rem;

    display:flex;
    align-items:center;
  }

  .icon {
      font-size:1.15rem;
      margin-right:0.5rem;
      color:#8E8E8E;
  }

  .search-input {
    border:none;
    background:#EFEFEF;
    outline:none;
  }

  .search-input:placeholder {
      color:#8E8E8E;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-weight:300;
  }



  .triangle-2 {
    position:absolute;
    width: 0; 
    height: 0; 
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    top:-10px;
    left:50%;
    transform:translate(-50%);
    z-index:999;
  }


  


  .search-users-container {
    visibility: hidden;
    display: none;
    opacity: 0;
    min-width: 10rem;
    width:15rem;
    height:auto;
    position: absolute;
    transition: all 0.5s ease;
    margin-top: 1rem;
    left:-100px;
    background:#fff;
    border-radius:5px;
    filter:drop-shadow(0px 0px 10px var(--gray-db));
    z-index:-10;
    left:34%;
    transform:translate(-34%);
    
  }

  @media screen and (max-width:1400px) {
    .search-users-container {  
      left:37%;
      transform:translate(-37%);
    }
  }

  @media screen and (max-width:1050px) {
    .search-users-container {  
      left:20%;
      transform:translate(-20%);
    }
  }

  @media screen and (max-width:500px) {
    .search-users-container {  
      left:50%;
      transform:translate(-50%);
      text-align:center;
    }
  }
  
  .show-search-users {
    position:absolute;
    visibility: visible;
    opacity: 1;
    display: block;
    z-index:10;
    
  }


  .search-users {
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    overflow:auto;
    text-align:left;
  }


  .search-user {
    margin:0 1rem;
    font-size:0.85rem;
    border-radius:inherit;
    width:auto;
  }

  .search-user:first-of-type {
    border-radius:5px 5px 0px 0px;
  }

  .search-user:last-of-type {
    border-radius:0px 0px 5px 5px;
  }

  .search-user__name {
    font-weight:400;
  }
`