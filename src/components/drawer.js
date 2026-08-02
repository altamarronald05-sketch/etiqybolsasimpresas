// WhatsApp Quote Drawer Component
export class WhatsAppQuoteDrawer {
    constructor(whatsappPhone = "573506765219") {
        this.whatsappPhone = whatsappPhone;
        this.selectedProduct = null;
        this.selectedSize = 'P';
        this.uploadedLogo = null;
    }

    open(product) {
        this.selectedProduct = product;
        console.log("Quote Drawer Opened for:", product.name);
    }

    sendQuote(quantity, note) {
        let msg = `Hola *etiqybolsasimpresas*! 👋\n\nCotización:\n📦 *Producto:* ${this.selectedProduct.name}\n🔢 *Cantidad:* ${quantity}\n`;
        if (this.uploadedLogo) {
            msg += `📁 *Logo:* ${this.uploadedLogo.name}\n`;
        }
        if (note) {
            msg += `📝 *Detalles:* ${note}\n`;
        }

        if (typeof fbq === 'function') fbq('track', 'Lead', { content_name: this.selectedProduct.name });
        if (typeof gtag === 'function') gtag('event', 'generate_lead', { event_category: 'WhatsApp' });

        const link = `https://wa.me/${this.whatsappPhone}?text=${encodeURIComponent(msg)}`;
        window.open(link, '_blank');
    }
}
