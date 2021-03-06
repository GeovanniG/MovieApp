import React, { useEffect, useState } from 'react';
import Icons from './Icons';
import Loader from './Loader';
import MovieModal from './MovieModal';
import blankImage from './white.jpg'
import loggedInConnect from '../../stores/loggedIn';

 const Card = ({ loggedIn, title='', name='', poster_path='', overview='', vote_average='', vote_count='', release_date='' } = {}) => {
     const [img, setImg] = useState('');

    // We check for image because without an image, the Card component has unexpected behavior
    useEffect(() => {
        const isValidURL = async () => {
            try {
                // If no path, reset to default image with loader
                if (!poster_path) return setImg('');

                // Check if url is valid before setting as img
                const potentialURL = `https://image.tmdb.org/t/p/w300${poster_path}`;
                await fetch(potentialURL);
                setImg(potentialURL);
            } catch (e) {
                // If not valid url, make sure not to render img
                setImg('')
            }
        }
        isValidURL();
    }, [poster_path]);

     return (
         <div className="card">
            <div className="card__header">
                {title && <h2 className="card__header-title">{title}</h2>}
                {name && <h2 className="card__header-title">{name}</h2>}
                {(title || name) && <MovieModal className="card__header-icon" 
                            icon={true} title={title} name={name} image={img} description={overview} 
                            vote_average={vote_average} vote_count={vote_count} release_date={release_date}
                            />
                }
            </div>
            <div className="card__img-wrapper">
                <img src={img || blankImage} alt="movie" className="card__img" />
                {(title || name) ? (
                    <div className="card__img--overlay card__img-btn-wrapper">
                        {loggedIn &&
                            <div className="btn card__img-btn card__img-btn--white-primary">
                                <Icons className="" title={title} name={name} image={img} overview={overview} poster_path={poster_path}
                                    vote_average={vote_average} vote_count={vote_count} release_date={release_date} />
                            </div>
                        }
                        <MovieModal className="btn card__img-btn card__img-btn--white-primary card__img-btn--modal" btn="Info / Rate" 
                            title={title} name={name} image={img} description={overview} vote_average={vote_average} vote_count={vote_count} release_date={release_date}
                        />
                    </div>
                ) : (
                    <div className="card__img--overlay card__img--loader">
                        <Loader repeatCount="5" />
                    </div>
                )}    
            </div>
            {(loggedIn && (title || name)) && 
                <div className="card__icons">
                    <Icons className="" title={title} name={name} image={img} overview={overview} poster_path={poster_path}
                            vote_average={vote_average} vote_count={vote_count} release_date={release_date} />
                </div>
            }
            
         </div>
     )
 }

 const mapStateToProps = ({ loggedIn }) => {
    return {
        loggedIn
    };
}

const mapDispatchToProps = (dispatchLoggedIn) => {
    return {};
}

export default loggedInConnect(mapStateToProps, mapDispatchToProps)(Card);
//  export default Card;