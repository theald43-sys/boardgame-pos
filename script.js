const productsData = [
    { id: 1, name: "Coup", price: 120000, img:"coup.jpg" },
    { id: 2, name: "Avalon", price: 130000, img: "avalon.jpg" },
    { id: 3, name: "Splendor", price: 140000, img: "splendor.png" },
    { id: 4, name: "Cheese-thief", price: 150000, img: "cheese-thief.webp" },
    { id: 5, name: "Werewolf", price: 160000, img: "Ultimate_Werewolf.png" },
    { id: 6, name: "Kaker laken poker", price: 100000, img: "kaker laken poker.png" },
    { id: 7, name: "Kitten explosion", price: 100000, img: "Kitten.png" },
    { id: 8, name: "Sheriff of Nottingham", price: 135000, img: "sherift.png" },
    { id: 9, name: "Salem 1692", price: 125000, img: "salem.png" },
    { id: 10, name: "Bang the Dice", price: 200000, img: "bang-the-dice-game.jpg" }
];

let basket = [];
let discountPercent = 0;

const productList = document.getElementById('product-list');

function renderProducts(dataToRender) {
    productList.innerHTML = '';
    if (dataToRender.length === 0) {
        productList.innerHTML = '<p class="empty-products">ບໍ່ພົບສິນຄ້າທີ່ຄົ້ນຫາ</p>';
        return;
    }
    dataToRender.forEach(p => {
        productList.innerHTML += `
            <div class="card">
                 <div class="card-image" style="--game-img: url('image/${p.img}')">
                    <img src="image/${p.img}" alt="${p.name}">
                </div>
                <h3>${p.name}</h3>
                <p class="price-tag">${p.price.toLocaleString()} ກີບ</p>
                <button class="btn-add" onclick="addToCart('${p.name}', ${p.price})">ເພີ່ມລົງກະຕ່າ</button>
            </div>
        `;
    });
}

function filterProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = productsData.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

function addToCart(pName, pPrice) {
    const existingItem = basket.find(item => item.name === pName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        basket.push({ name: pName, price: pPrice, quantity: 1 });
    }
    renderUI();
}

function adjustQuantity(index, amount) {
    basket[index].quantity += amount;
    if (basket[index].quantity <= 0) {
        basket.splice(index, 1);
    }
    renderUI();
}

function removeItem(index) {
    basket.splice(index, 1);
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
    let subtotal = 0;
    let totalItems = 0;
    basket.forEach(item => {
        subtotal += (item.price * item.quantity);
        totalItems += item.quantity;
    });

    let discountAmount = subtotal * discountPercent;
    let finalTotal = subtotal - discountAmount;

    document.getElementById('cart-count').innerText = totalItems;
    document.getElementById('discount-text').innerText = discountAmount.toLocaleString() + " ກີບ";
    document.getElementById('final-total-text').innerText = finalTotal.toLocaleString() + " ກີບ";

    const cartDisplay = document.getElementById('cart-display-list');
    
    if (basket.length === 0) {
        cartDisplay.innerHTML = '<p class="empty-cart">ຍັງບໍ່ມີສິນຄ້າ...</p>';
    } else {
        let html = "";
        basket.forEach((item, index) => {
            html += `
                <div class="cart-item-row">
                    <div class="cart-item-info">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-price">${(item.price * item.quantity).toLocaleString()} กີบ</span>
                    </div>
                    <div class="cart-item-actions">
                        <button class="btn-qty" onclick="adjustQuantity(${index}, -1)">-</button>
                        <span class="qty-text">${item.quantity}</span>
                        <button class="btn-qty" onclick="adjustQuantity(${index}, 1)">+</button>
                        <button class="btn-remove" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `;
        });
        cartDisplay.innerHTML = html;
    }
}

function resetCart() {
    if (confirm("ລ້າງກະຕ່າສິນຄ້າ?")) {
        basket = [];
        discountPercent = 0;
        document.getElementById('coupon-input').value = "";
        document.getElementById('coupon-msg').innerText = "";
        renderUI();
    }
}

function confirmPurchase() {
    const name = document.getElementById('custName').value;
    const tel = document.getElementById('custTel').value;
    const loc = document.getElementById('custLoc').value;
    const total = document.getElementById('final-total-text').innerText;

    if (!name || !tel || !loc || basket.length === 0) {
        alert("ກະລຸນາປ້ອນຂໍ້ມູນ ແລະ ເລືອກສິນຄ້າ!");
        return;
    }

    const orderData = { 
        name: name, 
        tel: tel, 
        loc: loc, 
        items: basket, 
        total: total, 
        date: new Date().toLocaleString()
    };

    localStorage.setItem('myOrder', JSON.stringify(orderData));
    window.location.href = 'receipt.html';
}

renderProducts(productsData);
renderUI();