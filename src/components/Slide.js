import React, {Component} from 'react';
import './Slide.css';
import {Link} from 'react-router-dom';
import {Icon} from 'antd';
import data from '../data';
import {CSSTransition} from 'react-transition-group';

//if change animation time, I should change the setTimeout time and the animation css time!!!!!
class Slide extends Component {
    constructor(props) {
        super(props);
        this.project = data.projects[1];
        const projectsCopy = data.projects.slice();
        this.selectedProjects = projectsCopy.filter((p) => {
                if (p.selected) {
                    return p;
                }
            }
        );
        this.state = {
            leftProject: this.selectedProjects[this.selectedProjects.length - 1],
            thisProject: this.selectedProjects[0],
            rightProject: this.selectedProjects[1],
            thisId: 0,

            showRightTransition: false,
            showLeftTransition: false,
        };
        this.lastProject = this.lastProject.bind(this);
        this.nextProject = this.nextProject.bind(this);
    }

    componentDidMount() {
        setInterval(this.nextProject, 5000);
    }

    lastProject() {
        console.log('click last project!');
        this.setState({
            showLeftTransition: true,
        });
        setTimeout(() => {
            this.setState({
                showLeftTransition: false,
            });
            if (this.state.thisId === 0) {//if the current project is the first one
                this.setState({
                    thisId: this.selectedProjects.length - 1,
                    leftProject: this.selectedProjects[this.selectedProjects.length - 2],
                    thisProject: this.selectedProjects[this.selectedProjects.length - 1],
                    rightProject: this.selectedProjects[0]
                });
            } else {
                if (this.state.thisId - 1 === 0) {
                    this.setState({
                        leftProject: this.selectedProjects[this.selectedProjects.length - 1],
                        thisId: this.state.thisId - 1,
                        thisProject: this.selectedProjects[this.state.thisId - 1],
                        rightProject: this.selectedProjects[this.state.thisId]
                    });
                } else {
                    this.setState({
                        leftProject: this.selectedProjects[this.state.thisId - 2],
                        thisId: this.state.thisId - 1,
                        thisProject: this.selectedProjects[this.state.thisId - 1],
                        rightProject: this.selectedProjects[this.state.thisId]
                    });
                }
            }
        }, 1000);

    }

    nextProject() {
        console.log('click next project!');
        this.setState({
            showRightTransition: true,
        });
        setTimeout(() => {
            this.setState({
                showRightTransition: false,
            });
            if (this.state.thisId === this.selectedProjects.length - 1) {//if this img(when clicking next) is the last one
                this.setState({
                    thisId: 0,
                    leftProject: this.selectedProjects[this.state.thisId - 1],
                    thisProject: this.selectedProjects[0],
                    rightProject: this.selectedProjects[1]
                });
            } else {
                if (this.state.thisId + 1 === this.selectedProjects.length - 1) {
                    this.setState({
                        thisId: this.state.thisId + 1,
                        leftProject: this.selectedProjects[this.state.thisId],
                        thisProject: this.selectedProjects[this.state.thisId + 1],
                        rightProject: this.selectedProjects[0]
                    });
                } else {
                    console.log('this.state.thisId + 2', this.state.thisId + 2);
                    this.setState({
                        thisId: this.state.thisId + 1,
                        leftProject: this.selectedProjects[this.state.thisId],
                        thisProject: this.selectedProjects[this.state.thisId + 1],
                        rightProject: this.selectedProjects[this.state.thisId + 2]
                    });
                }
            }
        }, 1000);//do the change project function after the animaiton

    }

    render() {
        console.log('thisproject', this.state.thisProject);
        const {id, name, tags, titleImg, meta} = this.state.thisProject;
        return (
            <div className="Slide">
                <div className='wrapper-selectedImg'>
                    <div
                        className={'innerwrapper leftImg' + (this.state.showLeftTransition ? ' leftAnimation' : '')}
                        style={{
                            backgroundImage: `url(${this.state.leftProject.titleImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                    </div>
                    <div
                        className={'innerwrapper thisImg' + (this.state.showRightTransition ? ' rightAnimation' : '') + (this.state.showLeftTransition ? ' leftAnimation' : '')}
                        style={{
                            backgroundImage: `url(${this.state.thisProject.titleImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                    </div>
                    <div
                        className={'innerwrapper rightImg' + (this.state.showRightTransition ? ' rightAnimation' : '')}
                        style={{
                            backgroundImage: `url(${this.state.rightProject.titleImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}>
                    </div>
                </div>

                <div className='wrapper-name'>
                    <div
                        className={'midwrapper-name' + ((this.state.showRightTransition || this.state.showLeftTransition) ? ' nameAnimation' : '')}>
                        <Link to={'/project/' + id}>
                            <div className='innerwrapper-name'>
                                <h1>{name}</h1>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className={'wrapper-meta'+((this.state.showRightTransition || this.state.showLeftTransition) ? ' metaAnimation' : '')}>
                    <p>{meta}</p>
                </div>

                <div className='wrapper-buttons'>
                    <button className='control-left' onClick={this.lastProject}><Icon type="left" style={{
                        fontSize: 32,
                        color: '#f5f5f5'
                    }}/>
                    </button>
                    <button className='control-right' onClick={this.nextProject}><Icon type="right" style={{
                        fontSize: 32,
                        color: '#f5f5f5'
                    }}/>
                    </button>
                </div>

            </div>
        );
    }
}

export default Slide;