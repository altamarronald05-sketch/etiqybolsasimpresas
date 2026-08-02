// Products Data Repository
const products = [
    {
        id: 1,
        title: "Bolsa Kraft Boutique Impresa",
        category: "Bolsas Kraft",
        moq: "Desde 100 uds",
        img: "assets/bolsas_kraft.png",
        sizes: ["P", "M", "G"],
        desc: "Bolsa de papel kraft ecológica de alta resistencia con asas retorcidas e impresión personalizada."
    },
    {
        id: 2,
        title: "Etiquetas en Rollo Metalizadas Foil",
        category: "Etiquetas",
        moq: "Desde 100 uds",
        img: "assets/etiquetas_rollo.png",
        sizes: ["P", "M", "G"],
        desc: "Etiquetas adhesivas en rollo con estampado en pan de oro/plata para botellas, envases y empaques de lujo."
    },
    {
        id: 3,
        title: "Bolsa Plástica Polietileno Boutique",
        category: "Bolsas Plásticas",
        moq: "Desde 500 uds",
        img: "assets/bolsas_plasticas.png",
        sizes: ["P", "M", "G"],
        desc: "Bolsas de plástico troqueladas tipo riñón, ideales para tiendas de ropa, calzado y accesorios."
    },
    {
        id: 4,
        title: "Caja Corrugada para Envíos E-Commerce",
        category: "Cajas",
        moq: "Desde 100 uds",
        img: "assets/cajas_impresas.png",
        sizes: ["P", "M", "G"],
        desc: "Cajas de cartón microcorrugado impresas a 1 o varias tintas para despachos de compras online."
    },
    {
        id: 5,
        title: "Bolsa Kraft de Asa Plana",
        category: "Bolsas Kraft",
        moq: "Desde 100 uds",
        img: "assets/bolsas_kraft.png",
        sizes: ["P", "M", "G"],
        desc: "Excelente opción para restaurantes, domicilios y tiendas que buscan practicidad y diseño."
    },
    {
        id: 6,
        title: "Etiqueta Transparente Vinilo Mate",
        category: "Etiquetas",
        moq: "Desde 200 uds",
        img: "assets/etiquetas_rollo.png",
        sizes: ["P", "M", "G"],
        desc: "Etiquetas adhesivas impermeables de vinilo transparente resistentes a humedad y refrigeración."
    },
    {
        id: 7,
        title: "Bolsa Satinada de Lujo para Ropa",
        category: "Bolsas Plásticas",
        moq: "Desde 300 uds",
        img: "assets/bolsas_plasticas.png",
        sizes: ["P", "M", "G"],
        desc: "Acabado brillante de alta densidad con asa de cordón suave, ideal para regalos y moda."
    },
    {
        id: 8,
        title: "Cinta de Embalaje Impresa con Logo",
        category: "Cajas",
        moq: "Desde 50 rollos",
        img: "assets/cajas_impresas.png",
        sizes: ["P", "M", "G"],
        desc: "Cinta adhesiva de seguridad para sellar cajas de envío reforzando la marca del negocio."
    }
];

// Active State variables
let currentCategory = 'Todas';
let currentSearch = '';
let activeProductForQuote = null;
let selectedSize = 'P';

// Default Business WhatsApp Phone Number
const WHATSAPP_PHONE = "573506765219";

