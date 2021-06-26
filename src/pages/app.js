import React from 'react'
import { Router } from '@reach/router'
import { Profile, Home, IndexPage, EditProfile, Reset, SignIn, SignUp } from '../components/Pages'
import PrivateRoute from '../components/Routes/PrivateRoute'
import PublicRoute from '../components/Routes/PublicRoute'
import Seo from '../components/Nav/seo'
import Amplify from 'aws-amplify'
import config from '../aws-exports'

import IndexSeoImage from '../assets/images/banner.jpg'

const App = () => {
    Amplify.configure(config)
    return (
        <div className='wrapper'>
            <Seo title={`Gatsby AWS Auth Site Starter with Blog`} description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla enim nisi, tempor id malesuada vitae, tempor id erat. Praesent feugiat magna ut est fringilla, sollicitudin iaculis dolor mollis.`} image={IndexSeoImage} />
            <Router>
                <PrivateRoute path="/home" component={Home} page={`index`} />
                <PrivateRoute path="/profile" component={Profile} page={`profile`} />
                <PrivateRoute path="/edit-profile" component={EditProfile} page={`editprofile`} />
                <PublicRoute path="/signin" component={SignIn} page={`signin`} />
                <PublicRoute path="/signup" component={SignUp} page={`signup`} />
                <PublicRoute path="/reset" component={Reset} page={`reset`} />
                <PublicRoute path="/" component={IndexPage} page={`index`} />
            </Router>
        </div>
    )
}

export default App
