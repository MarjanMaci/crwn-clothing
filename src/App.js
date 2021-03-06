import React from 'react';

import { connect } from 'react-redux';

import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css';

import CheckoutPage from '../src/pages/checkout/checkout.component'

import { createStructuredSelector } from 'reselect'

import { selectCurrentUser } from './redux/user/user-selectors'

import HomePage from '../src/pages/homepage/homepage.component'

import ShopPage from '../src/pages/shop/shop.component'

import Header from '../src/component/header/header.component'

import SignInAndSignUpPage from '../src/pages/sign-in-sign-up/sign-in-sign-up.component'

import {auth, createUserProfileDocument} from '../src/firebase/firebase.utils'

import { setCurrentUser } from './redux/user/user-actions'

class App extends React.Component{

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser}=this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })
      }
        setCurrentUser(userAuth);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>
          <Route path='/checkout' component={CheckoutPage}/>
          <Route exact path='/signin' render={()=>this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPage/>) }/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
