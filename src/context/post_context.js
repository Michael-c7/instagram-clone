import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/post_reducer'
import { collection, getDocs } from "firebase/firestore"; 

import { AppAuth, db } from "../Auth/firebase"
// import { products_url as url } from '../utils/constants'


import {
  CREATE_POST_MODAL_OPEN,
  CREATE_POST_MODAL_CLOSE,
  GET_USERS_DATA,
  GET_CURRENT_USER_DATA,
} from '../actions'

const initialState = {
  isCreatePostModalOpen:false,
  usersData:[],
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

  const getUsersData = _ => {
    dispatch({ type: GET_USERS_DATA})

  }

  const getCurrentUserData = uid => {
    dispatch({ type: GET_CURRENT_USER_DATA, payload:uid})
  }

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

  useEffect(() => {
    console.log(initialState.usersData)
  }, [initialState.usersData])


  return (
    <PostContext.Provider value={
      { ...state,
        openCreatePostModal,
        closeCreatePostModal,
        getUsersData,
      }}>
      {children}
    </PostContext.Provider>
  )
}
// make sure use
export const usePostContext = () => {
  return useContext(PostContext)
}
