import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { AppUser } from '../Auth'
import { getCurrentUser } from '../Auth/AppUser'
import { navigate } from '@reach/router'
import { UpdateUserForm, FirstName, LastName, Email } from '../Forms/AuthForms'
import NumberFormat from 'react-number-format'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppContent } from '../Layout'
import Banner from '../Layout/banner'
import Seo from '../Nav/seo'
import { confirmAlert } from 'react-confirm-alert'

import 'react-confirm-alert/src/react-confirm-alert.css'

import IndexSeoImage from '../../assets/images/banner.jpg'

class EditProfile extends React.Component {
    user = getCurrentUser()

    state = {
        first_name: this.user.name,
        last_name: this.user.given_name,
        username: ``,
        password: ``,
        email: this.user.email,
        phone_number: this.user.phone_number,
        website: this.user.website,
        stage: 0,
        error: '',
        loading: false,
        deleting: false,
    }

    handleUpdate = event => {
        if (event.target.name === 'first_name') {
            this.setState({
                [event.target.name]: event.target.value,
                username: event.target.value,
                error: '',
            })
        }
        if (event.target.name === 'last_name') {
            this.setState({
                [event.target.name]: event.target.value,
                username: event.target.value,
                error: '',
            })
        }
        if (event.target.name === 'email') {
            this.setState({
                [event.target.name]: event.target.value,
                username: event.target.value,
                error: '',
            })
        }
        if (event.target.name === 'phone_number') {
            this.setState({
                [event.target.name]: event.target.value.replace(/\D/g, ''),
                error: '',
            })
        }
        if (event.target.name === 'website') {
            this.setState({
                [event.target.name]: event.target.value,
                username: event.target.value,
                error: '',
            })
        }
        this.setState({
            [event.target.name]: event.target.value,
            error: '',
        })
    }
    
    handleDelete() {
        Auth.currentAuthenticatedUser()
        .then((removeUser = CognitoUser) => new Promise((res, rej) => {
            const { logout } = AppUser
            removeUser.deleteUser(error => {
                if (error) {
                    return rej(error)
                }
                if (this.props.onSessionChange) {               
                    this.props.onSessionChange()
                }
                logout(() => navigate('/signin'))
                res()
            });
        }))
        .catch(this.onError)
    }

    saveSettings = async e => {
        e.preventDefault()
        const currentUser = await Auth.currentAuthenticatedUser()
        const settings = {
            name: this.state.first_name,
            given_name: this.state.last_name,
            email: this.state.email,
            phone_number: this.state.phone_number,
            website: this.state.website
        }
        try {
            this.setState({ loading: true })
            await Auth.updateUserAttributes(currentUser, settings)
            const updatedUser = await Auth.currentAuthenticatedUser({ bypassCache: true })
            const { setUser } = AppUser
            const userInfo = {
                ...updatedUser.attributes,
                username: updatedUser.username,
            }
            setUser(userInfo)
            this.setState({ loading: false })
            navigate('/profile')
        } catch (err) {
            this.setState({ error: err, loading: false })
            console.log('Error: ', err)
        }
    }

    deleteAccount = async e => {
        e.preventDefault()
        this.setState({ deleting: true })
        const deleteOptions = {
            title: 'Delete Account?',
            message: 'WARNING! All information associated with your account will be deleted. Are you sure you want to delete your account?',
            buttons: [
                {
                    label: 'Delete',
                    onClick: () => ''
                },
                {
                    label: 'Cancel',
                    onClick: () => ''
                }
            ],
            customUI: ({ onClose }) => 
                <div className='react-confirm-alert-body'>
                    <h2>Delete Account?</h2>
                    <p><strong className='redColor'>WARNING!</strong> All information associated with your account will be deleted. Are you sure you want to delete your account?</p>
                    <div className='react-confirm-alert-button-group'>
                        <button onClick={() => {this.handleDelete(); onClose();}}>Delete</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                </div>,
            closeOnEscape: true,
            closeOnClickOutside: true
        }
        confirmAlert(deleteOptions)
        this.setState({ deleting: false })
    }

    render() {
        return (
            <div className='wrapper'>
                <Seo title={`Edit Profile | Haberdäsh Design`} description={`Haberdäsh Design is a full branding and web development services dedicated to tailoring the user experience your website deserves.`} image={IndexSeoImage} />
                <Banner title={`Edit Profile`} pageStyle={`login`} />
                <AppContent>
                    <Container id='content'>
                        <Row>
                            <Col xs='12' sm='12' md='12' lg='12'>
                                <UpdateUserForm title='Edit Profile' subtitle='Update your account information below.' error={this.state.error}>
                                    <FirstName handleUpdate={this.handleUpdate} name={this.state.first_name} autoComplete='off' />
                                    <LastName handleUpdate={this.handleUpdate} name={this.state.last_name} autoComplete='off' />
                                    <Email handleUpdate={this.handleUpdate} email={this.state.email} autoComplete='on' />
                                    <fieldset className='form-group'>
                                        <FontAwesomeIcon className='formIcon' icon='phone' />
                                        <NumberFormat placeholder='+1 (###) ###-####' onChange={this.handleUpdate} name='phone_number' value={this.state.phone_number} type='tel' className='form-control' format='+1##########' mask='_' />
                                    </fieldset>
                                    <fieldset className='form-group'>
                                        <FontAwesomeIcon className='formIcon' icon='globe' />
                                        <input name='website' aria-label='website' placeholder='http://yoursite.com' type='text' onChange={this.handleUpdate} value={this.state.website || ''} />
                                    </fieldset>
                                    <button onClick={e => this.saveSettings(e)} type='submit' className='btn btn-primary btn-block center' disabled={this.state.loading}>
                                    {this.state.loading ? null : 'Save Settings'}
                                    {this.state.loading && (
                                        <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                                    )}
                                    </button>
                                    <button onClick={e => this.deleteAccount(e)} type='submit' className='btn btn-primary btn-block center' disabled={this.state.deleting}>
                                    {this.state.deleting ? null : 'Delete Profile'}
                                    {this.state.deleting && (
                                        <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                                    )}
                                    </button>
                                </UpdateUserForm>
                            </Col>
                        </Row>
                    </Container>
                </AppContent>
            </div>
        )
    }
}

export default EditProfile
