import React from 'react';
import img from "../images/image4.jpg";
import "../styling/cards.css";

const Card = props => {
    return(
        <div className="card text-center">
            <div className="overflow">
                <img src={props.imgsrc} alt='Image 1' className="card-img-top"/>
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text text-secondary">lorem ipsum dolor sit amet conset adipisicing elit.</p>
                <a href="#" className="btn btn-outline-success">Place bid</a>
            </div>
        </div>
    );
}

export default Card;