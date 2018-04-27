import React, {Component} from 'react';
import './ProjectsWorkPage.css';
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom';
import ProjectCard from '../components/ProjectCard'
import data from '../data'
import {Row, Col} from 'antd';
import QueueAnim from 'rc-queue-anim';

//page for showing UX work.
class ProjectsWorkPage extends Component {
    constructor(props){
        super(props);
        this.state={
            animConfig: [
                { opacity: [1, 0], translateY: [0, 50] },
                { opacity: [1, 0], translateY: [0, -50] }
            ],
        }
    }
    render() {
        const projects = data.projects;
        const projectCards = projects.map(p => {
            return (
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={8}>
                    <ProjectCard {...p}/>
                </Col>
            );
        });


        return (
            <div className="ProjectsWorkPage">
                <QueueAnim delay={300} className="queue-simple" animConfig={this.state.animConfig}>
                    <Row key="demo2" gutter={24} className='rowWrapper'>
                        {projectCards}
                        {projectCards}
                        {projectCards}
                    </Row>
                </QueueAnim>
            </div>
        );
    }
}

export default ProjectsWorkPage;
