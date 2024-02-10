import React, { useEffect, useState } from 'react'
import ButtonLink from './ButtonLink';

const MySavedBooks = () => {

    const [booksArr, setBooks] = useState([]);


    const deleteBook = (index) => {
        const updatedBooksArr = booksArr.filter((book, i) => i !== index);
        setBooks(updatedBooksArr);
        localStorage.setItem('books', JSON.stringify(updatedBooksArr));

    }

    useEffect(() => {
        const getBooks = async () => {
            const books = await localStorage.getItem('books');
            const parseBooks = JSON.parse(books);
            setBooks(parseBooks);
        }
        getBooks();
    }, []);


    return (
        <>
            <div className="container">
                <ButtonLink to={'/'} buttonText="← Create A Book"></ButtonLink>
                <h1 className='mt-5'>A List of Books</h1>
                <div className='row'>

                    {booksArr !== null && booksArr.map((book, index) => (
                        <div className="col-md-4 mt-5" key={index}>
                            <div className="flip-card">

                                <div className="flip-card-inner">
                                    <div className="flip-card-front">

                                        <img src={book.imageUrl} alt={book.bookName} width="300px" height="400px" />
                                    </div>
                                    <div className="flip-card-back">
                                        <span onClick={() => deleteBook(index)} className='deleteBook'>❌</span>
                                        <h4>{book.bookName}</h4>
                                        <p><span className='author'>Author :</span> {book.author}</p>
                                        <p><span className='author'>Genre :</span> {book.genre}</p>
                                        <p className='summary p-1'>{book.sammary}</p>
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
                    ))}
                </div>
            </div>

        </>
    )
}

export default MySavedBooks;