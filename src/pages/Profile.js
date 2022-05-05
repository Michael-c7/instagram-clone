import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import { useParams, Link } from 'react-router-dom'
// components
import CreatePost from '../components/CreatePost'
import Navbar from "../components/Navbar"
import ErrorModal from "../components/modals/ErrorModal"
// loaders
import Loading from "../components/loaders/LoadingText"
// misc
import defaultImage from "../utils/images/default-user.jpg"
import { usePostContext } from "../context/post_context"
import { getSpecificUser } from "../utils/helper"



const Profile = () => {
  const {
    isCreatePostModalOpen,
    usersData,
    getUsersData,
    toggleNavigationIconHome,
    toggleNavigationIconExplore,
    loggedInUserSameAsCurrentProfile,
    checkCurrentUser,
    loggedInUid,
    checkIfFollowing,
    isFollowing,
    followUser,
    unFollowUser,
    followButtonLoading,
    isErrorModalOpen,
    getCollectionData,
    profilePostsData,
  } = usePostContext()
  
  const [currentUser, setCurrentUser] = useState({})
  const [followerCount, setFollowerCount] = useState(null)
  const [followingCount, setFollowingCount] = useState(null)

  const { id:uidFromUrl } = useParams()
  

  useEffect(() => {
    getUsersData()
    toggleNavigationIconHome(false)
    toggleNavigationIconExplore(false)
  }, [])

  useEffect(() => {
    setCurrentUser(getSpecificUser(uidFromUrl, usersData))
  }, [usersData])


  useEffect(() => {
    /*
    checks if the current profile is the logged in user.
    used to determine if it should show the follow / following button or not,
    because it wouldn't make sense to follow yourself 
    */
    checkCurrentUser(uidFromUrl)

    /*
    used to check if the logged in user
    is following the current profile user
    */
    checkIfFollowing(currentUser, getSpecificUser(loggedInUid, usersData))

    // set follower & following count
    setFollowerCount(currentUser?.followers?.length)
    setFollowingCount(currentUser?.following?.length)

    // get current post data
    if(currentUser?.documentId) {
      getCollectionData(["users", currentUser?.documentId, "posts"])
    }
  }, [currentUser])




  const followBtnLogic = _ => {
    followUser(currentUser, getSpecificUser(loggedInUid, usersData));
    setTimeout(() => {
      if(followerCount <= 0) {
        setFollowerCount((prevCount) => prevCount = 0)
      }
      setFollowerCount((prevCount) => prevCount + 1)
    }, 500)
  }

  const unFollowBtnLogic = _ => {
    unFollowUser(currentUser, getSpecificUser(loggedInUid, usersData));
    setTimeout(() => {
      if(!followButtonLoading) {
        if(followerCount <= 0) {
          setFollowerCount((prevCount) => prevCount = 0)
        }
        setFollowerCount((prevCount) => prevCount - 1)
      }
    }, 500)
  }

  const followAndUnFollowButtonEl = _ => {
  // follow
    if(!loggedInUserSameAsCurrentProfile && !isFollowing) {
      if(followButtonLoading) {
        return (
          <button className="form-login-btn follow-btn" disabled><Loading/></button>
        )
      }
        return (
          <button className="form-login-btn follow-btn" onClick={followBtnLogic}>Follow</button>
        )
  // following / unfollow
    } else if(!loggedInUserSameAsCurrentProfile && isFollowing) {
      if(followButtonLoading) {
        return (
          <button className="form-login-btn follow-btn following" disabled><Loading/></button>
        )
      }
        return (
          <button className="form-login-btn follow-btn following" onClick={unFollowBtnLogic}>Following</button>
        )
    }
  }



  return (
    <Wrapper>
      { isErrorModalOpen ? <ErrorModal/> : "" }
      {isCreatePostModalOpen ? <CreatePost/> : "" }
      <Navbar/>
      <section className="profile">
        <div className="profile__inner">
          <div className="profile__profile">
            <div className="profile-img-container">
              <img className="profile__profile-img" src={currentUser?.profile_image ? currentUser?.profile_image : defaultImage} alt={`${currentUser?.username} profile`}/>
            </div>
            <div className="profile__content">
              <header className="content__header">
                <h2 className="header__username">{currentUser?.username ? currentUser?.username : ""}</h2>
                {followAndUnFollowButtonEl()}
              </header>
              <div className="profile__content__info">
                <p className="content__info__item info__posts"><span>{currentUser?.posts?.length ? currentUser?.posts?.length : 0}</span> posts</p>
                <p className="content__info__item info__followers"><span>{followerCount}</span> follower{followerCount === 1 ? "" : "s"}</p>
                <p className="content__info__item info__following"><span>{followingCount}</span> following</p>
              </div>
            </div>
          </div>

          <ul className="profile__posts">
            {profilePostsData?.length >= 1 ? (
              profilePostsData.map((post, index) => {
                // const {userImage:{src:image}, description, postId} = JSON.parse(post);
                const {userImage:{src:image}, description, postId} = post;
                return (
                  <li className="posts__post" key={index}>
                    <Link className="posts__post__link" to={`/p/${postId}`}>
                      <img className="posts__post__img" src={image} alt={description}/>
                    </Link>
                  </li>
                )
              })
            ) : <p>No Posts yet</p>}
          </ul>
        </div>
      </section>
    </Wrapper>
  )
};

