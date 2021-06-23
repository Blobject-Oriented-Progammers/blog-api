// This is where we'll get all our movies
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { indexEntries } from '../../api/entries'
// import messages from '../AutoDismissAlert/messages'

class Entries extends Component {
  // 2 very important methods:
  constructor () {
    super()
    // USEFUL CONSTRUCTORs have state
    this.state = {
      // Eventually - our state will be filled up with movies
      // Initial state - what should it be?
      // start off as `null`
      // if we got back an empty array from the db - we want that
      // to be different from our initial value
      entries: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    // When the component mounts (is first displayed in the DOM)
    // We want to load the movies from the API
    indexEntries(user)
      // Always a good gut check to print out the response
      // object so you don't cause some errors
      .then(res => this.setState({ entries: res.data.entries }))
      // Shorter way to use msgAlert - no curly braces (all one line)
      .then(() => msgAlert({
        heading: 'Entry Index Success!',
        message: 'messages.entryIndexSuccess',
        variant: 'success'
      }))
      // Longer way to use msgAlert - opened up a function block with the curly braces
      .catch()
  }

  render () {
    // Pattern: define a variable for our JSX
    // & set it's value to be different things
    // based on our data/state of our app etc.
    let entriesJsx = ''
    // First, check if movies is `null` (the inital value)
    if (this.state.entries === null) {
    // if (!this.state.movies) {
      entriesJsx = <Spinner animation="border" variant="info" />
    } else if (this.state.entries.length === 0) {
      entriesJsx = <p>No entries to display! Go make some.</p>
    } else {
      entriesJsx = (
        <ul>
          {this.state.entries.map((entry, i) => (
            <li key={entry._id}><Link to={`/entries/${entry._id}`}>{entry.title}</Link></li>
          ))}
        </ul>
      )
    }

    return (
      <Fragment>
        <h2>Entries Index Page</h2>
        {entriesJsx}
      </Fragment>
    )
  }
}

// () => msgAlert({
//   heading: 'Entry Index Failed',
//   message: 'messages.entryIndexFailure',
//   variant: 'danger'
// })

export default Entries
