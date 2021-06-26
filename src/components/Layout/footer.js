import { Link, StaticQuery, graphql } from 'gatsby'
import { Container, Col, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
                    social {
                        facebook {
                            url
                        }
                        twitter {
                            url
                        }
                        instagramUrl
                        linkedInUrl
                    }
                }
            }
        }
    `}
    render={data => (
        <>
        <section id='content' className='lightGrayColorBkgd'>
            <Container>
                <Row>
                    <Col className='footer-top' xs='12' sm='12' md='12' lg='12'>
                        <Col xs='12' sm='6' md='3' lg='3'>
                            <p className='fa text-center'><FontAwesomeIcon className='lightBlueColor' icon='code' /></p>
                            <h3 className='text-center'>About Me</h3>
                            <p className='text-center'>Find out more about me, Anthony Rizzo, the man behind the scenes of Haberd&auml;sh Design.</p>
                            <p className='text-center'><a className='btn btn-primary' href='/about/' role='button'>Discover More</a></p>
                        </Col>
                        <Col xs='12' sm='6' md='3' lg='3'>
                            <p className='fa text-center'><FontAwesomeIcon className='orangeColor' icon='file-alt' /></p>
                            <h3 className='text-center'>Get a Quote</h3>
                            <p className='text-center'>Contact us to get a quote on a print or web project you have in mind, no matter the deadline.</p>
                            <p className='text-center'><a className='btn btn-primary' href='/contact/' role='button'>Contact Us</a></p>
                        </Col>
                        <Col xs='12' sm='6' md='3' lg='3'>
                            <p className='fa text-center'><FontAwesomeIcon className='lightRedColor' icon='paint-brush' /></p>
                            <h3 className='text-center'>Creative Services</h3>
                            <p className='text-center'>Learn more about what's offered in creative design for corporate communications.</p>
                            <p className='text-center'><a className='btn btn-primary' href='/services/' role='button'>View Services</a></p>
                        </Col>
                        <Col xs='12' sm='6' md='3' lg='3'>
                            <p className='fa text-center'><FontAwesomeIcon className='greenColor' icon='leaf' /></p>
                            <h3 className='text-center'>Philanthropy</h3>
                            <p className='text-center'>See all my contributions and donations to help save the world, one design at a time.</p>
                            <p className='text-center'><a className='btn btn-primary' href='/philanthropy/' role='button'>Learn More</a></p>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </section>
        <footer>
            <Container>
                <Row>
                    <Col xs='12' sm='12' md='7' lg='7'>
                        <p><Link to='/'>Home</Link> | <Link to='/about/'>About</Link> | <Link to='/discover/'>Discover</Link> | <Link to='/services/'>Services</Link> | <Link to='/portfolio/'>Portfolio</Link> | <Link to='/privacy/'>Privacy</Link> | <Link to='/terms-conditions/'>Terms &amp; Conditions</Link> | <Link to='/contact/'>Contact</Link></p>
                        <p>Copyright &copy; {new Date().getFullYear()} {siteTitle}. The digital curriculum vitae of <a href={`mailto:${email}`}>{author}</a>. All rights reserved.</p>
                    </Col>
                    <Col xs='12' sm='12' md='5' lg='5'>
                        <div className='social-icons'>
                        <a aria-label='facebook' href={`${data.site.siteMetadata.social.facebook.url}`} target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={['fab', 'facebook-square']} /></a>
                        <a aria-label='twitter' href={`${data.site.siteMetadata.social.twitter.url}`} target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={['fab', 'twitter-square']} /></a>
                        <a aria-label='instagram' href={`${data.site.siteMetadata.social.instagramUrl}`} target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={['fab', 'instagram']} /></a>
                        <a aria-label='linkedin' href={`${data.site.siteMetadata.social.linkedInUrl}`} target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={['fab', 'linkedin']} /></a>
                        </div>
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
