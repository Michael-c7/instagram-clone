import React from 'react';
import styled from "styled-components"
import { CgSearch } from "react-icons/cg"
import { usePostContext } from '../context/post_context';
import { Link } from "react-router-dom";

const Search = () => {
  const [userInput, setUserInput] = React.useState("")
  const [userDataState, setUserDataState] = React.useState([])
  const { usersData } = usePostContext()

  React.useEffect(() => {
    if(userInput.length >= 1) {
      let maxAmtOfUsers = 8;
      let filterUsers = usersData.filter((user) => user.username.includes(userInput))
      let usersLimited = filterUsers.slice(0, maxAmtOfUsers)
      setUserDataState(usersLimited)
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
        <div className={userInput.length >= 1 ? "search-users-container show-search-users" : "search-users-container"}>
        {userInput.length >= 1 ? (
          <ul className="search-users">
            {userDataState?.length > 1 ? userDataState.map((user) => {
              const { uid, username } = user;
              let usernameCharMax = 15;

              return (
                <li className="search-user" key={uid}>
                  <Link className="search-user__link" to={`/${username}`}>
                    <h2 className="search-user__name">{username.length < usernameCharMax ? username : `${username.slice(0, usernameCharMax)}...`}</h2>
                  </Link>
                </li>
              )
            }) : <p className="no-result-text">No Results found.</p>}
          </ul>
            ) : ""}
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
    top:67px;
    left:35.5%;
    transform:translate(-35.5%);
    z-index:10;
  }

  .search-users-container {
    visibility: hidden;
    display: none;
    opacity: 0;
    min-width: 10rem;
    width:15rem;
    height:auto;
    max-height:20rem;
    position: absolute;
    transition: all 0.5s ease;
    margin-top: 1.5rem;
    left:-100px;
    background:#fff;
    border-radius:5px;
    filter:drop-shadow(0px 0px 10px var(--gray-db));
    z-index:-10;
    left:34%;
    transform:translate(-34%);
  }

  .search-users-container:after {
    position: absolute;
    left: 50%;
    margin-left: -20px;
    top: -15px;
    width: 0;
    height: 0;
    content:'';
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #fff;
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
    justify-content:flex-start;
    align-items:flex-start;
    height:auto;
    max-height:100%;
  }


  .search-user {
    margin:0 1rem;
    font-size:0.85rem;
    border-radius:inherit;
    width:auto;
  }

  .search-user:hover {
    color:#000;
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


  .no-result-text {
    width:100%;
    padding:0.5rem;
    text-align:center;
  }
`