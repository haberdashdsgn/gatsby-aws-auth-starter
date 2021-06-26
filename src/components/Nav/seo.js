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
                    google {
                        googleSiteVerification
                        googleAnalyticsId
                        googleTagManager
                    }
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
                    name: `google-site-verification`,
                    content: `${site.siteMetadata.google.googleSiteVerification}`,
                },
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
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${site.siteMetadata.google.googleAnalyticsId}`}></script>
            <script>
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${site.siteMetadata.google.googleAnalyticsId}');
                `}
            </script>
            <script async src={`https://www.googletagmanager.com/gtm.js?id=${site.siteMetadata.google.googleTagManager}`}></script>
            <script>
                {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','${site.siteMetadata.google.googleTagManager}');
                `}
            </script>
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