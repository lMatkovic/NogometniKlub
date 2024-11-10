import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleRememberMeChange(e) {
    setRememberMe(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true); 

    const podaci = new FormData(e.target);
    login({
      email: podaci.get('email'),
      password: podaci.get('lozinka'),
      rememberMe: rememberMe, 
    })
      .then(() => {
        setLoading(false); 
      })
      .catch(err => {
        setLoading(false); 
        setError('Pogrešan email ili lozinka. Pokušajte ponovo.');
      });
  }

  return (
    <Container className='mt-4'>
      <p className="text-muted">
        email: klub@klub.hr
      </p>
      <p className="text-muted">
        lozinka: nogometniklub
      </p>
      {error && <Alert variant="danger">{error}</Alert>} 
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='klub@klub.hr'
            maxLength={255}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='lozinka'>
          <Form.Label>Lozinka</Form.Label>
          <Form.Control type='password' name='lozinka' required />
        </Form.Group>
        <Form.Group className='mb-3' controlId='rememberMe'>
          <Form.Check 
            type='checkbox' 
            label='Zapamti me' 
            checked={rememberMe} 
            onChange={handleRememberMeChange} 
          />
        </Form.Group>
        <Button variant='primary' className='gumb' type='submit' disabled={loading}>
          {loading ? (
            <span>Učitavanje...</span>
          ) : (
            'Autoriziraj'
          )}
        </Button>
      </Form>
    </Container>
  );
}
