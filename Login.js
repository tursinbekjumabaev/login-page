document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const loginPage = document.getElementById("login-page");
    const shopPage = document.getElementById("shop-page");
    const message = document.getElementById("message");
    const logoutBtn = document.getElementById("logout");
    const productList = document.getElementById("product-list");
    const cartIcon = document.getElementById("cart-icon");
    const cartModal = document.getElementById("cart-modal");
    const closeCart = document.getElementById("close-cart");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const clearCartBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout-btn");
    const checkoutForm = document.getElementById("checkout-form");
    const orderBtn = document.getElementById("order-btn");
    const orderMsg = document.getElementById("order-message");
    const cartCount = document.getElementById("cart-count");

    // 🆕 Mahsulot tavsifi modali elementlari
    const productModal = document.getElementById("product-modal");
    const closeProduct = document.getElementById("close-product");
    const modalName = document.getElementById("product-name");
    const modalImg = document.getElementById("product-image");
    const modalDesc = document.getElementById("product-description");
    const modalPrice = document.getElementById("product-price");

    let cart = [];

    const products = [
        { id: 1, name: "Telefon", price: 2500000, category: "telefon", img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQUhYY4LB_GpSoiADexryPPYSEQLX7z9-3oqpyacTTaFVRX9t5gKhH1ztx6ikMmuRodKwf-pjDee1g8PhxSmUsGAjuwviyTtjjqC3mBTFLhZfYK2MwVwmutsY5_uCsGBasmFRrqEC8&usqp=CAc", description: "Zamonaviy smartfon — yuqori sifatli kamera va tezkor ishlash imkoniyati bilan." },
        { id: 2, name: "Noutbuk", price: 7800000, category: "kompyuter", img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSFvYt88MNS6BcdavAaspTneT2siJKtn7nwgcXN_QHyS_rCwMX-LdrT0VhMe_sERw_SvEZvONq4TAIGtJuKZ6oa219IiExL7v29IdttCq9ciQ3a05J6vt-sGQKyF_f1Wb9CyPHnAO8&usqp=CAc", description: "Kuchli protsessor va keng xotira — ofis va o‘yinlar uchun qulay noutbuk." },
        { id: 3, name: "Kamera", price: 3200000, category: "aksessuar", img: "https://api.cabinet.smart-market.uz/uploads/images/ff808181d05550926170640c", description: "Professional foto va video suratga olish uchun yuqori sifatli kamera." },
        { id: 4, name: "Quloqchin", price: 150000, category: "aksessuar", img: "https://cdn.flymart.uz/file/hub/file/2024/10/15/2nTQ8NuA3DBB9ar1cmsoqf1doAq.jpg", description: "Qulay dizayn va toza tovush sifatiga ega simsiz quloqchin." },
        { id: 5, name: "Smart soat", price: 900000, category: "aksessuar", img: "https://images.uzum.uz/cspjjsr4nkdilc6a9ff0/original.jpg", description: "Yurak urishi va qadam o‘lchash funksiyalariga ega aqlli soat." },
        { id: 6, name: "Televizor", price: 5400000, category: "kompyuter", img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR_RmmdYEi7qVfc73k3W0SozTJ_VePZiEQJCpvpaG4MlrfmTW6LZ7n9h3us4J9ecAbueRlFqUGZqjaRmD2PPpvxfrnLYiL1JumndnrZYi1-gztNR9_Dtp2hYjOWhX3FvgC2GUEtKIw&usqp=CAc", description: "Ultra HD tasvir sifati va smart funksiyalarga ega televizor." },
        { id: 7, name: "Planshet", price: 2900000, category: "kompyuter", img: "https://mini-io-api.texnomart.uz/catalog/product/971/97105/204933/1f8cd05c-4417-493d-8059-f5ece3a58e96.webp", description: "Keng ekran va kuchli batareyaga ega mobil planshet." },
        { id: 8, name: "Klaviatura", price: 120000, category: "aksessuar", img: "https://api.idea.uz/storage/products/August2023/2UzyPLqHtY1k9h6PDUgh.png", description: "Ergonomik dizaynga ega mexanik klaviatura." },
        { id: 9, name: "Mishka", price: 80000, category: "aksessuar", img: "https://api.cabinet.smart-market.uz/uploads/images/ff80818163b9a1250c73a890", description: "Simsiz, qulay ushlab turiladigan va sezgir sensorli kompyuter sichqonchasi." }
    ];

    // --- Mahsulotlarni chiqarish ---
    function renderProducts(filterCategory = "all") {
        productList.innerHTML = "";
        products
            .filter(p => filterCategory === "all" || p.category === filterCategory)
            .forEach(p => {
                const div = document.createElement("div");
                div.className = "product";
                div.innerHTML = `
                    <img src="${p.img}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p>${p.price.toLocaleString()} so‘m</p>
                    <button class="buy-btn" data-id="${p.id}">🛒 Savatga qo‘shish</button>
                `;
                // 🟢 Mahsulot ustiga bosganda tavsif oynasini ochish
                div.addEventListener("click", (e) => {
                    if (!e.target.classList.contains("buy-btn")) {
                        showProductDetails(p);
                    }
                });
                productList.appendChild(div);
            });
    }

    // --- Tavsif oynasini ko‘rsatish ---
    function showProductDetails(product) {
        modalName.textContent = product.name;
        modalImg.src = product.img;
        modalDesc.textContent = product.description;
        modalPrice.textContent = product.price.toLocaleString() + " so‘m";
        productModal.style.display = "block";
    }

    closeProduct.addEventListener("click", () => {
        productModal.style.display = "none";
    });

    // --- Kategoriya tugmalari ---
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.addEventListener("click", function () {
            document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            const category = this.dataset.category;
            renderProducts(category);
        });
    });

    // --- Savatni yangilash ---
    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - ${item.price.toLocaleString()} so‘m
                <button class="remove-item" data-index="${index}">❌</button>
            `;
            cartItems.appendChild(li);
        });
        totalPrice.textContent = total.toLocaleString() + " so‘m";
        cartCount.textContent = cart.length;
    }

    // --- Login ---
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const user = document.getElementById("username").value.trim();
        const pass = document.getElementById("password").value.trim();
        if (user === "admin" && pass === "1234") {
            loginPage.style.display = "none";
            shopPage.style.display = "block";
            renderProducts("all");
            message.textContent = "";
        } else {
            message.textContent = "Noto‘g‘ri username yoki parol.";
        }
    });

    // --- Savatga qo‘shish ---
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("buy-btn")) {
            const id = +e.target.dataset.id;
            const item = products.find(p => p.id === id);
            cart.push(item);
            updateCart();
            e.target.textContent = "✅ Savatda";
            e.target.disabled = true;
        }
    });

    // --- Savatdan o‘chirish ---
    cartItems.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const i = +e.target.dataset.index;
            cart.splice(i, 1);
            updateCart();
        }
    });

    // --- Savat oynasi ---
    cartIcon.addEventListener("click", function () {
        cartModal.style.display = "block";
        checkoutForm.style.display = "none";
        orderMsg.style.display = "none";
    });

    closeCart.addEventListener("click", function () {
        cartModal.style.display = "none";
    });

    // --- Savatni tozalash ---
    clearCartBtn.addEventListener("click", function () {
        cart = [];
        updateCart();
    });

    // --- Zakaz oynasi ---
    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Savat bo‘sh! Iltimos, mahsulot qo‘shing.");
            return;
        }
        cartItems.style.display = "none";
        checkoutForm.style.display = "block";
        orderMsg.style.display = "none";
    });

    // --- Buyurtma tasdiqlash ---
    orderBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const country = document.getElementById("country").value.trim();
        const city = document.getElementById("city").value.trim();
        const address = document.getElementById("address").value.trim();

        if (!fullname || !email || !phone || !country || !city || !address) {
            alert("Iltimos, barcha maydonlarni to‘ldiring!");
            return;
        }

        checkoutForm.style.display = "none";
        orderMsg.style.display = "block";

        cart = [];
        updateCart();

        setTimeout(function () {
            cartModal.style.display = "none";
            cartItems.style.display = "block";
            orderMsg.style.display = "none";
        }, 2000);
    });

    // --- Logout ---
    logoutBtn.addEventListener("click", function () {
        if (confirm("Chiqishni xohlaysizmi?")) {
            shopPage.style.display = "none";
            loginPage.style.display = "block";
            loginForm.reset();
            cart = [];
            updateCart();
        }
    });

    const langSelect = document.getElementById("language-switcher");
    let currentLang = localStorage.getItem("lang") || "uz";

    function applyTranslations(lang) {
        document.querySelector("h1").textContent = translations[lang].loginTitle;
        document.querySelector("label[for='username']").textContent = translations[lang].username;
        document.querySelector("label[for='password']").textContent = translations[lang].password;
        document.querySelector("#login-form button").textContent = translations[lang].loginButton;
        document.querySelector("#logout").textContent = translations[lang].logout;
        document.querySelector("#order-message").textContent = translations[lang].orderSuccess;

        // Kategoriyalar
        document.querySelector("[data-category='all']").textContent = translations[lang].categories.all;
        document.querySelector("[data-category='telefon']").textContent = translations[lang].categories.telefon;
        document.querySelector("[data-category='kompyuter']").textContent = translations[lang].categories.kompyuter;
        document.querySelector("[data-category='aksessuar']").textContent = translations[lang].categories.aksessuar;

        document.querySelector(".footer-column p").textContent = translations[lang].about;
        document.querySelector(".footer-column:nth-child(2) p").textContent = translations[lang].location;
    }

    langSelect.addEventListener("change", (e) => {
        const newLang = e.target.value;
        localStorage.setItem("lang", newLang);
        applyTranslations(newLang);
    });

    applyTranslations(currentLang);
});
