const CART_KEY = 'store:cart';

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

export function formatCurrency(value) {
    return currencyFormatter.format(Number(value) || 0);
}

export function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text ?? '';
    return div.innerHTML;
}

export function renderProductCard(product) {
    return `
        <article class="card">
            <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.title)}" loading="lazy">
            <span class="category">${escapeHTML(product.category)}</span>
            <h3 title="${escapeHTML(product.title)}">${escapeHTML(product.title)}</h3>
            <span class="price">${formatCurrency(product.price)}</span>
            <button class="btn" type="button" data-add-to-cart="${product.id}">Adicionar ao carrinho</button>
        </article>`;
}

export function showToast(message) {
    document.querySelector('.toast')?.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    document.body.append(toast);

    setTimeout(() => toast.remove(), 2000);
}

/* Cart (only cart items are persisted) */

export function getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(cart) ? cart : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
    return cart;
}

export function addToCart(product) {
    const cart = getCart();
    const item = cart.find((entry) => entry.id === product.id);

    if (item) {
        item.quantity += 1;
    } else {
        const { id, title, price, image } = product;
        cart.push({ id, title, price, image, quantity: 1 });
    }

    return saveCart(cart);
}

export function updateQuantity(id, quantity) {
    const cart = getCart();

    if (quantity < 1) {
        return saveCart(cart.filter((item) => item.id !== id));
    }

    return saveCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
}

export function removeFromCart(id) {
    return saveCart(getCart().filter((item) => item.id !== id));
}

export function getCartCount(cart = getCart()) {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

export function calculateCartTotal(cart = getCart()) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function updateCartBadge() {
    const badge = document.querySelector('[data-cart-count]');
    if (badge) {
        badge.textContent = getCartCount();
    }
}
