import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EntryForm = ({ handleChange, handleSubmit, entry }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="title">
      <Form.Label>Entry Title</Form.Label>
      <Form.Control
        type="text"
        name="title"
        value={entry.title || ''}
        placeholder="Entry Title Goes Here"
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="entry">
      <Form.Label>Movie Director</Form.Label>
      <Form.Control
        type="text"
        name="entry"
        value={entry.text || ''}
        placeholder="Entry Text Goes Here"
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Button type="submit">Create Entry</Button>
  </Form>
)

export default EntryForm
