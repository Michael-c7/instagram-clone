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

import { collection, getDocs } from "firebase/firestore"; 

import { AppAuth, db } from "../Auth/firebase"
import { ActionCodeOperation } from 'firebase/auth';

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

  if(action.type === TOGGLE_NAVIGATION_ICON_HOME_VALUE) {
    return {...state, navigationIconHome:action.payload}
  }

  if(action.type === TOGGLE_NAVIGATION_ICON_EXPLORE_VALUE) {
    return {...state, navigationIconExplore:action.payload}
  }

  if(action.type === "GET_LOGGED_IN_UID") {
    return {...state, loggedInUid:action.payload}
  }

  

  if(action.type === "CHECK_CURRENT_USER") {
    if(action.payload === state.loggedInUid) {
      return {...state, loggedInUserSameAsCurrentProfile:true}
    }
      return {...state, loggedInUserSameAsCurrentProfile:false}
  }


  if(action.type === "GET_LOGGED_IN_USER_DATA") {
    let data = state.usersData.filter(user => user.uid === state.loggedInUid)[0]
    return {...state, loggedInUserData:data}
  }


  if(action.type === FOLLOW_USER) {
    return {...state, isFollowingTest:true}
  }

  if(action.type === UNFOLLOW_USER) {
    return {...state, isFollowingTest:false}
  }

  if(action.type === FOLLOW_BUTTON_LOADING_START) {
    return {...state, followButtonLoading:true}
  }

  if(action.type === FOLLOW_BUTTON_LOADING_STOP) {
    return {...state, followButtonLoading:false}
  }

  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default post_reducer
