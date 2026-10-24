
// ---------- PRODUTOS ----------

var produtos = [
    {
        id: 1,
        nome: "New York",
        preco: 5500.00
    },
    {
        id: 2,
        nome: "Bonito - MT",
        preco: 1559.90
    },
    {
        id: 3,
        nome: "Bolívia",
        preco: 1899.90
    },
    {
        id: 4,
        nome: "Canada",
        preco: 4499.99
    },
    {
        id: 5,
        nome: "Egito",
        preco: 6999.90
    },
    {
        id: 6,
        nome: "Holanda",
        preco: 6249.90
    },
    {
        id: 7,
        nome: "Ilhas Maldivas",
        preco: 8999.90
    },
    {
        id: 8,
        nome: "Paris",
        preco: 5999.90
    },
    {
        id: 9,
        nome: "Suíça",
        preco: 6897.90
    }
];


// ---------- CARRINHO ----------

var carrinho = [];

// ---------- Elementos da pagina ----------

var campoBusca = document.getElementById("campo-busca");
var botaoBusca = document.getElementById("botao-busca");
var listaProdutos = document.getElementById("lista-produtos");
var tituloLista = document.getElementById("titulo-lista");
var mensagemVazia = document.getElementById("mensagem-vazia");

var botaoCarrinho = document.getElementById("botao-carrinho");
var quantidadeCarrinho = document.getElementById("quantidade-carrinho");
var painelCarrinho = document.getElementById("carrinho");
var itensCarrinho = document.getElementById("itens-carrinho");
var carrinhoVazio = document.getElementById("carrinho-vazio");
var valorTotal = document.getElementById("valor-total");
var botaoFinalizar = document.getElementById("botao-finalizar");
var botaoFechar = document.getElementById("botao-fechar");

// ---------- Funcao para formatar o preco ----------

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

// ---------- Funcao que mostra os produtos na tela ----------

function mostrarProdutos(lista) {
  listaProdutos.innerHTML = "";

  // se a lista estiver vazia, mostra a mensagem
  if (lista.length === 0) {
    mensagemVazia.classList.remove("escondido");
    return;
  }
   mensagemVazia.classList.add("escondido");

  // percorre a lista e cria um cartao para cada produto
  for (var i = 0; i < lista.length; i++) {
    var produto = lista[i];

    var cartao = document.createElement("div");
    cartao.className = "produto";

    cartao.innerHTML =
      '<div class="imagem-produto" style="background-color: ' + produto.cor + '"></div>' +
      '<h3 class="nome-produto">' + produto.nome + "</h3>" +
      '<p class="categoria-produto">' + produto.categoria + "</p>" +
      '<p class="preco-produto">' + formatarPreco(produto.preco) + "</p>";

    var botao = document.createElement("button");
    botao.textContent = "Adicionar ao carrinho";

    // guarda o id do produto no proprio botao
    botao.dataset.id = produto.id;
    botao.addEventListener("click", function () {
      adicionarAoCarrinho(Number(this.dataset.id));
    });

    cartao.appendChild(botao);
    listaProdutos.appendChild(cartao);
  }
}

// ---------- Funcao da barra de busca ----------

function buscarProdutos() {
  var texto = campoBusca.value.toLowerCase();
  var encontrados = [];

  // percorre todos os produtos e guarda os que combinam com a busca
  for (var i = 0; i < produtos.length; i++) {
    var nome = produtos[i].nome.toLowerCase();
    var categoria = produtos[i].categoria.toLowerCase();

    if (nome.indexOf(texto) !== -1 || categoria.indexOf(texto) !== -1) {
      encontrados.push(produtos[i]);
    }
  }

  if (texto === "") {
    tituloLista.textContent = "Todos os produtos";
  } else {
    tituloLista.textContent = "Resultado da busca: " + encontrados.length + " produto(s)";
  }

  mostrarProdutos(encontrados);
}

// ---------- Funcao que procura um produto pelo id ----------

function procurarProduto(id) {
  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].id === id) {
      return produtos[i];
    }
  }
  return null;
}

// ---------- Funcoes do carrinho ----------

function adicionarAoCarrinho(id) {
  // primeiro verifica se o produto ja esta no carrinho
  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === id) {
      carrinho[i].quantidade = carrinho[i].quantidade + 1;
      atualizarCarrinho();
      return;
    }
  }

  // se nao estava, adiciona com quantidade 1
  var produto = procurarProduto(id);

  carrinho.push({
    id: produto.id,
    nome: produto.nome,
    preco: produto.preco,
    quantidade: 1
  });

  atualizarCarrinho();
}

function removerDoCarrinho(id) {
  for (var i = 0; i < carrinho.length; i++) {
    if (carrinho[i].id === id) {
      if (carrinho[i].quantidade > 1) {
        carrinho[i].quantidade = carrinho[i].quantidade - 1;
      } else {
        carrinho.splice(i, 1);
      }
      break;
    }
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  itensCarrinho.innerHTML = "";

  var total = 0;
  var quantidadeTotal = 0;

  for (var i = 0; i < carrinho.length; i++) {
    var item = carrinho[i];
    var subtotal = item.preco * item.quantidade;

    total = total + subtotal;
    quantidadeTotal = quantidadeTotal + item.quantidade;

    var linha = document.createElement("li");
    linha.innerHTML =
      '<span class="item-nome">' + item.nome + "</span>" +
      '<div class="item-info">' +
      "<span>" + item.quantidade + " x " + formatarPreco(item.preco) + "</span>" +
      "<span>" + formatarPreco(subtotal) + "</span>" +
      "</div>";

    var botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover 1";
    botaoRemover.dataset.id = item.id;
    botaoRemover.addEventListener("click", function () {
      removerDoCarrinho(Number(this.dataset.id));
    });

    linha.querySelector(".item-info").appendChild(botaoRemover);
    itensCarrinho.appendChild(linha);
  }

  // mostra ou esconde a mensagem de carrinho vazio
  if (carrinho.length === 0) {
    carrinhoVazio.classList.remove("escondido");
  } else {
    carrinhoVazio.classList.add("escondido");
  }

  quantidadeCarrinho.textContent = quantidadeTotal;
  valorTotal.textContent = formatarPreco(total);
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho esta vazio!");
    return;
  }

  alert("Compra finalizada! Total: " + valorTotal.textContent);
  carrinho = [];
  atualizarCarrinho();
}

// ---------- Ligando os botoes as funcoes ----------

botaoBusca.addEventListener("click", buscarProdutos);
campoBusca.addEventListener("input", buscarProdutos);

adicionarAoCarrinho(1); // Adiciona o produto com id 1 ao carrinho

botaoCarrinho.addEventListener("click", function () {
  painelCarrinho.classList.remove("escondido");
});

botaoFechar.addEventListener("click", function () {
  painelCarrinho.classList.add("escondido");
});

botaoFinalizar.addEventListener("click", finalizarCompra);

// ---------- Inicio do programa ----------

mostrarProdutos(produtos);
atualizarCarrinho();

