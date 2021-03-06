import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import { Button, Segment, Input, Header, Message } from 'semantic-ui-react';
import {setUser, setCurrentUser, changeCurrentUsersPosts, setCurrentUsersStatus} from '../actions/index.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signupSuccess: false
    };
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onLoginClick() {
    var context = this;

    const payload = {
      username: this.state.username,
      password: this.state.password
    };
    const config = {
      headers: {
        authorization: sessionStorage.getItem('token')
      }
    };

    axios.post('/api/user/login', payload)
      .then(res => {
        console.log('this is response token', res.headers.authorization);
        context.props.setUser(res.data);
        let currUser = (context.props.setCurrentUser(res.data).payload);
        sessionStorage.setItem('token', res.headers.authorization);

        axios({
          method: 'get',
          url: `/api/posts/${currUser.id}`,
        }).then((res)=>{
          // console.log("successful get",res);
          context.props.changeCurrentUsersPosts(res.data);
        });

        axios.get(`/api/status/${currUser.id}`).then(res => {
          context.props.setCurrentUsersStatus(res.data);
        });
      }).catch(err => {
        console.log('Error on Login Post request dawgg', err);
    });

    
  }

  onSignupClick() {
    const context = this;
    axios.post('/api/user', this.state)
      .then((response) => {
        console.log(response);
        context.setState({
          signupSuccess: true
        });
      })
      .catch((error) => {
        console.log(error);
      });

  }

  render() {
    return (
      <div>

        <Segment textAlign='center' size='massive' inverted color='blue'> fakebook </Segment>

        <div className="loginPageForm">
          <div className="welcome">
            <div className="welcomeText">Welcome!</div>
          </div>

          <div className="loginInputs">
            <Input size="huge" name="username" placeholder="username" onChange={this.onChangeHandler.bind(this)}></Input>
            <Input size="huge" name="password" placeholder="password" type="password" onChange={this.onChangeHandler.bind(this)} ></Input>

          </div>
          
          <div className="loginButtons">
            <Button color='blue' size="huge" onClick={this.onLoginClick.bind(this)}>Login</Button>
            <Button color='blue' size="huge" onClick={this.onSignupClick.bind(this)}>Sign Up</Button>
          </div>
          
        </div>
        <div className="successMessage">
          {!this.state.signupSuccess ? null : 
            <Message positive>
              <p>Successful Sign Up!</p>
            </Message>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    status: state.status
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser, 
    setCurrentUser, 
    changeCurrentUsersPosts,
    setCurrentUsersStatus
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Login);
