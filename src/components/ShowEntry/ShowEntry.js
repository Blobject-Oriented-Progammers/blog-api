import React, { Component, Fragment } from 'react'
// withRouter is a function that we use when exporting components
// that need to have access to the routing props
// If we use `component={MyComponent}` syntax, this isn't necessary
// because the props the passed automagically
// HOWEVER is we use `render={() => (<MyComponent/>)}`
// we lose those automagical props! The solution is exporting the component withRouter
import { withRouter, Link } from 'react-router-dom'
import { showEntry, deleteEntry } from '../../api/entries'
// import messages from '../AutoDismissAlert/messages'

class ShowEntry extends Component {
  constructor () {
    super()
    this.state = {
      entries: null
    }
  }
  componentDidMount () {
    // Because we used withRouter we have access to the match object
    // which contains our URL params from the route `/movies/:id`
    // When we go to `/movies/5` the params object will have `{ id: 5 }`
    const { user, match, msgAlert } = this.props
    showEntry(match.params.id, user)
      .then(res => {
        console.log(res)
        this.setState({ movie: res.data.movie })
      })
      .then(() => msgAlert({
        heading: 'Movie Found Successfully',
        message: 'messages.movieShowSuccess',
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Movie Could Not Be Found',
        message: 'messages.movieShowFailure',
        variant: 'danger'
      }))
  }

  handleDelete = (event) => {
    // We can extract the history object because we're using `withRouter`
    const { user, match, history, msgAlert } = this.props
    deleteEntry(match.params.id, user)
      // Send the user to the movies index page
      .then(() => history.push('/entries'))
      .then(() => msgAlert({
        heading: 'Movie Deleted!',
        message: 'messages.movieDeleteSuccess',
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Movie Delete Failed',
        message: 'messages.movieDeleteFailure',
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
