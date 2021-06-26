import React from 'react'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import { Auth } from 'aws-amplify'
import { AppUser } from '../Auth'
import { Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { confirmAlert } from 'react-confirm-alert'

import 'react-confirm-alert/src/react-confirm-alert.css'

class UserNav extends React.Component {
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
        const { logout } = AppUser
        const logoutOptions = {
            title: 'Logout?',
            message: 'Are you sure you want to logout?',
            buttons: [
                {
                    label: 'Logout',
                    onClick: () => ''
                },
                {
                    label: 'Cancel',
                    onClick: () => ''
                }
            ],
            customUI: ({ onClose }) => 
                <div class='react-confirm-alert-body'>
                    <h2>Logout?</h2>
                    <p>Are you sure you want to logout?</p>
                    <div class='react-confirm-alert-button-group'>
                        <button onClick={() => {Auth.signOut().then(logout(() => navigate('/signin'))).catch(err => console.log('error: ', err)); onClose();}}>Logout</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                </div>,
            closeOnEscape: true,
            closeOnClickOutside: true
        }
        function logOut(e) {
            e.preventDefault()
            confirmAlert(logoutOptions)
        }    
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
                                <Nav id='navigation' activeKey={this.page}>
                                    <Nav.Item>
                                        <Nav.Link href='/about/' eventKey='about'>About</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href='/blog/' eventKey='blog'>Blog</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href='/profile' eventKey='profile'>My Account</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href='/' eventKey='logout' onClick={e => logOut(e)}>Logout</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href='/contact/' eventKey='contact'>Contact</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Navbar.Collapse>
                        </div>
                    </Container>
                </Navbar>
            </header>
        )
    }
}

export default UserNav
