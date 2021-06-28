import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { showEntry, deleteEntry } from '../../api/entries'
import messages from '../AutoDismissAlert/messages'
// import Comment from './../Comment/Comments'
import CommentForm from '../shared/CommentForm'
import DeleteComment from '../Comment/DeleteComment'
import { createComment } from '../../api/comments'

class ShowEntry extends Component {
  constructor () {
    super()
    this.state = {
      entry: null,
      user: null,
      comment: {
        content: '',
        entryId: '',
        owner: ''
      },
      // why are we setting createdId - line 65 setstate
      createdId: null,
      commentId: ''
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
        message: messages.entryShowSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Entry Could Not Be Found',
        message: messages.entryShowFailure,
        variant: 'danger'
      }))
  }

  handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState((currentState) => {
      return { comment: {
        ...currentState.comment,
        ...updatedField
      } }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { msgAlert, user } = this.props
    // removed owner
    const comment = { ...this.state.comment }
    comment.entryId = this.props.match.params.id
    createComment(comment, user)
      .then(res => this.setState({ createdId: comment.entryId }))
      .then(() => msgAlert({
        heading: 'Create Entry Success!',
        message: messages.commentCreateSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Create Entry Failed',
        message: messages.commentCreateFailure,
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

  handleDeleteComment = (event) => {
    const { user, match, msgAlert } = this.props
    deleteEntry(match.params.id, user)
      .then(() => msgAlert({
        heading: 'Comment Deleted!',
        message: messages.entryDeleteSuccess,
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Comment Delete Failed',
        message: messages.entryDeleteFailure,
        variant: 'danger'
      }))
  }

  render () {
    const { entry } = this.state
    const { user } = this.props
    let entryJsx = ''
    if (entry === null || entry === undefined) {
      entryJsx = 'Loading...'
    } else if (user === null) {
      entryJsx = (
        <Fragment>
          <div className='showPostComment'>
            <h3>{entry.title}</h3>
            <p>{entry.text}</p>
            {/* add a user ex; written by: entry.author */}
            {/* <p>Directed by: {entry.director}</p> */}
          </div>
        </Fragment>
      )
    } else if (this.state.createdId) {
      this.props.history.push('/temp')
      this.props.history.goBack()
    } else {
      entryJsx = (

        <Fragment>
          <div className='showPostComment'>
            <h3>{entry.title}</h3>
            <p>{entry.text}</p>
            <p>Comments:</p>
            <ul>
              {entry.comments.map((comment) => (
                <li key={comment._id}>{comment.content}
                  <div>
                    <DeleteComment id={comment._id} user={this.props.user._id} entryId={this.props.match.params.id} />
                  </div>
                </li>
              ))}
            </ul>
            {/* add a user ex; written by: entry.author */}
            {/* <p>Directed by: {entry.director}</p> */}
            <CommentForm
              comment={this.state.comment}
              entryId={this.props.match.params.id}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
            <div>
              <button className='btn btn-primary' onClick={this.handleDelete}>Delete Entry</button>
              <Link to={`/entries/${this.props.match.params.id}/edit`}>Update Entries</Link></div>
          </div>
        </Fragment>
      )
    }

    return (
      <Fragment>
        {entryJsx}
      </Fragment>
    )
  }
}

export default withRouter(ShowEntry)

// <li key={comment._id}><Link to={`/entries/${entry._id.comments._id}`}>{comment}</Link></li>
// <button onClick={this.handleDeleteComment} id={comment._id}>Delete Comment</button>
