import axios from "axios";
import { BOOK_CREATE_FAIL, BOOK_CREATE_REQUEST, BOOK_CREATE_SUCCESS, BOOK_DELETE_FAIL, BOOK_DELETE_REQUEST, BOOK_DELETE_SUCCESS, BOOK_LIST_MY_FAIL, BOOK_LIST_MY_REQUEST, BOOK_LIST_MY_SUCCESS } from "../Constant/BookConsntent";


export const createBooks = (book) => async (dispatch, getState) => {
    try {
        dispatch({ type: BOOK_CREATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/books`, book, config);
        dispatch({ type: BOOK_CREATE_SUCCESS, payload: data })

    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            return "Not authorized"
        }

        dispatch({
            type: BOOK_CREATE_FAIL,
            payload: message,
        })
    }
}


export const listMyBooks = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: BOOK_LIST_MY_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/books/${id}`, config);
        dispatch({ type: BOOK_LIST_MY_SUCCESS, payload: data })
    } catch (error) {

        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
            return "Not authorized"
        }

        dispatch({
            type: BOOK_LIST_MY_FAIL,
            payload: message,
        })
    }
}


export const deleteBookAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: BOOK_DELETE_REQUEST });

        const { data } = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/books/${id}`);
        dispatch({ type: BOOK_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: BOOK_DELETE_FAIL,
        })
    }
}