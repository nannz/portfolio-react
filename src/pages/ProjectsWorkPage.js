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
                <Col className="gutter-row" span={6}>
                    <ProjectCard {...p}/>
                </Col>
            );
        });
        let row1 = [];
        for (let i = 0; i < 4; i++) {
            row1.push(
                <Col key={i} className="gutter-row" span={6}>
                    <ProjectCard/>
                </Col>)
        }
        // gutter: { xs: 8, sm: 16, md: 24, lg: 32 }
        const projectRow1 = (

                <Row key="demo1" gutter={16} className='rowWrapper'>
                    {row1}
                </Row>
        );
        const projectRow2 = (
            <Row key="demo2" gutter={16} className='rowWrapper'>
                {row1}
            </Row>);

        return (
            <div className="ProjectsWorkPage">
                <QueueAnim delay={300} className="queue-simple" animConfig={this.state.animConfig}>
                    {projectRow1}
                    {projectRow2}
                </QueueAnim>
            </div>
        );
    }
}

export default ProjectsWorkPage;
