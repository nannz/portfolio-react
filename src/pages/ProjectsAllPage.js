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
            selectedCategory: 'All Types'
        };
        this.onClickFilter = this.onClickFilter.bind(this);
    }

    onClickFilter({key}){//be care ful!!! it's {key}, not key directly
        console.log(key);
        this.setState({
            selectedCategory:key
        })
    }

    render() {
        const projects = data.projects;
        //get each category
        this.categoryList = projects.map((project) => project.category).filter((value, index, self) => self.indexOf(value) === index).sort();
        console.log('categoryList',this.categoryList);
        const menuItems = this.categoryList.map((c,i)=>{
            return(
                <Menu.Item key={c}>{c}</Menu.Item>
            );
        })
        //the drop down menu
        const filter = (
            <Menu onClick={this.onClickFilter}>
                <Menu.Item key="All Types">All Types</Menu.Item>
                {menuItems}
            </Menu>
        );


        //1/3generate all the project Cards
        const projectCards = projects.map((p,i) => {
            return (
                <Col key={i} className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={8}>
                    <ProjectCard {...p}/>
                </Col>
            );
        });

        return (
            <div className="ProjectsAllPage">
                    <div className='wrapper-filterLine'>
                        <p><i>I also explore many other fields!</i></p>
                        <Dropdown overlay={filter}>
                            {/*<a className="ant-dropdown-link" href="#">*/}
                                {/*All Types<Icon type="down"/>*/}
                            {/*</a>*/}
                            <a className="ant-dropdown-link" href="#">
                                {this.state.selectedCategory}<Icon type="down"/>
                            </a>
                        </Dropdown>
                    </div>

                <QueueAnim delay={300} className="queue-simple" animConfig={this.state.animConfig}>
                    <Row key="demo2" gutter={24} className='rowWrapper'>
                        {projectCards}
                    </Row>
                </QueueAnim>

            </div>
        );
    }
}

export default ProjectsAllPage;

