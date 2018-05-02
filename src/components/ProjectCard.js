import React, {Component} from 'react';
import './ProjectCard.css';
import {Link} from 'react-router-dom';
import thumbImg from '../file/img/thumb-test.gif'
import {CSSTransition} from 'react-transition-group';
import LazyLoad from 'react-lazyload';
class ProjectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCard: false
    }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({showCard: true})
        }, 10);
    }

    render() {
        const {id, name, thumbImg, meta, category, tags, ...other} = this.props;
        const thumbUrl = 'file/img/constellation-NOC/thumbImg.gif';

        const tagsLine = tags.map((t, i) => {

            if (tags.indexOf(t) == tags.length - 1) {
                return <span key={i}>{t}</span>
            } else {
                return (
                    <span key={i}>{t + ' | '}</span>
                )
            }
            ;
        });

        const projectLink = '/projects/' + id.toString();
        // console.log('link', '/projects/'+id.toString());
        //to={'/contacts/' + this.props.id}
        return (
            <CSSTransition
                in={this.state.showCard}
                timeout={300}
                classNames="fadeInUp"
                mountOnEnter
                unmountOnExit
                onExited={() => {
                }}
            >
                <div className="ProjectCard fadeInUp">
                    <Link to={'/project/' + id} className='fadeInUp'>
                        <div className="thumbWrapper"
                        >
                            <LazyLoad height={300} once offset={[-100, 0]}
                                      placeholder={<div className='img-placeholder'></div>}
                                      debounce={500}
                            >
                                <img src={thumbImg} alt="thumb"/>{/*use background later. see the css for the slider.*/}
                            </LazyLoad>
                        </div>
                        <div className="container">
                            <h4>{name}</h4>
                            {/*<p>{tags}</p>*/}
                            {tagsLine}
                        </div>
                    </Link>
                </div>
            </CSSTransition>

        );
    }
}

ProjectCard.defaultProps = {
    name: 'projectName'
};

export default ProjectCard;
