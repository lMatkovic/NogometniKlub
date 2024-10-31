import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError(''); // Resetuj grešku pre svakog pokušaja

    const podaci = new FormData(e.target);
    login({
      email: podaci.get('email'),
      password: podaci.get('lozinka'),
    }).catch(err => {
      // Postavi poruku greške
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
      {error && <Alert variant="danger">{error}</Alert>} {/* Prikaži grešku kao Alert */}
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email' // Koristi 'email' tip
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
        <Button variant='primary' className='gumb' type='submit'>
          Autoriziraj
        </Button>
      </Form>
    </Container>
  );
}
