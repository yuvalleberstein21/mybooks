import React, { useEffect, useState } from 'react'
import ButtonLink from './ButtonLink';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookAction, listMyBooks } from '../Redux/Actions/BookActions';
import Message from './LoadingError/Error';
import Loading from './LoadingError/Loading';
import { Link, useNavigate } from 'react-router-dom';

const MySavedBooks = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const booksList = useSelector((state) => state.booksList);
    const { loading, error, books } = booksList;

    const deleteBook = useSelector((state) => state.deleteBook);
    const { loading: loadingDelete, success: deleteSuccess, error: errorDelete } = deleteBook;


    const deleteBookHandler = (id) => {
        dispatch(deleteBookAction(id));
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(listMyBooks(userInfo._id));
        } else {
            navigate('/');
        }
    }, [deleteSuccess]);


    return (
        <>
            <div className="container">
                <ButtonLink to={'/'} buttonText="← Create A Book"></ButtonLink>
                <h1 className='mt-5'>A List of Books</h1>
                <div className='row'>
                    {
                        loading ? (
                            <Loading />
                        ) : error ? (
                            <Message variant="alert-danger">{error}</Message>
                        ) : (
                            books?.map(book => (
                                <div className="col-md-4 mt-5" key={book._id}>
                                    <div className="flip-card">

                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">

                                                <img src={book.image_url} alt={book.bookName} width="300px" height="400px" />
                                            </div>
                                            <div className="flip-card-back">
                                                <span className='deleteBook' onClick={() => deleteBookHandler(book._id)}>❌</span>
                                                <h4>{book.bookName}</h4>
                                                <p><span className='author'>Author :</span> {book.author}</p>
                                                <p><span className='author'>Genre :</span> {book.genre}</p>
                                                <p className='summary p-1'>{book.summary}</p>
                                                <p className='spiciness'>Spicy :
                                                    {
                                                        book.spiciness === 'NotSpicy' ? ' 🌶️' :
                                                            book.spiciness === 'Mild' ? ' 🌶️🌶️' :
                                                                book.spiciness === 'Medium' ? ' 🌶️🌶️🌶️' :
                                                                    book.spiciness === 'Hot' ? ' 🌶️🌶️🌶️🌶️' :
                                                                        book.spiciness === 'ExtraHot' ? ' 🌶️🌶️🌶️🌶️🌶️' :
                                                                            'Unknown Spiciness Level'
                                                    }
                                                </p>
                                                <p className='starRating'>Rank :
                                                    {
                                                        book.starRating === 1 ? ' ⭐️' :
                                                            book.starRating === 2 ? ' ⭐️⭐️' :
                                                                book.starRating === 3 ? ' ⭐️⭐️⭐️' :
                                                                    book.starRating === 4 ? ' ⭐️⭐️⭐️⭐️' :
                                                                        book.starRating === 5 ? ' ⭐️⭐️⭐️⭐️⭐️' :
                                                                            'Unknown Star ranking'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }

                </div>
            </div>

        </>
    )
}

export default MySavedBooks;