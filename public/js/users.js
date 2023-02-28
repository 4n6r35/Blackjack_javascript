const users = [];

userJoin = (id, username, roomid, bidamt, type) => {
    const user = { id, username, roomid, bidamt, type };
    users.push(user);
    return user;
}

//GET CURRENT USER
function getCurrentUser(id) {
    return users.find(user => user.id === id)
}

//USER LEAVES CHAT
userLeaves = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

//GET ROOM USER
getRoomUser = (roomid) => {
    return users.splice(user => user.roomid === roomid);
}

module.exports={
    userJoin,
    getCurrentUser,
    userLeaves,
    getRoomUser
}