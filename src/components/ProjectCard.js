import React, {Component} from 'react';
import './ProjectCard.css';
import {Link} from 'react-router-dom';
import thumbImg from '../file/img/thumb-test.gif'

// import

class ProjectCard extends Component {

    render() {
        const {name, thumbImg,meta, category, tags, ...other} = this.props;
        const thumbUrl = 'file/img/constellation-NOC/thumbImg.gif';

        const tagsLine = tags.map((t, i) => {
            console.log('t', t);
            if (tags.indexOf(t) == tags.length - 1) {
                return <span key={i}>{t}</span>
            } else {
                return (
                    <span key={i}>{t + ' | '}</span>
                )
            }
            ;
        });


        return (
            <div className="ProjectCard card-reveal">
                <Link to='/project/1'>
                    <div className="thumbWrapper"
                         style={{
                             // backgroundImage: `url(${thumbUrl})`,
                             // backgroundSize: 'cover',
                             // backgroundPosition: 'center',
                         }}
                    >
                        <img src={thumbImg} alt="thumb"/>{/*use background later. see the css for the slider.*/}

                    </div>
                    <div className="container">
                        <h4>{name}</h4>
                        {/*<p>{tags}</p>*/}
                        {tagsLine}
                    </div>
                </Link>

            </div>

        );
    }
}

ProjectCard.defaultProps = {
    name: 'projectName'
};

export default ProjectCard;
