import React, {Component} from 'react';
import './style.css';

export default class Task extends Component {
  render() {
    const {data} = this.props;

    // console.log('Task', this.props);

    return <div className="Task">
      <div>{data.username}</div>
      <div>{data.email}</div>
      <div>{data.text}</div>
      <div>{data.status}</div>
    </div>;
  }
}