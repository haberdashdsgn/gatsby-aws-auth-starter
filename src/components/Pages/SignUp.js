import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { navigate } from '@reach/router'
import { Link } from 'gatsby'
import { Auth } from 'aws-amplify'
import NumberFormat from 'react-number-format'
import { AuthForm, Email, Password, ConfirmationCode } from '../Forms'
import Banner from '../Layout/banner'
import Seo from '../Nav/seo'

import IndexSeoImage from '../../assets/images/design-table.jpg'

const initialState = {
    username: ``,
    password: ``,
    email: '',
    phone_number: '',
    auth_code: '',
    stage: 0,
    error: '',
    loading: false,
}

class SignUp extends React.Component {
    state = initialState

    handleUpdate = event => {
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
        this.setState({
            [event.target.name]: event.target.value,
            error: '',
        })
    }

    signUp = async e => {
        e.preventDefault()
        const { username, password, email, phone_number } = this.state
        this.setState({ loading: true })
        try {
            await Auth.signUp({
                username,
                password,
                attributes: { email, phone_number },
            })
            this.setState({ stage: 1, loading: false })
        } catch (err) {
            this.setState({ error: err, loading: false })
            console.log('error signing up...', err)
        }
    }

    resendCode = async e => {
        e.preventDefault()
        const { email } = this.state
        this.setState({ loading: true })
        try {
            await Auth.resendSignUp(email)
            this.setState({ stage: 1, loading: false })
        } catch (err) {
            this.setState({ error: err, loading: false })
            console.log('error resending code...', err)
        }
    }

    verify = async e => {
        e.preventDefault()
        const { email, auth_code } = this.state
        this.setState({ loading: true })
        try {
            await Auth.verifyCurrentUserAttributeSubmit(email, auth_code)
            this.setState({ loading: false })
            navigate('/signin')
        } catch (err) {
            this.setState({ error: err, loading: false })
            console.log('error signing up...', err)
        }
    }

    confirmSignUp = async e => {
        e.preventDefault()
        this.setState({ loading: true })
        const { email, auth_code } = this.state
        try {
            this.setState({ loading: true })
            await Auth.confirmSignUp(email, auth_code)
            this.setState({ loading: false })
            navigate('/signin')
        } catch (err) {
            this.setState({ error: err, loading: false })
            console.log('Error confirming signing up...', err)
        }
    }

    render() {
        if (this.state.stage === 0) {
            return (
                <div className='wrapper'>
                    <Seo title={`Sign Up | Haberdäsh Design`} description={`Haberdäsh Design is a full branding and web development services dedicated to tailoring the user experience your website deserves.`} image={IndexSeoImage} />
                    <Banner title={`Sign Up`} pageStyle={`login`} />
                    <Container id='content'>
                        <Row>
                            <Col xs='12' sm='12' md='12' lg='12'>
                                <AuthForm title="Create a new account" error={this.state.error}>
                                    <Email handleUpdate={this.handleUpdate} email={this.state.email} autoComplete="off" />
                                    <Password handleUpdate={this.handleUpdate} password={this.state.password} autoComplete="off" />
                                    <fieldset className="form-group">
                                        <FontAwesomeIcon className='formIcon' icon='phone' />
                                        <NumberFormat placeholder="+1 (###) ###-####" onChange={this.handleUpdate} name="phone_number" value={this.state.phone_number} type="tel" className="form-control" format="+1##########" mask="_" />
                                    </fieldset>
                                    <button onClick={e => this.signUp(e)} type="submit" className='btn btn-primary btn-block center' disabled={this.state.loading}>
                                        {this.state.loading ? null : 'Create Account'}
                                        {this.state.loading && (
                                            <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                                        )}
                                    </button>
                                    <div className='spacer10'></div>
                                    <p className='text-center'>Have an account? <Link to='/signin'>Sign in</Link></p>
                                </AuthForm>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
        return (
            <div>
                <Seo title={`Sign Up | Haberdäsh Design`} description={`Haberdäsh Design is a full branding and web development services package dedicated to solving the problems of the world, one design at a time.`} image={IndexSeoImage} />
                <Banner title={`Sign Up`} pageStyle={`login`} />
                <Container id='content'>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12'>
                            <AuthForm>
                                <Email handleUpdate={this.handleUpdate} email={this.state.email} autoComplete="off" />
                                <ConfirmationCode handleUpdate={this.handleUpdate} auth_code={this.state.auth_code} autoComplete="off" />
                                <button onClick={e => this.confirmSignUp(e)} type="submit" className='btn btn-primary btn-block center' disabled={this.state.loading}>
                                    {this.state.loading ? null : 'Confirm'}
                                    {this.state.loading && (
                                        <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true' />
                                    )}
                                </button>
                                <p className='text-center'>Have an account? <Link to='/signin'>Sign in</Link></p>
                                <div>
                                <p className='text-center'>Lost your code?</p>
                                <button className='btn btn-link' onClick={e => this.resendCode(e)} disabled={this.state.loading}>Resend Code</button>
                                </div>
                            </AuthForm>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default SignUp
