import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CommentForm = ({ handleChange, handleSubmit, comment, entryId }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="comment">
      <Form.Label></Form.Label>
      <Form.Control
        type="text"
        name="content"
        value={comment.content || ''}
        placeholder="Comment goes here"
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="entryId">
      <Form.Label></Form.Label>
      <Form.Control
        type="hidden"
        name="entryId"
        value={comment.content || ''}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Button type="submit">Add Comment</Button>
  </Form>
)

export default CommentForm
