import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/post_reducer'
// import { collection, getDocs } from "firebase/firestore"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import { AppAuth, db } from "../Auth/firebase"
import { v4 as uuidv4 } from 'uuid';
// import { products_url as url } from '../utils/constants'

import {
  CREATE_POST_MODAL_OPEN,
  CREATE_POST_MODAL_CLOSE,
  GET_USERS_DATA,
  GET_CURRENT_USER_DATA,
  TOGGLE_PROFILE_DROPDOWN,
  TOGGLE_NAVIGATION_ICON_HOME_VALUE,
  TOGGLE_NAVIGATION_ICON_EXPLORE_VALUE,
} from '../actions'

import {
  getAuth,
  onAuthStateChanged,

} from "firebase/auth";

let initialState = {
  isCreatePostModalOpen:false,
  usersData:[],
  currentUserData:{},
  loggedInUid:"",
  loggedInUserData:{},
  loggedInUserSameAsCurrentProfile:false,
  navigationIconHome:true,
  navigationIconExplore:false,
  showProfileDropdown:false,
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
      console.log(error)
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
      console.log(error)
    }
  }


  const toggleProfileDropdown = _ => {
    dispatch({type:TOGGLE_PROFILE_DROPDOWN})
  }

// used to generate a unique id for the user
  const generateUniqueId = async _ => uuidv4();


  const toggleNavigationIconHome = (iconValue) => {
    dispatch({type:TOGGLE_NAVIGATION_ICON_HOME_VALUE, payload:iconValue})
  }

  const toggleNavigationIconExplore = (iconValue) => {
    dispatch({type:TOGGLE_NAVIGATION_ICON_EXPLORE_VALUE, payload:iconValue})
  }


  const  getLoggedInUserData = _ => {
    dispatch({type:"GET_LOGGED_IN_USER_DATA"})
  }


  const followUser = (currentProfileUid) => {
    // const postsDocRef = doc(db, "users", documentId);

  // await updateDoc(postsDocRef, {
  //   posts:[...currentUserPosts, stringify(post)]
  // });
    console.log("the Follow button")
    dispatch({type:"FOLLOW_USER"})
  }

  const unFollowUser = (currentProfileUid) => {
    console.log("the unFollow button")

    dispatch({type:"UNFOLLOW_USER"})

    

  }

/*check if the logged in user & the profile page
this person is visiting are the same*/
  const checkCurrentUser = currentProfileUid => {
    dispatch({type:"CHECK_CURRENT_USER", payload:currentProfileUid})
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
    getLoggedInUserData()
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
        followUser,
        unFollowUser,
        checkCurrentUser,
        getLoggedInUserData,
      }}>
      {children}
    </PostContext.Provider>
  )
}
// make sure use
export const usePostContext = () => {
  return useContext(PostContext)
}
