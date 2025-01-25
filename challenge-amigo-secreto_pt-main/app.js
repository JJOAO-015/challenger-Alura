let amigos = [];

const inputName = document.getElementById("amigo");
const addButton = document.getElementById("button-add");
const nameList = document.getElementById("listaAmigos");
const resultList = document.getElementById("resultado");

// Função para adicionar um amigo à lista
function adicionarAmigo() {
  const nome = inputName.value.trim();
  const verificador = /^[A-Za-zá-úÁ-Ú\s]+$/;

  // Verifica se o nome não está vazio e é válido
  if (nome === "") {
    alert("O nome não pode estar vazio.");
    return;
  } else if (!verificador.test(nome)) {
    alert("Nome inválido. Apenas letras e espaços são permitidos.");
    return;
  }

  // Adiciona o nome à lista de amigos
  amigos.push(nome);

  // Cria o item de lista (<li>) para armazenar o nome
  const li = document.createElement("li");
  li.textContent = nome;
  nameList.appendChild(li);

  // Limpa o campo de entrada de nome
  inputName.value = "";
}

// Função para sortear os amigos
function sortearAmigo() {
  if (amigos.length < 2) {
    alert("Adicione pelo menos 2 nomes para realizar o sorteio.");
    return;
  }

  // Cria uma cópia do array de amigos para não alterar o original
  const amigosCopia = [...amigos];
  const sorteio = [];

  // Enquanto houver amigos na cópia para sortear
  while (amigosCopia.length > 0) {
    const doador = amigosCopia.splice(
      Math.floor(Math.random() * amigosCopia.length),
      1
    )[0]; // Remove o dador da lista

    // Remover a pessoa sorteada para o dador da lista (recebedor)
    let recebedorIndex = Math.floor(Math.random() * amigosCopia.length);
    const recebedor = amigosCopia.splice(recebedorIndex, 1)[0]; // Remove o recebedor da lista

    sorteio.push({
      doador: doador,
      recebedor: recebedor,
    });
  }

  // Limpa a lista de resultados e exibe os resultados do sorteio
  resultList.innerHTML = "";
  sorteio.forEach((par) => {
    const li = document.createElement("li");
    li.textContent = `${par.doador} tirou ${par.recebedor}`;
    resultList.appendChild(li);
  });

  // Limpa a lista de amigos e o array para um novo sorteio
  amigos = [];
  nameList.innerHTML = "";
}

// Adicionando evento ao botão de adicionar
addButton.addEventListener("click", adicionarAmigo);
