import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa';
import loggedInConnect from '../../stores/loggedIn';

const Icons = ({ dispatchLogOut, id, title, name='', poster_path='', overview='', vote_average='', vote_count='', release_date='', className='' } = {}) => {
    const [isThumbsUpFilled, setIsThumbsUpFilled] = useState(false);
    const [isThumbsDownFilled, setIsThumbsDownFilled] = useState(false);
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        const fillInfo = async (info, setState) => {
            try {
                const res = await fetch(`/user/${id}/${info}/${title || name}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                })
                setMsg('');
                const body = await res.json();
                if (body.info || body.error) setState(false);
                else setState(true);
            } catch (e) {
                setState(false);
                setMsg(`Unable to retrieve ${info}`);
            }
        }
        fillInfo('likes', setIsThumbsUpFilled);
        fillInfo('dislikes', setIsThumbsDownFilled);
        fillInfo('favorites', setIsHeartFilled);
    }, [id, title, name, setIsThumbsUpFilled, setIsThumbsDownFilled, setIsHeartFilled, setMsg])

    // Toggle icons on click
    const onClick = (e) => {
        const span = e.target.closest('span'); 
        if (!span) return;

        const id = span.id;
        switch (id) {
           case 'thumbsUp':
               setIsThumbsUpFilled(!isThumbsUpFilled);
               break;
           case 'thumbsDown':
               setIsThumbsDownFilled(!isThumbsDownFilled);
               break;
           case 'heart':
               setIsHeartFilled(!isHeartFilled);
               break;
            default:
                break;
        }
    }

    const addInfo = async (info) => {
        try {
            const res = await fetch(`/user/${id}/${info}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    info,
                    film: {
                        title: title || name,
                        url: poster_path,
                        overview,
                        releaseDate: release_date,
                        voteAverage: vote_average,
                        voteCount: vote_count
                    }
                })
            })
            setMsg('');
            const body = await res.json();
            if (body.name === 'TokenExpiredError') dispatchLogOut();
        } catch (e) {
            setMsg(`Unable to save ${info}`)
        }
    }

    const deleteInfo = async (info) => {
        try {
            const res = await fetch(`/user/${id}/${info}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    info,
                    film: {
                        title: title || name,
                    }
                })
            })
            setMsg('');
            const body = await res.json();
            if (body.name === 'TokenExpiredError') dispatchLogOut();
        } catch (e) {
            setMsg(`Unable to save ${info}`)
        }
    }

    return (
        <div>
            <div className={`icons ${className}`} onClick={onClick}>
                <span className="icon" id="thumbsUp">
                {
                    isThumbsUpFilled ? <FaThumbsUp className="icon--blue" onClick={() => deleteInfo('likes')} /> 
                                : <FaRegThumbsUp onClick={() => addInfo('likes')}   />
                }
                    {/* <p className="icon-text">0</p> */}
                </span>
                <span className="icon" id="thumbsDown">
                {
                    isThumbsDownFilled ? <FaThumbsDown className="icon--purple" onClick={() => deleteInfo('dislikes')} />
                                : <FaRegThumbsDown onClick={() => addInfo('dislikes')} />
                }
                    {/* <p className="icon-text">0</p> */}
                </span>
                <span className="icon" id="heart">
                {
                    isHeartFilled ? <IoIosHeart className="icon--red" onClick={() => deleteInfo('favorites')} />
                                : <IoIosHeartEmpty onClick={() => addInfo('favorites')} />
                }
                    {/* <p className="icon-text">0</p> */}
                </span>                
            </div>
            {msg && <p>{msg}</p>}
        </div>
        
    )
}

const mapStateToProps = ({ id }) => {
    return {
        id
    };
}

const mapDispatchToProps = (dispatchLoggedIn) => {
    return {
        dispatchLogOut: (token, id) => dispatchLoggedIn({ type: 'LOGOUT' })
    };
}

export default loggedInConnect(mapStateToProps, mapDispatchToProps)(withRouter(Icons));