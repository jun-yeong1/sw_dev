require('dotenv').config();
const db = require('../db/db.js');
const apiKey = process.env.NAVER_MAPS_API_KEY;

exports.getMap = (req, res) => {
    res.render("map");
};

exports.getApi=(req, res) => {
    res.json({ apiKey: apiKey });
};

exports.getOrderCounts = (req, res) => {
    const sql = `
        SELECT campus, SUM(quantity) as total_quantity 
        FROM orders 
        JOIN order_items ON orders.id = order_items.order_id 
        WHERE orders.completed = 0 
        GROUP BY campus
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching order counts:', err);
            return res.status(500).send('Database query failed.');
        }

        const orderCounts = {};
        results.forEach(row => {
            orderCounts[row.campus] = (row.total_quantity + 1) * 3;
        });

        res.json({ orderCounts });
    });
};