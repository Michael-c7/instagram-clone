import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import CreatePost from '../components/createPost';
import { usePostContext } from "../context/post_context"
import Navbar from "../components/Navbar"
import { useParams, Link } from 'react-router-dom'
import Loading from '../components/LoadingText';

const Profile = () => {
  const {
    isCreatePostModalOpen,
    getCurrentUserData,
    currentUserData,
    usersData,
    getUsersData,
    toggleNavigationIconHome,
    toggleNavigationIconExplore,
    loggedInUserSameAsCurrentProfile,
    checkCurrentUser,
    getLoggedInUserData,
    loggedInUserData,
    loggedInUid,
    checkIfFollowing,
    isFollowing,
    followUser,
    unFollowUser,
    followButtonLoading,
    currentProfileFollowers,
    currentProfileFollowing,
  } = usePostContext()
  
  const [currentUser, setCurrentUser] = useState({})
  const [followerCount, setFollowerCount] = useState(null)
  const [followingCount, setFollowingCount] = useState(null)


  const { id:uidFromUrl } = useParams()

  const getSpecificUser = (userUid, userData) => {
    let user = userData.filter(user => user.uid === userUid)
    return user[0]
  }

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
  }, [currentUser])


  useEffect(() => {
    // used to check if the logged in user is following the current profile user
    checkIfFollowing(currentUser, getSpecificUser(loggedInUid, usersData))
    // console.log(isFollowing)

  

      setFollowerCount(currentUser?.followers?.length)
      setFollowingCount(currentUser?.following?.length)


      // console.log(
      //   followerCount,
      //   followingCount)
  }, [currentUser])



  // useEffect(() => {
  //   setCurrentFollowerCount(currentUser?.followers?.length)
  //   setCurrentFollowingCount(currentUser?.following?.length)
  // }, [isFollowing])


  // useEffect(() => {
  //   checkIfFollowing(currentUser, getSpecificUser(loggedInUid, usersData))
  // }, [currentUser, isFollowing, loggedInUserSameAsCurrentProfile])



  /*
  fix

  get create-a-post-working
  - styles for navbar / get current user to navbar so profiles tab can route to correct place
  - clicking on many search results / search result styles
  - get followers / following
  */


  const followBtnLogic = _ => {
    followUser(currentUser, getSpecificUser(loggedInUid, usersData));
    if(followerCount <= 0) {
      setFollowerCount((prevCount) => prevCount = 0)
    } 
    
    setFollowerCount((prevCount) => prevCount + 1)
  }

  const unFollowBtnLogic = _ => {
    unFollowUser(currentUser, getSpecificUser(loggedInUid, usersData));
    if(followerCount < 0) {
      setFollowerCount((prevCount) => prevCount = 0)
    } 
    
    setFollowerCount((prevCount) => prevCount - 1)
  }

  const followAndUnFollowButton = _ => {
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

  const unFollowBtn = _ => {

  }



  return (
    <Wrapper>
      {isCreatePostModalOpen ? <CreatePost/> : ""}
      <Navbar/>
      <section className="profile">
        <div className="profile__inner">
          <div className="profile__profile">
            <div className="profile-img-container">
              <img className="profile__profile-img" src={currentUser?.profile_image ? currentUser?.profile_image : "https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1259&q=80"} alt={`${currentUser?.username} profile`}/>
            </div>

            <div className="profile__content">
              <header className="content__header">
                <h2 className="header__username">{currentUser?.username ? currentUser?.username : ""}</h2>
                {/*Follow button*/}
                  {/* {!loggedInUserSameAsCurrentProfile && !isFollowing ? <button disabled className="form-login-btn follow-btn" onClick={followBtnLogic}>{followButtonLoading ? <Loading/> : "Follow"}</button> : ""} */}
                {/*Following button / unfollow button*/}
                  {/* {!loggedInUserSameAsCurrentProfile && isFollowing ? <button  className="form-login-btn follow-btn following" onClick={unFollowBtnLogic}>{followButtonLoading ? <Loading/> : "Following"}</button> : ""} */}
                {followAndUnFollowButton()}
              </header>
              <div className="profile__content__info">
                <p className="content__info__item info__posts"><span>{currentUser?.posts?.length ? currentUser?.posts?.length : 0}</span> posts</p>
                <p className="content__info__item info__followers"><span>{followerCount}</span> follower{followerCount === 1 ? "" : "s"}</p>
                <p className="content__info__item info__following"><span>{followingCount}</span> following</p>
              </div>
            </div>
          </div>

          <ul className="profile__posts">
            {currentUser?.posts?.length >= 1 ? (
              currentUser?.posts.map((post, index) => {
                const {userImage:{src:image}, description} = JSON.parse(post)
                // console.log(JSON.parse(post))
                return (
                  <li className="posts__post" key={index}>
                    <Link className="posts__post__link" to={`/p/${index}`}>
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
      filter:grayscale(0.5);
    }

    .posts__post__img {
      width: 100%;
      height:100%;
      object-fit:cover;
    }
  
`