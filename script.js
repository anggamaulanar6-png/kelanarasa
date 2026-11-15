
// ======================================
// KONFIGURASI FOODHOUSE
// ======================================

// Ganti dengan nomor WhatsApp restoran
const anggaNomorWhatsApp = "628511410696";

// ======================================
// DATA MENU MAKANAN DAN MINUMAN
// ======================================

const anggaMenus = [

    {
        id: 1,
        name: "Cireng Kuah Keju Kelana",
        category: "Makanan",
        price: 18000,
        description: "Cireng Kuah Keju.",
        image: "Cireng Keju Pedas SumLicious!.png"
    },

    {
        id: 2,
        name: "Dimsum Kuah Keju Kelana",
        category: "Makanan",
        price: 22000,
        description: "Ayam bakar dengan nasi dan sambal pilihan.",
        image: "dimsum kuah.jpeg"
    },

    {
        id: 3,
        name: "Samyang Roll Keju Kelana",
        category: "Makanan",
        price: 20000,
        description: "Samyang Roll Keju Yang Di Goreng.",
        image: "Pangsit Goreng Keju dan Rumput Laut.png"
    },

    {
        id: 4,
        name: "Risol Matcha",
        category: "Dessert",
        price: 14000,
        description: "Risol Dengan Isian Matcha & keju Lumer.",
        image: "Camilan Gulung Matcha Renyah.png"
    },

    {
        id: 5,
        name: "Es Teh Manis",
        category: "Minuman",
        price: 5000,
        description: "Teh manis segar dengan es batu.",
        image: "Es Teh Dingin dalam Gelas Plastik Bening.png"
    },

    {
        id: 6,
        name: "butterscoth coffe kelana",
        category: "Minuman",
        price: 25000,
        description: "Jus alpukat segar dan creamy.",
        image: "Kopi Karamel Dingin dengan Krim Whipped.png"
    },

    {
        id: 7,
        name: "Kopi Susu",
        category: "Minuman",
        price: 18000,
        description: "Kopi susu dengan rasa yang nikmat.",
        image: "butterscot.png"
    },

    {
        id: 8,
        name: "Matcha Strawberry Kelana",
        category: "Minuman",
        price: 27000,
        description: "Mix Matcha Dan Strawberry.",
        image: "Strawberry Cream Matcha.jpeg"
    },

    // PAKET PROMO
    {
        id: 9,
        name: "Paket Kenyang",
        category: "Promo",
        price: 20000,
        description: "Cireng Kuah & Ice Tea.",
        image: "Es Teh Dingin dan Cireng Keju SumLicious!.png"
    },

    {
        id: 10,
        name: "Paket Spesial",
        category: "Promo",
        price: 27000,
        description: "Ayam bakar, nasi, dan es teh.",
        image: "images/ayam-bakar.jpg"
    },

    {
        id: 11,
        name: "Paket Manis",
        category: "Promo",
        price: 25000,
        description: "Chocolate cake dan kopi susu.",
        image: "images/chocolate-cake.jpg"
    }

];

// ======================================
// KERANJANG
// ======================================

let anggaCart = [];

let anggaSelectedCategory = "Semua";

// ======================================
// FORMAT HARGA RUPIAH
// ======================================

function anggaFormatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0

    }).format(number);

}

// ======================================
// MENAMPILKAN MENU MAKANAN
// ======================================

