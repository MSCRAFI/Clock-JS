import dayjs from 'https://cdn.skypack.dev/dayjs@1.10.7';

const dateObj = {dayName: '',
                    monthName: '',
                    day: '',
                    currentTime: ''
};

function addToObj() {
    dateObj.dayName = dayjs().format('dddd');
    dateObj.monthName = dayjs().format('MMMM');
    dateObj.day = dayjs().format('D');
    dateObj.currentTime = dayjs().format('hh:mm:ss');
}

const varDisplayHTML = () => displayHTML();


function displayHTML() {
    addToObj();
    document.querySelector('.js-day-name')
        .innerHTML = `${dateObj.dayName}`;
    
    document.querySelector('.js-month-day')
        .innerHTML = `${dateObj.monthName} ${dateObj.day}`;

    document.querySelector('.js-current-time')
        .innerHTML = `${dateObj.currentTime}`;

    }
    
displayHTML();
setInterval(varDisplayHTML, 1000);

