import { apis } from "../../api/index";


//Action
const CREATE = "comment/CREATE";


const initialState = {
    comments: [],
    comment: []
}

//Action creators
export const createComment = (comment) => {
    return {type: CREATE, comment};
}

//Middlewares
export const createCommentAxios = (post_id, comment) => {
    return async (dispatch) => {
        apis.createComment(post_id, {comment}).then(
            res => {
                apis.postdetail()
                console.log(res);
            }
        ).catch(
            err => {
                console.error(err);
            }
        )
    }
}



//Reducer
export default function reducer(state = initialState, action ={}) {
    switch(action.type) {
        case "comment/CREATE": {

            return state;
        }
  
            default: return state;
        }
    }
