import {
  CREATE_POST_MODAL_OPEN,
  CREATE_POST_MODAL_CLOSE,
  GET_USERS_DATA,
  GET_CURRENT_USER_DATA,
} from '../actions'

import { collection, getDocs } from "firebase/firestore"; 

import { AppAuth, db } from "../Auth/firebase"

const post_reducer = (state, action) => {
  if(action.type === CREATE_POST_MODAL_OPEN) {
    return {...state, isCreatePostModalOpen:true}
  }

  if(action.type === CREATE_POST_MODAL_CLOSE) {
    return {...state, isCreatePostModalOpen:false}
  }
  

  if(action.type === GET_USERS_DATA) {
    // getting the user info from the database
    let data = getDocs(collection(db, "users")).then((item) => {
      return item.docs.map((thing) => {
        let currentInfo = thing["_document"].data.value.mapValue.fields;
        return {
          email:currentInfo.email.stringValue,            
          username:currentInfo.username.stringValue,             
          uid:currentInfo.uid.stringValue,
        }
      })
    })

    // data.then((arr) => {
    //   return {...state, usersData:arr}
    // })

    return {...state, usersData:["cat", "dog"]}
  }

  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default post_reducer
