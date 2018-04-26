import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ProjectPage.css';
// import titleImg from '../file/img/CtripProjectOptimization/titlePage.jpg'
import { BackTop } from 'antd';

import {
    Link as ScrollLink,
    DirectLink,
    Element,
    Events,
    animateScroll as scroll,
    scrollSpy,
    scroller
} from 'react-scroll'

class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    componentDidMount() {
        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });

    }

    scrollToTop() {
        scroll.scrollToTop();
    }

    scrollTo() {
        scroller.scrollTo('scroll-to-element', {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }

    scrollToWithContainer() {

        let goToContainer = new Promise((resolve, reject) => {

            Events.scrollEvent.register('end', () => {
                resolve();
                Events.scrollEvent.remove('end');
            });

            scroller.scrollTo('scroll-container', {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart'
            });

        });

        goToContainer.then(() =>
            scroller.scrollTo('scroll-container-second-element', {
                duration: 800,
                delay: 0,
                smooth: 'easeInOutQuart',
                containerId: 'scroll-container'
            }));
    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }


    render() {

        const {id, name, meta, category, tags, date, sections, titleImg} = this.props.project;//this .props is the project
        console.log("tags", tags);
        const htmlTags = tags.map((t, i) => {
            console.log('t', t);
            if (tags.indexOf(t) == tags.length - 1) {
                return <span key={i}>{t}</span>
            } else {
                return (
                    <span key={i}>{t + ' | '}</span>
                )
            }
            ;
        });
        let mySections, sideBarTitles;
        if (sections.length !== 0) {
            sideBarTitles = sections.map((s) => {
                return (
                    <li key={s.id}><ScrollLink activeClass="active" className={s.name + ' hvr-overline-from-left'} to={s.name} spy={true}
                                               smooth={true} duration={500}>{s.name}</ScrollLink></li>
                );
            });
        }
        if (sections.length !== 0) {
            mySections = sections.map((s) => {
                return (
                    <Element name={s.name} className="element">
                        <section className={s.name} key={s.id}>
                            <h2>{s.name}</h2>
                            <p>{s.content}</p>
                        </section>
                    </Element>
                );
            });
        }


        return (
            <div className="ProjectPage">
                <ul className="breadcrumb">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to={category === 'UX' ? "/ux-work" : "/experimental-projects"}>
                        {category === 'UX' ? "UX Projects" : "Experimental Projects"}
                    </Link></li>
                    <li>{name}</li>
                </ul>
                <div className='wrapper-projectContent'>
                    <aside>
                        <div className='wrapper-titleArea'>
                            <h1>{name}</h1>
                            <span>{ date.getFullYear()+ '.'+(date.getMonth()+1)}</span><br/>
                            {htmlTags}
                            {/*<p>{meta}</p> /!*现在这里放放*!/*/}
                        </div>
                        <ul>
                            {sideBarTitles}
                        </ul>
                    </aside>
                    <main>
                        <BackTop />
                        <img src={titleImg} className='titleImg'/>
                        {mySections}
                    </main>
                </div>
                <div className='otherProjects'>
                    I am a grid of related projects, only one row.
                </div>
                {/*
                0/ header
                1/ breadcrumb
                2/ aside(floating) | main
                3/ related projects/checkout other projects/go back
                5/footer

                */}


            </div>

        );
    }
}

export default ProjectPage;
