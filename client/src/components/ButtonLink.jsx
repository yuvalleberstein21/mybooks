import React from 'react'
import { Link } from 'react-router-dom';

const ButtonLink = ({ to, buttonText }) => {
    return (
        <Link to={to}>
            <button className='saveBooksBtn'>{buttonText}</button>
        </Link>
    )
}

export default ButtonLink;