const menuItems = [
    { id: 1, name: '아메리카노', price: 1800, description: '에스프레소와 물을 섞어 만든 커피', image: 'coffee1.jpg' },
    { id: 2, name: '카푸치노', price: 3000, description: '에스프레소와 스팀밀크, 거품을 올린 커피', image: 'coffee2.jpg' },
    { id: 3, name: '카페라떼', price: 3300, description: '에스프레소와 스팀밀크를 섞은 커피', image: 'coffee3.jpg' },
    { id: 4, name: '바닐라라떼', price: 3300, description: '에스프레소와 스팀밀크를 섞은 바닐라향이 나는 커피', image: 'coffee4.jpg' }
];

let cart = [];

exports.getMenuPage = (req, res) => {
    res.render('menu', { menuItems });
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
