// Logo Upload State for Quote Drawer
let uploadedDrawerLogoFile = null;

function handleDrawerLogoUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        uploadedDrawerLogoFile = file;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewEl = document.getElementById('drawerLogoPreview');
            if (previewEl) previewEl.src = e.target.result;
        };
        reader.readAsDataURL(file);

        const nameEl = document.getElementById('drawerLogoName');
        const sizeEl = document.getElementById('drawerLogoSize');
        if (nameEl) nameEl.textContent = file.name;
        if (sizeEl) sizeEl.textContent = (file.size / (1024 * 1024)).toFixed(2) + ' MB';

        const emptyEl = document.getElementById('drawerDropzoneEmpty');
        const selectedEl = document.getElementById('drawerDropzoneSelected');
        if (emptyEl) emptyEl.classList.add('hidden');
        if (selectedEl) selectedEl.classList.remove('hidden');
    }
}

function removeDrawerLogo() {
    uploadedDrawerLogoFile = null;
    const input = document.getElementById('drawerLogoInput');
    if (input) input.value = '';
    const emptyEl = document.getElementById('drawerDropzoneEmpty');
    const selectedEl = document.getElementById('drawerDropzoneSelected');
    if (emptyEl) emptyEl.classList.remove('hidden');
    if (selectedEl) selectedEl.classList.add('hidden');
}

