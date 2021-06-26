import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import ReactGA from 'react-ga'
import { Seo } from '../Nav'
import Hero from '../Layout/hero'

import IndexSeoImage from '../../assets/images/banner.jpg'

const IndexPage = () => (
    <StaticQuery
    query={graphql`
        query HomeMeta {
            site {
                siteMetadata {
                    title
                    description
                }
            }
        }
    `}
    render={data => (
        <div>
            {typeof window !== `undefined` ? ReactGA.pageview(window.location.pathname + window.location.search) : ''}
            <Seo title={`${data.site.siteMetadata.title}`} description={data.site.siteMetadata.description} image={IndexSeoImage} keywords={[``]} />
            <Hero />
        </div>
    )}
    />
)

export default IndexPage