import { calculateCartTotal, escapeHTML, formatCurrency, getCart, updateCartBadge } from '../../utils/index.js';

const itemsContainer = document.querySelector('[data-order-items]');
const totalText = document.querySelector('[data-order-total]');
const confirmLink = document.querySelector('[data-confirm-link]');

function render() {
    const cart = getCart();
    updateCartBadge();

    if (!cart.length) {
        itemsContainer.innerHTML = '<p class="message">Seu carrinho está vazio.</p>';
        confirmLink.hidden = true;
        return;
    }

    itemsContainer.innerHTML = cart
        .map(
            (item) => `
            <div class="summary-row">
                <span>${item.quantity}x ${escapeHTML(item.title)}</span>
                <span>${formatCurrency(item.price * item.quantity)}</span>
            </div>`
        )
        .join('');
    totalText.textContent = formatCurrency(calculateCartTotal(cart));
}

render();
