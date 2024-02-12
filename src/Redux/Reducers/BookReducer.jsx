import { BOOK_CREATE_FAIL, BOOK_CREATE_REQUEST, BOOK_CREATE_SUCCESS, BOOK_DELETE_FAIL, BOOK_DELETE_REQUEST, BOOK_DELETE_SUCCESS, BOOK_LIST_MY_FAIL, BOOK_LIST_MY_REQUEST, BOOK_LIST_MY_SUCCESS } from "../Constant/BookConsntent";


export const booksCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case BOOK_CREATE_REQUEST:
            return { loading: true };
        case BOOK_CREATE_SUCCESS:
            return { loading: false, success: true, books: action.payload };
        case BOOK_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

// USER BOOKS
export const booksListMyReducer = (state = { books: [] }, action) => {
    switch (action.type) {
        case BOOK_LIST_MY_REQUEST:
            return { loading: true };
        case BOOK_LIST_MY_SUCCESS:
            return { loading: false, books: action.payload };
        case BOOK_LIST_MY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}


export const deleteBookReducer = (state = { book: {} }, action) => {
    switch (action.type) {
        case BOOK_DELETE_REQUEST:
            return { loading: true };
        case BOOK_DELETE_SUCCESS:
            return { loading: false, success: true, book: {} };
        case BOOK_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}
