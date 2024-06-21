const mysql = require("mysql");

const cnn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'sw_dev'
});
cnn.connect(err => {
    if (err) {
        console.error('데이터베이스 연결 실패: ' + err.stack);
        return;
    }
    console.log('데이터베이스에 연결되었습니다. ID: ' + cnn.threadId);
});

module.exports = cnn;