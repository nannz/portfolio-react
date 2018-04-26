import React, {Component} from 'react';
import './LandingPage.css';
import {Link} from 'react-router-dom';

import BannerAnim, {Element} from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';

const BgElement = Element.BgElement;

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.imgArray = [
            'file/img/CtripProjectOptimization/selected-bg.jpg',
            'file/img/cooperHewittMuseum/selected-bg.jpg',
        ];
    }

    render() {
        return (
            <div className='LandingPage'>
                <BannerAnim prefixCls="banner-user"
                            autoPlay={true}
                            autoPlaySpeed={5000}
                            type='across'
                            duration={500}>
                    <Element
                        prefixCls="banner-user-elem"
                        key="0"
                    >
                        <BgElement
                            key="bg"
                            className="bg"
                            style={{
                                backgroundImage: `url(${this.imgArray[0]})`,
                                // backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Link to="/project/1" className='selected-link glow'>
                            <TweenOne className="banner-user-title" animation={{y: 30, opacity: 0, type: 'from'}}>
                                Trip.com Project
                            </TweenOne>
                            <TweenOne className="banner-user-text"
                                      animation={{y: 30, opacity: 0, type: 'from', delay: 100}}
                            >
                                User Experience Design, Web Design
                            </TweenOne>
                        </Link>
                    </Element>
                    <Element
                        prefixCls="banner-user-elem"
                        key="1"
                    >
                        <BgElement
                            key="bg"
                            className="bg"
                            style={{
                                backgroundImage: `url(${this.imgArray[1]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        <Link to="/project/1" className='selected-link glow'>
                            <TweenOne className="banner-user-title" animation={{y: 30, opacity: 0, type: 'from'}}>
                                Cooper Hewitt Museum | Website Redesign for Accessibility
                            </TweenOne>
                            <TweenOne className="banner-user-text"
                                      animation={{y: 30, opacity: 0, type: 'from', delay: 100}}
                            >
                                UX Design, Accessible Design, Service Design
                            </TweenOne>
                        </Link>
                    </Element>
                </BannerAnim>
            </div>
        );
    }
}

export default LandingPage;
