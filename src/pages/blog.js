import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Container, Row, Col } from 'react-bootstrap'
import { Layout } from '../components/Layout'
import { AppUser } from '../components/Auth'
import Banner from '../components/Layout/banner'
import { Seo } from '../components/Nav'
import PostLink from "../components/templates/postLink"

import NewsSeoImage from '../assets/images/banner.jpg'

const { isLoggedIn } = AppUser

class NewsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            totalView: 3,
            viewIncrement: 3,
            totalArticles: 0
        }
        this.handlePosts = this.handlePosts.bind(this)
        this.setView = this.setView.bind(this)
    }

    handlePosts(edges) {
        const Posts = edges
            .filter(edge => !!edge.node.frontmatter.date)
            .slice(0,this.state.totalView)
            .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

        return <div>{Posts}</div>
    }

    setView(edges) {
        this.setState({ totalArticles: edges.length })
        var newTotal = this.state.totalView + this.state.viewIncrement
        if (newTotal >= edges.length ) {
            this.setState(state => ({
                totalView: state.totalArticles
            }))
        } else {
            this.setState(state => ({
                totalView: newTotal
            }))
        }
    }

    render() {
        return (
            <StaticQuery
            query={graphql`
                query NewsMeta {
                    site {
                        siteMetadata {
                            title
                        }
                    }
                    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
                        edges {
                            node {
                                id
                                excerpt(pruneLength: 250)
                                frontmatter {
                                    date(formatString: "MMMM DD, YYYY")
                                    slug
                                    title
                                    description
                                    featuredImage {
                                        childImageSharp {
                                            gatsbyImageData(width: 800)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `}
            render={data => (
                <>
                <Layout page='blog' isUserNav={!isLoggedIn() ? false : true}>
                    <Seo title={`Blog`} description={``} image={NewsSeoImage} keywords={[``]} />
                    <Banner title={`Blog`} pageStyle={`blog`} image={NewsSeoImage} />
                    <section id='content'>
                        <Container>
                            <Row>
                                <Col className='center-flex justify-center posts' xs='12' sm='12' md='12' lg='12'>
                                    {this.handlePosts(data.allMarkdownRemark.edges)}
                                    {this.state.totalView !== this.state.totalArticles && <button className="btn btn-reverse fullBtn" onClick={() => this.setView(data.allMarkdownRemark.edges)}>{this.state.isLoading ? 'Loading...' : 'Load More'}</button>}
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </Layout>
                </>
            )}
            />
        )
    }
}

export default NewsPage