# Loja JS

Loja simples (HTML, CSS e JavaScript puro) com produtos da [FakeStore API](https://fakestoreapi.com/), carrinho persistido no `localStorage` e tema dark.

## Páginas

- `index.html` — início com produtos em destaque
- `pages/products` — listagem com busca e filtro por categoria
- `pages/cart` — carrinho (alterar quantidade, remover, total)
- `pages/checkout` — formulário visual (sem envio) + resumo do pedido
- `pages/success` — confirmação estática

## Estrutura

- `services/` — acesso à API
- `utils/index.js` — formatação de valores, carrinho e helpers compartilhados
- `global.css` — tema dark e componentes base

Apenas os itens do carrinho são persistidos (`localStorage`, chave `store:cart`).

## Executar

Os módulos ES exigem um servidor estático:

```
npx serve .
```
