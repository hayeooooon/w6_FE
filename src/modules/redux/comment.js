import React from "react";



//Action
const ADD_COMMENT = "comment/ADD_COMMENT";
const initialState = {list: [{id: "", comment: ""}]}

//Action creators
export const createComment = (data) => {
    //console.log(data)
    return {type: ADD_COMMENT, data};
}
//Middleware



//Reducer
export default function reducer(state = initialState, action ={}) {
    switch(action.type) {
        //todo: 댓글 업로드
        case "comment/ADD_COMMENT": {
            const new_comment= [...state.list, action.data]
            return {...state, list: new_comment};
            
    }
  
            default: return state;
        }
    }
