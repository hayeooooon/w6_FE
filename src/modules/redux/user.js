// user.js
import { apis } from '../../api/index';

// action
const SIGNIN = 'user/SIGNIN';
const SIGNOUT = 'user/SIGNOUT';
const SIGNUP = 'user/SIGNUP';
const MYPAGE = 'user/MYPAGE';
const IN_ERROR = 'signin/ERROR';

// initial state 
const initialState = {
  user: [],
  mypage: [],
  error: undefined,
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
export const setError = (code) => {
  return {type: IN_ERROR, code}
}

// middlewares
export const getUserInfoAxios = () => {
  return async (dispatch) => {
    await apis.getUserInfo().then(
      res => {
        const user_info = res.data;
        dispatch(signIn(user_info));
      }
    )
  }
}
export const signInAxios = (user_info) => {
  return async (dispatch) => {
    await apis.signIn(user_info).then(
      res => {
        const userNickname = res.data.nickname; 
        const userId = res.data.userId; 
        localStorage.setItem('token', res.headers.authorization); // token 저장
        localStorage.setItem("nickname", JSON.stringify(userNickname));
        localStorage.setItem("userId", JSON.stringify(userId));
        dispatch(signIn({nickname: userNickname, userId: userId}));
      }
    ).catch(
      err => {
        // console.log(err);
        if(err.response.status === 400){
          window.alert('아이디와 비밀번호가 일치하지 않습니다.');
        }
        if(err.response.status === 500){
          window.alert('존재하지 않는 아이디입니다.');
        }
      }
    )
  }
}
export const signOutAxios = () => {
  return async (dispatch) => {
    localStorage.clear();
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
        window.location.href = '/signin';
      }
    ).catch(
      err => {
        console.log(err);
        if(err.response.status === 400){
          window.alert(err.response.data);
        }
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
    case 'signin/ERROR': {
      console.log(action.code, action, '??AS?FAS?F')
      return {user: state.user, mypage: state.mypage, error: action.code}
    }
    default: {
      return state;
    }
  }
}  