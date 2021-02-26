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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.currentPageIdx !== this.props.currentPageIdx) {
      this.setState({currentPageIdx: this.props.currentPageIdx})
    }
  }

  render() {
    const {data, headings, length, onChangePage} = this.props;
    const {currentPageIdx} = this.state

    // console.log('TasksList', this.props);

    if (!data || !data.length) return null;

    let points = [];
    for (let i = 0; i < Math.ceil(length / 3); i++) {
      const isNear = currentPageIdx <= i + 2 && currentPageIdx >= i;
      points.push(<div key={i} className={`Point ${currentPageIdx === i + 1 ? 'current' : 'clickable'} ${isNear && 'isNear'}`} onClick={() => onChangePage(i + 1)}>
        {i + 1}
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
