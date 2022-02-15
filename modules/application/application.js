import { DateTime } from '../../node_modules/luxon/src/luxon.js';

class Application {
  constructor() {
    this.contactForm = document.querySelector('.book_form');
    this.title = document.querySelector('.book_title');
    this.author = document.querySelector('.book_author');
    this.bookList = document.querySelector('.parent_book_container');
    this.dateTime = document.querySelector('.date_time');
    this.bookListSection = document.querySelector('.book_list_section');
    this.addBookSection = document.querySelector('.add_book_section');
    this.contactSection = document.querySelector('.contact_section');

    this.booksArray = [];
    this.monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.contactForm.addEventListener('submit', (event) => {
      event.currentTarget.ref.addBook();
      event.preventDefault();
    });
    this.contactForm.ref = this;

    document.querySelector('.nav1').addEventListener('click', (event) => {
      event.currentTarget.ref.displayBookListSection();
    });
    document.querySelector('.nav1').ref = this;

    document.querySelector('.nav2').addEventListener('click', (event) => {
      event.currentTarget.ref.displayAddBookSection();
    });
    document.querySelector('.nav2').ref = this;

    document.querySelector('.nav3').addEventListener('click', (event) => {
      event.currentTarget.ref.displayContactSection();
    });
    document.querySelector('.nav3').ref = this;

    if (localStorage.getItem('books') != null) {
      this.displayBookListSection();
      this.booksArray = JSON.parse(localStorage.getItem('books'));
      this.intitializeDocument();
      this.intitializeRemoveButtonEvents();
    }

    window.setInterval((ref) => {
      const currentdate = DateTime.now();
      ref.dateTime.innerHTML = `<p>${ref.monthMap[currentdate.month - 1]} ${currentdate.day}, ${currentdate.year}. ${currentdate.hour}:${currentdate.minute}:${currentdate.second}</p>`;
    }, 1000, this);
  }

  intitializeDocument = () => {
    this.bookList.innerHTML = '';
    let i = (this.booksArray.length - 1);
    this.booksArray.forEach(() => {
      let bgConst = '';
      if (i % 2 === 0) {
        bgConst = 'bg-color';
      }
      this.bookList.innerHTML = `${this.bookList.innerHTML}<div class="books-list ${bgConst}">
      <p>${this.booksArray[i].title} by ${this.booksArray[i].author}</p>
      <button class="rem_button remove_button_${i}">remove</button>
      </div>`;
      i -= 1;
    }, i);
  }

  removeBook = (index) => {
    document.querySelector(`.remove_button_${index}`).addEventListener('click', (event) => {
      const tempbooksArray = [];
      const objectReference = event.currentTarget.ref;
      this.booksArray.forEach((element, j) => {
        if (j !== event.currentTarget.index) {
          tempbooksArray.push({
            title: objectReference.booksArray[j].title,
            author: objectReference.booksArray[j].author,
          });
        }
      }, tempbooksArray, objectReference);
      objectReference.booksArray = tempbooksArray;
      localStorage.setItem('books', JSON.stringify(objectReference.booksArray));
      objectReference.intitializeDocument();
      objectReference.intitializeRemoveButtonEvents();
    });
    document.querySelector(`.remove_button_${index}`).index = index;
    document.querySelector(`.remove_button_${index}`).ref = this;
  }

  intitializeRemoveButtonEvents = () => {
    let i = (this.booksArray.length - 1);
    this.booksArray.forEach(() => {
      this.removeBook(i);
      i -= 1;
    }, i);
  }

  addBook = () => {
    this.displayBookListSection();
    this.booksArray.push({ title: this.title.value, author: this.author.value });
    localStorage.setItem('books', JSON.stringify(this.booksArray));
    this.title.value = '';
    this.author.value = '';
    this.intitializeDocument();
    this.intitializeRemoveButtonEvents();
  }

  displayBookListSection = () => {
    this.bookListSection.classList.remove('vanish');
    this.addBookSection.classList.add('vanish');
    this.contactSection.classList.add('vanish');
  }

  displayAddBookSection = () => {
    this.bookListSection.classList.add('vanish');
    this.addBookSection.classList.remove('vanish');
    this.contactSection.classList.add('vanish');
  }

  displayContactSection = () => {
    this.bookListSection.classList.add('vanish');
    this.addBookSection.classList.add('vanish');
    this.contactSection.classList.remove('vanish');
  }
}

/* eslint-disable */
export { Application };
/* eslint-enable */