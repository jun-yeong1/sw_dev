var express = require('express');
var router = express.Router();

// 데이터를 준비합니다.
var menu = [
  { name: '아메리카노' },
  { name: '카페 라떼' },
  { name: '카푸치노' }
];

var contact = {
  address: '서울특별시 종로구',
  phoneNumber: '02-123-4567'
};

var year = new Date().getFullYear();

// 라우트 설정
router.get('/test', function(req, res, next) {
  res.render('test', { menu: menu, contact: contact, year: year });
});

module.exports = router;