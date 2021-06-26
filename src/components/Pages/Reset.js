import React from 'react'
import { navigate } from '@reach/router'
import { Link } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import { AuthForm, Email, Password, ConfirmationCode } from '../Forms'
import Banner from '../Layout/banner'
import Seo from '../Nav/seo'

import IndexSeoImage from '../../assets/images/banner.jpg'

const initialState = {
    email: ``,
    auth_code: ``,
    password: ``,
    error: ``,
    loading: false,
    stage: 0,
}

class Reset extends React.Component {
    state = initialState

    handleUpdate = event => {
        this.setState({
            [event.target.name]: event.target.value,
            error: '',
        })
    }

    reset = async e => {
        e.preventDefault()
        const { email } = this.state
        try {
            this.setState({ loading: true })
            await Auth.forgotPassword(email)
            console.log('forgotPassword')
            this.setState({ loading: false, stage: 1 })
        } catch (err) {
            this.setState({ error: err, loading: false })
            console.log('error...: ', err)
        }
    }

    confirmReset = async e => {
        e.preventDefault()
        const { email, auth_code, password } = this.state
        this.setState({ loading: true })
        Auth.forgotPasswordSubmit(email, auth_code, password)
        .then(data => {
            console.log(data)
            this.setState({ loading: false })
        })
        .then(() => navigate('/signin'))
        .catch(err => {
            console.log(err)
            this.setState({ error: err, loading: false })
        })
    }

    render() {
        if (this.state.stage === 0) {
            return (
                <div className='wrapper'>
                    <Seo title={`Reset Password | Haberdäsh Design`} description={`Haberdäsh Design is a full branding and web development services dedicated to tailoring the user experience your website deserves.`} image={IndexSeoImage} />
                    <Banner title={`Password Reset`} pageStyle={`login`} />
                    <Container id='content'>
                        <Row>
                            <Col xs='12' sm='12' md='12' lg='12'>
                                <AuthForm title="Reset your password" error={this.state.error}>
                                    <Email handleUpdate={this.handleUpdate} email={this.state.email} autoComplete="on" />
                                    <button onClick={e => this.reset(e)} type="submit" className="btn btn-primary btn-block" disabled={this.state.loading}>
                                    {this.state.loading ? null : 'Send Code'}
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                    )}
                                    </button>
                                    <p style={{ marginTop: 40 }} className="text-center"><Link to="/signin">Back to Sign In</Link></p>
                                </AuthForm>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }

        return (
            <React.Fragment>
                <Seo title={`Account Confirmation | Haberdäsh Design`} description={`Haberdäsh Design is a full branding and web development services package dedicated to solving the problems of the world, one design at a time.`} image={IndexSeoImage} />
                <Banner title={`Account Confirmation`} pageStyle={`login`} />
                <AuthForm title="Confirm Password Update" error={this.state.error}>
                    <Email handleUpdate={this.handleUpdate} email={this.state.email} autoComplete="on" />
                    <ConfirmationCode handleUpdate={this.handleUpdate} email={this.state.auth_code} autoComplete="off" />
                    <Password handleUpdate={this.handleUpdate} password={this.state.password} autoComplete="on" />
                    <p className="text-center"><Link to="/signin">Back to Sign In</Link></p>
                    <button onClick={e => this.confirmReset(e)} type="submit" className="btn btn-primary btn-block" disabled={this.state.loading}>
                    {this.state.loading ? null : 'Confirm Reset'}
                    {this.state.loading && (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                    )}
                    </button>
                </AuthForm>
                <div>
                    <p className="text-center">Lost your code?</p>
                    <button className="btn btn-link" onClick={e => this.reset(e)} disabled={this.state.loading}>Resend Code</button>
                </div>
            </React.Fragment>
        )
    }
}

export default Reset
