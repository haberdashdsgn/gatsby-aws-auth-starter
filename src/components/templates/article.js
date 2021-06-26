import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import { Layout } from '../Layout/AppLayouts'
import Banner from '../Layout/banner'
import Seo from '../Nav/seo'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { AppUser } from '../Auth'

export default function Article({ data }) {
    const { markdownRemark } = data
    const { frontmatter, html } = markdownRemark
    const featuredImgFluid = getImage(frontmatter.featuredImage)
    const { isLoggedIn } = AppUser
    return (
        <>
        <Layout page='article' isUserNav={!isLoggedIn() ? false : true}>
            <Seo title={frontmatter.title} description={frontmatter.description} image={featuredImgFluid.images.fallback.src} keywords={[``]} />
            <Banner title={frontmatter.title} subTitle={frontmatter.date} titleColor='#FFFFFF' subTitleColor='#FFFFFF' pageStyle={`article`} />
            <section>
                <Container className='post-container'>
                    <Row>
                        <Col className='post' lg='12'>
                            <h3>{frontmatter.description}</h3>
                            <GatsbyImage image={featuredImgFluid} alt={frontmatter.title} />
                            <p className='caption'><em>{frontmatter.caption}</em></p>
                            <div className='post-content' dangerouslySetInnerHTML={{ __html: html }} />
                        </Col>
                    </Row>
                </Container>
            </section>
        </Layout>
        </>
    )
}

export const pageQuery = graphql`
query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
        html
        frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            description
            featuredImage {
                childImageSharp {
                    gatsbyImageData(width: 1200)
                }
            }
            caption
        }
    }
}
`