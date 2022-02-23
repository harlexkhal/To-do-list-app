class Application {
  constructor(isTest = false) {
    this.addTask = document.querySelector('.add-task');
    this.domList = document.querySelector('.todo-list');
    this.todoList = [];
    this.localStorageStringInstance = 'application_config';
    this.testMode = isTest;
  }

  initApp = () => {
    this.onLoadList();
    this.updateDom();
  }

  addTaskToList = (inputTask) => {
    this.todoList.push({
      index: (this.todoList.length + 1), description: inputTask, completed: false,
    });

    this.onSaveList();
    this.updateDom();
  }

  deleteTask = (deleteIndex) => {
    const localArray = [];
    let count = 1;
    this.todoList.forEach((element, i) => {
      if (i !== deleteIndex) {
        this.todoList[i].index = count;
        localArray.push(this.todoList[i]);
        count += 1;
      }
    });
    this.todoList = localArray;
    this.onSaveList();
    this.updateDom();
  }

  editTaskList = (index, word) => {
    if (index < this.todoList.length) {
      this.todoList[index].description = word;
      this.onSaveList();
    }

    return this.todoList[index].description;
  }

  checkTask = (index, status) => {
    if (index < this.todoList.length) {
      this.todoList[index].completed = !status;
      this.onSaveList();
    }

    return this.todoList[index].completed;
  }

  clearAllChecked = () => {
    const filteredTasks = this.todoList.filter((item) => {
      const state = item.completed === false;
      return state;
    });
    this.todoList = filteredTasks;
    this.onSaveList();

    return this.todoList === filteredTasks;
  }

  updateDom = () => {
    const ref = this;
    this.domList.innerHTML = '';
    this.todoList.forEach((element) => {
      let completed = '';
      if (element.completed) {
        completed = 'done-task';
      }
      ref.domList.innerHTML = `${ref.domList.innerHTML} <li class="todo-item">
      <div class="checker"><span class=""><input class="list-check-${element.index} action_check" type="checkbox"></span></div>
      <span class="${completed} desc" contentEditable="true">${element.description}</span>
      <i class="fa fa-trash-o float-right delete"></i>
      </li>`;
    }, ref);

    this.todoList.forEach((element) => {
      const checkList = document.querySelector(`.list-check-${element.index}`);
      checkList.checked = false;
      if (element.completed) {
        checkList.checked = true;
      }
    });

    if (this.testMode === false) {
      this.eventDispatcher();
    }
  }

  eventDispatcher = () => {
    this.onclickeventDispatcher();
    this.onsubmiteventDispatcher();
    this.onediteventDispatcher();
  }

  onclickeventDispatcher = () => {
    // delete task
    const buttons = document.querySelectorAll('.delete');
    const ref = this;
    buttons.forEach((button, index) => {
      button.addEventListener('click', (event) => {
        const eventIdentifier = event.currentTarget;
        eventIdentifier.ref.deleteTask(eventIdentifier.index);
      });
      button.index = index;
      button.ref = ref;
    }, ref);

    // check task
    const checks = document.querySelectorAll('.action_check');
    checks.forEach((check, index) => {
      check.addEventListener('click', (event) => {
        const refObj = event.currentTarget;
        this.checkTask(refObj.index, refObj.ref.todoList[refObj.index].completed);
        ref.updateDom();
      });
      check.index = index;
      check.ref = ref;
    }, ref);

    // clear all completed
    const clearBtn = document.querySelector('.custom-btn');
    clearBtn.addEventListener('click', () => {
      this.clearAllChecked();
      ref.updateDom();
    });
    clearBtn.ref = this;
  }

  onsubmiteventDispatcher = () => {
    this.addTask.addEventListener('keyup', (event) => {
      if (event.keyCode !== 13) {
        return;
      }

      const refObj = event.currentTarget;
      const input = refObj.ref.addTask.value;
      if (!input.replace(/\s/g, '').length || input.length <= 0) {
        return;
      }

      if (event.keyCode === 13) {
        refObj.ref.addTaskToList(input);
        refObj.ref.addTask.value = '';
      }
      event.preventDefault();
    });
    this.addTask.ref = this;
  }

  onediteventDispatcher = () => {
    const ref = this;
    const listDesc = document.querySelectorAll('.desc');
    listDesc.forEach((desc, index) => {
      desc.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13) {
          return;
        }

        const refObj = event.currentTarget;
        let input = refObj.value.innerHTML;
        refObj.value.innerHTML = input.replace('<br>', '');
        input = refObj.value.innerHTML;
        if (!input.replace(/\s/g, '').length || input.length <= 0) {
          return;
        }

        if (refObj.value.innerHTML !== refObj.ref.todoList[refObj.index].description) {
          refObj.value.innerHTML = input.replace('<br>', '');
          this.editTaskList(refObj.index, refObj.value.innerHTML);
          refObj.value.blur();
        }
      });

      desc.addEventListener('focusout', (event) => {
        const refObj = event.currentTarget;
        if (refObj.value.innerHTML !== refObj.ref.todoList[refObj.index].description) {
          this.editTaskList(refObj.index, refObj.value.innerHTML);
        }
      });

      desc.index = index;
      desc.ref = ref;
      desc.value = desc;
    }, ref);
  }

  onSaveList = () => {
    if (this.testMode === false) {
      localStorage.setItem(this.localStorageStringInstance, JSON.stringify(this.todoList));
    }

    return this.todoList;
  }

  onLoadList = () => {
    if (this.testMode === false) {
      if (localStorage.getItem(this.localStorageStringInstance) != null) {
        this.todoList = JSON.parse(localStorage.getItem(this.localStorageStringInstance));
      }
    }

    return this.todoList;
  }
}

export default Application;