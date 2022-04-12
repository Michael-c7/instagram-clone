import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/post_reducer'
// import { collection, getDocs } from "firebase/firestore"; 
import { collection, query, where, getDocs, doc, updateDoc  } from "firebase/firestore";
import { AppAuth, db } from "../Auth/firebase"
import { v4 as uuidv4 } from 'uuid';
// import { products_url as url } from '../utils/constants' 
import { deleteDuplicates } from "../utils/helper"
import {
  CREATE_POST_MODAL_OPEN,
  CREATE_POST_MODAL_CLOSE,
  GET_USERS_DATA,
  GET_CURRENT_USER_DATA,
  TOGGLE_PROFILE_DROPDOWN,
  TOGGLE_NAVIGATION_ICON_HOME_VALUE,
  TOGGLE_NAVIGATION_ICON_EXPLORE_VALUE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOW_BUTTON_LOADING_START,
  FOLLOW_BUTTON_LOADING_STOP,
} from '../actions'

import {
  getAuth,
  onAuthStateChanged,

} from "firebase/auth";

let initialState = {
  isCreatePostModalOpen:false,
  isAreYouSureModalOpen:false,
  getLoggedInUserData:[],
  currentUserData:{},
  loggedInUid:"",
  loggedInUserData:{},
  loggedInUserSameAsCurrentProfile:false,
  navigationIconHome:true,
  navigationIconExplore:false,
  showProfileDropdown:false,
  isFollowing:false,
  currentProfileFollowers:0,
  currentProfileFollowing:0,
  followButtonLoading:false,

  isErrorModalOpen:false,
  errorModalMessage:"",
}

const PostContext = React.createContext()

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

// createPost 
  const openCreatePostModal = _ => {
    dispatch({ type:CREATE_POST_MODAL_OPEN})
  }

  const closeCreatePostModal = _ => {
    dispatch({ type: CREATE_POST_MODAL_CLOSE})
  }

  const getUsersData = async _ => {
    try {
      let arr = []
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let data = {...doc.data(), documentId:doc.id}
        arr.push(data)
      });
      dispatch({ type: GET_USERS_DATA,payload:arr})
    } catch (error) {
      console.log(error.message)
      openErrorModal(error.message)
    }
  }


  const getCurrentUserData = async (currentUserUid, usersData) => {
    try {
      let userObj = {}
      usersData.forEach(user => {
        if(user.uid === currentUserUid) {
          userObj = user
        }
      })
      dispatch({ type: GET_CURRENT_USER_DATA, payload:userObj})
    } catch (error) {
      console.log(error.message)
      openErrorModal(error.message)
    }
  }


  const toggleProfileDropdown = _ => {
    dispatch({type:TOGGLE_PROFILE_DROPDOWN})
  }

// used to generate a unique id for the user
  const generateUniqueId = _ => uuidv4();


  const toggleNavigationIconHome = (iconValue) => {
    dispatch({type:TOGGLE_NAVIGATION_ICON_HOME_VALUE, payload:iconValue})
  }

  const toggleNavigationIconExplore = (iconValue) => {
    dispatch({type:TOGGLE_NAVIGATION_ICON_EXPLORE_VALUE, payload:iconValue})
  }


  const  getLoggedInUserData = (loggedInUserUid, userData) => {
    dispatch({type:"GET_LOGGED_IN_USER_DATA", payload:{loggedInUserUid, userData}})
  }


/*check if the logged in user & the profile page
this person is visiting are the same*/
  const checkCurrentUser = currentProfileUid => {
    dispatch({type:"CHECK_CURRENT_USER", payload:currentProfileUid})
  }

