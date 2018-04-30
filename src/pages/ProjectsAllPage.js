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
            selectedCategory: 'All Types',
            showDropDown:true,
        };
        this.onClickFilter = this.onClickFilter.bind(this);
        this.triggerDropDown = this.triggerDropDown.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.showDropDown = this.showDropDown.bind(this);
        this.hideDropDown = this.hideDropDown.bind(this);
    }

    onClickFilter({key}){//be care ful!!! it's {key}, not key directly
        console.log(key);
        this.setState({
            selectedCategory:key
        })
    }
    triggerDropDown(){
        this.setState({
            showDropDown:true
        })
    }
    handleFilter(e){
        this.setState({
            selectedCategory: e.target.id,
            showDropDown:false
        })
    }
    showDropDown(){
        this.setState({
            showDropDown:true
        })
    }
    hideDropDown(){
        this.setState({
            showDropDown:false
        })

    }/*<Menu.Item key={c}>{c}</Menu.Item>*/
    render(){
        const projects = data.projects;
        //get each category
        this.categoryList = projects.map((project) => project.category).filter((value, index, self) => self.indexOf(value) === index).sort();
        console.log('categoryList',this.categoryList);
        const menuItems = this.categoryList.map((c,i)=>{
            return(

                <a id={c} key={c} onClick={this.handleFilter}>{c}</a>
            );
        });


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

                        <div className = 'myDropDown' onMouseOver={this.showDropDown} onMouseLeave={this.hideDropDown}>
                            <button className="dropbtn" onClick={this.triggerDropDown}>{this.state.selectedCategory}<Icon type="down"/></button>
                            {this.state.showDropDown && <menu className="dropdown-content">
                                {menuItems}
                                <a id='All Types' onClick={this.handleFilter}>All Types</a>
                            </menu>}
                        </div>
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

