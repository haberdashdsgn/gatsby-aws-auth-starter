/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    const articleTemplate = require.resolve(`./src/components/templates/article.js`)

    const result = await graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
            )
            {
                edges {
                    node {
                        frontmatter {
                            slug
                        }
                    }
                }
            }
        }
    `)

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.slug,
            component: articleTemplate,
            context: {
                // additional data can be passed via context
                slug: node.frontmatter.slug,
            },
        })
    })
}

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions

    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/app/)) {
        page.matchPath = `/*`

        // Update the page.
        createPage(page)
    }
}

exports.onCreateWebpackConfig = ({ actions, getConfig, stage }) => {
    const config = getConfig()
    actions.setWebpackConfig({
        resolve: {
            fallback: {
                'crypto': require.resolve('crypto-js'),
            }
        }
    })
    if (stage.startsWith('develop') && config.resolve) {
        config.resolve.alias = {
            ...config.resolve.alias,
            'react-dom': '@hot-loader/react-dom',
        }
    }
}