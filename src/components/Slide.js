import React, {Component} from 'react';
import './Slide.css';
import {Link} from 'react-router-dom';


class Slide extends Component {
    render() {
        return (
            <div className="Slide">
                {/*an array of slides*/}
                <div className='wrapper-selectedImg'>
                    {/*<img src='/file/img/CtripProjectOptimization/titleImage.jpg'  className='selectedImg'/>*/}
                </div>

                <h1>
                    Trip.Com Checkout Page Optimization
                </h1>

                <p>Optimized Trip.com online checkout experience. The design helps the users to understand the checkout procedure and the price better as well as fasten the booking speed with the modularity of the web page and the information architecture of price details.</p>

                <button className='control-left'/>
                <button className='control-right'/>

                {/*carousel*/}
            </div>
        );
    }
}

export default Slide;