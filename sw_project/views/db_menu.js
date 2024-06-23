const db = require("../db/db.js");

exports.saveOrder = async (cartItems, cafe, userId) => {
    try {
        const orderResult = await new Promise((resolve, reject) => {
            const sql = `INSERT INTO orders (user_id, campus, completed) VALUES (?, ?, 0)`;
            db.query(sql, [userId, cafe], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        const orderId = orderResult.insertId;

        for (let item of cartItems) {
            const { name, price, quantity } = item;
            await new Promise((resolve, reject) => {
                const sql = `INSERT INTO order_items (order_id, name, price, quantity) VALUES (?, ?, ?, ?)`;
                db.query(sql, [orderId, name, price, quantity], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }
        return true;
    } catch (error) {
        console.error('주문 내역 저장 중 오류가 발생했습니다.', error);
        return false;
    }
}
