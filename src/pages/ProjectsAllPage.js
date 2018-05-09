import React, {Component} from 'react';
import './ProjectsAllPage.css';
import {Link} from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import data from '../data';
import {Row, Col} from 'antd';
import {CSSTransition} from 'react-transition-group';
import {Icon} from 'antd';


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
            showDropDown: false,
            showAni_1: false,
            showAni_2:false,
        };
        this.triggerDropDown = this.triggerDropDown.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.showDropDown = this.showDropDown.bind(this);
        this.hideDropDown = this.hideDropDown.bind(this);
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({showAni_1: true});
        }, 100);

    }

    triggerDropDown() {
        this.setState({
            showDropDown: true
        })
    }

    handleFilter(e) {
        this.setState({
            selectedCategory: e.target.id,
            showDropDown: false,
        });
    }

    showDropDown() {
        this.setState({
            showDropDown: true
        })
    }

    hideDropDown() {
        this.setState({
            showDropDown: false
        })

    }

    componentDidUpdate(prevState) {
    }

    render() {

        let projects = data.projects;
        //get each category
        this.categoryList = projects.map((project) => project.category).filter((value, index, self) => (self.indexOf(value) === index) && value!=='UX').sort();
        //console.log('categoryList',this.categoryList);
        const menuItems = this.categoryList.map((c, i) => {
            return (
                <a id={c} key={c} onClick={this.handleFilter}>{c}</a>
            );
        });

        let filteredProjects = data.projects.slice();
        filteredProjects = filteredProjects.filter(p=>(p.category!=='UX'));
        if (this.state.selectedCategory !== 'All Types') {
            const filterTemp = filteredProjects.filter(p => {
                if (p.category.match(this.state.selectedCategory)) {
                    return p.category.match(this.state.selectedCategory);
                }
            });
            filteredProjects = filterTemp;
        }

        //generate all the project Cards
        const projectCards = filteredProjects.map((p, i) => {
            return (
                <Col key={i} className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={8}>
                    <ProjectCard className='fadeInUp' {...p}/>
                </Col>
            );
        });

        return (
            <div className="ProjectsAllPage">
                <CSSTransition
                    in={this.state.showAni_1}
                    timeout={300}
                    classNames="fadeInUp"
                    mountOnEnter
                    unmountOnExit
                    onEntered={()=>{
                        setTimeout(
                        this.setState({
                            showAni_2:true
                        }),100);
                    }}
                    onExited={() => {
                    }}
                >
                    <div className='wrapper-filterLine'>
                        <p>Besides UX, I am also passionate on generative arts, interaction design, and visual arts.</p>
                        <div className='myDropDown' onMouseOver={this.showDropDown} onMouseLeave={this.hideDropDown}>
                            <button className="dropbtn"
                                    onClick={this.triggerDropDown}>{this.state.selectedCategory}<Icon
                                type="down"/></button>
                            {this.state.showDropDown && <menu className="dropdown-content">
                                <a id='All Types' onClick={this.handleFilter}>All Types</a>
                                {menuItems}
                            </menu>}
                        </div>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={this.state.showAni_2}
                    timeout={300}
                    classNames="fadeInUp"
                    mountOnEnter
                    unmountOnExit
                    onExited={() => {
                    }}
                >
                    <Row key="demo2" gutter={24} className='rowWrapper fadeInUp'>
                        {projectCards}
                    </Row>
                </CSSTransition>


            </div>
        );
    }
}

export default ProjectsAllPage;

