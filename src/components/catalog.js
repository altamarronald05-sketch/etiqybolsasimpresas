// Catalog Renderer & Filter Component
import { productsData } from '../data/products.js';

export class CatalogManager {
    constructor() {
        this.products = productsData;
        this.activeCategory = 'Todas';
        this.searchQuery = '';
        this.sortBy = 'default';
        this.showOffersOnly = false;
    }

    setCategory(category) {
        this.activeCategory = category;
        this.render();
    }

    setSearch(query) {
        this.searchQuery = query.toLowerCase().trim();
        this.render();
    }

    setSort(sortBy) {
        this.sortBy = sortBy;
        this.render();
    }

    toggleOffers() {
        this.showOffersOnly = !this.showOffersOnly;
        this.render();
    }

    getFilteredProducts() {
        let result = this.products.filter(item => {
            const matchCat = this.activeCategory === 'Todas' || item.category === this.activeCategory;
            const matchSearch = !this.searchQuery || 
                item.name.toLowerCase().includes(this.searchQuery) ||
                item.category.toLowerCase().includes(this.searchQuery);
            const matchOffer = !this.showOffersOnly || item.isOffer;
            return matchCat && matchSearch && matchOffer;
        });

        if (this.sortBy === 'price-asc') {
            result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        } else if (this.sortBy === 'price-desc') {
            result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        } else if (this.sortBy === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }

    render() {
        const grid = document.getElementById('productGrid');
        if (!grid) return;
        const items = this.getFilteredProducts();

        grid.innerHTML = items.map(item => `
            <div class="group bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/30 hover:border-secondary/60 transition-all duration-300 flex flex-col h-full hover:shadow-xl">
                <div class="relative aspect-square overflow-hidden bg-surface-container cursor-pointer">
                    <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                </div>
                <div class="p-5 flex flex-col flex-grow space-y-2">
                    <span class="text-secondary text-[10px] font-bold uppercase tracking-widest">${item.category}</span>
                    <h3 class="font-headline font-bold text-base text-on-surface line-clamp-2">${item.name}</h3>
                </div>
            </div>
        `).join('');
    }
}
