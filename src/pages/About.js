import React, {Component} from 'react';
import './About.css';
import Header from '../components/Header'
import {Link} from 'react-router-dom';
import data from '../data';
import * as contentful from 'contentful';
import * as Markdown from 'react-markdown';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heroImageURL: '',
            title: '',
            sections: [],
            post: null,//for test
        };
        this.client = contentful.createClient({
            space: 'x20bqc7u7wlt',
            accessToken: 'd8636c69a4dab4809a27e7fe2a013f455a898700315a910a4f6ae38033a857cd'
        });
        this.setPosts = this.setPosts.bind(this);
    }

    setPosts(response) {
        response.items.forEach(post => {//loop all the post
            if (post.fields.title == 'About Me') {
                console.log(post.fields);
                this.setState({
                    post: post,
                    heroImageURL: post.fields.heroImage.fields.file.url,
                    title: post.fields.title,
                    sections: post.fields.section
                })
            }
        });

    }

    componentDidMount() {
        this.client.getEntries({
            'content_type': '2wKn6yEnZewu2SCCkus4as'//the Post content type
        })
            .then(this.setPosts);


    }

    render() {
        const sectionsCopy = this.state.sections.slice();
        console.log(sectionsCopy);
        const sections = sectionsCopy.map((s) => {//each section
            return (
            <section className='aboutpage-section' key={s.fields.sectionId}>
                <h2>{s.fields.title}</h2>
                <Markdown source={s.fields.content} />
                {/*<p>{s.fields.content}</p>/\*/}
            </section>
            )
        });
        return (
            <div className="About">
                {/*<h1>{this.state.title}</h1>*/}
                <div className='about-left'>
                    <img src={this.state.heroImageURL} alt="Image" className='about-heroImage'/>
                    {/*<a href="https://nanzhaoportfolio.files.wordpress.com/2018/03/nanzhaoresume-201803.pdf" target="_blank" className='navLink nav-underline-from-left'>Download Resume</a>*/}
                </div>
                <div>{sections}</div>

            </div>

        );
    }
}

export default About;
