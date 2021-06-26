import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import { Auth } from 'aws-amplify'
import { AppUser } from '../Auth'
import { AuthForm, Email, Password } from '../Forms'
import Banner from '../Layout/banner'
import Seo from '../Nav/seo'

import IndexSeoImage from '../../assets/images/banner.jpg'

class SignIn extends React.Component {
    state = {
        username: ``,
        email: ``,
        password: ``,
        error: ``,
        loading: false,
    }

    handleUpdate = event => {
        if (event.target.name === 'email') {
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

    login = async e => {
        const { setUser } = AppUser
        e.preventDefault()
        const { username, password } = this.state
        try {
            this.setState({ loading: true })
            await Auth.signIn(username, password)
            const user = await Auth.currentAuthenticatedUser()
            const userInfo = {
                ...user.attributes,
                username: user.username,
            }
            setUser(userInfo)
            this.setState({ loading: false })
            navigate('/home')
        } catch (err) {
            this.setState({ error: err, loading: false })
            console.log('Error: ', err)
        }
    }

    render() {
        return (
            <div className='wrapper'>
                <Seo title={`Sign In | Haberdäsh Design`} description={`Haberdäsh Design is a full branding and web development services dedicated to tailoring the user experience your website deserves.`} image={IndexSeoImage} />
                <Banner title={`Sign In`} pageStyle={`login`} />
                <Container id='content'>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12'>
                            <AuthForm title="Sign in to your account" error={this.state.error}>
                                <Email handleUpdate={this.handleUpdate} email={this.state.email} autoComplete="on" />
                                <Password handleUpdate={this.handleUpdate} password={this.state.password} autoComplete="on" />
                                <fieldset>
                                    <p className="text-center">Forgot your password? <Link to="/reset">Reset password</Link></p>
                                </fieldset>
                                <button onClick={e => this.login(e)} type="submit" className="btn btn-primary btn-block center" disabled={this.state.loading}>
                                {this.state.loading ? null : 'Sign In'}
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                )}
                                </button>
                                <div className='spacer10'></div>
                                <fieldset>
                                    <p className="text-center">No account? <Link to="/signup">Create account</Link></p>
                                </fieldset>
                            </AuthForm>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default SignIn