// Active Application State
let products = [
  {
    "id": 1,
    "name": "Bolsa Kraft Boutique Impresa",
    "slug": "bolsa-kraft-boutique",
    "category": "Bolsas Kraft",
    "price": 1200,
    "salePrice": 950,
    "isOffer": true,
    "moq": "Desde 100 uds",
    "img": "assets/bolsas_kraft.png",
    "sizes": ["P (15x20 cm)", "M (22x30 cm)", "G (30x40 cm)"],
    "volumePricing": { "100": 1200, "500": 950, "1000": 800 },
    "description": "Bolsa de papel kraft ecológico de alta densidad (120g) con asas retorcidas e impresión de tu logotipo en 1 o 2 tintas. Perfecta para tiendas de ropa, calzado y boutiques.",
    "specs": {
      "Material": "Papel Kraft Reciclable 120g",
      "Impresión": "Serigrafía / Flexografía de Alta Nitidez",
      "Acabado": "Mate Natural",
      "Asa": "Cordón de Papel Retorcido Reforzado"
    }
  },
  {
    "id": 2,
    "name": "Etiquetas en Rollo Metalizadas Foil",
    "slug": "etiquetas-rollo-foil",
    "category": "Etiquetas",
    "price": 450,
    "salePrice": 350,
    "isOffer": true,
    "moq": "Desde 100 uds",
    "img": "assets/etiquetas_rollo.png",
    "sizes": ["3x3 cm", "5x5 cm", "7x7 cm"],
    "volumePricing": { "100": 450, "500": 350, "1000": 280 },
    "description": "Etiquetas adhesivas en rollo con estampado en pan de oro/plata brillante. Alta adherencia para envases de cristal, botellas, cosméticos y empaques de lujo.",
    "specs": {
      "Material": "Vinilo Adhesivo Premium",
      "Impresión": "Foil Metalizado Dorado / Plateado",
      "Acabado": "Brillante o Mate",
      "Presentación": "Rollo continuo de fácil aplicación"
    }
  },
  {
    "id": 3,
    "name": "Bolsa Plástica Polietileno Boutique",
    "slug": "bolsa-plastica-polietileno",
    "category": "Bolsas Plásticas",
    "price": 850,
    "salePrice": null,
    "isOffer": false,
    "moq": "Desde 500 uds",
    "img": "assets/bolsas_plasticas.png",
    "sizes": ["P (20x30 cm)", "M (30x40 cm)", "G (40x50 cm)"],
    "volumePricing": { "500": 850, "1000": 680, "3000": 550 },
    "description": "Bolsas de plástico troqueladas tipo riñón, elaboradas en polietileno de alta densidad duradero con acabado satinado suave.",
    "specs": {
      "Material": "Polietileno de Alta Densidad",
      "Impresión": "Pigmento a 1 o 2 caras",
      "Troquel": "Asa tipo Riñón Reforzada",
      "Resistencia": "Soporta hasta 8 kg"
    }
  },
  {
    "id": 4,
    "name": "Caja Corrugada para Envíos E-Commerce",
    "slug": "caja-corrugada-ecommerce",
    "category": "Cajas",
    "price": 2400,
    "salePrice": 1990,
    "isOffer": true,
    "moq": "Desde 100 uds",
    "img": "assets/cajas_impresas.png",
    "sizes": ["P (15x15x8 cm)", "M (25x20x10 cm)", "G (35x25x12 cm)"],
    "volumePricing": { "100": 2400, "500": 1990, "1000": 1650 },
    "description": "Cajas de cartón microcorrugado impresas a medida para despachos de e-commerce. Protegen tus productos durante el transporte proyectando una imagen profesional.",
    "specs": {
      "Material": "Cartón Microcorrugado Flauta E",
      "Impresión": "Flexografía exterior e interior",
      "Cierre": "Auto-armable sin cinta adhesiva requerida"
    }
  },
  {
    "id": 5,
    "name": "Bolsa Kraft de Asa Plana Económica",
    "slug": "bolsa-kraft-asa-plana",
    "category": "Bolsas Kraft",
    "price": 980,
    "salePrice": null,
    "isOffer": false,
    "moq": "Desde 100 uds",
    "img": "assets/bolsas_kraft.png",
    "sizes": ["P (18x24 cm)", "M (26x34 cm)", "G (32x42 cm)"],
    "volumePricing": { "100": 980, "500": 780, "1000": 620 },
    "description": "Opción económica y funcional para domicilios, panaderías, restaurantes y comercios que requieren rapidez y excelente presentación.",
    "specs": {
      "Material": "Papel Kraft Natural 90g",
      "Asa": "Papel Plano Pegado Interior",
      "Impresión": "Tintas Ecológicas a base de agua"
    }
  },
  {
    "id": 6,
    "name": "Etiqueta Transparente Vinilo Mate Impermeable",
    "slug": "etiqueta-transparente-vinilo",
    "category": "Etiquetas",
    "price": 380,
    "salePrice": null,
    "isOffer": false,
    "moq": "Desde 200 uds",
    "img": "assets/etiquetas_rollo.png",
    "sizes": ["4x4 cm", "6x6 cm", "8x8 cm"],
    "volumePricing": { "200": 380, "500": 290, "1000": 220 },
    "description": "Etiquetas totalmente transparentes ideales para frascos de vidrio, cosmética y productos refrigerados. Resistentes al agua y aceite.",
    "specs": {
      "Material": "BOPP Transparente ultra claro",
      "Impresión": "Tinta Blanca + CMYK",
      "Resistencia": "Resistente a agua, alcohol y congelación"
    }
  },
  {
    "id": 7,
    "name": "Bolsa Satinada de Lujo para Ropa y Calzado",
    "slug": "bolsa-satinada-lujo",
    "category": "Bolsas Plásticas",
    "price": 1450,
    "salePrice": 1250,
    "isOffer": true,
    "moq": "Desde 300 uds",
    "img": "assets/bolsas_plasticas.png",
    "sizes": ["M (30x40 cm)", "G (40x50 cm)"],
    "volumePricing": { "300": 1450, "500": 1250, "1000": 990 },
    "description": "Bolsas de plástico grueso con acabado mate táctil satinado y asas de cordón suave de tela. Eleva la experiencia de compra de tus clientes.",
    "specs": {
      "Material": "Polietileno de Baja Densidad 70 micras",
      "Asas": "Cordón de algodón/Poliéster",
      "Acabado": "Tacto Suave Satinado"
    }
  },
  {
    "id": 8,
    "name": "Cinta de Embalaje Impresa con Logotipo",
    "slug": "cinta-embalaje-logo",
    "category": "Cajas",
    "price": 8500,
    "salePrice": null,
    "isOffer": false,
    "moq": "Desde 36 rollos",
    "img": "assets/cajas_impresas.png",
    "sizes": ["48 mm x 100 m"],
    "volumePricing": { "36": 8500, "72": 7200, "144": 5900 },
    "description": "Cinta adhesiva de polipropileno impresa a 1 o 2 tintas. Sella tus cajas garantizando la inviolabilidad del paquete y reforzando tu marca.",
    "specs": {
      "Material": "Polipropileno Grado Industrial 45 micras",
      "Adhesivo": "Acrílico de Alta Adherencia",
      "Medida": "48 mm de ancho x 100 m de largo"
    }
  }
];

