import React from "react"
import { Container, Col, Row } from "react-bootstrap"

class Banner extends React.Component {
    constructor(props) {
        super(props)

        this.settings = {
            pageStyle: this.props.pageStyle,
            title: this.props.title,
            subTitle: this.props.subTitle
        }
    }

    render() {
        return (
            <section id='banner' className={this.settings.pageStyle}>
                <Container>
                    <Row>
                        <Col xs='12' sm='12' md='12' lg='12'>
                            <h1 className="text-center">{this.settings.title}</h1>
                            {this.settings.subTitle ? <p className="text-center">{this.settings.subTitle}</p> : ''}
                        </Col>
                    </Row>
                </Container>
            </section>
        )
    }
}

export default Banner