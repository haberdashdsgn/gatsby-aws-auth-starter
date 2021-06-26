import React from 'react'
import { Link } from 'gatsby'
import { Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Navigation from 'react-bootstrap/Nav'

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.page = this.props.page
        this.state = {isToggleOn: false}

        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }))
    }
    
    render() {
        return (
            <header>
                <Navbar id='header' className='navbar-default' expand='xs' fixed='top'>
                    <Container>
                        <div className='navContainer'>
                            <Navbar.Brand className='navbar-header'>
                                <Link to='/'>Home</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle id='hamburger' aria-controls='navigator' className={`hamburger hamburger--slider ${this.state.isToggleOn ? 'is-active' : ''}`} onClick={this.handleClick}>
                                <div className='hamburger-box'>
                                    <div className='hamburger-inner'></div>
                                </div>
                            </Navbar.Toggle>
                            <Navbar.Collapse id='navigator'>
                                <Navigation id='navigation' activeKey={this.page}>
                                    <Navigation.Item>
                                        <Navigation.Link href='/blog/' eventKey='blog'>Blog</Navigation.Link>
                                    </Navigation.Item>
                                    <Navigation.Item>
                                        <Navigation.Link href='/signin' eventKey='signin'>Sign In</Navigation.Link>
                                    </Navigation.Item>
                                    <Navigation.Item>
                                        <Navigation.Link href='/signup' eventKey='signup'>Sign Up</Navigation.Link>
                                    </Navigation.Item>
                                </Navigation>
                            </Navbar.Collapse>     
                        </div>
                    </Container>
                </Navbar>
            </header>
        )
    }
}

export default Nav
