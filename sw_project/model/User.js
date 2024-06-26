/* ./model/User.js */
const cnn = require("../db/db.js");

//회원가입 정보 입력
exports.insert = ( data, cb ) => {
    var sql = `INSERT INTO user (id, name, password, amount) VALUES ('${data.id}', '${data.name}', '${data.password}', 0);`;
    cnn.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( data.id );
    });
}

//로그인 정보 읽기
exports.select = ( id, password, cb ) => {
    var sql = `SELECT * FROM user WHERE id='${id}' limit 1`;

    cnn.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( rows[0] );
    });
}

//회원 정보
exports.get_user = (id, cb) => {
    let sql = `SELECT * FROM user WHERE id='${id}' limit 1;`;
  
    cnn.query( sql, function(err, rows){
        if ( err ) throw err;
        cb(rows);
    });
}

//회원 정보 수정
exports.update = ( data,  cb ) => {
    var sql = `UPDATE user SET name='${data.name}', password='${data.password}', amount='${data.amount}' WHERE id='${data.id}';`;

    cnn.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( rows );
    });
}

//회원 탈퇴
exports.delete = ( id,  cb ) => {
    var sql = `DELETE FROM user WHERE id='${id}';`;
  
    cnn.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( rows );
    });
}

//아이디 중복체크

exports.checkId = (id, cb) => {
    var sql = `SELECT id FROM user WHERE id = ?`;
    cnn.query(sql, [id], (err, rows) => {
        if (err) throw err;
        cb(rows.length > 0);
    });
};