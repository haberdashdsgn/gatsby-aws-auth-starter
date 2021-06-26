import React from 'react'
import { Redirect } from '@reach/router'
import { AppUser } from '../Auth'
import { Layout } from '../Layout'

class PublicRoute extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.page = this.props.page
    }

    componentDidMount() {}

    render() {
        const { isLoggedIn } = AppUser
        if (isLoggedIn()) {
            return <Redirect to="/home" noThrow />
        }
        const { component: Component, location, ...rest } = this.props
        return (
            <>
            <Layout page={this.page}>
                <Component {...rest} />
            </Layout>
            </>
        )
    }
}

export default PublicRoute
