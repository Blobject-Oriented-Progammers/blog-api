import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import { deleteComment } from '../../api/comments'

class DeleteComment extends Component {
  componentDidMount () {
    const { user, history, id, entryId } = this.props
    console.log('id', id)
    console.log('user', user)
    console.log('entryId', entryId)
    console.log('history', history)
  }

    handleDelete = (event) => {
      const { user, history, id, entryId } = this.props
      deleteComment(entryId, id, user)
        .then((res) => console.log('handleDelete res: ', res))
        .catch(() => console.log('DELETE COMMENT FAILED'))
        .finally(() => history.push('/temp'))
        .finally(() => history.goBack())
    }

    render () {
      return (
        <Fragment>
          <div><button onClick={this.handleDelete}>Delete Comment</button></div>
        </Fragment>
      )
    }
}

export default withRouter(DeleteComment)
