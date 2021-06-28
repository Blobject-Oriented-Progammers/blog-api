import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { createEntry } from '../../api/entries'
import messages from '../AutoDismissAlert/messages'

class Comments extends Component {
  constructor () {
    super()

    this.state = {
      entry: {
        title: '',
        text: ''
      },
      createdId: null
    }
  }

  handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    console.log('updatedField in createEntry handleChange: ', updatedField)
    this.setState((currentState) => {
      return { entry: {
        ...currentState.entry,
        ...updatedField
      } }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { msgAlert, user } = this.props
    const entry = { ...this.state.entry, owner: user._id }
    console.log('this.props, createEntry: ', this.props)
    createEntry(entry, user)
      .then(res => this.setState({ createdId: res.data.entry._id }))
      .then(() => msgAlert({
        heading: 'Create Entry Success!',
        message: messages.entryCreateSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Create Entry Failed',
        message: messages.entryCreateFailure,
        variant: 'danger'
      }))
  }

  render () {
    const { content, author } = this.props
    if (this.state.createdId) {
      return <Redirect to={`/entries/${this.state.createdId}`}/>
    }

    return (
      <Fragment>
        <li>{content}  {author}</li>
      </Fragment>
    )
  }
}

export default Comments
