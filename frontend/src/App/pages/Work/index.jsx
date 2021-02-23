import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import Api from "../../components/Api";
import TasksList from "../../components/TasksList";
import DataProvidedPage from "../../components/DataProvidedPage";
import AddTaskForm from "../../components/AddTaskForm";
import history from "../../../history";

const FIELDS = [
  "id",
  "username",
  "email",
  "status",
];

const SORT_DIRECTIONS = [
  "desc",
  "asc",
];

class Work extends DataProvidedPage {
  constructor(props) {
    super(props);
    this.state = {
      sortFieldIdx: 0,
      sortDirectionIdx: 0,
      pageIdx: 0,
      token: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.loadFormData = this.loadFormData.bind(this);
  }

  componentDidMount(path) {
    this.loadFormData();
  }

  loadFormData() {
    const {sortFieldIdx, sortDirectionIdx, pageIdx} = this.state;

    super.loadFormData({
      sort_field: FIELDS[sortFieldIdx],
      sort_direction: SORT_DIRECTIONS[sortDirectionIdx],
      page: pageIdx,
    })

    // Api.getPageData({
    //   sort_field: FIELDS[sortFieldIdx],
    //   sort_direction: SORT_DIRECTIONS[sortDirectionIdx],
    //   page: pageIdx,
    // }).then((resp) => {
    //   console.log('Api_getPageData', resp);
    //   this.setState({pageData:  resp.message});
    // });
  }

  handleClick() {
    this.loadFormData();
  }

  handleClick2() {
    const {} = this.state;

    this.loadFormData({
      sort_field: FIELDS[2],
      sort_direction: SORT_DIRECTIONS[0],
      page: 2,
    });
  }

  handleChangePage(val) {
    this.setState({pageIdx: val}, this.handleClick);
  }

  render() {
    const { token, pageIdx, sortFieldIdx, sortDirectionIdx} = this.state;
    const { tasks, total_task_count } = this.props;

    // console.log('pageData', this, pageData, pageData?.tasks?.length);

    const fieldName = FIELDS[sortFieldIdx];
    const dirName = SORT_DIRECTIONS[sortDirectionIdx];

    console.log('Work', total_task_count, tasks);

    const headings = <div className="Task Task_head">
      <div className={`Task-Cell ${fieldName === "username" && "current"} ${fieldName === "username" && dirName} clickable`}
           onClick={() => fieldName === "username" ? this.setState({sortDirectionIdx: +!sortDirectionIdx}) : this.setState({sortFieldIdx: 1})}
      >
        username
      </div>
      <div className={`Task-Cell ${fieldName === "email" && "current"} ${fieldName === "email" && dirName} clickable`}
           onClick={() => fieldName === "email" ? this.setState({sortDirectionIdx: +!sortDirectionIdx}) : this.setState({sortFieldIdx: 2})}
      >
        email
      </div>
      <div className={`Task-Cell ${fieldName === "text" && "current"} clickable`}
      >
        text
      </div>
      <div className={`Task-Cell ${fieldName === "status" && "current"} ${fieldName === "status" && dirName} clickable`}
           onClick={() => fieldName === "status" ? this.setState({sortDirectionIdx: +!sortDirectionIdx}) : this.setState({sortFieldIdx: 3})}
      >
        status
      </div>
    </div>

    return (
      <div className="Layout">
        <div className="row Token" alt={token}>
          token: {token || "Не авторизован"}
        </div>
        <div className="row TaskCounter" alt={token}>
          total_task_count: {+total_task_count}
        </div>
        <div className="Work-Content bordered">
          {tasks &&
          <TasksList data={tasks}
                     length={total_task_count}
                     headings={headings}
                     currentPageIdx={pageIdx}
                     onChangePage={val => this.handleChangePage(val)}
          />
          }
        </div>

        <div className="Work-Footer bordered Panel">
         <div className="Work-Actions">
           <div className="row">
             <div className="btn" onClick={this.handleClick}>
               handleClick
             </div>
           </div>

           <div className="row">
             <div className="btn" onClick={this.handleClick2}>
               {FIELDS[2]} / {SORT_DIRECTIONS[0]}
             </div>
           </div>

           <div className="row">
             <div className="btn" onClick={() => history.push('/login')}>
               login
             </div>
           </div>
         </div>

          <AddTaskForm />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state', state)
  return {
    tasks: state.tasks,
    total_task_count: state.total_task_count,
  };
}

export default connect(mapStateToProps)(Work);
