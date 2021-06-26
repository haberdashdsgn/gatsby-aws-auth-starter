import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Link } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Hero extends React.Component {
    render() {
        return (
            <section id='banner' className='homepage'>
                <Container>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12'>
                            <h1 className='text-center'>Example Gatsby AWS Auth Site Starter</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default Hero