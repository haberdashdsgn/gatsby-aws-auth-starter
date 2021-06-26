import React from 'react'
import { Link } from 'gatsby'
import { Col } from 'react-bootstrap'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const PostLink = ({ post }) => (
    <Col className='post-item' lg='12'>
        <Col className='post-img' xs='12' sm='4' md='4' lg='4'>
            <GatsbyImage image={getImage(post.frontmatter.featuredImage)} alt={post.frontmatter.title} />
        </Col>
        <Col className='post-content' xs='12' sm='8' md='8' lg='8'>
            <h3>
                <Link to={post.frontmatter.slug}>
                    {post.frontmatter.title}
                </Link>
            </h3>
            <p className='date'><em>{post.frontmatter.date}</em></p>
            <p>{post.frontmatter.description}</p>
            <Link to={post.frontmatter.slug}><button className='btn btn-primary'>Keep Reading</button></Link>
        </Col>
    </Col>
)

export default PostLink