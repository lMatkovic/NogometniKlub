import React, { useState } from 'react';
import { Container, Accordion, Form, Button, Alert } from 'react-bootstrap';

export default function HelpPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Container className="mt-4">
      <h2>Pomoć i Često Postavljena Pitanja (FAQ)</h2>

    
      <Accordion className="mt-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Kako mogu dodati igrača?</Accordion.Header>
          <Accordion.Body>
            Da biste dodali novog igrača, idite na stranicu "Igrači" i kliknite na dugme "Dodaj igrača". Popunite potrebne podatke i sačuvajte.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Kako da ažuriram informacije o klubu?</Accordion.Header>
          <Accordion.Body>
            Da biste ažurirali informacije o klubu, otvorite profil kluba i kliknite na opciju za uređivanje. Nakon toga možete promeniti željene podatke.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Kako prijaviti grešku u aplikaciji?</Accordion.Header>
          <Accordion.Body>
            Ako primjetite grešku, možete je prijaviti putem obrasca ispod ili kontaktirati podršku na našoj email adresi.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    
      <h3 className="mt-5">Kontaktirajte nas</h3>
      <p>Imate li pitanje ili želite prijaviti problem? Pošaljite nam poruku!</p>
      
      {submitted && (
        <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
          Hvala! Vaša poruka je poslata.
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group controlId="formName">
          <Form.Label>Ime</Form.Label>
          <Form.Control
            type="text"
            placeholder="Unesite svoje ime"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mt-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Unesite svoj email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formMessage" className="mt-3">
          <Form.Label>Poruka</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Unesite vašu poruku ili pitanje"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Pošalji poruku
        </Button>
      </Form>
    </Container>
  );
}
