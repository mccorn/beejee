import React, {Component} from 'react';
import Task from "../Task";
import './style.css';

export default class TasksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPageIdx: props.currentPageIdx,
    }
  }
  render() {
    const {data, headings, length, onChangePage} = this.props;
    const {currentPageIdx} = this.state

    // console.log('TasksList', this.props);

    if (!data || !data.length) return null;

    let points = [];
    for (let i = 0; i < Math.ceil(length / 3); i++) {
      const isNear = currentPageIdx <= i + 2 && currentPageIdx >= i - 2;
      points.push(<div key={i} className={`Point ${currentPageIdx === i ? 'current' : 'clickable'} ${isNear && 'isNear'}`} onClick={() => onChangePage(i)}>
        {i}
      </div>);
    }

    return <div className="TasksList Panel">
      <div className="TasksList-Body">
        {headings}
        {
          data?.map((task, idx) => <Task data={task} key={idx}/>)
        }
      </div>

      <div className="Points">
        {points}
      </div>
    </div>;
  }
}