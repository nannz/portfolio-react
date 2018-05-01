import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ProjectPage.css';
import titleImgTest from '../file/img/CtripProjectOptimization/titlePage.jpg'
import {BackTop} from 'antd';

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

        const {id, name, category, tags, date, sections, titleImg} = this.props.project;//this .props is the project
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
        let mySections, sideBarTitles,myGallery;
        if (sections.length !== 0) {
            sideBarTitles = sections.map((s) => {
                return (
                    <li key={s.id}><ScrollLink activeClass="active" className={s.name + ' hvr-overline-from-left'}
                                               to={s.name} spy={true}
                                               smooth={true} duration={500}>{s.name}</ScrollLink></li>
                );
            });
        }
        //generate the imas gallery if any
        if (sections.length !== 0) {
            myGallery = sections.map((s) => {
                let imgGalleryColumns = [];
                if (s.hasOwnProperty('imgs')) {
                    let numEachColumn = Math.floor(s.imgs.length / 4);
                    console.log(s.name + 'has imgs');
                    // let columns = [];
                    for (let i = 0; i < 4; i++) {
                        let imgsEachColumnArr = [];
                        for (let j = 0; j < numEachColumn; j++) {
                            console.log('column'+j + ' '+s.imgs[numEachColumn * i + j]);
                            let imgElement = (<img src={'/'+s.imgs[numEachColumn * i + j]}/>);
                            imgsEachColumnArr.push(imgElement);
                        }
                        let column = (
                            <div className="imgGalleryColumn">
                                {imgsEachColumnArr}
                            </div>
                        );
                        imgGalleryColumns.push(column);
                    }
                }
                return (
                    <div className='imgGalleryRow'>
                        {imgGalleryColumns}
                    </div>
                );
            });

            mySections = sections.map((s) => {
                return (
                    <Element name={s.name} className="element">
                        <section className={s.name} key={s.id}>
                            <h2>{s.name}</h2>
                            <p>{s.content}</p>
                            {s.hasOwnProperty('imgs')&& myGallery}
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
                            <span>{date.getFullYear() + '.' + (date.getMonth() + 1)}</span><br/>
                            {htmlTags}
                        </div>
                        <ul>
                            {sideBarTitles}
                        </ul>
                    </aside>
                    <main>
                        <BackTop/>
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
