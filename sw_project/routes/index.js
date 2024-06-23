/* .routes/index.js */
const express = require("express");
const user = require("../controller/UserController");
const cartController = require('../controller/cartController');
const Map = require('../controller/mapController')
const router = express.Router();
const auth = require('../middleware/auth');
const dbMenu = require('../views/db_menu');

router.get("/", user.main);
router.get("/join", user.in_join);
router.post("/join", user.post_user);

router.get("/login", user.login);
router.post("/login", user.post_login);

//router.get("/check_id", user.idcheck);
router.get('/checkId/:id', user.check);

// edit 출력 확실시
router.get("/edit", user.edit);
router.post("/edit", user.edit);
router.patch("/edit", user.patch_user);
router.delete("/delete", user.delete_user);

// 메뉴 + 장바구니
router.get('/menu', cartController.menu);
router.get('/cart', cartController.getCartPage);
router.post('/add-to-cart', cartController.addToCart);
// 입금 페이지
router.get('/add-money', auth, user.getAddMoneyPage);
router.post('/add-money', auth, user.addMoney);
// 결제 페이지
router.get('/get-user-amount', cartController.getAmount);
router.post('/update-user-amount', cartController.updateAmount);

router.get("/logout", user.logout);

//map
router.get('/map', Map.getMap);
router.get('/api-key', Map.getApi);

// 관리자 페이지
router.get('/admin', user.admin);

router.post('/placeOrder', async (req, res) => {
    const cartItems = req.body.cartItems;
    const result = await dbMenu.saveOrder(cartItems); // saveOrder 함수 호출
    if (result) {
        res.send('주문이 성공적으로 저장되었습니다.');
    } else {
        res.status(500).send('주문 저장 중 오류가 발생했습니다.');
    }
});

module.exports = router; 