const User = require("../model/User");
const db = require("../db/db.js");

//메인화면
exports.main = (req, res) => {
    res.render("main", {user: req.session.user}); // 여기서 "main"은 main 화면을 위한 템플릿 이름입니다.
}
// 회원가입 페이지
exports.in_join = (req, res) => {
    res.render("join");
}
//User 정보 저장하기
exports.post_user = (req, res) => {
    User.insert( req.body, function (result) {  
        res.send({ id: result});
    })
}

/*//아이디 중복체크 페이지
exports.idcheck = (req, res) => {
    res.render("check_id");
}*/

exports.check = (req, res) => {
    User.checkId(req.params.id, (exists)=>{
        res.send({exists});
    })
}

//login 화면
exports.login = (req, res) => {
    res.render("login");
}

//login 시도
exports.post_login = (req, res) => {
    User.select(req.body.id, req.body.password, function (result) {
        if (result == null) {
            return res.send({ result: result, flag: false });
        } else {
            if (req.body.password != result.password) {
                return res.send({ result: result, flag: false });
            } else {
                req.session.user = {
                    id: result.id,
                    amount: result.amount
                };
                return res.send({ result: result, flag: true });
            }
        }
    });
};
// 관리자 페이지
exports.admin = (req, res) => {
    const campus = req.query.campus || '공대 5호관';
    const userQuery = "SELECT * FROM user";
    const orderQuery = `
        SELECT orders.id AS orderId, orders.user_id, orders.campus, orders.completed, orders.created_at,
               order_items.name, order_items.price, order_items.quantity
        FROM orders
        JOIN order_items ON orders.id = order_items.order_id
        WHERE orders.campus = ?
        ORDER BY orders.created_at DESC;
    `;

    db.query(userQuery, (userErr, userResults) => {
        if (userErr) {
            console.error("Database query error:", userErr);
            return res.status(500).send('Server error');
        }

        db.query(orderQuery, [campus], (orderErr, orderResults) => {
            if (orderErr) {
                console.error("Database query error:", orderErr);
                return res.status(500).send('Server error');
            }

            const orders = orderResults.reduce((acc, row) => {
                const { orderId, user_id, campus, completed, created_at, name, price, quantity } = row;
                if (!acc[orderId]) {
                    acc[orderId] = {
                        orderId,
                        user_id,
                        campus,
                        completed,
                        created_at,
                        items: []
                    };
                }
                acc[orderId].items.push({ name, price, quantity });
                return acc;
            }, {});

            res.render("admin", { users: userResults, orders: Object.values(orders), campus });
        });
    });
};

//회원정보 수정 화면
exports.in_edit = (req, res) => {
    const userId = req.session.user; // 세션에서 사용자 ID 가져오기
    if (!userId) {
        return res.status(401).send("Unauthorized");
    }
    User.get_user(userId, function (result) {
        res.render("edit", { data: result[0] });
    });
};
/*
exports.edit = (req, res) => {
    User.get_user( req.body.id, function (result) {      
        res.render("edit", {data: result[0]});
    });
}*/

exports.edit = (req, res) => {
    const userId = req.method === 'GET' ? req.query.id : req.body.id;
    User.get_user(userId, function (result) {
        res.render("edit", { data: result });
    });
};

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
/*
exports.main = (req, res) => {
    res.render('main'); 
} */
exports.orderList = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const userId = req.session.user.id;

    const query = `
        SELECT orders.id AS orderId, orders.campus, orders.completed, order_items.name, order_items.price, order_items.quantity
        FROM orders
        JOIN order_items ON orders.id = order_items.order_id
        WHERE orders.user_id = ?
        ORDER BY orders.created_at DESC;
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            return res.status(500).send('Database query failed.');
        }

        const orders = results.reduce((acc, row) => {
            const { orderId, campus, completed, name, price, quantity } = row;
            if (!acc[orderId]) {
                acc[orderId] = {
                    id: orderId,
                    campus: campus,
                    completed: completed,
                    items: []
                };
            }
            acc[orderId].items.push({ name, price, quantity });
            return acc;
        }, {});

        res.render('order-list', { orders: Object.values(orders) });
    });
};

exports.completeOrder = (req, res) => {
    const { orderId } = req.body;
    const query = "UPDATE orders SET completed = 1 WHERE id = ?";
    db.query(query, [orderId], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.status(500).send('Server error');
        }
        res.redirect('/admin');
    });
};


// 로그인 후에 addmoney 페이지 생성
exports.getAddMoneyPage = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('addMoney', { user: req.session.user });
};

exports.addMoney = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const { amount } = req.body;
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount < 0) {
        return res.send('Invalid amount. Please enter a positive number.');
    }
    
    const newAmount = parseFloat(req.session.user.amount) + parseFloat(amount);
    db.query('UPDATE user SET amount = ? WHERE id = ?', [newAmount, req.session.user.id], (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: '금액 충전에 실패했습니다.' }); 
        }
        req.session.user.amount = newAmount;
        res.redirect('/add-money');
    });
};
// 로그아웃
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Failed to destroy session during logout.', err);
            return res.status(500).send('Failed to logout.');
        }
        res.redirect('/');
    });
};