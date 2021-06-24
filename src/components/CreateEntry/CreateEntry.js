import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import EntryForm from '../shared/EntryForm'
import { createEntry } from '../../api/entries'
// import messages from '../AutoDismissAlert/messages'

class EntryCreate extends Component {
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

    createEntry(this.state.entry, user)
      .then(res => this.setState({ createdId: res.data.entry._id }))
      .then(() => msgAlert({
        heading: 'Create Entry Success!',
        message: 'messages.entryCreateSuccess',
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Create Entry Failed',
        message: 'messages.entryCreateFailure',
        variant: 'danger'
      }))
  }

  render () {
    if (this.state.createdId) {
      return <Redirect to={`/entries/${this.state.createdId}`}/>
    }

    return (
      <Fragment>
        <h2>Create an Entry Page</h2>
        <EntryForm
          entry={this.state.entry}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}

export default EntryCreate
