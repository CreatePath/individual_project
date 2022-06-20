const crypto = require('crypto');
pw = "djslfja;lsjflwjfdlsdfsdfswekjl"
crypto.pbkdf2(pw, 'salt', 100000, 64, 'sha512', (err, 
    derivedKey) => {
      if (err) throw err;
      
      pw = derivedKey.toString('hex');
      console.log(pw);
    });

console.log(pw);