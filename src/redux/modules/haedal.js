import axios from "axios";

//Action Type
const  CREATE = "haedal/CREATE";
const  LOAD = "haedal/LOAD";
const  LOADCONTENT = "haedal/LOADCONTENT";
//const  LOADPOINT = "haedal/LOADPOINT"
const  DELETE = "haedal/DELETE";
const  UPDATE = "haedal/UPDATE";

const initialState = {
    list: [
        {happypoint : "1",  id: "0", nickname:"멍멍이", img : "", content : "하하하"},
        {happypoint : "2",  id: "1", nickname:"삐약",img : "", content : "하하gg하"}
], post : [] };

//Action creator
//todo: 게시글등록 업로드
export const createHappy = (data) => {  
    return {type: CREATE, data};
};

export const loadContent = (postid) => {
    return {type: LOADCONTENT, postid}
}

export const loadHaedal = (data) => {
    return{type: LOAD, data}
};



// Thunk function
// todo: 게시물 서버연결
// export const loadContents = 
//     () => 
//         (dispatch, getState) => {
//             try {
//             }catch{}
//         };



//Reducer
export default function reducer(state = initialState, action ={}) {
switch(action.type) {
    //todo: text 업로드
    case "haedal/CREATE": {
        const new_content= [...state.list, action.data]
        return {list: new_content, post:[]};
}
    //todo: postid 저장
    case "haedal/LOADCONTENT": {
        const _post = state.list.filter((v)=> {
           
            return v.id === action.postid
        })
        
        return {list: state.list, post: _post}
    }
        default: return state;
    }
}