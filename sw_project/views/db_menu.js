const cnn = require("../db/db");

async function saveOrder(cartItems) {
    try {
        for (let item of cartItems) {
            const { name, price, quantity } = item;
            const sql = `INSERT INTO menu (name, price, quantity, created_at) VALUES (?, ?, ?, NOW())`;
            await new Promise((resolve, reject) => {
                cnn.query(sql, [name, price, quantity], (err, result) => {
                    if (err) {
                        console.error('주문 항목 삽입 중 오류 발생:', err);
                        reject(err);
                    } else {
                        console.log(`메뉴 '${name}'이(가) 성공적으로 삽입되었습니다.`);
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

module.exports = {
    saveOrder
};