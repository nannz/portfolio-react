import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../pages/ProjectPage.css';
import titleImgTest from '../file/img/CtripProjectOptimization/titlePage.jpg'
import {BackTop} from 'antd';
import data from '../data';
import {Spin} from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import ReactDOM from 'react-dom';
import {
    Element,
} from 'react-scroll';

class MyInfiniteScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySections: [],
            displayImgs: null,
            hasMoreSection: true
        };

        this.loadMore = this.loadMore.bind(this);
        this.project = data.projects[1];//the ctrip section
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    loadMore(page) {//page is the next section's id
        //load the next section
        const sectionId = page;
        if (sectionId <= this.project.sections.length) {
            const newSection = this.project.sections[sectionId - 1];
            console.log(newSection);
            let copy = this.state.displaySections.concat(newSection);
            this.setState({displaySections: copy});
        } else {
            this.setState({hasMoreSection: false})
        }

    }

    render() {
        console.log('height', document.getElementsByClassName('wrapper-mainContent').clientHeight);
        //const {id, name, category, tags, date, sections, titleImg} = this.project;// this.props.project;//this .props is the project
        let mySections;
        //the main content
        mySections = this.state.displaySections.map((s) => {
            return (
                <Element name={s.name} className="element" key={s.id}>
                    <section className={s.name} key={s.id}>
                        <h2>{s.name}</h2>
                        <p>{s.content}</p>
                    </section>
                </Element>
            );
        });


        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMore}
                hasMore={this.state.hasMoreSection}
                loader={<div className="loadingArea" key={0}><Spin/></div>}
            >
                {mySections}
            </InfiniteScroll>
        );
    }
}

export default MyInfiniteScroller;

