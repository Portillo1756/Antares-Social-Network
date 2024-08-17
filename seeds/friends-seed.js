const { Friends } = require('../models');

const friendsData = [
    {
        friend_name: 'Andres Portillo',
    },
    {
        friend_nme: 'Mishell Portillo',
    },
    {
        friend_name: 'William Portillo',
    },
    {
        friend_name: 'Gustavo Portillo',
    },
    {
        friend_name: 'Jose Portillo',
    },
    {
        friend_name: 'Sandra Portillo',
    },
    {
        friend_name: 'Brenda Portillo',
    },
    {
        friend_name: 'Angelica Portillo',
    },
];

const seedFriends = () => Friends.bulkCreate(friendsData);

module.exports = seedFriends;