function anggaRenderFood() {

    const grid = document.getElementById("angga-food-grid");

    const search = document
        .getElementById("angga-search")
        .value.toLowerCase();

    const filtered = anggaMenus.filter(menu => {

        const categoryMatch =
            anggaSelectedCategory === "Semua" ||
            menu.category === anggaSelectedCategory;

        const searchMatch =
            menu.name.toLowerCase().includes(search) ||
            menu.description.toLowerCase().includes(search);

        return categoryMatch &&
               searchMatch &&
               menu.category !== "Minuman" &&
               menu.category !== "Promo";

    });

    grid.innerHTML = "";

    if (filtered.length === 0) {

        grid.innerHTML = `
            <p class="angga-no-result">
                Menu tidak ditemukan.
            </p>
        `;

        return;

    }

    filtered.forEach(menu => {

        grid.innerHTML += `

            <div class="angga-menu-card">

                <img
                    src="${menu.image}"
                    alt="${menu.name}"
                    onerror="this.src='https://placehold.co/600x400?text=FoodHouse'"
                >

                <div class="angga-menu-info">

                    <h3>${menu.name}</h3>

                    <p>${menu.description}</p>

                    <div class="angga-menu-bottom">

                        <span class="angga-price">
                            ${anggaFormatRupiah(menu.price)}
                        </span>

                        <button
                            class="angga-add-btn"
                            onclick="anggaAddCart(${menu.id})">

                            + Pesan

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


// ======================================
// MENAMPILKAN MENU MINUMAN + PENCARIAN
// ======================================

function anggaRenderDrink() {

    const grid = document.getElementById("angga-drink-grid");

    const search = document
        .getElementById("angga-search")
        .value.toLowerCase()
        .trim();

    const drinks = anggaMenus.filter(menu => {

        const categoryMatch = menu.category === "Minuman";

        const searchMatch =
            menu.name.toLowerCase().includes(search) ||
            menu.description.toLowerCase().includes(search);

        return categoryMatch && searchMatch;

    });

    grid.innerHTML = "";

    if (drinks.length === 0) {

        grid.innerHTML = `
            <p class="angga-no-result">
                Minuman tidak ditemukan.
            </p>
        `;

        return;

    }

    drinks.forEach(menu => {

        grid.innerHTML += `

            <div class="angga-menu-card">

                <img
                    src="${menu.image}"
                    alt="${menu.name}"
                    onerror="this.src='https://placehold.co/600x400?text=FoodHouse'"
                >

                <div class="angga-menu-info">

                    <h3>${menu.name}</h3>

                    <p>${menu.description}</p>

                    <div class="angga-menu-bottom">

                        <span class="angga-price">
                            ${anggaFormatRupiah(menu.price)}
                        </span>

                        <button
                            class="angga-add-btn"
                            onclick="anggaAddCart(${menu.id})">

                            + Pesan

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


// ======================================
// FILTER KATEGORI
// ======================================

document.querySelectorAll(".angga-category-btn")
.forEach(button => {

    button.addEventListener("click", function() {

        document.querySelectorAll(".angga-category-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        anggaSelectedCategory = this.dataset.category;

        anggaRenderFood();

    });

});



// ======================================
// PENCARIAN MENU MAKANAN DAN MINUMAN
// ======================================



function anggaRenderFood() {
    const grid = document.getElementById("angga-food-grid");

    const search = document
        .getElementById("angga-search")
        .value.toLowerCase()
        .trim();

    // Jika kategori Minuman dipilih dan pencarian kosong,
    // tampilkan minuman di bagian Menu Minuman saja.
    if (search === "" && anggaSelectedCategory === "Minuman") {
        grid.innerHTML = "";
        return;
    }

    const filtered = anggaMenus.filter(menu => {
        const categoryMatch =
            anggaSelectedCategory === "Semua" ||
            menu.category === anggaSelectedCategory;

        const searchMatch =
            menu.name.toLowerCase().includes(search) ||
            menu.description.toLowerCase().includes(search) ||
            menu.category.toLowerCase().includes(search);

        // Saat mencari, tampilkan makanan dan minuman.
        // Saat pencarian kosong, minuman tetap di bagian terpisah.
        const visibleCategory = search !== ""
            ? menu.category !== "Promo"
            : menu.category !== "Minuman" &&
              menu.category !== "Promo";

        return categoryMatch && searchMatch && visibleCategory;
    });

    grid.innerHTML = "";

    if (filtered.length === 0) {
        grid.innerHTML = `
            <p class="angga-no-result">
                Menu tidak ditemukan.
            </p>
        `;
        return;
    }

    filtered.forEach(menu => {
        grid.innerHTML += `
            <div class="angga-menu-card">
                <img
                    src="${menu.image}"
                    alt="${menu.name}"
                    onerror="this.src='https://placehold.co/600x400?text=FoodHouse'"
                >

                <div class="angga-menu-info">
                    <h3>${menu.name}</h3>
                    <p>${menu.description}</p>

                    <div class="angga-menu-bottom">
                        <span class="angga-price">
                            ${anggaFormatRupiah(menu.price)}
                        </span>

                        <button
                            class="angga-add-btn"
                            onclick="anggaAddCart(${menu.id})">
                            + Pesan
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}


function anggaRenderDrink() {
    const grid = document.getElementById("angga-drink-grid");
    const section = document.getElementById("minuman");

    const search = document
        .getElementById("angga-search")
        .value.toLowerCase()
        .trim();

    // Jika sedang mencari, sembunyikan bagian minuman
    // karena hasilnya sudah ditampilkan bersama makanan.
    if (search !== "") {
        section.style.display = "none";
        grid.innerHTML = "";
        return;
    }

    // Tampilkan bagian minuman jika kategori Semua atau Minuman.
    if (
        anggaSelectedCategory !== "Semua" &&
        anggaSelectedCategory !== "Minuman"
    ) {
        section.style.display = "none";
        grid.innerHTML = "";
        return;
    }

    section.style.display = "";

    const drinks = anggaMenus.filter(menu =>
        menu.category === "Minuman"
    );

    grid.innerHTML = "";

    if (drinks.length === 0) {
        grid.innerHTML = `
            <p class="angga-no-result">
                Minuman tidak ditemukan.
            </p>
        `;
        return;
    }

    drinks.forEach(menu => {
        grid.innerHTML += `
            <div class="angga-menu-card">
                <img
                    src="${menu.image}"
                    alt="${menu.name}"
                    onerror="this.src='https://placehold.co/600x400?text=FoodHouse'"
                >

                <div class="angga-menu-info">
                    <h3>${menu.name}</h3>
                    <p>${menu.description}</p>

                    <div class="angga-menu-bottom">
                        <span class="angga-price">
                            ${anggaFormatRupiah(menu.price)}
                        </span>

                        <button
                            class="angga-add-btn"
                            onclick="anggaAddCart(${menu.id})">
                            + Pesan
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}


// ======================================
// TAMBAH KERANJANG
// ======================================

function anggaAddCart(id) {

    const menu = anggaMenus.find(item => item.id === id);

    if (!menu) return;

    const existing = anggaCart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        anggaCart.push({

            ...menu,

            quantity: 1

        });

    }

    anggaRenderCart();

    alert(menu.name + " berhasil ditambahkan!");

}

// ======================================
// TAMBAH PAKET PROMO
// ======================================

function anggaAddPromo(id) {

    anggaAddCart(id);

    document.getElementById("pesanan").scrollIntoView({
        behavior: "smooth"
    });

}

// ======================================
// UBAH JUMLAH PESANAN
// ======================================

function anggaChangeQuantity(id, change) {

    const item = anggaCart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        anggaCart = anggaCart.filter(item => item.id !== id);

    }

    anggaRenderCart();

}

// ======================================
// HAPUS PESANAN
// ======================================

function anggaRemoveCart(id) {

    anggaCart = anggaCart.filter(item => item.id !== id);

    anggaRenderCart();

}

// ======================================
// TAMPILKAN KERANJANG
// ======================================

function anggaRenderCart() {

    const container = document.getElementById("angga-cart-items");

    const totalElement = document.getElementById("angga-total");

    container.innerHTML = "";

    let total = 0;

    if (anggaCart.length === 0) {

        container.innerHTML = `
            <p class="angga-empty">
                Belum ada pesanan.
            </p>
        `;

    }

    anggaCart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        container.innerHTML += `

            <div class="angga-cart-item">

                <div>

                    <strong>${item.name}</strong>

                    <p>
                        ${anggaFormatRupiah(item.price)}
                    </p>

                </div>

                <div class="angga-cart-actions">

                    <button onclick="anggaChangeQuantity(${item.id}, -1)">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="anggaChangeQuantity(${item.id}, 1)">
                        +
                    </button>

                    <button
                        class="angga-remove"
                        onclick="anggaRemoveCart(${item.id})">

                        Hapus

                    </button>

                </div>

            </div>

        `;

    });

    totalElement.textContent = anggaFormatRupiah(total);

}

// ======================================
// CHECKOUT WHATSAPP
// ======================================

function anggaCheckout() {

    if (anggaCart.length === 0) {

        alert("Keranjang pesanan masih kosong!");

        return;

    }

    const name = document
        .getElementById("angga-customer")
        .value.trim();

    const table = document
        .getElementById("angga-table")
        .value.trim();

    if (!name || !table) {

        alert("Silakan isi nama dan nomor meja!");

        return;

    }

    let message = "*PESANAN FOODHOUSE*\n\n";

    message += "Nama: " + name + "\n";

    message += "Nomor Meja: " + table + "\n\n";

    message += "*DAFTAR PESANAN:*\n";

    let total = 0;

    anggaCart.forEach(item => {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        message +=
            item.name +
            " x " +
            item.quantity +
            " = " +
            anggaFormatRupiah(subtotal) +
            "\n";

    });

    message += "\nTOTAL: " + anggaFormatRupiah(total);

    const whatsappURL =
        "https://wa.me/" +
        anggaNomorWhatsApp +
        "?text=" +
        encodeURIComponent(message);

    window.open(whatsappURL, "_blank");

}

// ======================================
// MEMBUAT QR CODE
// ======================================

function anggaGenerateQR() {

    const container = document.getElementById("angga-qrcode");

    if (typeof QRCode === "undefined") {

        alert("QR Code gagal dimuat. Periksa koneksi internet!");

        return;

    }

    const websiteURL = window.location.href.split("#")[0];

    if (!websiteURL.startsWith("http")) {

        alert(
            "Website belum online. Upload ke hosting terlebih dahulu agar QR Code bisa digunakan pelanggan."
        );

        return;

    }

    container.innerHTML = "";

    new QRCode(container, {

        text: websiteURL,

        width: 200,

        height: 200,

        colorDark: "#182c22",

        colorLight: "#ffffff",

        correctLevel: QRCode.CorrectLevel.H

    });

}

// ======================================
// DOWNLOAD QR CODE
// ======================================

function anggaDownloadQR() {

    const container = document.getElementById("angga-qrcode");

    const qrImage = container.querySelector("img");

    const qrCanvas = container.querySelector("canvas");

    let imageURL = "";

    if (qrCanvas) {

        imageURL = qrCanvas.toDataURL("image/png");

    } else if (qrImage && qrImage.src) {

        imageURL = qrImage.src;

    } else {

        alert("Silakan buat QR Code terlebih dahulu!");

        return;

    }

    const link = document.createElement("a");

    link.href = imageURL;

    link.download = "QR-Menu-FoodHouse.png";

    link.click();

}

// ======================================
// EVENT QR CODE
// ======================================

document.getElementById("angga-generate-qr")
.addEventListener("click", anggaGenerateQR);

document.getElementById("angga-download-qr")
.addEventListener("click", anggaDownloadQR);

// ======================================
// FORM KONTAK
// ======================================

document.getElementById("angga-contact-form")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document
        .getElementById("angga-contact-name")
        .value.trim();

    const email = document
        .getElementById("angga-contact-email")
        .value.trim();

    const message = document
        .getElementById("angga-contact-message")
        .value.trim();

    if (!name || !email || !message) {

        alert("Semua kolom harus diisi!");

        return;

    }

    alert(
        "Terima kasih " + name +
        "! Pesan Anda sudah divalidasi. Untuk mengirimnya ke pemilik restoran, hubungkan form ini dengan layanan backend atau email."
    );

    this.reset();

});

// ======================================
// NAVBAR MOBILE
// ======================================

const anggaToggle = document.getElementById("angga-menu-toggle");

const anggaNav = document.getElementById("angga-nav-links");

anggaToggle.addEventListener("click", function() {

    anggaNav.classList.toggle("show");

});

document.querySelectorAll(".angga-nav-links a")
.forEach(link => {

    link.addEventListener("click", function() {

        anggaNav.classList.remove("show");

    });

});

// ======================================
// JALANKAN WEBSITE
// ======================================

anggaRenderFood();

anggaRenderDrink();

anggaRenderCart();
