import React, {Component} from 'react';
import './ProjectsAllPage.css';
import {Link} from 'react-router-dom';
import ProjectCard from '../components/ProjectCard'
import data from '../data'
import {Row, Col} from 'antd';
import QueueAnim from 'rc-queue-anim';
import {Menu, Dropdown, Icon, message} from 'antd';

const onClick = function ({key}) {
    message.info(`Click on item ${key}`);
};

//page for showing UX work.
class ProjectsAllPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animConfig: [
                {opacity: [1, 0], translateY: [0, 50]},
                {opacity: [1, 0], translateY: [0, -50]}
            ],
        }
    }

    render() {
        //the drop down menu
        const filter = (
            <Menu onClick={onClick}>
                <Menu.Item key="1">All Types</Menu.Item>
                <Menu.Item key="2">Computational Arts</Menu.Item>
                <Menu.Item key="3">Creative Coding</Menu.Item>
                <Menu.Item key="4">Physical Interaction</Menu.Item>
                <Menu.Item key="5">Animation</Menu.Item>
                <Menu.Item key="6">Visual Design</Menu.Item>
            </Menu>
        );


        //1/3generate all the project Cards
        const projects = data.projects;
        const projectCards = projects.map(p => {
            return (
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={8}>
                    <ProjectCard {...p}/>
                </Col>
            );
        });
        //2/3generate rows array for each row
        const rowNum = Math.floor(projectCards.length / 4);//now 1
        let pRow = []; //the cols per row, 4 each.
        let pRows = [];
        for (let i = 0; i < rowNum; i++) {
            for (let j = 0; j < 4; j++) {
                pRow.push(projectCards[i * 4 + j])
            }
            pRows.push(pRow);//an array of array
        }
        //3/3generate html elements
        const pRowHtml = pRows.map((r, i) => {
            return (
                <Row key={i} gutter={16} className='rowWrapper'>
                    {r}
                </Row>
            );
        });//an array of <Row/>


        //for test only below
        let row1 = [];
        for (let i = 0; i < 4; i++) {
            row1.push(
                <Col key={i} className="gutter-row" xs={24} sm={24} md={12} lg={12} xl={6}>
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
            <div className="ProjectsAllPage">

                    <div className='wrapper-filterLine'>
                        <p><i>I also explore many other fields!</i></p>
                        <Dropdown overlay={filter}>
                            <a className="ant-dropdown-link" href="#">
                                All Types<Icon type="down"/>
                            </a>
                        </Dropdown>
                    </div>

                <QueueAnim delay={300} className="queue-simple" animConfig={this.state.animConfig}>
                    {/*{pRowHtml}*/}
                    {/*{projectRow1}*/}
                    {/*{projectRow2}*/}
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

export default ProjectsAllPage;