/*
- checks if the logged in user is following the current profile,
- args 1 & 2 both strings,
- return a boolean*/
  const checkIfFollowing = (currentProfileUserData, loggedInUserData) => {
    if(loggedInUserData?.uid && loggedInUserData?.following && currentProfileUserData?.uid && currentProfileUserData?.followers) {
      if(currentProfileUserData?.followers.includes(loggedInUserData?.uid) && loggedInUserData?.following.includes(currentProfileUserData?.uid)) {
        dispatch({type:FOLLOW_USER})
      } else {
        dispatch({type:UNFOLLOW_USER})
      }
    }
  }






  const followUser = async (currentProfileUserData, loggedInUserData) => {
    const {
      documentId:currentProfileDocumentId,
      uid:currentProfileUid,
      followers:currentProfileFollowers,
    } = currentProfileUserData;
    const {
      documentId:loggedInProfileDocumentId,
      uid:loggedInProfileUid,
      following:loggedInProfileFollowing,
    } = loggedInUserData;    
    
    dispatch({type:FOLLOW_BUTTON_LOADING_START})

    if(!checkIfFollowing(currentProfileUserData, loggedInUserData)) {

      try {
        //  add the logged in users uid to the current profiles followers array
        const loggedInRef = doc(db, "users", loggedInProfileDocumentId);
        await updateDoc(loggedInRef, {
          following:deleteDuplicates([...loggedInProfileFollowing, currentProfileUid])
        });
  
        //  add the current profiles uid to the logged in users following array
        const currentProfileRef = doc(db, "users", currentProfileDocumentId);
        await updateDoc(currentProfileRef, {
          followers:deleteDuplicates([...currentProfileFollowers, loggedInProfileUid])
        });
  
        dispatch({type:FOLLOW_BUTTON_LOADING_STOP})
      } catch(error) {
        console.log(error.message)
        openErrorModal(error.message)
      }
      dispatch({type:FOLLOW_USER})

    } else {
      // do nothing
      console.log(`
        The logged in user ${loggedInProfileUid} UID
        tried to follow user the current profile user ${currentProfileUid} UID,
        but something went wrong.
        This message gets triggered when the 
        checkIfFollowing function  in the followUser function
        evaluates to false`
      )
    }
  }






  const unFollowUser = async (currentProfileUserData, loggedInUserData) => {
    const {
      documentId:currentProfileDocumentId,
      uid:currentProfileUid,
      followers:currentProfileFollowers,
    } = currentProfileUserData;
    const {
      documentId:loggedInProfileDocumentId,
      uid:loggedInProfileUid,
      following:loggedInProfileFollowing,
    } = loggedInUserData;

    if(!checkIfFollowing(currentProfileUserData, loggedInUserData)) {
      try {
        dispatch({type:FOLLOW_BUTTON_LOADING_START})
  
        //  remove the logged in users uid to the current profiles followers array
        let updatedFollowing = loggedInProfileFollowing?.filter(uid => uid !== currentProfileUid)
        
        const loggedInRef = doc(db, "users", loggedInProfileDocumentId);
        await updateDoc(loggedInRef, {
          following:updatedFollowing
        });
  
        //  remove the current profiles uid to the logged in users following array
        let updatedFollowers = currentProfileFollowers?.filter(uid => uid !== loggedInProfileUid)
        const currentProfileRef = doc(db, "users", currentProfileDocumentId);
        await updateDoc(currentProfileRef, {
          followers:updatedFollowers,
        });
      } catch(error) {
        console.log(error.message)
        openErrorModal(error.message)
      }
  
      dispatch({type:UNFOLLOW_USER})
      dispatch({type:FOLLOW_BUTTON_LOADING_STOP})
    } else {
      // do nothing
      console.log(`
        The logged in user ${loggedInProfileUid} UID
        tried to follow user the current profile user ${currentProfileUid} UID,
        but something went wrong.
        This message gets triggered when the 
        checkIfFollowing function  in the unFollowUser function
        evaluates to true`
      )
    }
  }



  const openAreYouSureModal = _ => {
    dispatch({type:"OPEN_ARE_YOU_SURE_MODAL"})
  }

  const closeAreYouSureModal = _ => {
      dispatch({type:"CLOSE_ARE_YOU_SURE_MODAL"})
  }

  const deletePost = () => {
    console.log("delete post function")
  }


  /**
   * 
   * @param {object} currentPostData 
   * @param {string} loggedInUserUid
   * @returns {boolean} - if the post has been liked by the logged in user or not
   */
  const checkIfPostLiked = (currentPostData, loggedInUserUid) => {
    let currentPostDataIsObject = typeof currentPostData === "object" && currentPostData !== null
    let loggedInUserUidIsString = typeof loggedInUserUid === "string"
    /*
    if the the current logged in user uid is in the current post data liked array 
    then that means the current post has been liked by the current profile
    */
    if(currentPostDataIsObject && loggedInUserUidIsString) {
      const { likes } = currentPostData
      if(likes?.includes(loggedInUserUid)) {
        return true
      } else {
        return false
      }
    }
  }

  const likePost = async (currentProfileUserData, loggedInUserData, postId) => {
    const {
      documentId:currentProfileDocumentId,
      uid:currentProfileUid,
      likes:currentProfileLikes,
    } = currentProfileUserData;
    const {
      documentId:loggedInProfileDocumentId,
      uid:loggedInProfileUid,
    } = loggedInUserData;  

    try {
      /*add the logged in users uid to the likes array of the current post */

      /*
      1. add uid from logged in user to the likes array of this post
      */
      const currentProfileRef = doc(db, "users", currentProfileDocumentId);
      // should be the current profile --> the current post
      await updateDoc(currentProfileRef, {
        likes:deleteDuplicates([...currentProfileLikes, loggedInProfileUid])
      });

    } catch(error) {
      console.log(error.message)
      openErrorModal(error.message)
    }
  }


  /*
  const {
      documentId:currentProfileDocumentId,
      uid:currentProfileUid,
      followers:currentProfileFollowers,
    } = currentProfileUserData;
    const {
      documentId:loggedInProfileDocumentId,
      uid:loggedInProfileUid,
      following:loggedInProfileFollowing,
    } = loggedInUserData;    
    
    dispatch({type:FOLLOW_BUTTON_LOADING_START})

    if(!checkIfFollowing(currentProfileUserData, loggedInUserData)) {

      try {
        //  add the logged in users uid to the current profiles followers array
        const loggedInRef = doc(db, "users", loggedInProfileDocumentId);
        await updateDoc(loggedInRef, {
          following:deleteDuplicates([...loggedInProfileFollowing, currentProfileUid])
        });
  
        //  add the current profiles uid to the logged in users following array
        const currentProfileRef = doc(db, "users", currentProfileDocumentId);
        await updateDoc(currentProfileRef, {
          followers:deleteDuplicates([...currentProfileFollowers, loggedInProfileUid])
        });
  
        dispatch({type:FOLLOW_BUTTON_LOADING_STOP})
      } catch(error) {
        console.log(error.message)
      }
      dispatch({type:FOLLOW_USER})

    } else {
      // do nothing
      console.log(`
        The logged in user ${loggedInProfileUid} UID
        tried to follow user the current profile user ${currentProfileUid} UID,
        but something went wrong.
        This message gets triggered when the 
        checkIfFollowing function  in the followUser function
        evaluates to false`
      )
    }
  */

  const unLikePost = async (currentProfileUserData, loggedInUserData) => {
    console.log("unlike the post")
  }


  /**
   * 
   * @param {string} errorMessage
   */
  const openErrorModal = errorMessage => {
    if(typeof errorMessage === "string") {
      dispatch({type:"OPEN_ERROR_MODAL", payload:errorMessage})
    }
    console.log(new Error(`the argument for the openErrorModal function was ${errorMessage} instead of this you should supply a string`))
  }

  const closeErrorModal = _ => {
    dispatch({type:"CLOSE_ERROR_MODAL"})
  }





  // const meta = async _ => {
  //   const q = query(collection(db, "users"));
  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id)
  //     });
  // }





  useEffect(() => {
    getUsersData()
    // getLoggedInUserData(state.loggedInUid)
  }, [])


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), res => {
      const loggedInUserUid = res.uid;
      dispatch({type:"GET_LOGGED_IN_UID", payload:loggedInUserUid})
    });
    return unsubscribe;    
}, [])



  

  

  // const fetchProducts = async (url) => {
  //   dispatch({ type: GET_PRODUCTS_BEGIN })
  //   try {
  //     const response = await axios.get(url)
  //     const products = response.data
  //     dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
  //   } catch (error) {
  //     dispatch({ type: GET_PRODUCTS_ERROR })
  //   }
  // }


  // useEffect(() => {
  //   fetchProducts(url)
  // }, [])

  

  return (
    <PostContext.Provider value={
      { ...state,
        openCreatePostModal,
        closeCreatePostModal,
        getUsersData,
        getCurrentUserData,
        generateUniqueId,
        toggleProfileDropdown,
        toggleNavigationIconHome,
        toggleNavigationIconExplore,
        checkCurrentUser,
        getLoggedInUserData,
        checkIfFollowing,
        followUser,
        unFollowUser,
        openAreYouSureModal,
        closeAreYouSureModal,
        deletePost,
        checkIfPostLiked,
        openErrorModal,
        closeErrorModal,
      }}>
      {children}
    </PostContext.Provider>
  )
}
// make sure use
export const usePostContext = () => {
  return useContext(PostContext)
}
