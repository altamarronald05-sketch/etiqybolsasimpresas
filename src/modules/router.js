// Navigation Router Module
export function initRouter() {
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '') || 'inicio';
        handleRoute(hash);
    });
}

export function handleRoute(view) {
    const homeView = document.getElementById('view-home');
    const catalogView = document.getElementById('view-catalogo');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navLinks) navLinks.forEach(link => link.classList.remove('active-link'));

    if (view === 'catalogo') {
        if (homeView) homeView.classList.add('hidden');
        if (catalogView) catalogView.classList.remove('hidden');
        const activeLink = document.getElementById('nav-catalogo');
        if (activeLink) activeLink.classList.add('active-link');
    } else {
        if (catalogView) catalogView.classList.add('hidden');
        if (homeView) homeView.classList.remove('hidden');
        const activeLink = document.getElementById('nav-inicio');
        if (activeLink) activeLink.classList.add('active-link');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
