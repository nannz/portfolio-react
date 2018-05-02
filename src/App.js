import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectsWorkPage from './pages/ProjectsWorkPage';
import ProjectsAllPage from './pages/ProjectsAllPage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/About';
import ProjectPage from './pages/ProjectPage';
import ProjectPageInfiniteLoad from './pages/ProjectPageInfiniteLoad';
import Slide from './components/Slide'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import data from './data';
import QueueAnim from 'rc-queue-anim';
import ReactDOM from 'react-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        console.log('data.projects', data.projects[0]);
    }

    render() {
        return (
            <Router>
                <div className="App">
                    {/*<div className='wrapper-header'>*/}
                        <Header/>
                    {/*</div>*/}

                    <div className="pages">
                        {/*<Route exact path="/" component={LandingPage}/>*/}
                        <Route exact path="/" component={Slide}/>
                        <Route path="/ux-work" component={ProjectsWorkPage}/>
                        <Route path="/experimental-projects" component={ProjectsAllPage}/>
                        <Route path="/about" component={AboutPage}/>
                        <Route path="/project/:id" render={(props) => {

                            const project = data.projects.find((p) =>
                                parseInt(props.match.params.id) === p.id
                            );
                            return <ProjectPage project={project}/>
                        }}
                        />
                        <Route path="/infiniteLoadTest" component={ProjectPageInfiniteLoad}/>
                    </div>
                    {/*<div className='wrapper-footer'>*/}
                        <Footer/>
                    {/*</div>*/}
                </div>


            </Router>
        );
    }
}

export default App;
