const buttonChangeTab = document.getElementById('check');
const buttonCreateRoom = document.getElementById('create-room');
const roomidElement = document.getElementById('roomid');
const containerCR = document.getElementById('CR');
const containerJR = document.getElementById('JR');
const btnCrear = document.getElementById('btnCR')
const btnJoin = document.getElementById('btnJR')

let visibleContainerCR = true;


const handleChangeTab = () => {
    visibleContainerCR = !visibleContainerCR;
    if (visibleContainerCR) {
        containerCR.style = `
            visibility: visible;
            -webkit-transition: .5s;
            transition: .5s;
            width: 100%
        `
        containerJR.style = `
            visibility: hidden;
            -webkit-transition: .25s;
            transition: .25s;
            width:0px
        `
    } else {
        containerCR.style = `
            visibility: hidden;
            -webkit-transition: .25s;
            transition: .25s;
            width:0px;
        `
        containerJR.style = `
            visibility: visible;
            -webkit-transition: .5s;
            transition: .5s;
            width:100%
        `
    }
}

const initRoomId = () => {
    const roomid = Math.random().toString(20).substring(2, 6);
    roomidElement.value = roomid
}

void (() => {
    initRoomId();
    buttonChangeTab.addEventListener('click', handleChangeTab);
})()

