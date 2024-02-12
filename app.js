// app.js

const escolasDeSamba = [];
const categorias = [];

function adicionarCategoria() {
  const categoriaInput = document.getElementById("categoria");
  const categoria = categoriaInput.value.trim();

  if (categoria !== "") {
    categorias.push(categoria);
    categoriaInput.value = "";

    // Atualiza a visualização das categorias
    atualizarCategorias();
  }
}

function atualizarCategorias() {
  const categoriasContainer = document.getElementById("categoriasContainer");
  categoriasContainer.innerHTML = "";

  for (const categoria of categorias) {
    const categoriaElement = document.createElement("div");
    categoriaElement.textContent = categoria;
    categoriasContainer.appendChild(categoriaElement);
  }
}

function carregarBandeira() {
  const bandeiraInput = document.getElementById("bandeira");
  const bandeiraArquivoInput = document.getElementById("bandeiraArquivo");

  if (bandeiraArquivoInput.files && bandeiraArquivoInput.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      bandeiraInput.value = e.target.result;
    };

    reader.readAsDataURL(bandeiraArquivoInput.files[0]);
  } else {
    const bandeiraURL = prompt("Digite a URL da imagem da bandeira:");
    bandeiraInput.value = bandeiraURL;
  }
}

function cadastrarEscola() {
  const nome = document.getElementById("nome").value.trim();
  const bandeira = document.getElementById("bandeira").value.trim();
  const historia = document.getElementById("historia").value.trim();

  if (nome === "" || bandeira === "" || historia === "" || categorias.length === 0) {
    alert("Preencha todos os campos e adicione pelo menos uma categoria.");
    return;
  }

  const escola = {
    nome,
    bandeira,
    historia,
    categorias: [],
  };

  for (const categoria of categorias) {
    const nota = parseFloat(prompt(`Digite a nota para a categoria ${categoria} da escola ${nome}:`));
    escola.categorias.push({ categoria, nota });
  }

  escolasDeSamba.push(escola);
  alert("Escola de Samba cadastrada com sucesso!");

  // Limpa os campos do formulário
  document.getElementById("nome").value = "";
  document.getElementById("bandeira").value = "";
  document.getElementById("historia").value = "";
  categorias.length = 0; // Limpa o array de categorias
  atualizarCategorias();
}

function apurarNotas() {
  const resultadoContainer = document.getElementById("resultado");
  resultadoContainer.innerHTML = "";

  for (const escola of escolasDeSamba) {
    const escolaElement = document.createElement("div");
    escolaElement.innerHTML = `<h2>${escola.nome}</h2>`;

    for (const categoria of escola.categorias) {
      const nota = parseFloat(prompt(`Digite a nota para a categoria ${categoria.categoria} da escola ${escola.nome}:`));
      categoria.nota = nota;

      const notaElement = document.createElement("div");
      notaElement.textContent = `${categoria.categoria}: ${categoria.nota}`;
      escolaElement.appendChild(notaElement);
    }

    resultadoContainer.appendChild(escolaElement);
  }
}

function calcularEscolaCampea() {
  let maiorPontuacao = 0;
  let escolaCampea = null;

  for (const escola of escolasDeSamba) {
    let pontuacaoTotal = 0;

    for (const categoria of escola.categorias) {
      pontuacaoTotal += categoria.nota;
    }

    if (pontuacaoTotal > maiorPontuacao) {
      maiorPontuacao = pontuacaoTotal;
      escolaCampea = escola;
    }
  }

  const resultadoContainer = document.getElementById("resultado");
  resultadoContainer.innerHTML = `<h2>A escola de samba campeã é: ${escolaCampea.nome}</h2>`;
}

function exibirCategorias(event) {
  event.preventDefault();
  window.location.href = "categorias.html";
}

function exibirEscolas(event) {
  event.preventDefault();
  window.location.href = "escolas.html";
}

function exibirApuracao(event) {
  event.preventDefault();
  window.location.href = "apuracao.html";
}


