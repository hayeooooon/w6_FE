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
export const getUserInfoAxios = () => {
  return async (dispatch) => {
    await apis.getUserInfo().then(
      res => {
        const user_info = res.data;
        console.log(user_info)
        dispatch(signIn(user_info));
      }
    )
  }
}
export const signInAxios = (user_info) => {
  return async (dispatch) => {
    await apis.signIn(user_info).then(
      res => {
        console.log(res) // data.id저장, headers.authorization
        localStorage.setItem('token', res.headers.authorization); // token 저장
        const userId = res.data.id; // db 연결 후 : userId
        dispatch(signIn({...user_info, userId: userId}));
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
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
    apis.signUp(user_info).then(
      async res => {
        console.log(res)
        // await dispatch(signUp(user_info)); 회원 목록 저장할 필요가 없는 듯..?
        // history.push('/');
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
  }
}
export const loadMypageAxios = () => {
  return async (dispatch) => {
    await apis.mypage().then(
      res => {
        console.log(res);
        dispatch(loadMypage(res.data))
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
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