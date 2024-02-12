import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer } from './Reducers/UserReducer';
import { booksCreateReducer, booksListMyReducer, deleteBookReducer } from './Reducers/BookReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userRegister: userRegisterReducer,
    booksCreate: booksCreateReducer,
    booksList: booksListMyReducer,
    deleteBook: deleteBookReducer
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromLocalStorage },
};

const store = configureStore({
    reducer,
    preloadedState: initialState,
});

export default store;