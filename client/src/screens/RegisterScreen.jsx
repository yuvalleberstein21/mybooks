import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../Redux/Actions/UserAction';
import Message from '../components/LoadingError/Error';
import Loading from '../components/LoadingError/Loading';

const RegisterScreen = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userRegister = useSelector((state) => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate('/createBook')
        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(username, password));
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className='h2 mt-3'>REGISTER</h2>
                    <div className="card my-3">
                        {error && <Message variant="alert-danger">{error}</Message>}
                        {loading && <Loading />}
                        <form className="card-body cardbody-color" onSubmit={submitHandler}>
                            <div className="text-center">
                                <img src="https://png.pngtree.com/png-clipart/20220510/original/pngtree-stack-of-school-books-png-image_7693764.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                    width="200px" alt="profile" />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="User Name" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100">SIGN UP</button></div>
                            <div id="emailHelp" className="form-text text-center mb-5 text-dark">Have an
                                Account? <Link to="/" className="text-dark fw-bold"> Login
                                    Here</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen;