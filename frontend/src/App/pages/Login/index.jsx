import React, {Component} from 'react';
import './style.css';
import Api from "../../components/Api";
import history from "../../../history";

const CLEAR_STATE = {
  username: "",
  password: "",
  error: null,
};

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...CLEAR_STATE,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const {username, password} = this.state;

    Api.login({
      username,
      password,
    }).then((resp) => {
      if (resp.status === "ok") {
        console.log('handleLogin_s', resp);
        this.setState({...CLEAR_STATE, error: {}})
        history.push("/work");
      } else {
        console.log('handleLogin_f', resp)
        this.setState({error: resp.message})
      }

    });
  }

  render() {
    const {username, password, error} = this.state;
    // console.log('Login', this.state);

    return <div className="Login bordered Panel">
      <div className="InputWrapper">
        <label>username</label>
        <input onChange={e => this.setState({username: e.target.value})} value={username} />
      </div>
      {error?.username && <div className="line Error-Message">* {error?.username}</div>}
      <div className="InputWrapper">
        <label>password</label>
        <input type="password" onChange={e => this.setState({password: e.target.value})} value={password}/>

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