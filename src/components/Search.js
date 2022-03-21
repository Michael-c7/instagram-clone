import React from 'react';
import styled from "styled-components"
import { CgSearch } from "react-icons/cg"
import { usePostContext } from '../context/post_context';
import { Link } from "react-router-dom";
import defaultImage from "../utils/images/default-user.jpg"

const Search = () => {
  const [userInput, setUserInput] = React.useState("")
  const [userDataState, setUserDataState] = React.useState([])
  const { usersData } = usePostContext()

  React.useEffect(() => {
    if(userInput.length >= 1) {
      let maxAmtOfUsers = 25;
      let filterUsers = usersData.filter((user) => 
        user.username.toLowerCase().indexOf(userInput.toLowerCase()) !== -1);
      
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

          <div className={userInput.length >= 1 ? "search-dropdown-container search-dropdown-container--show" : "search-dropdown-container"}>
            {userInput.length >= 1 ? (
              <ul className="search-dropdown__items">
                {userDataState?.length >= 1 ? userDataState?.map((user) => {
                  const {username, uid} = user;
                  let usernameCharMax = 15;
                  return (
                    <li className="search-dropdown__item" key={uid} onClick={() => window.location.reload(true)}>
                      <Link className="search-dropdown__item__link" to={`/${uid}`}>
                        <img className="search-dropdown__item__image" src={defaultImage} alt={`${username}s profile`}/>
                        <h2 className="search-dropdown__item__name">
                          {username.length < usernameCharMax ? username : `${username.slice(0, usernameCharMax)}...`}
                        </h2>
                      </Link>
                    </li>
                  )
                }) : <p className="no-result-text">No Results found.</p>}
              </ul>
            ) : ""}

          </div>
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




  





  .search-dropdown-container {
    position:absolute;
    background:#ffff;
    border-radius:5px;
    filter:drop-shadow(0px 0px 5px rgba(45, 52, 54, 0.25));
    width:20rem;
    height:25rem;
    top:0;
    left:50%;
    transform:translateX(-50%);
    margin-top:3.75rem;
    visibility: hidden;
    opacity: 0;
    z-index:-10;
  }

  .search-dropdown-container--show {
    visibility: visible;
    opacity: 1;
    z-index:10;
  }

  .search-dropdown-container:after {
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

  .search-dropdown__items {
    width:100%;
    height:100%;
    overflow-y:auto;
    overflow-x:hidden;
    border-radius:5px;
  }

  .search-dropdown__item {
    width:100%;
  }

  .search-dropdown__item:first-of-type {
    margin-top:0.85rem;
  }

  .search-dropdown__item:last-of-type {
    border-bottom-left-radius:5px;
    border-bottom-right-radius:5px;
  }

  .search-dropdown__item:hover {
    background:#fafafa;
  }

  .search-dropdown__item__link {
    display:flex;
    align-items:center;
    width:100%;
    padding:0.5rem 0.75rem;
  }

  .search-dropdown__item__image {
    width:35px;
    height:35px;
    object-fit:cover;
    border-radius:100%;
  }

  .search-dropdown__item__name {
    font-size:1rem;
    font-weight:400;
    margin-left:0.5rem;
  }

  .no-result-text {
    width:100%;
    padding:0.5rem;
    text-align:center;
    margin-top:1rem;
    font-size:1.15rem;
  }


  @media screen and (max-width:500px) {
    .search-dropdown-container {
      margin-top:7rem;
    }
  }

`