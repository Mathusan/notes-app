const bcrypt = require('bcrypt')


const users = 
    {
        email: 'admin@notesapp.com',
        password: bcrypt.hashSync('12345678',10),
        verified : true,
        status : true,
        accountType : 'Admin',
        // id: 1        
    }


module.exports = users