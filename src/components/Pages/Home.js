import React from 'react'
import ReactGA from 'react-ga'
import { Container, Row, Col } from 'react-bootstrap'
import { AppContent } from '../Layout'
import Banner from '../Layout/banner'
import { Seo } from '../Nav/seo'

import IndexSeoImage from '../../assets/images/banner.jpg'

const Home = () => {
    return (
        <div className="wrapper">
            {typeof window !== `undefined` ? ReactGA.pageview(window.location.pathname + window.location.search) : ''}
            <Seo title={`Example Gatsby AWS Auth Site Starter`} description={``} image={IndexSeoImage} />
            <Banner title={`User Portal`} pageStyle={`login`} />
            <AppContent>
                <Container id='content'>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12'>
                            <h2>You are now logged in to the user's homepage.</h2>
                        </Col>
                    </Row>
                </Container>
            </AppContent>
        </div>
    )
}

export default Home
