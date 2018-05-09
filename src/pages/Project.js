import React, {Component} from 'react';
import './Project.css';
import {Link} from 'react-router-dom';
import * as contentful from 'contentful';
import * as Markdown from 'react-markdown';
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

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //heroImageURL: '',
            title: '',
            meta: '',
            date: new Date(),
            tags: [],
            sections: [],

            isLoading:true,
            error:null
        };

        this.client = contentful.createClient({
            space: 'x20bqc7u7wlt',
            accessToken: 'd8636c69a4dab4809a27e7fe2a013f455a898700315a910a4f6ae38033a857cd'
        });
        this.setPortfolios = this.setPortfolios.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
    }


    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }


    setPortfolios(response) {
        console.log(response);
        response.items.forEach(p => {//loop all the project
            console.log(p);
            if (p.fields.title == 'My Reactive Portfolio') {
                console.log(p.fields.date);
                console.log(Date.parse(p.fields.date));
                console.log(p.fields);
                this.setState({
                    title: p.fields.title,
                    date: new Date(Date.parse(p.fields.date)),
                    tags: p.fields.tags,
                    meta: p.fields.meta,
                    sections: p.fields.section
                })
            }
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

    componentDidMount() {
        this.client.getEntries({
            'content_type': 'project'//the Post content type
        })
            .then(this.setPortfolios)
            .then(this.setState({isLoading:false}))
            .catch(error => this.setState({ error: error, isLoading: false }));


        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
    }

    render() {
        if (this.state.isLoading) {
            return <Spin/>;
        }

        if (this.state.error) {
            return <p>Error! {this.state.error}</p>;
        }

        console.log(this.state.sections);
        const htmlTags = this.state.tags.map((t, i) => {
            if (this.state.tags.indexOf(t) == this.state.tags.length - 1) {
                return <span key={i}>{t}</span>
            } else {
                return (
                    <span key={i}>{t + ' | '}</span>
                )
            }
            ;
        });

        let mySections, sideBarTitles;
        // if (this.state.sections.length !== 0) {
        sideBarTitles = this.state.sections.map((s) => {
            return (
                <li key={s.fields.sectionId}><ScrollLink activeClass="active" className={'hvr-overline-from-left'}
                                                         to={s.fields.title} spy={true}
                                                         smooth={true} duration={500}>{s.fields.title}</ScrollLink></li>
            );
        });


        mySections = this.state.sections.map((s) => {
            let imgs = [];
            if (s.fields.images) {
                imgs = s.fields.images.map(img => {
                    console.log('url', img.fields.file.url);
                    return (
                        <LazyLoad height={200} once offset={[-100, 0]}
                                  placeholder={<div className='img-placeholder'>Loading</div>}
                                  debounce={100}
                        >
                            <img src={img.fields.file.url} alt="Image" className='sectionImage'/>
                        </LazyLoad>
                    );
                })
            }
            console.log(s.fields.title + ' ' + imgs);
            return (
                <Element name={s.fields.title} className="element projectpage-section" key={s.fields.sectionId}>
                    <section key={s.fields.sectionId}>
                        <h2>{s.fields.title}</h2>
                        <Markdown source={s.fields.content}/>
                        {imgs}

                    </section>
                </Element>
            );
        });


        return (
            <div className="Project">
                <div className='wrapper-projectContent'>
                    <aside>
                        <div className='wrapper-titleArea'>
                            <h1>{this.state.title}</h1>
                            <span>{this.state.date.getFullYear() + '.' + (this.state.date.getMonth() + 1)}</span><br/>
                            {htmlTags}
                        </div>
                        <ul>
                            {sideBarTitles}
                        </ul>
                    </aside>
                    <main>
                        <BackTop/>
                        {/*<img src={titleImg} className='titleImg'/>*/}
                        {mySections}
                    </main>
                </div>
            </div>

        );
    }
}

export default Project;
