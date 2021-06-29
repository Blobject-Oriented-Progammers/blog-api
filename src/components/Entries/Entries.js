import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { indexEntries } from '../../api/entries'

// import messages from '../AutoDismissAlert/messages'

class Entries extends Component {
  constructor () {
    super()
    this.state = {
      entries: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    indexEntries(user)
      .then(res => this.setState({ entries: res.data.entries }))
      .then(() => msgAlert({
        heading: 'Entry Index Success!',
        message: 'messages.entryIndexSuccess',
        variant: 'success'
      }))
      .catch()
  }

  render () {
    const entryTextStyle = {
      margin: '20px',
      color: '#fb3640',
      listStyleType: 'none',
      padding: '10px',
      backgroundColor: 'white',
      border: '1px solid #ced4da',
      borderRadius: '0.25rem'
    }

    const entryTitleStyle = {
      textAlign: 'center',
      margin: '20px',
      color: '#fb3640'
    }

    let entriesJsx = ''
    if (this.state.entries === null) {
      entriesJsx = <Spinner animation="border" variant="info" />
    } else if (this.state.entries.length === 0) {
      entriesJsx = <p>No entries to display! Go make some.</p>
    } else {
      entriesJsx = (
        <ul>
          {this.state.entries.map((entry, i) => (
            <li style={entryTextStyle} key={entry._id}><Link to={`/entries/${entry._id}`}>{entry.title}</Link></li>
          ))}
        </ul>
      )
    }

    return (
      <Fragment>
        <div className="entries-pg">
          <h2 style={entryTitleStyle}>All Entries</h2>
          {entriesJsx}
        </div>
      </Fragment>
    )
  }
}

// () => msgAlert({
//   heading: 'Entry Index Failed',
//   message: 'messages.entryIndexFailure',
//   variant: 'danger'
// })

// #e2e2e2
// #fb3640

export default Entries
