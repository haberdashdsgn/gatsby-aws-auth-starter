# Gatsby AWS Auth Site Starter with Blog
Version 1.0.0

Documentation for Example Gatsby AWS Auth Site Starter and the core packages and tools utilized in the build of the project. Requires Node v14.17 and Yarn v1.22.5 and up. You must also install the Gatsby CLI and Amplify CLI.

### Project Breakdown ###

The website example is built with GatsbyJS and ReactJS frameworks using Netlify for hosting and Amplify for authentication. All settings and configuration files are within the repository.

### How do I get set up? ###

All necessary packages are found within the package.json file and utilize yarn to install the nodes.

```
yarn install
```

Configure, initialize, then deploy your AWS Auth settings. You can log into your AWS account and check Cognito afterwards to make sure you see the new userpool.

```
amplify configure   // follow the protocols to set up a Cognito userpool
amplify init        // initialize inside your project
amplify add auth    // add authentication to your project, if not connecting to an existing userpool
amplify push        // deploy the configuration to the AWS account
```

You can use the following scripts to run the site in development or build for production.

```
yarn dev     // initiate the development environment and run local browser
yarn build   // build the web application into the public folder
yarn clean   // cleans the cache and public files
gatsby clean // deep clean of all cache, public, and various node caches
```

### Contact Information ###

Design and development by Anthony Rizzo
Email rizzo@haberdashdesign.com