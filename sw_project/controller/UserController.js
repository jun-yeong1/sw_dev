const User = require("../model/User");

//메인화면
exports.main = (req, res) => {
    res.render("main");
}
// 회원가입 페이지
exports.in_join = (req, res) => {
    res.render("join");
}
//User 정보 저장하기
exports.post_user = (req, res) => {
    User.insert( req.body, function (result) {  
        if (err) {
            return res.status(500).send({ error: '데이터베이스 오류가 발생했습니다' });
        }
        res.send({ id: result});
    })
}

//login 화면
exports.login = (req, res) => {
    res.render("login");
}

//login 시도
exports.post_login = (req, res) => {
    User.select( req.body.id, req.body.password, function (result) {
        if (result == null) {
            return res.send({result: result, flag: false});
        } else{
            if (req.body.password != result.password) {
                return res.send({result: result, flag: false});
            }else {
                return res.send({result: result, flag: true});
            }
        }
    });
}

//회원정보 수정 화면
exports.edit = (req, res) => {
    User.get_user( req.body.id, function (result) {      
        res.render("edit", {data: result[0]});
    });
}

//정보 수정
exports.patch_user = (req, res) => {
    User.update( req.body, function (result) {      
        console.log("update result:" , result);
        res.send("수정완료");
    });
}

//정보 삭제
exports.delete_user = (req, res) => {
    User.delete( req.body.id, function (result) {      
        console.log("delete result:" , result);
        res.send("success Delete!");
    });
}

exports.main = (req, res) => {
    res.render('main'); 
}

// 로그인 후에 addmoney 페이지 생성
exports.getAddMoneyPage = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/user/login');
    }
    res.render('addMoney', { user: req.session.user });
};

exports.addMoney = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/user/login');
    }
    const { amount } = req.body;
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount < 0) {
        return res.send('Invalid amount. Please enter a positive number.');
    }
    
    const newAmount = parseFloat(req.session.user.amount) + parseFloat(amount);
    db.query('UPDATE user SET amount = ? WHERE id = ?', [newAmount, req.session.user.id], (err) => {
        if (err) throw err;
        req.session.user.amount = newAmount;
        res.redirect('/user/add-money');
    });
};