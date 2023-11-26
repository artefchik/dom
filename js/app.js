import { products } from '../data/date.js';
import { dataCalculator } from '../data/date.js';

const linkPrev = document.querySelector('.link_prev');
if (linkPrev) {
    linkPrev.addEventListener('click', () => {
        history.back();
    });
}

const cards = document.querySelector('.cards');
if (cards) {
    if (products.length) {
        products.forEach((product) => {
            const productHTML = ` <div data-id='${product.id}' class="card">
            <a href="#!" class="card__image"><img src="images/${product.image}" alt=""></a>
            <div class="card__content">
              <a href="#!" class="card__title"><h4 >${product.title}</h4></a>
                <ul class="card__specifications specifications-card">
                    <li class="specifications-card__corpus">Корпус:<span>${product.corpus}</span></li>
                    <li class="specifications-card__remen">Ремешок:<span>${product.remen}</span></li>
                    <li class="specifications-card__display-size">Размер дисплея:<span>${product.displaySize}</span></li>
                    <li class="specifications-card__display-type">Тип дисплея:<span>${product.displayType}</span></li>
                    <li class="specifications-card__bluetooth">Bluetooth:<span>${product.bluetooth ? 'да' : 'нет'}</span></li>
                    <li class="specifications-card__os">Операционная система:<span>${product.OS.hasOwnProperty('os1') ? product.OS.os1 + ',' : ''}${
                product.OS.hasOwnProperty('os2') ? product.OS.os2 : ''
            }</span></li>
                </ul>
            </div>
            <a href="#!" class="card__more">Подробнее</a>
        </div>`;

            cards.insertAdjacentHTML('beforeend', productHTML);
        });
    }
}

//==================================================================================================

function watch() {
    const end = new Date(2024, 0, 1);

    const time = end - new Date();
    if (time <= 0) {
        clearInterval(watch);
    }
    const daysTime = time > 0 ? Math.floor(time / 1000 / 60 / 60 / 24) : 0;
    const hoursTime = time > 0 ? Math.floor(time / 1000 / 60 / 60) % 24 : 0;
    const minutesTime = time > 0 ? Math.floor(time / 1000 / 60) % 60 : 0;
    const secondsTime = time > 0 ? Math.floor(time / 1000) % 60 : 0;

    const days = document.querySelector('.watch__days span');
    const hours = document.querySelector('.watch__hours span');
    const minutes = document.querySelector('.watch__minutes span');
    const seconds = document.querySelector('.watch__seconds span');

    if (days) {
        days.textContent = daysTime;
        hours.textContent = hoursTime;
        minutes.textContent = minutesTime;
        seconds.textContent = secondsTime;
    }

    // watch()
}
setInterval(watch, 1000);

//==================================================================================================

if (dataCalculator.length) {
    const calculator = document.querySelector('.calculator');
    let total = [];
    if (calculator) {
        const listCalculator = calculator.querySelector('.list-calculator');
        const totalOutput = calculator.querySelector('.calculator__total span');
        const itemsCalculators = dataCalculator
            .map((item) => {
                return `<li data-id="${item.id}" class="list-calculator__item">
            <div class="list-calculator__title">${item.title}</div>
            <div class="list-calculator__price">${item.price}</div>
            <input class="list-calculator__input" min=0 type="number">
            <div class="list-calculator__sum"></div>
        </li>`;
            })
            .join('');
        listCalculator.innerHTML = itemsCalculators;

        calculator.addEventListener('input', (event) => {
            const targetItem = event.target;
            if (targetItem.closest('.list-calculator__input')) {
                const valueInput = targetItem.value ? targetItem.value : 0;
                console.log(valueInput);
                const itemId = targetItem.parentElement.dataset.id;
                const item = calculator.querySelector(`[data-id="${itemId}"]`);
                const itemInData = dataCalculator.find((elem) => elem.id === itemId);
                const price = itemInData.price;
                const sumOutput = item.querySelector('.list-calculator__sum');
                const sumValue = Number(valueInput) * price;
                itemInData.sum = sumValue;
                console.log(itemInData);
                sumOutput.textContent = sumValue;
                totalOutput.textContent = sum(dataCalculator);
            }
        });
    }
}

function sum(array) {
    return array.reduce((accum, elem) => accum + elem.sum, 0);
}