let currentCategory = 'Todas';
let currentSearch = '';
let showOffersOnly = false;
let sortBy = 'default';
let activeProductForQuote = null;
let selectedSize = '';

// WhatsApp Business Contact
const WHATSAPP_PHONE = "573506765219";

function navigateTo(view) {
    if (view === 'catalogo') {
        window.location.href = 'catalogo.html';
    } else if (view === 'nosotros') {
        window.location.href = 'nosotros.html';
    } else if (view === 'galeria') {
        window.location.href = 'galeria.html';
    } else {
        window.location.href = 'index.html';
    }
}

async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error('Network response failed');
        const loaded = await response.json();
        if (loaded && loaded.length > 0) {
            products = loaded;
        }
    } catch (err) {
        console.warn('Utilizando catálogo local de respaldo:', err);
    } finally {
        renderProducts();
    }
}

function filterCatalogAndNavigate(category) {
    if (window.location.pathname.includes('catalogo.html')) {
        setCategoryFilter(category);
    } else {
        window.location.href = `catalogo.html?categoria=${encodeURIComponent(category)}`;
    }
}

function setCategoryFilter(category) {
    currentCategory = category;
    
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
        if (pill.getAttribute('data-category') === category) {
            pill.classList.add('active-pill');
            pill.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
            pill.classList.add('bg-secondary', 'text-on-secondary');
        } else {
            pill.classList.remove('active-pill', 'bg-secondary', 'text-on-secondary');
            pill.classList.add('bg-surface-container-high', 'text-on-surface-variant');
        }
    });

    renderProducts();
}

function handleSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    currentSearch = input.value.trim().toLowerCase();
    renderProducts();
}

function toggleOffersOnly() {
    showOffersOnly = !showOffersOnly;
    const btn = document.getElementById('offersToggleBtn');
    if (btn) {
        if (showOffersOnly) {
            btn.classList.add('active-offer-btn');
        } else {
            btn.classList.remove('active-offer-btn');
        }
    }
    renderProducts();
}

function handleSortChange(val) {
    sortBy = val;
    renderProducts();
}

function resetFilters() {
    currentCategory = 'Todas';
    currentSearch = '';
    showOffersOnly = false;
    sortBy = 'default';
    
    const input = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const offersBtn = document.getElementById('offersToggleBtn');
    
    if (input) input.value = '';
    if (sortSelect) sortSelect.value = 'default';
    if (offersBtn) offersBtn.classList.remove('active-offer-btn');
    
    setCategoryFilter('Todas');
}

