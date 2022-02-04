import {
  CREATE_POST_MODAL_OPEN,
  CREATE_POST_MODAL_CLOSE,
} from '../actions'

const post_reducer = (state, action) => {
  if(action.type === CREATE_POST_MODAL_OPEN) {
    return {...state, isCreatePostModalOpen:true}
  }

  if(action.type === CREATE_POST_MODAL_CLOSE) {
    return {...state, isCreatePostModalOpen:false}
  }
  

  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default post_reducer
