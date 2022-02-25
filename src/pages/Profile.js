import React from 'react';
import styled from "styled-components"
import CreatePost from '../components/createPost';
import { usePostContext } from "../context/post_context"
import Navbar from "../components/Navbar"
import { useParams, Link } from 'react-router-dom'


const Profile = () => {
  const {
    isCreatePostModalOpen,
    getCurrentUserData,
    currentUserData,
    usersData,
    getUsersData,
  } = usePostContext()
  let [isFollowing, setIsFollowing] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({})
  const { id:uidFromUrl } = useParams()

  const getSpecificUser = (userUid, userData) => {
    let user = userData.filter(user => user.uid === userUid)
    return user[0]
  }

  React.useEffect(() => {
    getUsersData()
  }, [])

  React.useEffect(() => {
    setCurrentUser(getSpecificUser(uidFromUrl, usersData))

    console.log(currentUser?.posts?.length)
  }, [usersData])



  return (
    <Wrapper>
      {isCreatePostModalOpen ? <CreatePost/> : ""}
      <Navbar/>
      <section className="profile">
        <div className="profile__inner">
          <div className="profile__profile">
            <div className="profile-img-container">
              <img className="profile__profile-img" src={currentUser?.profile_image} alt={`${currentUser?.username} profile`}/>
            </div>

            <div className="profile__content">
              <header className="content__header">
                <h2 className="header__username">{currentUser?.username}</h2>
                <button className={`form-login-btn follow-btn ${isFollowing ? "following" : ""}`} onClick={() => setIsFollowing(!isFollowing)}>{isFollowing ? "Following" : "Follow"}</button>
                <button className="form-login-btn edit-profile-btn">Edit Profile</button>
              </header>
              <div className="profile__content__info">
                <p className="content__info__item info__posts"><span>123</span> posts</p>
                <p className="content__info__item info__followers"><span>567</span> followers</p>
                <p className="content__info__item info__following"><span>890</span> following</p>
              </div>

              <p className="content__description">
                this text is an example of the text in the description.
              </p>
            </div>
          </div>

          <ul className="profile__posts">
            {currentUser?.posts?.length >= 1 ? (
              currentUser?.posts.map((post, index) => {
                const {userImage:{src:image}, description} = JSON.parse(post)
                console.log(JSON.parse(post))

                return (
                  <li className="posts__post" key={index}>
                    <Link className="posts__post__link" to="/">
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
      background:red;
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

    .following {
      background:none;
      color:#000;
      font-weight:600;
      border:1px solid var(--gray-db);
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