# Gatsby AWS Auth Site Starter with Blog
Version 1.0.1

Documentation for Gatsby AWS Auth Site Starter and the core packages utilized in the build of the project. This website example is built with GatsbyJS and ReactJS frameworks using Netlify for hosting and Amplify for authentication.

### Installation ###

Requires Node v14.17 and Yarn v1.22.5 and up. You must also install the Gatsby CLI and Amplify CLI.

```
npm i -g @aws-amplify/cli gatsby-cli
```

All necessary packages are found within the package.json file and should use yarn to install to avoid any GraphQL dependency issues.

```
yarn install
```

### How do I get set up? ###

Configure, initialize, then deploy your AWS Auth settings. You can log into your AWS account and check Cognito afterwards to make sure you see the new userpool.

NOTE: this example uses **Email** as user signin method. You can customize the template as you wish, but make sure to update the appropriate component Page.

```
amplify configure   // follow the protocols to set up a Cognito userpool
amplify init        // initialize inside your project
amplify add auth    // add authentication to your project, if not connecting to an existing userpool
amplify push        // deploy the configuration to the AWS account
```

You can use the following scripts to run the site in development, build for production, or clean directories.

```
yarn dev            // initiate the development environment and run locally in the browser
yarn build          // build the web application into the public folder
yarn serve          // serve the local website from the ./public directory created by build
yarn clean          // cleans the cache and public files
gatsby clean        // deep clean of all cache, public, and various node caches
```

### Contact Information ###

Design and development by Anthony Rizzo<br />
Email rizzo@haberdashdesign.com