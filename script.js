// ========================================
// BRASA BURGER - CONFIGURAÇÕES
// ========================================

// IMPORTANTE:
// Substitua pelo número do WhatsApp do proprietário.
// Use código do país + DDD + número, somente números.
// Exemplo de formato: 5535999999999
// Este número abaixo é fictício.
const WHATSAPP = "5535999462924";

let pedido = [];

const botoesAdicionar = document.querySelectorAll(".add-button");
const botoesFiltro = document.querySelectorAll(".filter");

const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkout = document.getElementById("checkout");

const formatarPreco = (valor) => {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
};

// Adicionar produtos ao pedido
botoesAdicionar.forEach((botao) => {
    botao.addEventListener("click", () => {
        const nome = botao.dataset.name;
        const preco = Number(botao.dataset.price);

        pedido.push({ nome, preco });

        atualizarPedido();

        const textoOriginal = botao.textContent;
        botao.textContent = "✓";

        setTimeout(() => {
            botao.textContent = textoOriginal;
        }, 500);
    });
});

// Atualizar quantidade e valor total
function atualizarPedido() {
    const quantidade = pedido.length;

    const total = pedido.reduce((soma, item) => {
        return soma + item.preco;
    }, 0);

    cartCount.textContent =
        `${quantidade} ${quantidade === 1 ? "item adicionado" : "itens adicionados"}`;

    cartTotal.textContent = formatarPreco(total);

    checkout.textContent = quantidade > 0
        ? "Enviar pedido pelo WhatsApp ↗"
        : "Pedir pelo WhatsApp ↗";
}

// Filtrar categorias do cardápio
botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
        botoesFiltro.forEach((item) => {
            item.classList.remove("active");
        });

        botao.classList.add("active");

        const categoria = botao.dataset.filter;

        document.querySelectorAll(".product").forEach((produto) => {
            const corresponde =
                categoria === "todos" ||
                produto.dataset.category === categoria;

            produto.classList.toggle("hidden", !corresponde);
        });
    });
});

// Abrir WhatsApp com o pedido pronto
function abrirWhatsApp() {
    const WHATSAPP = "5535999462924";

    if (!/^\d{12,13}$/.test(WHATSAPP)) {
        alert("Confira o número do WhatsApp configurado no site.");
        return;
    }

    let mensagem = "";

    if (pedido.length > 0) {
        mensagem = "Olá! Gostaria de fazer este pedido:\n\n";

        pedido.forEach((item, indice) => {
            mensagem += `${indice + 1}. ${item.nome} - ${formatarPreco(item.preco)}\n`;
        });

        const total = pedido.reduce((soma, item) => {
            return soma + item.preco;
        }, 0);

        mensagem += `\nTotal dos produtos: ${formatarPreco(total)}`;
        mensagem += "\n\nPoderiam confirmar a disponibilidade, a entrega e o valor do frete?";
    } else {
        mensagem = "Olá! Gostaria de conhecer o cardápio e fazer um pedido.";
    }

    const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank", "noopener,noreferrer");
}

checkout.addEventListener("click", abrirWhatsApp);

document.getElementById("contact-whatsapp")
    .addEventListener("click", abrirWhatsApp);

// Ano automático no rodapé
document.getElementById("year").textContent = new Date().getFullYear();
