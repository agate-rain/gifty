var React = require('react');
var LoggedIn = require('./loggedIn');
var Home = require('./home');
import {Navigation} from 'react-router';


var App = React.createClass({
  mixin: [Navigation],

  componentWillMount: function() {
    this.setupAjax();
    this.createLock();
    this.setState({idToken: this.getIdToken()})
  },

  createLock: function() {
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
    this.lock.show({
      callbackURL: 'http://localhost:3000/callback',
      connections: ['facebook'],
      icon: '../../src/client/img/gyftee-icon.png',
      popup: true
    }, function(err, profile){
      if(err){
        console.log(err);
      }else{
        console.log(profile);
      }
    });
  },

  setupAjax: function() {
    $.ajaxSetup({
      'beforeSend': function(xhr) {
        if (localStorage.getItem('userToken')) {
          xhr.setRequestHeader('Authorization',
            'Bearer ' + localStorage.getItem('userToken'));
        }
      }
    });
  },

  getIdToken: function() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  },

  render: function() {
    if (this.state.idToken) {
      return (<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
    } else {
      return (<Home lock={this.lock} />);
    }
  }
});

module.exports = App;
