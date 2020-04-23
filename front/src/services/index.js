import { get, post, del, put } from 'utils/fetch';

export const register = data => post('/api/user/register', data);

export const autoLogin = data => get('/api/user/login', data);

export const login = data => post('/api/user/login', data);

export const getUsers = data => get('/api/users', data);

export const deleteUser = ({ _id, ...restData }) => del(`/api/users/${_id}`, restData);

export const getGoods = data => get('/api/goods', data);

export const getGoodByID = ({ _id, ...restData }) => get(`/api/goods/${_id}`, restData);

export const addGoods = data => post('/api/goods', data);

export const updateGoods = ({ _id, ...restData }) => put(`/api/goods/${_id}`, restData);

export const getFavorite = data => get('/api/favorite', data);

export const addFavorite = data => post('/api/favorite', data);

export const deleteFavorite = ({ _id, ...restData }) => del(`/api/favorite/${_id}`, restData);

export const updateFavorite = data => put(`/api/favorite`, data);

export const getCommentList = data => get('/api/comment', data);

export const addComment = data => post('/api/comment', data);

export const updateComment = ({ _id, ...restData }) => put(`/api/comment/${_id}`, restData);

export const delComment = ({ _id, ...restData }) => del(`/api/comment/${_id}`, restData);
