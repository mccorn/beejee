import React, {Component} from 'react';
import './style.css';
import {connect} from "react-redux";
import Api from "../Api";

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.data?.username,
      email: props.data?.email,
      text: props.data?.text,
      status: props.data?.status,

      editText: null,
      editStatus: null,
    };

    this.handleClickTextField = this.handleClickTextField.bind(this);
    this.handleClickStatusField = this.handleClickStatusField.bind(this);
    this.handleFocusOutField = this.handleFocusOutField.bind(this);
  }

  handleClickTextField() {
    const {data, token} = this.props;
    const {editText} = this.state;

    if (token) this.setState({editText: !editText})
  }


  handleClickStatusField() {
    const {data, token} = this.props;
    const {editStatus} = this.state;

    if (token) this.setState({editStatus: !editStatus})
  }

  handleFocusOutField() {
    const {username, email, text, status} = this.state;
    const {token, data} = this.props;

    console.log('handleFocusOutField');

    Api.edit({
      id: data?.id,
      username,
      email,
      text,
      status,
      token,
    }).then((resp) => {
      // if (resp.status === "ok") {
      //   console.log('handleFocusOutField', resp);
      //   this.setState({
      //     username,
      //     email,
      //     text,
      //     status,
      //   })
      // }
    });

    this.setState({editStatus: false, editText: false})
  }

  render() {
    const {data, token} = this.props;

    const {editText, editStatus, username, email, text, status} = this.state;

    return <div className="Task">
      <div>{username}</div>
      <div>{email}</div>
      <div onClick={this.handleClickTextField}>
        {editText
          ? <input value={text}
                   autoFocus
                   onChange={(e) => this.setState({text: e.target.value})}
                   onBlur={() => this.handleFocusOutField()}
          />
          : text
        }
      </div>
      <div onClick={this.handleClickStatusField}>
        {editStatus
          ? <input value={status}
                   autoFocus
                   onChange={(e) => this.setState({status: e.target.value})}
                   onBlur={() => this.handleFocusOutField()}
          />
          : status
        }
      </div>
    </div>;
  }
}

function mapStateToProps(state) {
  return {
    token: state.token?.message?.token,
  };
}

export default connect(mapStateToProps)(Task);