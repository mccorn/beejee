import React, {Component} from 'react';
import './style.css';
import Api from "../Api";
import {loadPageData} from "../functions";

const CLEAR_STATE = {
  username: "",
  email: "",
  text: "",
  error: null,
};

export default class AddTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...CLEAR_STATE,
    };

    this.handleAddTask = this.handleAddTask.bind(this);
  }

  handleAddTask() {
    const {username, email, text} = this.state;
    const {onAddTask} = this.props;

    Api.create({
      username,
      email,
      text,
    }).then(
      () => {
        this.setState({...CLEAR_STATE, error: {}});
        if (onAddTask) onAddTask();
      },
      (resp) => {
        this.setState({error: resp})
      }
    );
  }

  render() {
    const {username, email, text, error} = this.state;

    return <div className="AddTaskForm bordered Panel">
      <div className="InputWrapper">
        <label>username</label>
        <input onChange={e => this.setState({username: e.target.value})} value={username} />
      </div>
      {error?.username && <div className="line Error-Message">* {error?.username}</div>}
      <div className="InputWrapper">
        <label>email</label>
        <input type="email" onChange={e => this.setState({email: e.target.value})} value={email}/>

      </div>
      {error?.email && <div className="line Error-Message">* {error?.email}</div>}
      <div className="InputWrapper">
        <label>text</label>
        <input onChange={e => this.setState({text: e.target.value})} value={text}/>

      </div>
      {error?.text && <div className="line Error-Message">* {error?.text}</div>}

      <div className="row" style={{justifyContent: "flex-end"}}>
        <div className="btn" onClick={this.handleAddTask}>
          + Add task
        </div>
      </div>
    </div>;
  }
}