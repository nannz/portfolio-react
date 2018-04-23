import React, {Component} from 'react';
import './Header.css';
import logo from '../file/img/logo-nan.jpg'
import {Link} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state={
            onClickValue: '0'
        };
        this.onClickLink = this.onClickLink.bind(this);
    }

    onClickLink(e){
        console.log('e.target',e.target.name);//name, href
        // console.log('e.target.value',e.target.value);
        this.setState({
            onClickValue:e.target.name
        })
    }

    //className={this.state.onClickValue===1?"active":''
    render() {
        console.log(typeof this.state.onClickValue);//string
        return (
            <header className="Header">
                <div className='header-left' onClick={this.onClickLink}>
                    <Link to="/" value='0'>
                    <img src={logo} className='logoImg' alt="logo" />
                    </Link>
                </div>
                <div className='header-right'>
                    <ul>
                        {/*<li><Link to='/' className='testAnimation nav-underline-from-left'>HOME</Link></li>*/}
                        <li onClick={this.onClickLink} >
                            <Link to="/ux-work" name='1' className={'navLink nav-underline-from-left' + ((this.state.onClickValue.toString() ==='1') ? " active":'')}>UX WORK</Link>
                            {/*<Link to="/ux-work" name='1' className='navLink nav-underline-from-left'>UX WORK</Link>*/}
                        </li>
                        <li  onClick={this.onClickLink} >
                            <Link to="/experimental-projects" name='2' className={'navLink nav-underline-from-left' + ((this.state.onClickValue.toString() ==='2') ? " active":'')}>EXPERIMENTAL PROJECTS</Link>
                            {/*<Link to="/experimental-projects" name='2' className='navLink nav-underline-from-left'>EXPERIMENTAL PROJECTS</Link>*/}
                        </li>
                        <li onClick={this.onClickLink} >
                            <Link to="/about" name='3' className={'navLink nav-underline-from-left' + ((this.state.onClickValue.toString() ==='3') ? " active":'')} >ABOUT</Link>
                            {/*<Link to="/about" name='3' className='navLink nav-underline-from-left' >ABOUT</Link>*/}
                        </li>
                    </ul>
                </div>
            </header>


        );
    }
}

export default Header;
