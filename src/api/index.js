import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:5001',
	headers: {
		'content-type': 'application/json;charset=UTF-8',
		accept: 'application/json,',
	},
});

export const apis = {
	// user
	signUp: (data) => api.post('/user_list', data),
	signIn: (data) => api.post('/user', data),
	userInfo: () => api.post('/user/auth'),
	signOut: () => api.post('/user/logout'),
	mypage: () => api.get('/mypage'),


	// post
	postList: () => api.get('/postList'),
	postdetail: (post_id) => api.get('/postdetail', post_id),
	rankingList: () => api.get('/ranking'),
	updatePost: (postId) => api.put(`/api/post/${postId}`),

	// file
	


	






	// article
	// add: (contents) => api.post('/api/articles', contents),
	// edit: (id, contents) => api.put(`api/articles/${id}`, contents),
	// del: (id) => api.delete(`api/articles/${id}`),
	// articles: () => api.get('/api/articles'),
	// article: (id) => api.get(`/api/articles/${id}`),
	// search: (value) => api.get(`/api/articles/search?query=${value}`),

	// // comment
	// addComment: (id, content) =>
	// 	api.post(`/api/articles/${id}/comments`, { content }),
	// comments: (id) => api.get(`/api/articles/${id}/comments`),
	// delComment: (id, coId) => api.delete(`/api/articles/${id}/comments/${coId}`),
	// editComment: (id, coId, content) =>
	// 	api.put(`/api/articles/${id}/comments/${coId}`, { content }),

	
};

