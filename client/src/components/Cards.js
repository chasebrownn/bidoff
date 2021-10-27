import React, { Component } from "react";
import { render } from "react-dom";
import Card from "./Card";

import img1 from '../images/image1.jpg';
import img2 from '../images/image2.jpg';
import img3 from '../images/image3.jpg';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-4">
                        <Card imgsrc={img1} title="card 1" />
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img2} title="card 2"/>
                    </div>
                    <div className="col-md-4">
                        <Card imgsrc={img3} title="card 3"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cards;