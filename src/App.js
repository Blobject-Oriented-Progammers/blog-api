import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import Entries from './components/Entries/Entries'
import CreateEntry from './components/CreateEntry/CreateEntry'
import ShowEntry from './components/ShowEntry/ShowEntry'
import UpdateEntry from './components/UpdateEntry/UpdateEntry'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/entries' render={() => (
            <Entries msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} path='/create-entry' render={() => (
            <CreateEntry msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/entries/:id' user={user} render={() => (
            <ShowEntry msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/entries/:id/edit' render={() => (
            <UpdateEntry msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/' render={() => (<div className ='mp'>
            <h1 className='mp-title'>Welcome to Fumblr</h1>
            <hr/>
            <h3 className='mp-crew-title'>The Development Crew</h3>
            <ul className='mp-crew col-sm-10 col-md-8 mx-auto mt-5'>
              <section>
                <li className='mp-members'> Scrum Master <br/> <img className="crew-img" src="Nabila-pic.png"/><br/>Nabila Ayaba</li>
              </section>
              <section>
                <li className='mp-members'> Front End Lead <br/> <img className="crew-img" src="JT-pic.JPG"/> <br/>JT Shepherd</li>
              </section>
              <section>
                <li className='mp-members'>Back End Lead<br/> <img className="crew-img" src="Dylon-pic.png"/> <br/>Dylon Fleming</li>
              </section>
            </ul>
            <p className='mp-p'>
            Take a look at the most recent posts in the top right (Entries), or go ahead and sign in to make your own!
            </p>
          </div>)}
          />
        </main>
      </Fragment>
    )
  }
}

export default App
