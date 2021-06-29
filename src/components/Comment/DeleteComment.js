import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// import messages from '../AutoDismissAlert/messages'
import { deleteComment } from '../../api/comments'

class DeleteComment extends Component {
  componentDidMount () {
  }

    handleDelete = (event) => {
      const { user, history, id, entryId } = this.props
      deleteComment(entryId, id, user)
        .then((res) => res)
        .catch(console.error)
        .finally(() => history.push('/temp'))
        .finally(() => history.goBack())
    }

    render () {
      return (
        <Fragment>
          <div className='deleteComment'><button onClick={this.handleDelete}><img className="delete-img" src="delete-24.png"/></button></div>
        </Fragment>
      )
    }
}

export default withRouter(DeleteComment)
