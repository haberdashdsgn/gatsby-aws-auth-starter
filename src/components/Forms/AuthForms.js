import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function AuthForm({ children, title, error }) {
    return (
        <Container>
            <Row>
                <form id='auth' name='auth' className='card-body'>
                    <h2>{title}</h2>
                    {error && (
                        <fieldset>
                            <p className='text-danger'>
                                {error.message ? error.message : error}
                            </p>
                        </fieldset>
                    )}
                    {children}
                </form>
            </Row>
        </Container>
    )
}

export function ContactForm({ children, title, subtitle, error }) {
    return (
        <Container>
            <Row>
                <form id='contact' name='contact' className='card-body' action='https://formspree.io/f/meqvqgpd' method='POST'>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                    {error && (
                        <p className='text-danger'>
                            {error.message ? error.message : error}
                        </p>
                    )}
                    {children}
                </form>
            </Row>
        </Container>
    )
}

export function UpdateUserForm({ children, title, subtitle, error }) {
    return (
        <Container>
            <Row>
                <form id='auth' className='card-body'>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                    {error && (
                        <p className='text-danger'>
                            {error.message ? error.message : error}
                        </p>
                    )}
                    {children}
                </form>
            </Row>
        </Container>
    )
}

export function FirstName({ handleUpdate, name, autoComplete }) {
    return (
        <fieldset>
            <FontAwesomeIcon className='formIcon' icon='user' />
            <input
                onChange={handleUpdate}
                name='first_name'
                type='text'
                value={name}
                className='form-control'
                autoComplete={autoComplete}
                id='first_name'
                aria-label='first_name'
                aria-describedby='nameHelp'
                placeholder='John / Jane'
                required
            />
        </fieldset>
    )
}

export function LastName({ handleUpdate, name, autoComplete }) {
    return (
        <fieldset>
            <FontAwesomeIcon className='formIcon' icon='user' />
            <input
                onChange={handleUpdate}
                name='last_name'
                type='text'
                value={name}
                className='form-control'
                autoComplete={autoComplete}
                id='last_name'
                aria-label='last_name'
                aria-describedby='nameHelp'
                placeholder='Smith'
                required
            />
        </fieldset>
    )
}

export function Email({ handleUpdate, email, autoComplete }) {
    return (
        <fieldset>
            <FontAwesomeIcon className='formIcon' icon='at' />
            <input
                onChange={handleUpdate}
                name='email'
                type='email'
                value={email}
                className='form-control'
                autoComplete={autoComplete}
                id='email'
                aria-label='email'
                aria-describedby='emailHelp'
                placeholder='your@email.com'
                required
            />
        </fieldset>
    )
}

export function Password({ handleUpdate, password, autoComplete }) {
    return (
        <fieldset>
            <FontAwesomeIcon className='formIcon' icon='key' />
            <input
                onChange={handleUpdate}
                autoComplete={autoComplete}
                name='password'
                value={password}
                type='password'
                className='form-control'
                aria-label='password'
                placeholder='Password'
                id='enterPassword'
            />
        </fieldset>
    )
}

export function ConfirmationCode({ handleUpdate, auth_code, autoComplete }) {
    return (
        <fieldset>
            <label htmlFor='enterCode'>Confirmation Code</label><br />
            <FontAwesomeIcon className='formIcon' icon='key' />
            <input
                onChange={handleUpdate}
                autoComplete={autoComplete}
                name='auth_code'
                value={auth_code}
                type='text'
                className='form-control'
                aria-label='auth_code'
                placeholder='######'
                id='enterCode'
            />
        </fieldset>
    )
}
