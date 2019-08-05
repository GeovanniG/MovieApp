import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Form = ({ signUp=true, history }) => {
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [isSignUpForm, setIsSignUpForm] = useState(signUp);

    // Since we're passing in signUp, everytime signUp changes, 
    // we also want to isSignUpForm to consider that change
    useEffect(() => setIsSignUpForm(signUp), [setIsSignUpForm, signUp])

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
            const res = await fetch('/user/register');
            const body = await res.json();
            console.log(body);
        } catch (e) {
            console.log(e);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!isValidEmail()) return;

        if (!isValidPassword()) return;

        clearInput();

        callRegister();

        history.push('/');
    }

    return (
        <>
            <form className="form" onSubmit={onSubmit}>  
                <div className="form--toggle">
                    <Link to="/register" onClick={() => setIsSignUpForm(!isSignUpForm)} 
                        className={`${isSignUpForm ? 'form--toggle-on' : 'form--toggle-off'}`}>Sign Up</Link>
                    <Link to="/login" onClick={() => setIsSignUpForm(!isSignUpForm)} 
                        className={`${!isSignUpForm ? 'form--toggle-on' : 'form--toggle-off'}`}>Login</Link>
                </div>
                {msg && <p className="form--red-bold">{msg}</p>}
                {isSignUpForm && (
                    <>
                        <input type="text" name="fname" placeholder="First Name" className="form__input" value={fname} 
                            onChange={(e) => {setFName(e.target.value)}}
                        />
                        <input type="text" name="lname" placeholder="Last Name" className="form__input" value={lname} 
                            onChange={(e) => {setLName(e.target.value)}}
                        />
                    </>
                )}
                <input type="text" name="email" placeholder="* Email" className="form__input" value={email} 
                    onChange={(e) => {setEmail(e.target.value)}}
                />
                <input type="password" name="password" placeholder="* Password" className="form__input" value={password} 
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

export default withRouter(Form);