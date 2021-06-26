import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ title, image, description, lang, meta, keywords }) {
    const { site } = useStaticQuery(
    graphql`
        query {
            site {
                siteMetadata {
                    siteUrl
                    title
                    description
                    author
                }
            }
        }
    `
    )

    const metaTitle = title || site.siteMetadata.title
    const metaDescription = description || site.siteMetadata.description

    return (
        <Helmet
            title={metaTitle}
            meta={[
                {
                    property: `og:title`,
                    content: metaTitle,
                },
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:image`,
                    content: `${site.siteMetadata.siteUrl}` + image,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                {
                    name: `twitter:image`,
                    content: `${site.siteMetadata.siteUrl}` + image,
                },
            ]
            .concat(
                keywords.length > 0
                    ? {
                        name: `keywords`,
                        content: keywords.join(`, `),
                    }
                    : []
                )
            .concat(meta)}
            htmlAttributes={{
                lang,
            }}
        >
        </Helmet>
    )
}

SEO.defaultProps = {
    title: ``,
    description: ``,
    image: ``,
    lang: `en`,
    meta: [],
    keywords: []
}

SEO.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    keywords: PropTypes.arrayOf(PropTypes.string)
}

export default SEO