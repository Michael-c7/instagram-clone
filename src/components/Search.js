import React from 'react';
import styled from "styled-components"
import { CgSearch } from "react-icons/cg"

const Search = () => {
  return (
    <Wrapper>
        <div className="search-container">
            <CgSearch className="icon"/>
            <label className="search-label">
                <input className="search-input" type="text" placeholder="Search"/>
            </label>
        </div>
        {/* <div className="searched-users-container">
            <ul>
                <li>
                    <a href="/">
                        <div>profile photo</div>
                        <h2>users name</h2>
                    </a>
                </li>
                <li>
                    <a href="/">
                        <div>profile photo</div>
                        <h2>users name</h2>
                    </a>
                </li>
            </ul>
        </div> */}
    </Wrapper>
  )
};

export default Search;

const Wrapper = styled.section`
  .search-container {
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
`