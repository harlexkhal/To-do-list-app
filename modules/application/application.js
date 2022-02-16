class Application {
  constructor() {
    this.domList = document.querySelector('.todo-list');
    this.todoList = [{ index: 0, description: 'Set up project', completed: true },
      { index: 1, description: 'Integrate webpack', completed: true },
      { index: 2, description: 'Create github repo', completed: true },
      { index: 3, description: 'Implement add to list', completed: false },
      { index: 4, description: 'Implement remove from list', completed: false },
      { index: 5, description: 'Implement drag and drop feature', completed: false },
      { index: 6, description: 'submit project for review', completed: false },
    ];
  }

  initApp = () => {
    const ref = this;
    this.todoList.forEach((element) => {
      let completed = '';
      if (element.completed) {
        completed = 'done-task';
      }
      ref.domList.innerHTML = `${ref.domList.innerHTML} <li class="todo-item">
      <div class="checker"><span class=""><input class="list-check-${element.index}" type="checkbox"></span></div>
      <span class="${completed}">${element.description}</span>
      <i class="fa fa-trash-o float-right"></i>
      </li>`;
    }, ref);

    this.todoList.forEach((element) => {
      const checkList = document.querySelector(`.list-check-${element.index}`);
      checkList.checked = false;
      if (element.completed) {
        checkList.checked = true;
      }
    });
  }
}

/* eslint-disable */
export { Application };
/* eslint-enable */