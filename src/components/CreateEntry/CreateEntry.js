// This will be where our user creates a new movie
import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import EntryForm from '../shared/EntryForm'
import { createEntry } from '../../api/entries'
// import messages from '../AutoDismissAlert/messages'

class EntryCreate extends Component {
  // Constructor & the render are required
  constructor () {
    super()

    this.state = {
      // Movie state will be used in the form & updated as the user types
      entry: {
        title: '',
        text: ''
      },
      // The createdId will be null until we successfully
      // create a movie, then it will be the new movie's ID value
      createdId: null
    }
  }

  handleChange = (event) => {
    // Combine the current state w/ the value from the input
    // the user's typing in
    // Input `name` will match the key in our `this.state.movies` object
    // {[someVariable]: 'some value'} < create a key where the value is
    // whatever is stored in `someVariable`
    const updatedField = { [event.target.name]: event.target.value }

    // Spread operator "spreads" out values from data types
    // It'll take an object `{ title: 'hello' }` & turn it into `title: hello`
    // ...[1, 2, 3, 4] => 1, 2, 3, 4
    // [ ...[1, 2, 3, 4, 5], 6, 8, 9] => [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // ...{ title: 'hello' } => title: 'hello'
    // { ...{ title: 'hello' }, title: 'hello world' } =>
    //    { title: 'hello world' }
    // { ...{ title: 'hello' }, author: 'hello world' } =>
    //    { title: 'hello', author: 'hello world' }
    this.setState((currentState) => {
      // Return a brand new object w/ state & updatedField combined
      return { entry: {
        ...currentState.entry,
        ...updatedField // the new data comes 2nd to override the state key/value pairs
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
    // If the movie ID is not null
    if (this.state.createdId) {
      // Trigger a redirect
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
