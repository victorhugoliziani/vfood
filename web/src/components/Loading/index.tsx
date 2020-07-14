import React from 'react';

import './styles.css';
import image from '../../assets/images/loading.gif';

const Loading = (props) => {

    return(
        <div className="bg" id="loading">
            <img src={image} />
            <span>{props.text}</span>
        </div>
    )
}

export default Loading;