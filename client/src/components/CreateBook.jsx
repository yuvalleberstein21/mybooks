import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonLink from './ButtonLink';
import { useDispatch, useSelector } from 'react-redux';
import { createBooks } from '../Redux/Actions/BookActions';
import Message from './LoadingError/Error';
import { useNavigate } from 'react-router-dom';
import Loading from './LoadingError/Loading';

const CreateBook = () => {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [sammary, setSammary] = useState('');
    const [genre, setGenre] = useState('');
    const [starRating, setStarRating] = useState(0);
    const [spiciness, setSpiciness] = useState('');
    const [imageUrl, setImageURL] = useState('');


    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const booksCreate = useSelector((state) => state.booksCreate);
    const { book, loading, error } = booksCreate;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
    }, []);

    const toastObj = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }


    const handleStarClick = (value) => {
        setStarRating(value);
    };

    const createBook = (e) => {
        e.preventDefault();

        const bookObj = {
            bookName,
            author,
            sammary,
            genre,
            starRating,
            spiciness,
            imageUrl
        }

        dispatch(createBooks({
            bookName: bookObj.bookName,
            author: bookObj.author,
            summary: bookObj.sammary,
            genre: bookObj.genre,
            starRating: bookObj.starRating,
            spiciness: bookObj.spiciness,
            image_url: bookObj.imageUrl
        }))
        toast.success('book created successfully', toastObj)
    }

    return (
        <>
            <ToastContainer />
            <h3 className='mt-5'>CREATE BOOK</h3>
            <ButtonLink to={'/mybooks'} buttonText="My Saved Books →"></ButtonLink>
            <div className='createBook'>
                {
                    loading ? (
                        <Loading />
                    ) : error ? (
                        <Message variant="alert-danger">{error}</Message>
                    ) : (
                        <form onSubmit={createBook}>
                            <div className="form-group">
                                <label>Book name</label>
                                <input type="text" className="form-control" value={bookName} onChange={(e) => setBookName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Author</label>
                                <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Summary</label>
                                <textarea type="text" className="form-control" value={sammary} onChange={(e) => setSammary(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Genre</label>
                                <select value={genre} className="form-control" onChange={(e) => setGenre(e.target.value)} required>
                                    <option >Choose genre</option>
                                    <option value="mystery">Mystery</option>
                                    <option value="fantasy">Fantasy</option>
                                    <option value="romance">Romance</option>
                                    <option value="thriller">Thriller</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Rating</label>
                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map(value => (
                                        <span
                                            key={value}
                                            className={`star ${value <= starRating ? 'active' : ''}`}
                                            onClick={() => handleStarClick(value)}
                                        >
                                            &#9733;
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Spiciness</label>
                                <select value={spiciness} className="form-control" onChange={(e) => setSpiciness(e.target.value)} required>
                                    <option>Choose spicy</option>
                                    <option value="NotSpicy">Not Spicy🌶️</option>
                                    <option value="Mild">Mild🌶️🌶️</option>
                                    <option value="Medium">Medium🌶️🌶️🌶️</option>
                                    <option value="Hot">Hot🌶️🌶️🌶️🌶️</option>
                                    <option value="ExtraHot">Extra Hot🌶️🌶️🌶️🌶️🌶️</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>File input</label>
                                <input type="text" className='form-control' id="imageURL" value={imageUrl} onChange={(e) => setImageURL(e.target.value)} placeholder='https://www.image.png' required />
                            </div>
                            <button>Save</button>
                        </form>
                    )
                }
            </div>
        </>
    )

}

export default CreateBook;