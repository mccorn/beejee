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
    this.handleEditTask = this.handleEditTask.bind(this);
  }

  handleClickTextField() {
    const {token} = this.props;
    const {editText} = this.state;

    if (token && !editText) this.setState({editText: !editText})
  }

  handleClickStatusField() {
    const {token} = this.props;
    const {editStatus} = this.state;

    if (token) this.setState({editStatus: !editStatus})
  }

  handleFocusOutField() {
    const {status, text} = this.state;
    const {data} = this.props;

    this.setState({editText: false});

    if (data.text !== text) {
      console.log('dd', data.text)
      console.log('text', text)
      this.setState({text}, () => this.handleEditTask("text"));
    }
  }

  handleEditTask(fieldName) {
    const {username, email, text, status} = this.state;
    const {token, data} = this.props;

    let newStatus = status;

    if (fieldName === "text") {
      newStatus = status === 0 ? 1 : 11;
    } else if (fieldName === "status"){
      newStatus = status === 0 ? 10 : 11;
    }

    return Api.edit({
      id: data?.id,
      username,
      email,
      text,
      status: newStatus,
      token,
    })
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
                   onBlur={() => this.handleFocusOutField("text")}
          />
          : text
        }
      </div>
      <div className="Task-Status" onClick={() => this.handleClickStatusField()}>
        <div>
          {STATUSES_STRING[status]}
        </div>
        {token && (status === 0 || status === 1) && <div className="clickable" onClick={() => this.handleEditTask("status")}>&#10003;</div> }
      </div>
    </div>;
  }
}

const STATUSES_STRING = {
  0: "Не выполнено. \n Не редактировано.",
  1: "Не выполнено. \n Отредактировано.",
  10: "Выполнено. \n Не редактировано.",
  11: "Выполнено. \n Отредактировано.",
};

function mapStateToProps(state) {
  return {
    token: state.token?.message?.token,
  };
}

export default connect(mapStateToProps)(Task);