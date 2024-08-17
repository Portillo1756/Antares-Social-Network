const { Email } = require('../models');

const emailData = [
    {
        email_name: 'portillo_andres17@yahoo.com',
    },
    {
        email_name: 'mishellescobar24@gmail.com',
    },
    {
        email_name: 'williamportillo17@yahoo.com',
    },
    {
        email_name: 'gustavoJR83@yahoo.com',
    },
    {
        email_name: 'josedanielportillo90@yahoo.com',
    },
    {
        email_name: 'sandraportillo66@gmail.com',
    },
    {
        email_name: 'brendaelizabeth20@gmail.com',
    },
    {
        email_name: 'angieportillo16@yahoo.com',
    },
];

const seedEmail = () => Email.bulkCreate(emailData);

module.exports = seedEmail;