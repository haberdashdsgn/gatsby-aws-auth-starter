import { StaticQuery, graphql } from 'gatsby'
import { Container, Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import React from 'react'

const Footer = ({ siteTitle, author, email }) => (
    <StaticQuery
    query={graphql`
        query FooterMeta {
            site {
                siteMetadata {
                    title
                    author
                    emailUrl
                    phone
                }
            }
        }
    `}
    render={data => (
        <>
        <footer>
            <Container>
                <Row>
                    <Col xs='12' sm='12' md='7' lg='7'>
                        <p>Copyright &copy; {new Date().getFullYear()} {siteTitle}. Created by <a href={`mailto:${email}`}>{author}</a>. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
        </>
    )}
    />
)

Footer.propTypes = {
    siteTitle: PropTypes.string,
    author: PropTypes.string,
    email: PropTypes.string
}

Footer.defaultProps = {
    siteTitle: ``,
    author: ``,
    email: ``
}

export default Footer
