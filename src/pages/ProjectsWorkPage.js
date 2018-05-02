import React, {Component} from 'react';
import './ProjectsWorkPage.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom';
import ProjectCard from '../components/ProjectCard'
import data from '../data'
import {Row, Col} from 'antd';
import QueueAnim from 'rc-queue-anim';

import {CSSTransition} from 'react-transition-group';

//page for showing UX work.
class ProjectsWorkPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animConfig: [
                {opacity: [1, 0], translateY: [0, 50]},
                {opacity: [1, 0], translateY: [0, -50]}
            ],
            showGrid:false,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({showGrid: true});
        }, 100);

    }

    render() {
        let filteredProjects = data.projects.slice();
        filteredProjects = filteredProjects.filter(p => {
            if (p.category.match('UX')) {
                return p.category.match(this.state.selectedCategory);
            }
        });

        const projectCards = filteredProjects.map(p => {
            return (
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={8}>
                    <ProjectCard {...p}/>
                </Col>
            );
        });


        return (
            <div className="ProjectsWorkPage">
                <CSSTransition
                    in={this.state.showGrid}
                    timeout={300}
                    classNames="fadeInUp"
                    mountOnEnter
                    unmountOnExit
                    onExited={() => {
                    }}
                >
                    <Row key="demo2" gutter={24} className='rowWrapper fadeInUp'>
                        {projectCards}
                        {projectCards}
                        {projectCards}
                        {projectCards}
                        {projectCards}
                        {projectCards}
                        {projectCards}
                    </Row>
                </CSSTransition>
            </div>
        );
    }
}

export default ProjectsWorkPage;
