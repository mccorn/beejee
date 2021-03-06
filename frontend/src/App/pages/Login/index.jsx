import React, {Component} from 'react';
import './style.css';
import Api from "../../components/Api";
import history from "../../../history";
import {tokenAction} from "../../../redux/actions";
import {connect} from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: props.error,
      token: props.token,
      status: props.token ? "ok" : (props.error ? "error" : null),
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleLogin() {
    const {username, password} = this.state;

    const promise = Api.login({
      username,
      password,
    });

    promise.then(
      (data) => tokenAction(data),
      (data) => this.setState({status: "error", error: data})
    );
  }

  handleLogout() {
    this.setState({token: "", status: "logout", username: "", password: ""});
    tokenAction("");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {token} = this.props;
    const prevToken = prevProps.token;

    if (token && token !== prevToken) {
      this.setState({token: token, status: "ok"});
    }
  }

  handleKeydown(e) {
    if (e.key === "Enter") {
      if (this.state.status === "ok") {
        history.push('/work')
      } else {
        this.handleLogin();
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown)
  }

  render() {
    const {username, password, error, status} = this.state;

    return <div className="Login bordered Panel">
      {status !== "ok" && (
        <>
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
        </>
      )}

      <div className="Login-ButtonsGrid" >
        {status === "ok"
          ? (
            <>
              <div className="btn" onClick={this.handleLogout}>
                logout
              </div>
              <div className="btn" onClick={() => history.push('/work')}>
                to work =>
              </div>
            </>
          )
          : (
            <>
              <div></div>
              <div className="btn" onClick={this.handleLogin}>
                login
              </div>
            </>
          )
        }
      </div>
    </div>;
  }
}


function mapStateToProps(state) {
  return {
    token: state.token,
  };
}

export default connect(mapStateToProps)(Login);
