import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:8080",
});

// instance.interceptors.request.use((req)=>{
//     if(localStorage.getItem("profile")){
//         req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
//     }
//     return req;
// })

// export const fetchPosts = (page) => instance.get(`/posts?page=${page}`);
// export const createPost = (newPost) => instance.post('/posts', newPost);
// export const getPost = id => instance.get(`posts/${id}`);
// export const updatePost = (id, post) => instance.patch(`/posts/${id}`, post);
// export const deletePost = id => instance.delete(`/posts/${id}`);
// export const comment = (value, id) => instance.post(`/posts/${id}/commentPost`, {value});
// export const likePost = id => instance.patch(`/posts/${id}/like`);
// export const fetchPostsFromQuery = query => instance.get(`/posts/search?searchQuery=${query.search || 'none'}&tags=${query.tags}`);
//
// export const signIn = (formData) => instance.post(`/users/login`, formData);
export const signUp = (formData) => instance.post(`/accounts/signup`, formData);