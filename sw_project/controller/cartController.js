const db = require("../db/db.js");
const { saveOrder } = require("../views/db_menu");

const menuItems = [
    { id: 1, name: '아메리카노', price: 1800, description: '에스프레소와 물을 섞어 만든 커피', image: 'coffee1.jpg' },
    { id: 2, name: '카푸치노', price: 3000, description: '에스프레소와 스팀밀크, 거품을 올린 커피', image: 'coffee2.jpg' },
    { id: 3, name: '카페라떼', price: 3300, description: '에스프레소와 스팀밀크를 섞은 커피', image: 'coffee3.jpg' },
    { id: 4, name: '바닐라라떼', price: 3300, description: '에스프레소와 스팀밀크를 섞은 바닐라향이 나는 커피', image: 'coffee4.jpg' }
];

let cart = [];

exports.menu = (req, res) => {
    const cafe = {
        name: req.query.name
    }
    res.render("menu", { cafe });
};

exports.getCartPage = (req, res) => {
    res.render('cart', { cart });
};

exports.addToCart = (req, res) => {
    const { id, quantity } = req.body;
    const menuItem = menuItems.find(item => item.id === parseInt(id));

    if (menuItem) {
        const cartItem = cart.find(item => item.id === parseInt(id));
        if (cartItem) {
            cartItem.quantity += parseInt(quantity);
        } else {
            cart.push({ ...menuItem, quantity: parseInt(quantity) });
        }
    }
    res.redirect('/cart');
};

exports.getAmount = (req, res) => {
    if (req.session.user) {
        res.json({ amount: req.session.user.amount });
    } else {
        res.status(401).send('Unauthorized');
    }
}

exports.updateAmount = (req, res) => {
    if (req.session.user) {
        const newAmount = req.body.amount;
        const userId = req.session.user.id;

        db.query('UPDATE user SET amount = ? WHERE id = ?', [newAmount, userId], (err, results) => {
            if (err) {
                return res.status(500).send('Database update failed.');
            }
            req.session.user.amount = newAmount; // 세션에 저장된 사용자 정보도 업데이트
            res.send('User amount updated successfully.');
        });
    } else {
        res.status(401).send('Unauthorized');
    }
}

exports.placeOrder = async (req, res) => {
    if (req.session.user) {
        const cartItems = req.body.cartItems;
        const cafe = req.body.cafe;
        const userId = req.session.user.id;

        try {
            const result = await saveOrder(cartItems, cafe, userId);
            if (result) {
                res.send('Order placed successfully.');
            } else {
                res.status(500).send('Order placement failed.');
            }
        } catch (error) {
            console.error('Order placement error:', error);
            res.status(500).send('Order placement failed.');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
}
