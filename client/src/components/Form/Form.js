import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import loggedInConnect from '../../stores/loggedIn';

const Form = ({ signUp=true, history, dispatchLogIn }) => {
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('Password currently not resettable');
    const [isSignUpForm, setIsSignUpForm] = useState(signUp);

    const isValidEmail = () => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(emailRegex)) {
            setMsg('Invalid Email');
            return false;
        }
        return true;
    }

    const isValidPassword = () => {
        // Use regex in future
        if (!password) {
            setMsg('Invalid Password');
            return false;
        }
        if (password.length < 8) {
            setMsg('Password length must be at least 8 characters long')
            return false;
        }
        return true;
    }

    const clearInput = () => {
        setFName('');
        setLName('');
        setEmail('');
        setPassword('');
        setMsg('');
    }

    const callRegister = async () => {
        try {
            const res = await fetch('/user/register', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: fname,
                    lastName: lname,
                    email,
                    password
                })
            });
            const body = await res.json();
            return body;
        } catch (e) {
            setMsg('Unable to register');
            // console.log(e);
        }
    }

    const callLogin = async () => {
        try {
            const res = await fetch('/user/login', {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const body = await res.json();
            return body;
        } catch (e) {
            setMsg('Unable to login')
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail()) return;
        if (!isValidPassword()) return;

        const res = isSignUpForm ? await callRegister() : await callLogin();
        if (!res) return setMsg('Unable to login user')
        
        const { token, id, error, user }  = res;
        if (error) return setMsg(error);
        if (user)  return setMsg(user);
        
        clearInput();
        dispatchLogIn(token, id);
        history.push("/");
    }

    return (
        <>
            <form className="form" onSubmit={onSubmit}>  
                <div className="form--toggle">
                    <Link to="/register" onClick={() => setIsSignUpForm(true)} 
                        className={`${isSignUpForm ? 'form--toggle-on' : 'form--toggle-off'}`}>Sign Up</Link>
                    <Link to="/login" onClick={() => setIsSignUpForm(false)} 
                        className={`${!isSignUpForm ? 'form--toggle-on' : 'form--toggle-off'}`}>Login</Link>
                </div>
                {msg && <p className="form--red-bold">{msg}</p>}
                {isSignUpForm && (
                    <>
                        <input type="text" arial-label="First name" name="fname" placeholder="First Name" className="form__input" value={fname} 
                            onChange={(e) => {setFName(e.target.value)}}
                        />
                        <input type="text" arial-label="Last name" name="lname" placeholder="Last Name" className="form__input" value={lname} 
                            onChange={(e) => {setLName(e.target.value)}}
                        />
                    </>
                )}
                <input type="text" arial-label="email" name="email" placeholder="* Email" className="form__input" value={email} 
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <input type="password" arial-label="password" name="password" placeholder="* Password" className="form__input" value={password} 
                    onChange={(e) => {setPassword(e.target.value)}}
                />
                {isSignUpForm 
                        ?
                            <button className="form__btn"><div className="form__btn-text">Sign Up</div></button>
                        :
                            <button className="form__btn"><div className="form__btn-text">Login</div></button>
                }
            </form>
        </>
    )
}

const mapStateToProps = ({ loggedIn }) => {
    return {
        loggedIn
    };
}

const mapDispatchToProps = (dispatchLoggedIn) => {
    return {
        dispatchLogIn: (token, id) => dispatchLoggedIn({ type: 'LOGIN', token, id })
    };
}

export default loggedInConnect(mapStateToProps, mapDispatchToProps)(withRouter(Form));
// export default withRouter(Form);