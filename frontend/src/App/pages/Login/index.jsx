import React, {Component} from 'react';
import './style.css';
import Api from "../../components/Api";
import history from "../../../history";
import {pageData, token} from "../../../redux/actions";
import {connect} from "react-redux";
import {Redirect} from "react-router";

const CLEAR_STATE = {
  username: "",
  password: "",
  error: null,
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...CLEAR_STATE,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const {username, password} = this.state;

    const promise = Api.login({
      username,
      password,
    })

    promise.then(
      (data) => token(data),
      () => console.error(new Error('Ошибка загрузки данных')),
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {error, status} = this.state;
    const {token = {}} = this.props;
    const prevToken = prevProps.token;

    const {message} = token;

    const passwordError = error?.password;
    const usernameError = error?.username;

    if (token && token.status !== prevToken?.status && token.status === "ok") {
      return history.push('/work')
    } else if (token && token.status === "error" && (passwordError !== message?.password || message?.username !== usernameError)) {
      this.setState({error: token.message, status: token.status});
    }
  }

  render() {
    const {username, password, error} = this.state;
    console.log('Login', this.props);

    return <div className="Login bordered Panel">
      <div className="InputWrapper">
        <label>username</label>
        <input onChange={e => this.setState({username: e.target.value, error: null})} value={username} />
      </div>
      {error?.username && <div className="line Error-Message">* {error?.username}</div>}
      <div className="InputWrapper">
        <label>password</label>
        <input type="password"
               onChange={e => this.setState({password: e.target.value, error: null})} value={password}/>

      </div>
      {error?.password && <div className="line Error-Message">* {error?.password}</div>}

      <div className="row">
        <div className="btn" onClick={this.handleLogin}>
          login
        </div>
      </div>
    </div>;
  }
}


function mapStateToProps(state) {
  console.log('Login state', state)
  return {
    token: state.token,
  };
}

export default connect(mapStateToProps)(Login);
