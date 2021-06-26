var proxy = require('http-proxy-middleware')

module.exports = {
    siteMetadata: {
        siteUrl: `https://examplesite.com/`,
        title: `Example Gatsby AWS Auth Site Starter`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla enim nisi, tempor id malesuada vitae, tempor id erat. Praesent feugiat magna ut est fringilla, sollicitudin iaculis dolor mollis.`,
        author: `Anthony Rizzo`,
        emailUrl: `rizzo@haberdashdesign.com`,
        phone: `(862) 703-0030`,
    },
    developMiddleware: app => {
        app.use(
        "/api/",
            proxy({
                target: "http://localhost:5000"
            })
        );
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/src/assets/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `articles`,
                path: `${__dirname}/src/assets/articles`,
            },
        },
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                implementation: require(`node-sass`),
                sassOptions: {
                    precision: 8,
                },          
            },
        },
        {
            resolve: `gatsby-plugin-react-svg`,
            options: {
                rule: {
                    include: /vectors/,
                },
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                        },
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-netlify`,
            options: {
              headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
              allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
              mergeSecurityHeaders: true, // boolean to turn off the default security headers
              mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
              mergeCachingHeaders: true, // boolean to turn off the default caching headers
              transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
              generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                display: `standalone`,
                name: `Example Gatsby AWS Auth Site Starter`,
                short_name: `Gatsby AWS Starter`,
                start_url: `/`,
                background_color: `#e9f5a9`,
                theme_color: `#a3b63a`,        
                icon: `src/assets/images/icon.png`,
                icon_options: {
                    purpose: `any maskable`,
                },
            },
        },
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                output: `sitemap.xml`,
            },
        },
    ],
}
