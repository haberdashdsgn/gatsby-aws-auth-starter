import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import ReactGA from 'react-ga'
import { Nav, UserNav } from '../Nav'
import Footer from './footer'
import 'modern-normalize/modern-normalize.css'
import '../../scss/global.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faKey, faFilePdf, faPaintBrush, faPrint, faCode, faBars, faDatabase, faCog, faGlobe, faCheck, faTachometerAlt, faShare, faLeaf, faFileAlt, faFileWord, faChartPie, faUser, faAt, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitterSquare, faInstagram, faLinkedin, faTumblrSquare, faHtml5, faCss3, faNodeJs, faGit, faGoogle, faWordpress, faLinux, faChrome, faApple, faWindows, faOpencart, faReact, faAws } from '@fortawesome/free-brands-svg-icons'

library.add(faChevronDown, faKey, faFilePdf, faPaintBrush, faPrint, faCode, faBars, faDatabase, faCog, faGlobe, faCheck, faTachometerAlt, faShare, faLeaf, faFileAlt, faFileWord, faChartPie, faUser, faAt, faPhone, faFacebookSquare, faTwitterSquare, faInstagram, faLinkedin, faTumblrSquare, faHtml5, faCss3, faNodeJs, faGit, faGoogle, faWordpress, faLinux, faChrome, faApple, faWindows, faOpencart, faReact, faAws)

export const Layout = ({ children, page, isUserNav }) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                        author
                        emailUrl
                    }
                }
            }
        `}
        render={data => (
            <>
            {typeof window !== `undefined` ? ReactGA.pageview(window.location.pathname + window.location.search) : ''}
            <div className='wrapper'>
                {isUserNav ? <UserNav page={page} /> : <Nav page={page} />}
                <main>
                    {children}
                </main>
                <Footer siteTitle={data.site.siteMetadata.title} author={data.site.siteMetadata.author} email={data.site.siteMetadata.emailUrl} />
            </div>
            </>
        )}
    />
)

export function AppContent({ children }) {
    return (
        <div className='application'>
            {children}
        </div>
    )
}