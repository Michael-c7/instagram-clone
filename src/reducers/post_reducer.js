import {
  CREATE_POST_MODAL_OPEN,
  CREATE_POST_MODAL_CLOSE,
  GET_USERS_DATA,
  GET_CURRENT_USER_DATA,
  TOGGLE_PROFILE_DROPDOWN,
} from '../actions'

import { collection, getDocs } from "firebase/firestore"; 

import { AppAuth, db } from "../Auth/firebase"

const post_reducer = (state, action) => {
  if(action.type === CREATE_POST_MODAL_OPEN) {
    document.querySelector("body").style.overflow = "hidden";
    document.querySelector("body").style.position = "fixed";
    return {...state,navigationIconHome:false ,isCreatePostModalOpen:true, showProfileDropdown:false}
  }

  if(action.type === CREATE_POST_MODAL_CLOSE) {
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("body").style.position = "static";
    return {...state,navigationIconHome:true, isCreatePostModalOpen:false}
  }
  

  if(action.type === GET_USERS_DATA) {
    return {...state, usersData: action.payload}
  }

  if(action.type === GET_CURRENT_USER_DATA) {
    return {...state, currentUserData: action.payload}
  }


  if(action.type === TOGGLE_PROFILE_DROPDOWN) {
    if(state.showProfileDropdown) {
      return {...state, showProfileDropdown:false}
    } else {
      return {...state, showProfileDropdown:true}
    }
  }


  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default post_reducer
