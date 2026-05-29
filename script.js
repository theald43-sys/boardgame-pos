// ຖານຂໍ້ມູນສິນຄ້າທັງໝົດ 10 ລາຍການ ທີ່ມີຢູ່ໃນຮ້ານບອດເກມ
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

// basket: ອາເຣ (Array) ໄວ້ເກັບລາຍການສິນຄ້າທີ່ລູກຄ້າກົດເລືອກລົງກະຕ່າ
let basket = [];

// discountPercent: ເກັບເປີເຊັນສ່ວນຫຼຸດ (ຕົວຢ່າງ: 0.05 ໝາຍເຖິງສ່ວນຫຼຸດ 5%)
let discountPercent = 0;

// ດຶງ Element ທີ່ເປັນບ່ອນສະແດງລາຍການສິນຄ້າໜ້າຮ້ານມາເກັບໄວ້ໃນຕົວປ່ຽນ productList
const productList = document.getElementById('product-list');

// ວົນລູບ (Loop) ເພື່ອນຳຂໍ້ມູນສິນຄ້າຈາກ productsData ມາສ້າງເປັນກ່ອງ HTML (Card) ສະແດງໜ້າຮ້ານ
productsData.forEach(p => {
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

/**
 * ຟັງກ໌ຊັນ addToCart: ເພີ່ມສິນຄ້າລົງໃນກະຕ່າ
 * @param {string} pName - ຊື່ຂອງສິນຄ້າ
 * @param {number} pPrice - ລາຄາຂອງສິນຄ້າ
 */
function addToCart(pName, pPrice) {
    // ເພີ່ມວັດຖຸສິນຄ້າໃໝ່ (ຊື່ ແລະ ລາຄາ) ເຂົ້າໄປໃນອາເຣ basket
    basket.push({ name: pName, price: pPrice });
    // ເອີ້ນໃຊ້ຟັງກ໌ຊັນ renderUI() ເພື່ອສະແດງຜົນການປ່ຽນແປງເທິງໜ້າຈໍທັນທີ
    renderUI();
}

/**
 * ຟັງກ໌ຊັນ removeItem: ລຶບສິນຄ້າອອກຈາກກະຕ່າຕາມຕຳແໜ່ງທີ່ກຳນົດ
 * @param {number} index - ຕຳແໜ່ງ (Index) ຂອງສິນຄ້າໃນອາເຣ basket ທີ່ຕ້ອງການລຶບ
 */
function removeItem(index) {
    // ລຶບຂໍ້ມູນໃນອາເຣ basket ອອກ 1 ລາຍການ ຕາມຕຳແໜ່ງ index ທີ່ສົ່ງມາ
    basket.splice(index, 1);
    // ເອີ້ນໃຊ້ຟັງກ໌ຊັນ renderUI() ເພື່ອອັບເດດໜ້າຈໍ
    renderUI();
}

/**
 * ຟັງກ໌ຊັນ applyCoupon: ກວດສອບ ແລະ ນຳໃຊ້ລະຫັດສ່ວນຫຼຸດ
 */
function applyCoupon() {
    // ດຶງຄ່າລະຫັດສ່ວນຫຼຸດ, ຕັດຍະຫວ່າງ (trim) ແລະ ປ່ຽນເປັນຕົວພິມໃຫຍ່ທັງໝົດ (toUpperCase)
    const code = document.getElementById('coupon-input').value.trim().toUpperCase();
    const msg = document.getElementById('coupon-msg');
    
    // ກວດສອບລະຫັດສ່ວນຫຼຸດ ຖ້າແມ່ນ "LAO2024" ຈະໄດ້ສ່ວນຫຼຸດ 5%
    if (code === "LAO2024") {
        discountPercent = 0.05; // ສ່ວນຫຼຸດ 5%
        msg.innerText = "✅ ໃຊ້ສ່ວນຫຼຸດ 5% ສຳເລັດ!";
        msg.style.color = "#10b981"; // ປ່ຽນຂໍ້ຄວາມເປັນສີຂຽວ
    } else {
        discountPercent = 0; // ບໍ່ມີສ່ວນຫຼຸດ
        msg.innerText = "❌ ໂຄ້ດບໍ່ຖືກຕ້ອງ";
        msg.style.color = "#ef4444"; // ປ່ຽນຂໍ້ຄວາມເປັນສີແດງ
    }
    // ເອີ້ນໃຊ້ renderUI() ເພື່ອຄິດໄລ່ຍອດເງິນໃໝ່ຫຼັງຫັກສ່ວນຫຼຸດ
    renderUI();
}

/**
 * ຟັງກ໌ຊັນ renderUI: ຄິດໄລ່ຍອດເງິນ ແລະ ອັບເດດການສະແດງຜົນໃນໜ້າຈໍທັງໝົດ
 */
function renderUI() {
    let subtotal = 0;
    // ວົນລູບເພື່ອບວກລວມລາຄາສິນຄ້າທຸກຢ່າງໃນກະຕ່າ
    basket.forEach(item => subtotal += item.price);

    // ຄິດໄລ່ມູນຄ່າສ່ວນຫຼຸດ (ຍອດລວມ * ເປີເຊັນສ່ວນຫຼຸດ)
    let discountAmount = subtotal * discountPercent;
    // ຄິດໄລ່ຍອດເງິນສຸດທິທີ່ຕ້ອງຈ່າຍ (ຍອດລວມ - ສ່ວນຫຼຸດ)
    let finalTotal = subtotal - discountAmount;

    // ອັບເດດຕົວເລກສະແດງຈຳນວນສິນຄ້າໃນໄອຄອນກະຕ່າ
    document.getElementById('cart-count').innerText = basket.length;
    // ສະແດງມູນຄ່າສ່ວນຫຼຸດໃນຮູບແບບເລກມີຈຸດຂັ້ນຫຼັກພັນ (toLocaleString)
    document.getElementById('discount-text').innerText = discountAmount.toLocaleString() + " ກີບ";
    // ສະແດງຍອດລວມສຸດທິໃນຮູບແບບເລກມີຈຸດຂັ້ນຫຼັກພັນ
    document.getElementById('final-total-text').innerText = finalTotal.toLocaleString() + " ກີບ";

    const cartDisplay = document.getElementById('cart-display-list');
    // ຖ້າບໍ່ມີສິນຄ້າໃນກະຕ່າ ໃຫ້ສະແດງຂໍ້ຄວາມເຕືອນ
    if (basket.length === 0) {
        cartDisplay.innerHTML = '<p class="empty-cart">ຍັງບໍ່ມີສິນຄ້າ...</p>';
    } else {
        // ຖ້າມີສິນຄ້າ ໃຫ້ວົນລູບສ້າງ HTML ເພື່ອສະແດງແຕ່ລະລາຍການພ້ອມປຸ່ມລຶບ (Trash Icon)
        let html = "";
        basket.forEach((item, index) => {
            html += `
                <div class="cart-item-row">
                    <span>${item.name}</span>
                    <button onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
        });
        cartDisplay.innerHTML = html;
    }
}

/**
 * ຟັງກ໌ຊັນ resetCart: ລ້າງຂໍ້ມູນໃນກະຕ່າ ແລະ ຂໍ້ມູນສ່ວນຫຼຸດທັງໝົດ
 */
function resetCart() {
    // ຖາມຢືນຢັນຄວາມຕ້ອງການຂອງຜູ້ໃຊ້ກ່ອນລຶບ
    if (confirm("ລ້າງກະຕ່າສິນຄ້າ?")) {
        basket = []; // ລ້າງອາເຣກະຕ່າໃຫ້ວ່າງ
        discountPercent = 0; // ຕັ້ງຄ່າສ່ວນຫຼຸດເປັນ 0
        document.getElementById('coupon-input').value = ""; // ລ້າງຊ່ອງປ້ອນຄູປອງ
        document.getElementById('coupon-msg').innerText = ""; // ລ້າງຂໍ້ຄວາມແຈ້ງເຕືອນຄູປອງ
        // ອັບເດດໜ້າຈໍຄືນໃໝ່
        renderUI();
    }
}

/**
 * ຟັງກ໌ຊັນ confirmPurchase: ກວດສອບຂໍ້ມູນລູກຄ້າ ແລະ ບັນທຶກການສັ່ງຊື້ເພື່ອໄປອອກບິນຮັບເງິນ
 */
function confirmPurchase() {
    // ດຶງຂໍ້ມູນທີ່ລູກຄ້າປ້ອນເຂົ້າມາ
    const name = document.getElementById('custName').value;
    const tel = document.getElementById('custTel').value;
    const loc = document.getElementById('custLoc').value;
    const total = document.getElementById('final-total-text').innerText;

    // ກວດສອບວ່າປ້ອນຂໍ້ມູນຄົບຖ້ວນ ແລະ ມີສິນຄ້າໃນກະຕ່າຫຼືບໍ່
    if (!name || !tel || !loc || basket.length === 0) {
        alert("ກະລຸນາປ້ອນຂໍ້ມູນ ແລະ ເລືອກສິນຄ້າ!");
        return;
    }

    // ກຽມໂຄງສ້າງຂໍ້ມູນໃບບິນເພື່ອບັນທຶກ
    const orderData = { 
        name: name, 
        tel: tel, 
        loc: loc, 
        items: basket, 
        total: total, 
        date: new Date().toLocaleString() // ບັນທຶກວັນທີ ແລະ ເວລາປັດຈຸບັນ
    };

    // ບັນທຶກຂໍ້ມູນລົງໃນ localStorage ຂອງບຣາວເຊີ (Browser Storage)
    localStorage.setItem('myOrder', JSON.stringify(orderData));
    // ເປີດໜ້າໃບບິນຮັບເງິນ (receipt.html) ຫຼັງຈາກບັນທຶກສຳເລັດ
    window.location.href = 'receipt.html';
}