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
      pageIdx: 1,
      token: null,

      message: null,
    };

    this.loadFormData = this.loadFormData.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
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
  }

  handleChangePage(val) {
    this.setState({pageIdx: val}, () => this.loadFormData());
  }

  handleChangeSort(idx) {
    const { sortFieldIdx, sortDirectionIdx} = this.state;

    if (idx === sortFieldIdx) {
      this.setState({sortDirectionIdx: +!sortDirectionIdx}, () => this.loadFormData())
    } else {
      this.setState({sortFieldIdx: idx}, () => this.loadFormData())
    }
  }

  showMessage() {
    this.message.classList.remove("hidden");
    this.setState({message: "Задача добавлена."});

    this.messageTimer = setInterval(() => {
      this.message.classList.add("hidden");
      this.setState({message: null});

      clearTimeout(this.messageTimer);
    }, 2000);
  }

  render() {
    const { token, pageIdx, sortFieldIdx, sortDirectionIdx, message} = this.state;
    const { tasks, total_task_count } = this.props;

    const fieldName = FIELDS[sortFieldIdx];
    const dirName = SORT_DIRECTIONS[sortDirectionIdx];

    const headings = <div className="Task Task_head">
      <div className={`Task-Cell ${fieldName === "username" && "current"} ${fieldName === "username" && dirName} clickable`}
           onClick={() => this.handleChangeSort(1)}
      >
        username
      </div>
      <div className={`Task-Cell ${fieldName === "email" && "current"} ${fieldName === "email" && dirName} clickable`}
           onClick={() => this.handleChangeSort(2)}
      >
        email
      </div>
      <div className={`Task-Cell ${fieldName === "text" && "current"} clickable`}
      >
        text
      </div>
      <div className={`Task-Cell ${fieldName === "status" && "current"} ${fieldName === "status" && dirName} clickable`}
           onClick={() => this.handleChangeSort(3)}
      >
        status
      </div>
    </div>

    return (
      <div className="Layout">
        <div className="Layout-Message hidden" ref={node => this.message = node}>
          <span>
            {message}
          </span>
        </div>
        <div className="row Token" alt={token}>
          login: {this.props.token?.message?.token ? "Администратор" : "Не авторизован"}
        </div>
        <div className="row Token" alt={token}>
          Кол-во задач: {Number(this.props.total_task_count)}
        </div>
        <div className="Work-Content bordered">
          {tasks &&
          <TasksList data={tasks}
                     length={total_task_count}
                     headings={headings}
                     currentPageIdx={pageIdx}
                     onChangePage={val => this.handleChangePage(val)}
                     key={total_task_count}
          />
          }
        </div>

        <div className="Work-Footer bordered Panel">
         <div className="Work-Actions">
           <div className="row">
             <div className="btn" onClick={() => history.push('/login')}>
               Авторизация &#8594;
             </div>
           </div>
         </div>

          <AddTaskForm onAddTask={() => {
            this.showMessage();
            this.loadFormData();
          }} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    total_task_count: state.total_task_count,
    token: state.token,
  };
}

export default connect(mapStateToProps)(Work);
