import React, {Component} from 'react';
import './Project.css';
import {Link} from 'react-router-dom';
import * as contentful from 'contentful';
import * as Markdown from 'react-markdown';

class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //heroImageURL: '',
            title: '',
            sections: [],
            date:new Date(),
            meta: ''
        };

    }

    componentDidMount() {
        console.log('mounted!');
    }

    render() {
        return (
            <div className="Project">
                <p>hihihihihi</p>
            </div>

        );
    }
}

export default Project;
