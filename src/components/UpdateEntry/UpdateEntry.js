import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import EntryForm from '../shared/EntryForm'
import { updateEntry, showEntry } from '../../api/entries'
// import messages from '../AutoDismissAlert/messages'

class EntryUpdate extends Component {
  constructor () {
    super()
    this.state = {
      entry: {
        title: '',
        text: ''
      },
      updated: false
    }
  }
  componentDidMount () {
    const { user, match, msgAlert } = this.props
    showEntry(match.params.id, user)
      .then(res => {
        this.setState({ entry: res.data.entry })
      })
      .then(() => msgAlert({
        heading: 'Entry Found Successfully',
        message: 'messages.entryUpdatedSuccess',
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Entry Could Not Be Found',
        message: 'messages.entryUpdatedFailure',
        variant: 'danger'
      }))
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
    const { msgAlert, user, match, history } = this.props
    updateEntry(this.state.entry, match.params.id, user)
      .then(res => history.push(`/entries/${match.params.id}`))
      .then(() => msgAlert({
        heading: 'Update Entry Success!',
        message: 'messages.entryUpdateSuccess',
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Update Entry Failed',
        message: 'messages.entryUpdateFailure',
        variant: 'danger'
      }))
  }
  render () {
    return (
      <Fragment>
        <h2>Update a Entry Page</h2>
        <EntryForm
          entry={this.state.entry}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}
export default withRouter(EntryUpdate)
