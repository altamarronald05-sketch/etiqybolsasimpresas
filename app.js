// Active Application State
let products = [];
let currentCategory = 'Todas';
let currentSearch = '';
let showOffersOnly = false;
let sortBy = 'default';
let activeProductForQuote = null;
let selectedSize = '';

// WhatsApp Business Contact (Editable)
const WHATSAPP_PHONE = "573506765219";

// Fetch Products from JSON Data File
async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) throw new Error('Network response failed');
        products = await response.json();
        renderProducts();
    } catch (err) {
        console.error('Failed loading products.json, fallback array used:', err);
    }
}

// Navigation Engine
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

function filterCatalogAndNavigate(category) {
    setCategoryFilter(category);
    navigateTo('catalogo');
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
    currentSearch = input.value.trim().toLowerCase();
    renderProducts();
}

function toggleOffersOnly() {
    showOffersOnly = !showOffersOnly;
    const btn = document.getElementById('offersToggleBtn');
    if (showOffersOnly) {
        btn.classList.add('active-offer-btn');
    } else {
        btn.classList.remove('active-offer-btn');
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
    
    document.getElementById('searchInput').value = '';
    document.getElementById('sortSelect').value = 'default';
    document.getElementById('offersToggleBtn').classList.remove('active-offer-btn');
    
    setCategoryFilter('Todas');
}

// Product Grid Renderer with Filtering & Sorting
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

    // Apply Sorting
    if (sortBy === 'price-asc') {
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortBy === 'price-desc') {
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sortBy === 'name') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
    }

    grid.innerHTML = filtered.map(item => {
        const hasOffer = item.salePrice && item.salePrice < item.price;
        const displayPrice = hasOffer ? item.salePrice : item.price;

        return `
        <div class="group bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-secondary/60 transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:shadow-secondary/5 transform hover:-translate-y-1">
            <div class="relative aspect-square overflow-hidden bg-surface-container cursor-pointer" onclick="openProductDetail(${item.id})">
                <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                
                <div class="absolute top-3 left-3 flex flex-col gap-1.5">
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
                
                <!-- Price Display -->
                <div class="flex items-baseline gap-2">
                    <span class="font-headline font-extrabold text-lg text-on-surface">$${displayPrice.toLocaleString()}</span>
                    ${hasOffer ? `<span class="text-xs text-on-surface-variant/60 line-through">$${item.price.toLocaleString()}</span>` : ''}
                    <span class="text-[10px] text-on-surface-variant/80 font-normal">/unidad</span>
                </div>

                <!-- Size Badges -->
                <div class="flex items-center gap-1.5 pt-1">
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

// Product Detail Modal Logic
function openProductDetail(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    document.getElementById('modalImg').src = item.img;
    document.getElementById('modalTitle').textContent = item.name;
    document.getElementById('modalCategory').textContent = item.category;
    document.getElementById('modalDesc').textContent = item.description;

    // Price container
    const hasOffer = item.salePrice && item.salePrice < item.price;
    const displayPrice = hasOffer ? item.salePrice : item.price;
    document.getElementById('modalPriceContainer').innerHTML = `
        <span class="font-headline font-extrabold text-2xl text-on-surface">$${displayPrice.toLocaleString()}</span>
        ${hasOffer ? `<span class="text-sm text-on-surface-variant/60 line-through">$${item.price.toLocaleString()}</span>` : ''}
        <span class="text-xs text-on-surface-variant">/unidad base</span>
    `;

    // Specs List
    const specsEl = document.getElementById('modalSpecsList');
    specsEl.innerHTML = Object.entries(item.specs || {}).map(([key, val]) => `
        <li class="flex items-center justify-between py-1 border-b border-outline-variant/10">
            <span class="font-semibold text-on-surface">${key}:</span>
            <span class="text-on-surface-variant">${val}</span>
        </li>
    `).join('');

    // Volume Grid Rates
    const volGrid = document.getElementById('modalVolumeGrid');
    volGrid.innerHTML = Object.entries(item.volumePricing || {}).map(([qty, rate]) => `
        <div class="p-3 bg-surface-container-high rounded-xl border border-outline-variant/30">
            <p class="font-bold text-secondary text-sm">${qty}+ uds</p>
            <p class="text-on-surface font-extrabold text-xs">$${rate.toLocaleString()}/ud</p>
        </div>
    `).join('');

    // Quote CTA
    const quoteBtn = document.getElementById('modalQuoteBtn');
    quoteBtn.onclick = () => {
        closeProductModal();
        openQuoteDrawer(item.id);
    };

    const modal = document.getElementById('productModal');
    const backdrop = document.getElementById('modalBackdrop');
    const panel = document.getElementById('modalPanel');

    modal.classList.remove('invisible', 'pointer-events-none');
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        panel.classList.remove('scale-95', 'opacity-0');
    }, 10);
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    const backdrop = document.getElementById('modalBackdrop');
    const panel = document.getElementById('modalPanel');

    backdrop.classList.add('opacity-0');
    panel.classList.add('scale-95', 'opacity-0');

    setTimeout(() => {
        modal.classList.add('invisible', 'pointer-events-none');
    }, 300);
}

// Drawer Logic
function openQuoteDrawer(productId) {
    const product = products.find(p => p.id === productId) || products[0];
    activeProductForQuote = product;

    document.getElementById('drawerProductTitle').textContent = product.name;
    document.getElementById('drawerProductCategory').textContent = product.category;
    document.getElementById('drawerProductImg').src = product.img;
    document.getElementById('drawerMoqBadge').textContent = `Pedido mínimo: ${product.moq}`;
    document.getElementById('drawerQuantityInput').value = 100;
    document.getElementById('drawerNoteInput').value = '';
    
    // Render Size options
    const sizeContainer = document.getElementById('drawerSizeButtons');
    selectedSize = product.sizes[0] || 'Estándar';
    sizeContainer.innerHTML = product.sizes.map((s, idx) => `
        <button type="button" onclick="selectSize('${s}', this)" class="size-btn ${idx === 0 ? 'active-size border-2 border-secondary bg-secondary/10 text-secondary font-bold' : 'border border-outline-variant/30 text-on-surface-variant'} p-3 rounded-xl text-xs flex flex-col items-center gap-1 font-semibold transition-all">
            <span>${s}</span>
        </button>
    `).join('');

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

function sendWhatsAppQuote() {
    if (!activeProductForQuote) return;

    const quantity = document.getElementById('drawerQuantityInput').value || 100;
    const note = document.getElementById('drawerNoteInput').value.trim();

    let message = `Hola *etiqybolsasimpresas*! 👋

`;
    message += `Me gustaría cotizar el siguiente empaque:
`;
    message += `📦 *Producto:* ${activeProductForQuote.name}
`;
    message += `🏷️ *Categoría:* ${activeProductForQuote.category}
`;
    message += `📐 *Medida/Formato:* ${selectedSize}
`;
    message += `🔢 *Cantidad Requerida:* ${quantity} unidades
`;

    if (note) {
        message += `📝 *Detalles/Logotipo:* ${note}
`;
    }

    message += `
Quedo atento a la cotización formal y tiempos de entrega. ¡Muchas gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    closeQuoteDrawer();
}

function openDirectWhatsApp(customMsg) {
    const text = customMsg ? encodeURIComponent(customMsg) : encodeURIComponent("Hola *etiqybolsasimpresas*! Quisiera información y cotización sobre empaques personalizados.");
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
}

function downloadPDFCatalog() {
    navigateTo('catalogo');
    setTimeout(() => {
        window.print();
    }, 300);
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Initial Loading Logic
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

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