export default Profile;


const Wrapper = styled.div`
    width:100vw;

    .profile {
      display:grid;
      grid-template-columns:0.75fr 1fr 0.75fr;
      justify-content:center;
      align-items:center;
      padding:1rem 0;
    }

    .profile__inner {
      grid-column-start: 2;
      grid-column-end: 3;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
    }

    .profile__content {
      margin-left:5rem;
    }

    .profile__profile {
      display:flex;
      flex-direction:row;
      justify-content:center;
      align-items:center;
    }

    .profile-img-container {
      width:150px;
      height:150px;
      border-radius:100px;
    }

    .profile__profile-img {
      width:100%;
      height:100%;
      border-radius:inherit;
      object-fit:cover;
    }

    .content__header {
      display:flex;
      justify-content:flex-start;
      align-items:center;
    }

    .follow-btn {
      background:var(--login-btn-bg-validated);
      padding:0.5rem 1.25rem;
      font-weight:600;
      border:none;
      margin:0 1rem;
      cursor:pointer;
    }

    .follow-btn [disabled] {
      background:var(--login-btn-bg)
    }

    .following {
      background:none;
      color:#000;
      font-weight:600;
      border:1px solid var(--gray-db);
    }

    .following[disabled] {
      opacity:0.5;
    }

    .edit-profile-btn {
      background:none;
      color:#000;
      font-weight:600;
      border:1px solid var(--gray-db);
      padding:0.5rem 0.75rem;
      cursor:pointer;
    }

    .profile__content__info {
      display:flex;
      flex-direction:row;
      justify-content:flex-start;
      align-items:center;

      margin:0.5rem 0 1.5rem 0;
    }

    .info__followers {
      margin:0 1.5rem;
    }

    .profile__content__info span {
      font-weight:600;
    }

    .profile__posts {
      margin-top:2rem;
      display:flex;
      flex-direction:row;
      flex-wrap:wrap;
      justify-content:flex-start;
      align-items:center;
      padding: 0 4px;
    }

    .posts__post {
      width:250px;
      height:250px;
      padding:0.5rem;
    }

    .posts__post__link {
      width:100%;
      height:100%;
      transition:filter 0.25s ease;
    }

    .posts__post__link:hover {
      filter:saturate(0.8);
    }

    .posts__post__img {
      width: 100%;
      height:100%;
      object-fit:cover;
    }






    @media (max-width: 1800px) {
      .profile__profile {
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
      }

      .profile__content {
        margin-left:0rem;
      } 

      .profile-img-container {
        width:150px;
        height:150px;
        border-radius:100px;
        margin:1rem 0;
      }

      .content__header {
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:center;
        margin:0.75rem;
      }

      .header__username {
        margin-bottom:0.1rem;
      }

      .profile__content__info {
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        align-items:center;
      }

      .content__info__item {
        margin:0.1rem 0;
      }

      .profile__posts {
        justify-content:center;
        align-items:center;
      }
    }  

`