// Navigation Routing Engine
function navigateTo(view) {
    const homeView = document.getElementById('view-home');
    const catalogView = document.getElementById('view-catalogo');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => link.classList.remove('active-link'));

    if (view === 'catalogo') {
        homeView.classList.add('hidden');
        catalogView.classList.remove('hidden');
        document.getElementById('nav-catalogo').classList.add('active-link');
        window.location.hash = 'catalogo';
    } else {
        catalogView.classList.add('hidden');
        homeView.classList.remove('hidden');
        
        if (view === 'nosotros') {
            document.getElementById('nav-nosotros').classList.add('active-link');
            window.location.hash = 'nosotros';
            const targetEl = document.getElementById('nosotros');
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
            return;
        } else if (view === 'galeria') {
            document.getElementById('nav-galeria').classList.add('active-link');
            window.location.hash = 'galeria';
            const targetEl = document.getElementById('galeria');
            if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
            return;
        } else {
            document.getElementById('nav-inicio').classList.add('active-link');
            window.location.hash = 'inicio';
        }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Filter Catalog & Navigate from Home Cards
function filterCatalogAndNavigate(category) {
    setCategoryFilter(category);
    navigateTo('catalogo');
}

// Category Filter Engine
function setCategoryFilter(category) {
    currentCategory = category;
    
    // Update active filter pill
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

// Search Filter Engine
function handleSearch() {
    const input = document.getElementById('searchInput');
    currentSearch = input.value.trim().toLowerCase();
    renderProducts();
}

// Product Grid Renderer
function renderProducts() {
    const grid = document.getElementById('productGrid');
    const noResults = document.getElementById('noResultsState');
    if (!grid) return;

    let filtered = products.filter(item => {
        const matchesCategory = currentCategory === 'Todas' || item.category === currentCategory;
        const matchesSearch = currentSearch === '' || 
            item.title.toLowerCase().includes(currentSearch) || 
            item.category.toLowerCase().includes(currentSearch) ||
            item.desc.toLowerCase().includes(currentSearch);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
    }

    grid.innerHTML = filtered.map(item => `
        <div class="group bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-secondary/60 transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:shadow-secondary/5 transform hover:-translate-y-1">
            <div class="relative aspect-square overflow-hidden bg-surface-container">
                <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                <div class="absolute top-3 left-3 bg-primary-container/90 backdrop-blur-sm text-secondary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-secondary/20 shadow-md">
                    ${item.moq}
                </div>
            </div>
            <div class="p-5 flex flex-col flex-grow space-y-3">
                <span class="text-secondary text-[10px] font-bold uppercase tracking-widest">${item.category}</span>
                <h3 class="font-headline font-bold text-base text-on-surface line-clamp-2 leading-snug">${item.title}</h3>
                <p class="text-on-surface-variant text-xs line-clamp-2 leading-relaxed opacity-90">${item.desc}</p>
                
                <div class="flex items-center gap-1.5 pt-1">
                    <span class="text-[11px] text-on-surface-variant font-medium mr-1">Medidas:</span>
                    <span class="px-2 py-0.5 rounded border border-outline-variant/40 text-[10px] text-on-surface font-bold">Pequeño (P)</span>
                    <span class="px-2 py-0.5 rounded border border-outline-variant/40 text-[10px] text-on-surface font-bold">Mediano (M)</span>
                    <span class="px-2 py-0.5 rounded border border-outline-variant/40 text-[10px] text-on-surface font-bold">Grande (G)</span>
                </div>

                <button onclick="openQuoteDrawer(${item.id})" class="mt-auto w-full bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95">
                    <span class="material-symbols-outlined text-base">shopping_bag</span>
                    <span>Cotizar por WhatsApp</span>
                </button>
            </div>
        </div>
    `).join('');
}

// Drawer Logic
function openQuoteDrawer(productId) {
    const product = products.find(p => p.id === productId) || products[0];
    activeProductForQuote = product;

    document.getElementById('drawerProductTitle').textContent = product.title;
    document.getElementById('drawerProductCategory').textContent = product.category;
    document.getElementById('drawerProductImg').src = product.img;
    document.getElementById('drawerQuantityInput').value = 100;
    document.getElementById('drawerNoteInput').value = '';
    
    // Reset size buttons
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach(btn => {
        btn.classList.remove('border-2', 'border-secondary', 'bg-secondary/10', 'text-secondary', 'font-bold');
        btn.classList.add('border', 'border-outline-variant/30', 'text-on-surface-variant');
    });
    sizeBtns[0].classList.add('border-2', 'border-secondary', 'bg-secondary/10', 'text-secondary', 'font-bold');
    selectedSize = 'P';

    const drawer = document.getElementById('quoteDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    const panel = document.getElementById('drawerPanel');

    drawer.classList.remove('invisible', 'pointer-events-none');
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        panel.classList.remove('translate-x-full');
    }, 10);
}

function closeQuoteDrawer() {
    const drawer = document.getElementById('quoteDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    const panel = document.getElementById('drawerPanel');

    backdrop.classList.add('opacity-0');
    panel.classList.add('translate-x-full');

    setTimeout(() => {
        drawer.classList.add('invisible', 'pointer-events-none');
    }, 300);
}

function selectSize(size, element) {
    selectedSize = size;
    const btns = document.querySelectorAll('.size-btn');
    btns.forEach(btn => {
        btn.classList.remove('border-2', 'border-secondary', 'bg-secondary/10', 'text-secondary', 'font-bold');
        btn.classList.add('border', 'border-outline-variant/30', 'text-on-surface-variant');
    });
    element.classList.remove('border', 'border-outline-variant/30', 'text-on-surface-variant');
    element.classList.add('border-2', 'border-secondary', 'bg-secondary/10', 'text-secondary', 'font-bold');
}

function changeQuantity(delta) {
    const input = document.getElementById('drawerQuantityInput');
    let val = parseInt(input.value) || 100;
    val = Math.max(100, val + delta);
    input.value = val;
}

// Format and send quote message to WhatsApp
function sendWhatsAppQuote() {
    if (!activeProductForQuote) return;

    const quantity = document.getElementById('drawerQuantityInput').value || 100;
    const note = document.getElementById('drawerNoteInput').value.trim();

    let message = `Hola *etiqybolsasimpresas*! 👋

`;
    message += `Me gustaría cotizar el siguiente producto:
`;
    message += `📦 *Producto:* ${activeProductForQuote.title}
`;
    message += `🏷️ *Categoría:* ${activeProductForQuote.category}
`;
    message += `📐 *Tamaño/Medida:* ${selectedSize === 'P' ? 'Pequeño (P)' : selectedSize === 'M' ? 'Mediano (M)' : 'Grande (G)'}
`;
    message += `🔢 *Cantidad:* ${quantity} unidades
`;

    if (note) {
        message += `📝 *Detalles/Logotipo:* ${note}
`;
    }

    message += `
Quedo atento a la información de precios y tiempo de entrega. ¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    closeQuoteDrawer();
}

function openDirectWhatsApp(customMsg) {
    const text = customMsg ? encodeURIComponent(customMsg) : encodeURIComponent("Hola *etiqybolsasimpresas*! Quisiera información y cotización sobre sus productos.");
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Initial hash route checking & product render
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();

    const hash = window.location.hash.replace('#', '');
    if (hash === 'catalogo') {
        navigateTo('catalogo');
    } else if (hash === 'nosotros') {
        navigateTo('nosotros');
    } else if (hash === 'galeria') {
        navigateTo('galeria');
    } else {
        navigateTo('inicio');
    }
});
