import React, {Component} from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';
import {Row, Col, Icon} from 'antd';


class Footer extends Component {
    render() {
        return (
            <footer className="Footer">
                <h2><b>Hi I am Nannnn!</b></h2>
                <Row type="flex" justify="space-between" align="top" className='rowWrapper'>
                    <Col span={8}>
                        <div className='widget-1'>

                            <p>
                                I am an enthusiastic student driven by the motivation of exploring interaction design,
                                experience design, and generative art.
                            </p>
                            <p>
                                I have passions for quality, boldness, and optimism to be inspired by the unknown,
                                problem solving with both creativity and research while keeping the actual users in mind
                                to create a better experience.
                            </p>
                            <p>
                                {/*Check my <a href="https://nanzhaoportfolio.files.wordpress.com/2018/03/nanzhaoresume-201803.pdf" target="_blank" rel="noopener noreferrer">CV</a> or go to <Link to="/about">About*/}
                                {/*Page</Link> to know more me. :D*/}
                                Check my <a href="/" target="_blank" rel="noopener noreferrer">CV</a> or go to <Link to="/about">About
                                Page</Link> to know more me. :D
                            </p>
                        </div>
                    </Col>
                    <Col span={6} offset={4}>
                        <div className='widget-2'>
                            <h3>What Keeps Me Busy Now</h3>
                            {/*<p>Write weekly design blog -> <a href='https://zhuanlan.zhihu.com/shejiyiwenlu' target="_blank" rel="noopener noreferrer">「设计异闻录」</a></p>*/}
                            <p>Cooperating with an artist HYMN and programming animations to make them interactive ->
                                TWO SIDES LAB</p>
                            <p>Having fun on react.js & three.js</p>
                            <p>Enjoying my last semester in NYU Shanghai. :)</p>
                        </div>
                    </Col>
                    <Col span={4} offset={2}>
                        <div className='widget-3'>
                            <h3>Contact Me</h3>
                            <p>nanzhao@nyu.edu</p>
                            <p>+86 131-6233-5282</p>
                            <p>wechat: 13162335282</p>
                            <div className='socialMedia'>
                                <a href='https://www.linkedin.com/in/nanzhao-nz' target="_blank" rel="noopener noreferrer"><Icon type="linkedin" style={{ fontSize: 24, color:'#78808C'}}/></a>
                                <a href='https://www.zhihu.com/people/nannz' target="_blank" rel="noopener noreferrer"><Icon type="zhihu" style={{ fontSize: 24, color:'#78808C'}}/></a>
                                <a href='https://github.com/nannz' target="_blank" rel="noopener noreferrer"><Icon type="github" style={{ fontSize: 24, color:'#78808C'}}/></a>
                                <a href='https://www.instagram.com/nan_nzz/' target="_blank" rel="noopener noreferrer"><Icon type="instagram" style={{ fontSize: 24, color:'#78808C'}}/></a>
                                <a href='https://nanzhaodocumentations.wordpress.com/' target="_blank" rel="noopener noreferrer"><Icon type="book" style={{ fontSize: 24, color:'#78808C'}}/></a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </footer>
        );
    }
}

export default Footer;
