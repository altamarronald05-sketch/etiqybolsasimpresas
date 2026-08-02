// Main Application Entry Point
import { productsData } from './data/products.js';
import { initRouter } from './modules/router.js';
import { CatalogManager } from './components/catalog.js';
import { WhatsAppQuoteDrawer } from './components/drawer.js';

console.log("etiqybolsasimpresas - JavaScript Application Engine Initialized");

document.addEventListener('DOMContentLoaded', () => {
    initRouter();
    const catalog = new CatalogManager();
    const drawer = new WhatsAppQuoteDrawer();
    catalog.render();
});
