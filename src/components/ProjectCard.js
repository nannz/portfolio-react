import React, {Component} from 'react';
import './ProjectCard.css';
import {Link} from 'react-router-dom';
import thumbImg from '../file/img/thumb-test.gif'
import {Card} from 'antd';

const {Meta} = Card;

class ProjectCard extends Component {
    render() {
        //const {name, meta, category, tags, ...other} = this.props;
        return (
            <div className="ProjectCard">
                <div className="thumbWrapper">
                    <img src={thumbImg} alt="thumb"/>
                </div>
                <div className="container">
                    <h4><b>Project Name</b></h4>
                    <p>Interaction Design | Information Architecture</p>
                </div>

            </div>

        );
    }
}

export default ProjectCard;
