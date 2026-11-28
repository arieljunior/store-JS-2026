import { listProducts } from '../../services/products.service.js';
import { addToCart, escapeHTML, renderProductCard, showToast, updateCartBadge } from '../../utils/index.js';

const productsContainer = document.querySelector('[data-products]');
const searchInput = document.querySelector('[data-search]');
const categorySelect = document.querySelector('[data-category]');

let products = [];

function render() {
    const term = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;

    const filtered = products.filter(
        (product) =>
            product.title.toLowerCase().includes(term) &&
            (!category || product.category === category)
    );

    productsContainer.innerHTML = filtered.length
        ? filtered.map(renderProductCard).join('')
        : '<p class="message">Nenhum produto encontrado.</p>';
}

function renderCategories() {
    const categories = [...new Set(products.map((product) => product.category))];

    categorySelect.insertAdjacentHTML(
        'beforeend',
        categories.map((name) => `<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`).join('')
    );
}

async function init() {
    updateCartBadge();
    products = await listProducts();

    if (!products.length) {
        productsContainer.innerHTML = '<p class="message error">Não foi possível carregar os produtos.</p>';
        return;
    }

    renderCategories();
    render();
}

searchInput.addEventListener('input', render);
categorySelect.addEventListener('change', render);

productsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-add-to-cart]');
    if (!button) return;

    const product = products.find((item) => item.id === Number(button.dataset.addToCart));
    addToCart(product);
    showToast('Produto adicionado ao carrinho!');
});

init();
