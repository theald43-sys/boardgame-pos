const productsData = [
    { id: 1,  name: "Coup",                  price: 120000, img: "coup.jpg" },
    { id: 2,  name: "Avalon",                price: 130000, img: "avalon.jpg" },
    { id: 3,  name: "Splendor",              price: 140000, img: "splendor.png" },
    { id: 4,  name: "Cheese-thief",          price: 150000, img: "cheese-thief.webp" },
    { id: 5,  name: "Werewolf",              price: 160000, img: "Ultimate_Werewolf.png" },
    { id: 6,  name: "Kaker laken poker",     price: 100000, img: "kaker laken poker.png" },
    { id: 7,  name: "Kitten explosion",      price: 100000, img: "Kitten.png" },
    { id: 8,  name: "Sheriff of Nottingham", price: 135000, img: "sherift.png" },
    { id: 9,  name: "Salem 1692",            price: 125000, img: "salem.png" },
    { id: 10, name: "Bang the Dice",         price: 200000, img: "bang-the-dice-game.jpg" }
];

let basket = {};
let discountPercent = 0;

const productList = document.getElementById('product-list');

function switchView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');

    document.querySelectorAll('.nav-link').forEach(el => {
        el.classList.toggle('nav-active', el.dataset.view === viewId);
    });

    document.querySelectorAll('.tab-item').forEach(el => {
        el.classList.toggle('tab-active', el.dataset.view === viewId);
    });
}

function renderProducts(data) {
    productList.innerHTML = '';
    if (data.length === 0) {
        productList.innerHTML = '<p class="empty-products">ບໍ່ພົບສິນຄ້າທີ່ຄົ້ນຫາ</p>';
        return;
    }
    data.forEach(p => {
        const inCart = basket[p.id];
        const badge = inCart ? `<span class="card-qty-badge">×${inCart.qty}</span>` : '';
        productList.innerHTML += `
            <div class="card">
                ${badge}
                <div class="card-image" style="--game-img: url('image/${p.img}')">
                    <img src="image/${p.img}" alt="${p.name}">
                </div>
                <h3>${p.name}</h3>
                <p class="price-tag">${p.price.toLocaleString()} ກີບ</p>
                <button class="btn-add" onclick="addToCart(${p.id})">
                    <i class="fa-solid fa-cart-plus"></i> ເພີ່ມລົງກະຕ່າ
                </button>
            </div>
        `;
    });
}

function filterProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = productsData.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

function addToCart(id) {
    const product = productsData.find(p => p.id === id);
    if (!product) return;
    if (basket[id]) {
        basket[id].qty += 1;
    } else {
        basket[id] = { id: product.id, name: product.name, price: product.price, qty: 1 };
    }
    renderUI();
}

function adjustQuantity(id, amount) {
    if (!basket[id]) return;
    basket[id].qty += amount;
    if (basket[id].qty <= 0) {
        delete basket[id];
    }
    renderUI();
}

function removeItem(id) {
    delete basket[id];
    renderUI();
}

function applyCoupon() {
    const code = document.getElementById('coupon-input').value.trim().toUpperCase();
    const msg = document.getElementById('coupon-msg');
    if (code === "LAO2024") {
        discountPercent = 0.05;
        msg.innerText = "✅ ໃຊ້ສ່ວນຫຼຸດ 5% ສຳເລັດ!";
        msg.style.color = "#10b981";
    } else {
        discountPercent = 0;
        msg.innerText = "❌ ໂຄ້ດບໍ່ຖືກຕ້ອງ";
        msg.style.color = "#ef4444";
    }
    renderUI();
}

function renderUI() {
    const items = Object.values(basket);
    let subtotal = 0;
    let totalItems = 0;
    items.forEach(item => {
        subtotal += item.price * item.qty;
        totalItems += item.qty;
    });

    const discountAmount = subtotal * discountPercent;
    const finalTotal = subtotal - discountAmount;

    document.getElementById('cart-count').innerText = totalItems;
    const mobileCount = document.getElementById('cart-count-mobile');
    if (mobileCount) mobileCount.innerText = totalItems;

    document.getElementById('discount-text').innerText = discountAmount.toLocaleString() + " ກີບ";
    document.getElementById('final-total-text').innerText = finalTotal.toLocaleString() + " ກີບ";

    const cartDisplay = document.getElementById('cart-display-list');
    if (items.length === 0) {
        cartDisplay.innerHTML = '<p class="empty-cart">ຍັງບໍ່ມີສິນຄ້າ...</p>';
    } else {
        let html = "";
        items.forEach(item => {
            const lineTotal = (item.price * item.qty).toLocaleString();
            html += `
                <div class="cart-item-row">
                    <div class="cart-item-info">
                        <span class="cart-item-name">${item.name} <small style="opacity:.6">×${item.qty}</small></span>
                        <span class="cart-item-price">${lineTotal} ກີບ</span>
                    </div>
                    <div class="cart-item-actions">
                        <button class="btn-qty" onclick="adjustQuantity(${item.id}, -1)">−</button>
                        <span class="qty-text">${item.qty}</span>
                        <button class="btn-qty" onclick="adjustQuantity(${item.id}, 1)">+</button>
                        <button class="btn-remove" onclick="removeItem(${item.id})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
        });
        cartDisplay.innerHTML = html;
    }

    renderProducts(getFilteredProducts());
}

function getFilteredProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    if (!query) return productsData;
    return productsData.filter(p => p.name.toLowerCase().includes(query));
}

function resetCart() {
    if (!confirm("ລ້າງກະຕ່າສິນຄ້າ?")) return;
    basket = {};
    discountPercent = 0;
    document.getElementById('coupon-input').value = "";
    document.getElementById('coupon-msg').innerText = "";
    renderUI();
}

function confirmPurchase() {
    const name = document.getElementById('custName').value;
    const tel = document.getElementById('custTel').value;
    const loc = document.getElementById('custLoc').value;
    const total = document.getElementById('final-total-text').innerText;
    const items = Object.values(basket);

    if (!name || !tel || !loc || items.length === 0) {
        alert("ກະລຸນາປ້ອນຂໍ້ມູນ ແລະ ເລືອກສິນຄ້າ!");
        return;
    }

    const orderData = {
        name,
        tel,
        loc,
        items: items.map(i => ({ name: i.name, price: i.price, quantity: i.qty })),
        total,
        date: new Date().toLocaleString()
    };

    localStorage.setItem('myOrder', JSON.stringify(orderData));
    window.location.href = 'receipt.html';
}

renderProducts(productsData);
renderUI();