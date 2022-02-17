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
      <div class="checker"><span class=""><input class="list-check-${element.index}" type="checkbox"></span></div>
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
  }

  onsubmiteventDispatcher = () => {
    this.addTask.addEventListener('keyup', (event) => {
      if (event.keyCode !== 13) {
        return;
      }

      const input = event.currentTarget.ref.addTask.value;
      if (!input.replace(/\s/g, '').length || input.length <= 0) {
        return;
      }

      if (event.keyCode === 13) {
        event.currentTarget.ref.todoList.push({
          index: (event.currentTarget.ref.todoList.length + 1), description: input, completed: false,
        });

        event.currentTarget.ref.onSaveList();
        event.currentTarget.ref.addTask.value = '';
      }
      event.currentTarget.ref.updateDom();
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