class Application {
  constructor() {
    this.addTask = document.querySelector('.add-task');
    this.domList = document.querySelector('.todo-list');
    this.todoList = [];
  }

  initApp = () => {
    this.onLoadList();
    this.updateDom();
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

    this.eventDispatcher();
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
        const localArray = [];
        let count = 1;
        eventIdentifier.ref.todoList.forEach((element, i) => {
          if (i !== eventIdentifier.index) {
            eventIdentifier.ref.todoList[i].index = count;
            localArray.push(eventIdentifier.ref.todoList[i]);
            count += 1;
          }
        });
        eventIdentifier.ref.todoList = localArray;
        eventIdentifier.ref.onSaveList();
        ref.updateDom();
      });
      button.index = index;
      button.ref = ref;
    }, ref);

    // check task
    const checks = document.querySelectorAll('.action_check');
    checks.forEach((check, index) => {
      check.addEventListener('click', (event) => {
        const refObj = event.currentTarget;
        if (refObj.ref.todoList[refObj.index].completed) {
          refObj.ref.todoList[refObj.index].completed = false;
        } else {
          refObj.ref.todoList[refObj.index].completed = true;
        }
        refObj.ref.onSaveList();
        ref.updateDom();
      });
      check.index = index;
      check.ref = ref;
    }, ref);

    // clear all completed
    const clearBtn = document.querySelector('.custom-btn');
    clearBtn.addEventListener('click', (event) => {
      const refObj = event.currentTarget;
      const filteredTasks = refObj.ref.todoList.filter((item) => {
        const state = item.completed === false;
        return state;
      });
      refObj.ref.todoList = filteredTasks;
      refObj.ref.onSaveList();
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
        refObj.ref.todoList.push({
          index: (refObj.ref.todoList.length + 1), description: input, completed: false,
        });

        refObj.ref.onSaveList();
        refObj.ref.addTask.value = '';
      }
      refObj.ref.updateDom();
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
          refObj.ref.todoList[refObj.index].description = refObj.value.innerHTML;
          refObj.ref.onSaveList();
          refObj.value.blur();
        }
      });
      desc.index = index;
      desc.ref = ref;
      desc.value = desc;
    }, ref);
  }

  onSaveList = () => {
    localStorage.setItem('application_config', JSON.stringify(this.todoList));
  }

  onLoadList = () => {
    if (localStorage.getItem('application_config') != null) {
      this.todoList = JSON.parse(localStorage.getItem('application_config'));
    }
  }
}

/* eslint-disable */
export { Application };
/* eslint-enable */