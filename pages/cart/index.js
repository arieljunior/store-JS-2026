import {
    calculateCartTotal,
    escapeHTML,
    formatCurrency,
    getCart,
    getCartCount,
    removeFromCart,
    updateCartBadge,
    updateQuantity,
} from '../../utils/index.js';

const itemsContainer = document.querySelector('[data-cart-items]');
const summary = document.querySelector('[data-cart-summary]');
const countText = document.querySelector('[data-cart-count-text]');
const totalText = document.querySelector('[data-cart-total]');

function renderItem(item) {
    return `
        <article class="cart-item" data-id="${item.id}">
            <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.title)}">
            <div class="cart-item-info">
                <h3>${escapeHTML(item.title)}</h3>
                <span class="price">${formatCurrency(item.price)}</span>
            </div>
            <div class="quantity">
                <button class="btn btn-secondary btn-small" type="button" data-action="decrease" aria-label="Diminuir quantidade">−</button>
                <span>${item.quantity}</span>
                <button class="btn btn-secondary btn-small" type="button" data-action="increase" aria-label="Aumentar quantidade">+</button>
            </div>
            <strong class="subtotal">${formatCurrency(item.price * item.quantity)}</strong>
            <button class="btn btn-danger btn-small" type="button" data-action="remove">Remover</button>
        </article>`;
}

function render() {
    const cart = getCart();

    if (!cart.length) {
        itemsContainer.innerHTML = `
            <div class="message">
                <p>Seu carrinho está vazio.</p>
                <a class="btn" href="../products/index.html">Ver produtos</a>
            </div>`;
        summary.hidden = true;
    } else {
        itemsContainer.innerHTML = cart.map(renderItem).join('');
        summary.hidden = false;
        countText.textContent = getCartCount(cart);
        totalText.textContent = formatCurrency(calculateCartTotal(cart));
    }

    updateCartBadge();
}

itemsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;

    const id = Number(button.closest('[data-id]').dataset.id);
    const item = getCart().find((entry) => entry.id === id);

    if (button.dataset.action === 'increase') updateQuantity(id, item.quantity + 1);
    if (button.dataset.action === 'decrease') updateQuantity(id, item.quantity - 1);
    if (button.dataset.action === 'remove') removeFromCart(id);

    render();
});

render();
