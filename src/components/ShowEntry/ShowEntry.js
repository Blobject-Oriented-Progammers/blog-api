import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { showEntry, deleteEntry } from '../../api/entries'
import messages from '../AutoDismissAlert/messages'

class ShowEntry extends Component {
  constructor () {
    super()
    this.state = {
      entries: null
    }
  }
  componentDidMount () {
    const { user, match, msgAlert } = this.props
    showEntry(match.params.id, user)
      .then(res => {
        console.log(res)
        this.setState({ entry: res.data.entry })
      })
      .then(() => msgAlert({
        heading: 'Entry Found Successfully',
        message: messages.entryShowSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Entry Could Not Be Found',
        message: messages.entryShowFailure,
        variant: 'danger'
      }))
  }

  handleDelete = (event) => {
    const { user, match, history, msgAlert } = this.props
    deleteEntry(match.params.id, user)
      .then(() => history.push('/entries'))
      .then(() => msgAlert({
        heading: 'Entry Deleted!',
        message: messages.entryDeleteSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Entry Delete Failed',
        message: messages.entryDeleteFailure,
        variant: 'danger'
      }))
  }
  render () {
    const { entry } = this.state
    let entryJsx = ''
    if (entry === null) {
      entryJsx = 'Loading...'
    } else {
      entryJsx = (
        <Fragment>
          <h3>{entry.title}</h3>
          {/* add a user ex; written by: entry.author */}
          {/* <p>Directed by: {entry.director}</p> */}
          <button onClick={this.handleDelete}>Delete Entry</button>
          <Link to={`/entries/${this.props.match.params.id}/edit`}>Update Entries</Link>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <h2>Just One Entry Page</h2>
        {entryJsx}
      </Fragment>
    )
  }
}

export default withRouter(ShowEntry)
