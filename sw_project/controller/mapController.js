require('dotenv').config();
const apiKey = process.env.NAVER_MAPS_API_KEY;

exports.getMap = (req, res) => {
    res.render("map");
};

exports.getApi=(req, res) => {
    res.json({ apiKey: apiKey });
};