// user.js
import { apis } from '../../api/index';

// action
const SIGNIN = 'user/SIGNIN';
const SIGNOUT = 'user/SIGNOUT';
const SIGNUP = 'user/SIGNUP';
const MYPAGE = 'user/MYPAGE';

// initial state 
const initialState = {
  user: [],
  mypage: [],
}

// action creator
export const signIn = (user_info) => {
  return {type: SIGNIN, user_info};
};
export const signOut = () => {
  return {type: SIGNOUT};
}
export const signUp = (user_info) => {
  return {type: SIGNUP, signUp}
}
export const loadMypage = (mypage_data) => {
  return {type: MYPAGE, mypage_data}
}

// middlewares
export const signInAxios = (user_info) => {
  return async (dispatch) => {
    const user = await apis.signIn(user_info);
    const userId = user.data.id; // db 연결 후 : userId
    dispatch(signIn({...user_info, userId: userId}));
  }
}
export const signOutAxios = () => {
  return async (dispatch) => {
    // apis.signOut(); db 연결 후 살리기
    dispatch(signOut());
  }
}
export const signUpAxios = (user_info) => {
  return async (dispatch, useState, { history }) => {
    await apis.signUp(user_info);
    await dispatch(signUp(user_info));
    history.push('/', {replace: true});
  }
}
export const loadMypageAxios = () => {
  return async (dispatch) => {
    const mypageData = await apis.mypage();
    dispatch(loadMypage(mypageData.data[0]))
  }
}

// reducer
export default function reducer(state = initialState, action = {}) {
  switch(action.type){
    case 'user/SIGNIN': {
      const user_info = {...action.user_info};
      return {user: [user_info], mypage: []};
    }
    case 'user/SIGNOUT': {
      return {user: [], mypage: []};
    }
    case 'user/SIGNUP': {
      return state;
    }
    case 'user/MYPAGE': {
      return {user: state.user, mypage: [action.mypage_data]};
    }
    default: {
      return state;
    }
  }
}  