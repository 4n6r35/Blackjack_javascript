const socket = io();
const roomidElement = document.getElementById('roomid');
const startBtnContainer = document.getElementById('startBtnContainer');

const getQuerystring = () => {
    let output = {}
    if (window.location.search) {
        var queryParams = window.location.search.substring(1);
        var listQueries = queryParams.split("&");
        for (var query in listQueries) {
            if (listQueries.hasOwnProperty(query)) {
                var queryPair = listQueries[query].split('=');
                output[queryPair[0]] = decodeURIComponent(queryPair[1] || "");
            }
        }
    }
    return output;
}

const { username, roomid, bidamt, type } = getQuerystring()

if (type === '1') {
    startBtnContainer.classList.toggle('d-none')
    startBtnContainer.addEventListener('click', () => {
        startGame
    });
}


const startGame = () => {
    socket.emit('startGame', { username, roomid, type });
}

const outputRoomName = (roomid) => {
    roomidElement.innerHTML = `Room ID: <span style="color:brown;">${roomid}</span>`
}

const userListItemHTML = (user) => {
    const listItem = document.createElement('li');
    const spanItem = document.createElement('span');

    //List Item
    listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
    listItem.innerText = user.username

    //Span Item
    spanItem.classList.add('badge', 'badge-primary', 'badge-pill');
    spanItem.innerText = user.bidamt

    listItem.appendChild(spanItem);

    return listItem;
}

const outputUsers = (users = []) => {
    const listGroupUsers = document.getElementById('list-user-group')

    const firstUserItem = document.createElement('li');
    firstUserItem.classList.add('list-group-item', 'active')
    firstUserItem.textContent = 'Users';

    listGroupUsers.innerHTML = '';
    listGroupUsers.appendChild(firstUserItem)
    users.forEach(user => {
        const userListItem = userListItemHTML(user);
        listGroupUsers.appendChild(userListItem)
    })
}


const main = () => {
    //Join ChatRoom
    socket.emit('joinRoom', { username, roomid, bidamt, type });

    //Get room and Users
    socket.on('roomUsers', ({ roomid, users }) => {
        outputRoomName(roomid);
        outputUsers(users);
    })

    //Message from Server
    socket.on('message', (message) => {
        console.log(message);
    })
}

main();