// Product Grid Renderer
function renderProducts() {
    const grid = document.getElementById('productGrid');
    const noResults = document.getElementById('noResultsState');
    if (!grid) return;

    let filtered = products.filter(item => {
        const matchesCategory = currentCategory === 'Todas' || item.category === currentCategory;
        const matchesSearch = currentSearch === '' || 
            item.name.toLowerCase().includes(currentSearch) || 
            item.category.toLowerCase().includes(currentSearch) ||
            item.description.toLowerCase().includes(currentSearch);
        const matchesOffers = !showOffersOnly || item.isOffer;
        return matchesCategory && matchesSearch && matchesOffers;
    });

    if (sortBy === 'price-asc') {
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortBy === 'price-desc') {
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (noResults) noResults.classList.remove('hidden');
        return;
    } else {
        if (noResults) noResults.classList.add('hidden');
    }

    grid.innerHTML = filtered.map(item => {
        const hasOffer = item.salePrice && item.salePrice < item.price;
        const displayPrice = hasOffer ? item.salePrice : item.price;

        return `
        <div class="group bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-secondary/60 transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:shadow-secondary/5 transform hover:-translate-y-1">
            <div class="relative w-full h-52 bg-surface-container overflow-hidden cursor-pointer" onclick="openProductDetail(${item.id})">
                <img src="${item.img}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.onerror=null; this.src='assets/bolsas_kraft.png';"/>
                
                <div class="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                    <span class="bg-primary-container/90 backdrop-blur-sm text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-secondary/20 shadow-md">
                        ${item.moq}
                    </span>
                    ${hasOffer ? `<span class="bg-secondary text-on-secondary px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md">Oferta</span>` : ''}
                </div>
            </div>

            <div class="p-5 flex flex-col flex-grow space-y-3">
                <div class="flex items-center justify-between">
                    <span class="text-secondary text-[10px] font-bold uppercase tracking-widest">${item.category}</span>
                    <button onclick="openProductDetail(${item.id})" class="text-on-surface-variant hover:text-secondary text-xs flex items-center gap-1 font-semibold">
                        <span>Ver detalles</span>
                        <span class="material-symbols-outlined text-sm">visibility</span>
                    </button>
                </div>

                <h3 onclick="openProductDetail(${item.id})" class="font-headline font-bold text-base text-on-surface line-clamp-2 leading-snug cursor-pointer hover:text-secondary transition-colors">${item.name}</h3>
                
                <div class="flex items-baseline gap-2">
                    <span class="font-headline font-extrabold text-lg text-on-surface">$${displayPrice.toLocaleString()}</span>
                    ${hasOffer ? `<span class="text-xs text-on-surface-variant/60 line-through">$${item.price.toLocaleString()}</span>` : ''}
                    <span class="text-[10px] text-on-surface-variant/80 font-normal">/unidad</span>
                </div>

                <div class="flex flex-wrap items-center gap-1.5 pt-1">
                    ${item.sizes.map(s => `<span class="px-2 py-0.5 rounded border border-outline-variant/40 text-[10px] text-on-surface font-semibold">${s}</span>`).join('')}
                </div>

                <div class="pt-2 mt-auto grid grid-cols-2 gap-2">
                    <button onclick="openProductDetail(${item.id})" class="w-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-1 transition-all">
                        <span>Ficha Técnica</span>
                    </button>
                    <button onclick="openQuoteDrawer(${item.id})" class="w-full bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all shadow-md active:scale-95">
                        <span class="material-symbols-outlined text-sm">shopping_bag</span>
                        <span>Cotizar</span>
                    </button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// Modal Detail Logic
function openProductDetail(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    const imgEl = document.getElementById('modalImg');
    const titleEl = document.getElementById('modalTitle');
    const catEl = document.getElementById('modalCategory');
    const descEl = document.getElementById('modalDesc');
    const priceEl = document.getElementById('modalPriceContainer');
    const specsEl = document.getElementById('modalSpecsList');
    const volGrid = document.getElementById('modalVolumeGrid');
    const quoteBtn = document.getElementById('modalQuoteBtn');

    if (imgEl) imgEl.src = item.img;
    if (titleEl) titleEl.textContent = item.name;
    if (catEl) catEl.textContent = item.category;
    if (descEl) descEl.textContent = item.description;

    const hasOffer = item.salePrice && item.salePrice < item.price;
    const displayPrice = hasOffer ? item.salePrice : item.price;
    if (priceEl) {
        priceEl.innerHTML = `
            <span class="font-headline font-extrabold text-2xl text-on-surface">$${displayPrice.toLocaleString()}</span>
            ${hasOffer ? `<span class="text-sm text-on-surface-variant/60 line-through">$${item.price.toLocaleString()}</span>` : ''}
            <span class="text-xs text-on-surface-variant">/unidad base</span>
        `;
    }

    if (specsEl) {
        specsEl.innerHTML = Object.entries(item.specs || {}).map(([key, val]) => `
            <li class="flex items-center justify-between py-1 border-b border-outline-variant/10">
                <span class="font-semibold text-on-surface">${key}:</span>
                <span class="text-on-surface-variant">${val}</span>
            </li>
        `).join('');
    }

    if (volGrid) {
        volGrid.innerHTML = Object.entries(item.volumePricing || {}).map(([qty, rate]) => `
            <div class="p-3 bg-surface-container-high rounded-xl border border-outline-variant/30">
                <p class="font-bold text-secondary text-sm">${qty}+ uds</p>
                <p class="text-on-surface font-extrabold text-xs">$${rate.toLocaleString()}/ud</p>
            </div>
        `).join('');
    }

    if (quoteBtn) {
        quoteBtn.onclick = () => {
            closeProductModal();
            openQuoteDrawer(item.id);
        };
    }

    const modal = document.getElementById('productModal');
    const backdrop = document.getElementById('modalBackdrop');
    const panel = document.getElementById('modalPanel');

    if (modal && backdrop && panel) {
        modal.classList.remove('invisible', 'pointer-events-none');
        setTimeout(() => {
            backdrop.classList.remove('opacity-0');
            panel.classList.remove('scale-95', 'opacity-0');
        }, 10);
    }
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    const backdrop = document.getElementById('modalBackdrop');
    const panel = document.getElementById('modalPanel');

    if (modal && backdrop && panel) {
        backdrop.classList.add('opacity-0');
        panel.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            modal.classList.add('invisible', 'pointer-events-none');
        }, 300);
    }
}

// Drawer Logic
function openQuoteDrawer(productId) {
    const product = products.find(p => p.id === productId) || products[0];
    activeProductForQuote = product;

    const titleEl = document.getElementById('drawerProductTitle');
    const catEl = document.getElementById('drawerProductCategory');
    const imgEl = document.getElementById('drawerProductImg');
    const moqEl = document.getElementById('drawerMoqBadge');
    const qtyInput = document.getElementById('drawerQuantityInput');
    const noteInput = document.getElementById('drawerNoteInput');

    if (titleEl) titleEl.textContent = product.name;
    if (catEl) catEl.textContent = product.category;
    if (imgEl) imgEl.src = product.img;
    if (moqEl) moqEl.textContent = `Pedido mínimo: ${product.moq}`;
    if (qtyInput) qtyInput.value = 100;
    if (noteInput) noteInput.value = '';
    removeDrawerLogo();
    
    const sizeContainer = document.getElementById('drawerSizeButtons');
    selectedSize = product.sizes[0] || 'Estándar';
    if (sizeContainer) {
        sizeContainer.innerHTML = product.sizes.map((s, idx) => `
            <button type="button" onclick="selectSize('${s}', this)" class="size-btn ${idx === 0 ? 'active-size border-2 border-secondary bg-secondary/10 text-secondary font-bold' : 'border border-outline-variant/30 text-on-surface-variant'} p-3 rounded-xl text-xs flex flex-col items-center gap-1 font-semibold transition-all">
                <span>${s}</span>
            </button>
        `).join('');
    }

    const drawer = document.getElementById('quoteDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    const panel = document.getElementById('drawerPanel');

    if (drawer && backdrop && panel) {
        drawer.classList.remove('invisible', 'pointer-events-none');
        setTimeout(() => {
            backdrop.classList.remove('opacity-0');
            panel.classList.remove('translate-x-full');
        }, 10);
    }
}

function closeQuoteDrawer() {
    const drawer = document.getElementById('quoteDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    const panel = document.getElementById('drawerPanel');

    if (drawer && backdrop && panel) {
        backdrop.classList.add('opacity-0');
        panel.classList.add('translate-x-full');

        setTimeout(() => {
            drawer.classList.add('invisible', 'pointer-events-none');
        }, 300);
    }
}

function selectSize(size, element) {
    selectedSize = size;
    const btns = document.querySelectorAll('.size-btn');
    btns.forEach(btn => {
        btn.classList.remove('border-2', 'border-secondary', 'bg-secondary/10', 'text-secondary', 'font-bold');
        btn.classList.add('border', 'border-outline-variant/30', 'text-on-surface-variant');
    });
    if (element) {
        element.classList.remove('border', 'border-outline-variant/30', 'text-on-surface-variant');
        element.classList.add('border-2', 'border-secondary', 'bg-secondary/10', 'text-secondary', 'font-bold');
    }
}

function changeQuantity(delta) {
    const input = document.getElementById('drawerQuantityInput');
    if (!input) return;
    let val = parseInt(input.value) || 100;
    val = Math.max(100, val + delta);
    input.value = val;
}

function sendWhatsAppQuote() {
    if (!activeProductForQuote) return;

    const qtyInput = document.getElementById('drawerQuantityInput');
    const noteInput = document.getElementById('drawerNoteInput');

    const quantity = qtyInput ? qtyInput.value : 100;
    const note = noteInput ? noteInput.value.trim() : '';

    let message = `Hola *etiqybolsasimpresas*! 👋\n\n`;
    message += `Me gustaría cotizar el siguiente empaque:\n`;
    message += `📦 *Producto:* ${activeProductForQuote.name}\n`;
    message += `🏷️ *Categoría:* ${activeProductForQuote.category}\n`;
    message += `📐 *Medida/Formato:* ${selectedSize}\n`;
    message += `🔢 *Cantidad Requerida:* ${quantity} unidades\n`;

    if (uploadedDrawerLogoFile) {
        message += `📷 *Imagen/Logotipo:* Te adjunto la imagen "${uploadedDrawerLogoFile.name}" en este chat.\n`;
    }

    if (note) {
        message += `📝 *Detalles de Impresión:* ${note}\n`;
    }

    message += `\nQuedo atento a la cotización formal y tiempos de entrega. ¡Muchas gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    closeQuoteDrawer();
}

function openDirectWhatsApp(customMsg) {
    const text = customMsg ? encodeURIComponent(customMsg) : encodeURIComponent("Hola *etiqybolsasimpresas*! Quisiera información y cotización sobre empaques personalizados.");
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
}

// Window global bindings
window.handleDrawerLogoUpload = handleDrawerLogoUpload;
window.removeDrawerLogo = removeDrawerLogo;
window.handleLogoUpload = handleLogoUpload;
window.removeUploadedLogo = removeUploadedLogo;
window.navigateTo = navigateTo;
window.filterCatalogAndNavigate = filterCatalogAndNavigate;
window.setCategoryFilter = setCategoryFilter;
window.handleSearch = handleSearch;
window.toggleOffersOnly = toggleOffersOnly;
window.handleSortChange = handleSortChange;
window.resetFilters = resetFilters;
window.openProductDetail = openProductDetail;
window.closeProductModal = closeProductModal;
window.openQuoteDrawer = openQuoteDrawer;
window.closeQuoteDrawer = closeQuoteDrawer;
window.selectSize = selectSize;
window.changeQuantity = changeQuantity;
window.sendWhatsAppQuote = sendWhatsAppQuote;
window.openDirectWhatsApp = openDirectWhatsApp;
window.toggleMobileMenu = toggleMobileMenu;

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productGrid')) {
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = urlParams.get('categoria');
        if (catParam) {
            currentCategory = catParam;
            const pills = document.querySelectorAll('.filter-pill');
            pills.forEach(pill => {
                if (pill.getAttribute('data-category') === catParam) {
                    pill.classList.add('active-pill', 'bg-secondary', 'text-on-secondary');
                    pill.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
                } else {
                    pill.classList.remove('active-pill', 'bg-secondary', 'text-on-secondary');
                    pill.classList.add('bg-surface-container-high', 'text-on-surface-variant');
                }
            });
        }
        loadProducts();
    }
});
