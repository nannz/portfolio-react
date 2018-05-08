import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ProjectPage.css';
import titleImgTest from '../file/img/CtripProjectOptimization/titlePage.jpg'
import {BackTop} from 'antd';
import {Spin} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import {
    Link as ScrollLink,
    DirectLink,
    Element,
    Events,
    animateScroll as scroll,
    scrollSpy,
    scroller
} from 'react-scroll';
import LazyLoad from 'react-lazyload';

class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySections: [],
            hasMoreSection: true
        };
        this.scrollToTop = this.scrollToTop.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.project = this.props.project;
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

    loadMore(page) {//page is the next section's id
        //load the next section
        const sectionId = page;
        if (sectionId <= this.project.sections.length) {
            const newSection = this.project.sections[sectionId - 1];
            console.log('newSection', newSection);
            let copy = this.state.displaySections.concat(newSection);
            this.setState({displaySections: copy});
        } else {
            this.setState({hasMoreSection: false})
        }

    }

    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }


    render() {

        const {id, name, category, tags, date, sections, titleImg} = this.project;//this .props is the project
        const htmlTags = tags.map((t, i) => {
            if (tags.indexOf(t) == tags.length - 1) {
                return <span key={i}>{t}</span>
            } else {
                return (
                    <span key={i}>{t + ' | '}</span>
                )
            }
            ;
        });
        let mySections, sideBarTitles, myGallery;
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
        //if (sections.length !== 0) {
        mySections = this.state.displaySections.map((s) => {
            const numOfColumns = 3;
            //myGallery = this.state.displaySections.map((s) => {
            let imgGalleryColumns = [];
            if (s.hasOwnProperty('imgs')) {
                let numEachColumn = Math.floor(s.imgs.length / numOfColumns);
                for (let i = 0; i < numOfColumns; i++) {
                    let imgsEachColumnArr = [];
                    for (let j = 0; j < numEachColumn; j++) {
                        if (j == numEachColumn - 1 && i == (numOfColumns - 1) && (numEachColumn * i + j) < s.imgs.length - 1) {
                            let imgElement = (
                                <img src={'/' + s.imgs[numEachColumn * i + j]}/>
                            );
                            imgsEachColumnArr.push(imgElement);
                            imgElement = (
                                <img src={'/' + s.imgs[s.imgs.length - 1]}/>
                            );
                            imgsEachColumnArr.push(imgElement);
                        } else {
                            let imgElement = (
                                <img src={'/' + s.imgs[numEachColumn * i + j]}/>
                            );
                            imgsEachColumnArr.push(imgElement);
                        }
                    }
                    const imgsEachColumnArrLazy = imgsEachColumnArr.map((imgElement,i) => {
                        return (
                            <LazyLoad height={200} once key={i} offset={[-100, 0]}
                                      placeholder={<div className='img-placeholder'>Loading</div>}
                                      debounce={100}
                            >{imgElement}</LazyLoad>
                        );
                    });

                    let column = (
                        <div className="imgGalleryColumn">
                            {imgsEachColumnArrLazy}
                        </div>
                    );
                    imgGalleryColumns.push(column);
                }
            }
            const myGallery = (
                <div className='imgGalleryRow'>
                    {imgGalleryColumns}
                </div>
            );

            return (
                <Element name={s.name} className="element" key={s.id}>
                    <section className={s.name} key={s.id}>
                        <h2>{s.name}</h2>
                        {s.hasOwnProperty('content') && <div dangerouslySetInnerHTML={{__html: s.content}}/>}
                        {s.hasOwnProperty('imgs') && myGallery}
                    </section>
                </Element>
            );
        });


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
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadMore}
                            hasMore={this.state.hasMoreSection}
                            loader={<div className="loadingArea" key={0}><Spin/></div>}
                        >
                            {mySections}
                        </InfiniteScroll>
                    </main>
                </div>
                {/*<div className='otherProjects'>*/}
                    {/*I am a grid of related projects, only one row.*/}
                {/*</div>*/}
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
