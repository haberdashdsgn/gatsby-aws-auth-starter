import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { getCurrentUser } from '../Auth/AppUser'
import { AppContent } from '../Layout'
import Banner from '../Layout/banner'
import Seo from '../Nav/seo'

import IndexSeoImage from '../../assets/images/design-table.jpg'

const Profile = () => {
    const user = getCurrentUser()
    return (
        <div className='wrapper'>
            <Seo title={`My Account | Haberdäsh Design`} description={`Haberdäsh Design is a full branding and web development services dedicated to tailoring the user experience your website deserves.`} image={IndexSeoImage} />
            <Banner title={`My Account`} pageStyle={`login`} />
            <AppContent>
                <Container id='content'>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12'>
                            <h2>Account Information</h2>
                            <p>Name: {user.name} {user.given_name}</p>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone_number}</p>
                            <p>Website: {user.website}</p>
                            <hr />
                            <p><a className='btn btn-primary' href='/edit-profile' role='button'>Update</a></p>
                        </Col>
                    </Row>
                </Container>
            </AppContent>
        </div>
    )
}

export default Profile
