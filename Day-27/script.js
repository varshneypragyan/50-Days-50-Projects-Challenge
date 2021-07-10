const button = document.getElementById('button');
const toasts = document.getElementById('toasts');

const messages = [
    'Meassage One',
    'Message Two',
    'Message Three',
    'Message Four',
]

button.addEventListener('click', ()=> createNotification());

function createNotification(type = null) {
    const notify = document.createElement('div');
    notify.classList.add('toast');

    notify.innerText = getRandomMessage();
    toasts.appendChild(notify);
    

    setTimeout(()=> {
        notify.remove();
    }, 3000);
}

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}