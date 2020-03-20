
// ---ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ---
const formSearch = document.querySelector('.form-search'),
    inputCitiesFrom = formSearch.querySelector('.input__cities-from'),
    dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from'),
    inputCitiesTo = formSearch.querySelector('.input__cities-to'),
    dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to'),
    inputDateDepart = formSearch.querySelector('.input__date-depart');

// ---ДАННЫЕ---
const city = ['Москва', 'Санкт-Петербург', 'Минск', 'Караганда', 'Челябинск',
    'Керчь', 'Волгоград', 'Самара', 'Днепропетровск', 'Екатеринбург', 'Одесса',
    'Ухань', 'Шымкен', 'Нижний Новгород', 'Калининград', 'Вроцлав', 'Ростов-на-Дону'];


// ---ФУНКЦИИ---

//Функция получения данных с сервера
const getData = (url) => {
  const request = new XMLHttpRequest();

  request.open('GET', url);
  request.addEventListener('readystatechange', () => {
    if(request.readyState !== 4) {
        return;
    }
    if(request.status === 200) {
        console.log(request);
    } else {
        console.error(request.status);
    }
  });
  request.send();
};
getData('https://jsonplaceholder.typicode.com/todos/1');

//Функция, которая показывает список городов по набранным символам
const showCity = (input, list) => {
    list.textContent = '';

    if (input.value !== '') {
        const filterCity = city.filter((item) => {
            const fixItem = item.toLowerCase();
            return fixItem.includes(input.value.toLowerCase());
        });

        filterCity.forEach((item) => {
            const li = document.createElement('li');
            li.classList.add('dropdown__city');
            li.textContent = item;
            list.append(li);
        });
    }

};
//Функция выбора города из списка
const selectCity = (event, input, list) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'li') {
        input.value = target.textContent;
        list.textContent = '';
    }
};


// ---ОБРАБОТКИ СОБЫТИЙ---

//Вызов функции showCity для "Откуда"
inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom);
});
//Вызов функции showCity для "Куда"
inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo);
});

//Для "Отдуда" создаём выбор города из выпадающего списка
dropdownCitiesFrom.addEventListener('click',(event) =>{
    selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

//Для "Куда" создаём выбор города из выпадающего списка
dropdownCitiesTo.addEventListener('click', (event) => {
    selectCity(event, inputCitiesTo, dropdownCitiesTo);
});

