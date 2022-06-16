import { apis } from "../../api/index";

//Action Type
const CREATE = "haedal/CREATE";
const LOAD = "haedal/LOAD";
const LOADCONTENT = "haedal/LOADCONTENT";
const DELETECONTENT = "haedal/DELETE";
const LOAD_LIST = "haedal/LOAD_LIST";
const LOAD_SINGLE = "haedal/LOAD_SINGLE";

//comment
const CREATE_COMMENT = "comment/CREATE";
const DELETE_COMMENT = "comment/DELETE";
const UPDATE_COMMENT = "comment/UPDATE";


const initialState = {
	list: [
		{
			happypoint: "1",
			id: "0",
			nickname: "멍멍이",
			img: "",
			content: "하하하",
		},
		{
			happypoint: "2",
			id: "1",
			nickname: "삐약",
			img: "",
			content: "하하gg하",
		},
	],
	post: [],
};

//Action creator
//todo: 게시글등록 업로드
export const createHappy = (data) => {
	return { type: CREATE, data };
};

export const loadContent = (postid) => {
	return { type: LOADCONTENT, postid };
};

export const loadHaedal = (data) => {
	return { type: LOAD, data };
};

export const loadPostsList = (posts) => {
	return { type: LOAD_LIST, posts };
};

export const loadPost = (post_data) => {
	return { type: LOAD_SINGLE, post_data}
}

//todo: 게시물삭제(액션생성함수)*****
export const deletePosts = (delete_data) => {
	return { type : DELETECONTENT, delete_data}
}

export const createComment = (new_comment) => {
	return {type: CREATE_COMMENT, new_comment};
}

export const deleteComment = (new_comments) => {
	return {type: DELETE_COMMENT, new_comments}
}

export const updateComment = (new_comments) => {
	return {type: UPDATE_COMMENT, new_comments}
}


// Middlewares
export const loadPostsListAxios = () => { // 전체 게시글 리스트 불러오기
	return async (dispatch) => {
		await apis.postList().then((res) => {
				console.log(res, 'main page posts list response')
				const post_list = res.data;
				dispatch(loadPostsList(post_list));
			})
			.catch((err) => {
				console.error(err, 'main page posts list error');
			});
	};
};

export const loadPostAxios = (post_id) => { // 조회할 게시글 불러오기
	return async (dispatch) => {
		await apis.postdetail(post_id).then(
			res => { 
				console.log(res, 'detail page response')
				const post_data = res.data;
				dispatch(loadPost(post_data));
			}
		).catch(
			err => {
				console.log(err, 'detail page error');
			}
		)
	}
}

//todo: 게시글 삭제*****
export const deleteHappyAxios = (post_id) => {
	return async () => {
		let success = false;
		await apis.deletePost(post_id).then(
			res => {
				console.log(res,'삭제 완료');
				success = true;
			}
		).catch(
			err => {
				console.log(err);
			}
		)
		if (success) {
			await window.alert('게시글이 삭제되었습니다.');
			window.location.href = '/';
		}
	}
}
export const createCommentAxios = (post_id, comment) => {
	return async (dispatch, useState) => {
			apis.createComment(post_id, {comment}).then(
					res => {
						console.log(res);
						const new_comment = {comment: comment, commentId: res.data.commentId, nickname: res.data.nickname, userId: res.data.userId, edit: false};
						dispatch(createComment(new_comment));
					}
			).catch(
					err => {
							console.error(err);
					}
			)
	}
}

	export const updateCommentAxios = (comment_id, comment) => {
		return async (dispatch, useState) => {
			apis.updateComment(comment_id, {comment}).then(
				res => {
					console.log(res, 'updated comment res');
					const _comment = useState().haedal.post[0].comments;
					const new_comments = _comment.map(v=>{
						if(v.commentId === comment_id){
							v.comment = comment;
							return v;
						}
						return v;
					});
					dispatch(updateComment(new_comments));
				}
			).catch(
				err => {
					console.error(err, 'updated comment error');
				}
			)
		}
	}

	export const deleteCommentAxios = (comment_id) => {
		console.log(comment_id)
		return async (dispatch, useState) => {
			apis.deleteComment(comment_id).then(
				res => {
					console.log(res);
					const _comment = useState().haedal.post[0].comments;
					const new_comments = _comment.filter(v=>v.commentId !== comment_id);
					dispatch(deleteComment(new_comments));
				}
			).catch(
				err => {
					console.error(err);
				}
			)
		}
	}

	




//Reducer
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		//todo: text 업로드
		case "haedal/CREATE": {
			const new_content = [...state.list, action.data];
			return { list: new_content, post: [] };
		}
		//todo: postid 저장
		case "haedal/LOADCONTENT": {
			const _post = state.list.filter((v) => {
				return v.id === action.postid;
			});

			return { list: state.list, post: _post };
		}
		// 게시글 list 불러오기
		case "haedal/LOAD_LIST": {
			const posts = [...action.posts];
			return { list: posts, post: [] };
		}
		case "haedal/LOAD_SINGLE": {
			const post_data = [action.post_data];
			return { list: state.list, post: post_data};
		}

		// 코멘트 추가
		case "comment/CREATE": {
			console.log(state.post[0])
			const new_comment = action.new_comment;
			const new_comments = [...state.post[0].comments];
			new_comments.push(new_comment);

			const new_post = [{...state.post[0]}];
			new_post[0].comments = new_comments;
			return {list: state.list, post: [{...new_post[0]}]};
		}

		// 코멘트 삭제 반영
		case "comment/DELETE": {
			const new_comments = action.new_comments;
			return {list: state.list, post: [{...state.post[0], comments: new_comments}]};
		}
		
		// 코멘트 업데이트 반영
		case "comment/UPDATE": {
			const new_comments = action.new_comments;
			return {list: state.list, post: [{...state.post[0], comments: new_comments}]};
		}







		default:
			return state;
	}
}

