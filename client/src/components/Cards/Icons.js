import React, { useState } from 'react';
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import { FaRegThumbsUp, FaThumbsUp, FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa';

const Icons = () => {
    const [isThumbsUpFilled, setIsThumbsUpFilled] = useState(false);
    const [isThumbsDownFilled, setIsThumbsDownFilled] = useState(false);
    const [isHeartFilled, setIsHeartFilled] = useState(false);

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

    return (
        <div className="icons" onClick={onClick}>
            <span className="icon" id="thumbsUp">
            {
                isThumbsUpFilled ? <FaThumbsUp className="icon--blue" /> 
                            : <FaRegThumbsUp />
            }
                <p className="icon-text">0</p>
            </span>
            <span className="icon" id="thumbsDown">
            {
                isThumbsDownFilled ? <FaThumbsDown className="icon--purple" />
                            : <FaRegThumbsDown />
            }
                <p className="icon-text">0</p>
            </span>
            <span className="icon" id="heart">
            {
                isHeartFilled ? <IoIosHeart className="icon--red" />
                            : <IoIosHeartEmpty />
            }
                <p className="icon-text">0</p>
            </span>
                
        </div>
    )
}

export default Icons