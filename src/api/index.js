import axios from 'axios';

const api = axios.create({
	baseURL: 'http://3.35.230.132',
});
api.defaults.headers.common['Authorization'] = localStorage.getItem('token');


export const apis = {
	// user
	signUp: (data) => api.post('/user/signup', data),
	signIn: (data) => api.post('/user/login', data),
	userInfo: () => api.post('/api/auth'),
	signOut: () => api.post('/user/logout'),
	mypage: () => api.get('/api/mypage'),


	// post
	postList: () => api.get('/api/postList'),	
	postdetail: (post_id) => api.get(`/api/postdetail/${post_id}`),
	rankingList: () => api.get('/api/ranking'),
	updatePost: (postId) => api.put(`/api/post/${postId}`),
	createPost: (post_data, config) => api.post('/api/post', post_data, config),
	deletePost: (postId) => api.delete(`/api/post/${postId}`)



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

