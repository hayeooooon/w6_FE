import axios from "axios";
import { apis } from "../../api/index";

//Action Type
const CREATE = "haedal/CREATE";
const LOAD = "haedal/LOAD";
const LOADCONTENT = "haedal/LOADCONTENT";
//const  LOADPOINT = "haedal/LOADPOINT"
const DELETE = "haedal/DELETE";
const UPDATE = "haedal/UPDATE";
const LOAD_LIST = "haedal/LOAD_LIST";
const LOAD_SINGLE = "haedal/LOAD_SINGLE";

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
	post: [
		{
			nickname : "글쓰는 햄토리",
			happypoint : 5,
			img :"",
			content: "힘내자 힘!!",
			userId: 0,
			comments: [
			{
				"commentId": 0,
				"comment": "파이팅!!! 이건 코멘트",
				"nickname": "뿌꾸",
				"userId": 1
			},
			{
				"commentId": 1,
				"comment": "행복합시다 이것도 코멘트",
				"nickname": "덩치",
				"userId": 2
			},
			],
			}


	],
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

// Middlewares
export const loadPostsListAxios = () => { // 전체 게시글 리스트 불러오기
	return async (dispatch) => {
		await apis.postList().then((res) => {
				const post_list = res.data;
				dispatch(loadPostsList(post_list));
				
			})
			.catch((err) => {
				console.error(err);
			});
	};
};

export const loadPostAxios = (post_id) => { // 조회할 게시글 불러오기
	return async (dispatch) => {
		await apis.postdetail(post_id).then(
			res => { 
				const post_data = res.data;
				//console.log(post_data)
				dispatch(loadPost(post_data));
			}
		).catch(
			err => {
				console.log(err);
			}
		)
	}
}

export const createPost = (post_data) => {
	return async () => {
		console.log(post_data)
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}
		await apis.createPost(post_data, config).then(
			res => {
				console.log(res);
			}
		).catch(
			err => {
				console.log(err);
			}
		)
	}
}

export const updateHappyAxios = (post_id) => { // 게시글 수정
	return async () => {
		await apis.updatePost(post_id).then(
			res => {
				console.log(res, '업데이트 완료!');
			}
		).catch(
			err => {
				console.log(err);
			}
		)
	}
}

// Thunk function
// todo: 게시물 서버연결
// export const loadContents =
//     () =>
//         (dispatch, getState) => {
//             try {
//             }catch{}
//         };

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
		default:
			return state;
	}
}

