import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { IoIosArrowDown, IoIosClose } from 'react-icons/io';


const MovieModal = ({ btn='', icon=false, className, title='', name='', image='', description='', vote_average='', vote_count='', release_date='' } = {}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => Modal.setAppElement('body'), [])

    const onClick = () => {
        setModalIsOpen(true);
    }

    const customStyles = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            // bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)',
            maxWidth: '800px',
            height: '450px'
        }
      };

    return (
        <>  
            {btn && <button className={className} onClick={onClick}>{btn}</button>}
            {icon && <IoIosArrowDown className={className} onClick={onClick}/>}
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Movie Modal"
                style={customStyles}
            >   
                <div className="modal">
                    <IoIosClose className="modal__title-icon" onClick={() => setModalIsOpen(false)} />
                    {title && <h2 className="modal__title">{title}</h2>} 
                    {name && <h2 className="modal__title">{name}</h2>} 
                    {image && <img className="modal__img" src={image} alt="media" />}
                    <p className="modal__text">{description}</p>
                    {vote_average && vote_count && <p className="modal__text">Average Rating: {vote_average} based on {vote_count} votes</p>}
                    {release_date && <p className="modal__text">Released on {release_date}</p>}
                </div>
            </Modal>
        </>
    )
}

export default MovieModal;