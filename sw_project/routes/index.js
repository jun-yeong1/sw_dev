/* .routes/index.js */
const express = require("express");
const user = require("../controller/UserController");
const cartController = require('../controller/cartController');
const router = express.Router();

router.get("/", user.index);
router.post("/join", user.post_user);

router.get("/login", user.login);
router.post("/login", user.post_login);

router.post("/edit", user.edit);
router.patch("/edit", user.patch_user);
router.delete("/delete", user.delete_user);
/* 메인 페이지 */
router.get("/test", user.main);
// 메뉴 + 장바구니 
router.get('/menu', cartController.getMenuPage);
router.get('/cart', cartController.getCartPage);
router.post('/add-to-cart', cartController.addToCart);

module.exports = router; 