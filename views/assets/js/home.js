let isCoracao = true;

  function mudaCoracao() {
    const container = document.getElementById("coracao_cheio");

    if (isCoracao) {
      container.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="red" class="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
        </svg>
      `;
    } else {
      container.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-heart fill-gray-400 hover:fill-red-500 transition duration-300" viewBox ="0 0 16 16">
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        </svg>
      `;
    }

    isCoracao = !isCoracao;
  }
  
  let isDesceu = false;

  function functionDescer() {
    const content = document.getElementById("escondido");
    const botao = document.getElementById("botaoLivros");
    const livrosvg = document.getElementById("bookIcon");
    var escondido = document.getElementById("escondido");
    escondido.style.maxHeight = escondido.style.maxHeight && escondido.style.maxHeight !== "0px" ? "0px" : escondido.scrollHeight + "px";
    if (isDesceu) {
      content.classList.remove("max-h-40");
      content.classList.add("max-h-0");
      botao.classList.remove("bg-[#6F23D9]", "text-white");
      botao.classList.add("bg-white", "text-black");
      livrosvg.setAttribute("data", "../views/assets/svg/bookpreto.svg");
    } else {
      content.classList.remove("max-h-0");
      content.classList.add("max-h-40");
      botao.classList.remove("bg-white", "text-black");
      botao.classList.add("bg-[#6F23D9]", "text-white");
      botao.classList.remove("hover:bg-gray-50");
      livrosvg.setAttribute("data", "../views/assets/svg/bookwhite.svg");
    }
  
    isDesceu = !isDesceu;
  }


let isDesceuForum = false;

function functionDescerForum() {
  const escondidoForum = document.getElementById("escondidoForum");

  if (isDesceuForum) {
    escondidoForum.style.maxHeight = "0px";
    escondidoForum.style.paddingTop = "0px";
    escondidoForum.style.paddingBottom = "0px";
  } else {
    escondidoForum.style.maxHeight = escondidoForum.scrollHeight + "px";
    escondidoForum.style.paddingTop = "0.5rem";
    escondidoForum.style.paddingBottom = "0.5rem";
  }

  isDesceuForum = !isDesceuForum;
}



  function mascara(preco) {
    let valor = preco.value.replace(/\D/g, "");

  if (valor.length > 11) valor = valor.slice(0, 11);

  // Formata para centavos e separadores
  valor = (Number(valor) / 100).toFixed(2).replace('.', ',');

  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  preco.value = 'R$ ' + valor;
  }


  let isDesceuConfiguracoes = false;

function functionDescerConfiguracoes() {
  const content = document.getElementById("escondidoConfiguracoes");
  const botao = document.getElementById("botaoConfiguracoes");

  if (isDesceuConfiguracoes) {
    content.classList.remove("max-h-40");
    content.classList.add("max-h-0");
    botao.classList.remove("bg-[#6F23D9]", "text-white");
    botao.classList.add("bg-white", "text-black");
  } else {
    content.classList.remove("max-h-0");
    content.classList.add("max-h-40");
    botao.classList.remove("bg-white", "text-black");
    botao.classList.add("bg-[#6F23D9]", "text-[#6F23D9]");
    botao.classList.remove("hover:bg-gray-50");
  }

  isDesceuConfiguracoes = !isDesceuConfiguracoes;
}

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/trevo-project/public/api/logado');
    const data = await response.json();

    if (data.sucesso && data.user) {
      const authDiv = document.getElementById('auth-buttons');
      const dadosPessoa = data.user;
      
      const isModerador = dadosPessoa.admin;
      

      
      authDiv.innerHTML = `
        <a href="/trevo-project/public/perfil" class="w-10 h-10 rounded-full bg-[#6F23D9] text-white flex items-center justify-center hover:bg-[#4f179c] transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5.121 17.804A11.954 11.954 0 0112 15c2.21 0 4.254.636 5.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </a>
      `;

      
      if (isModerador) {
        const denunciaButton = document.createElement('a');
        denunciaButton.href = '/trevo-project/public/denuncia';
        denunciaButton.className = 'w-10 h-10 rounded-full bg-[#D92323] text-white flex items-center justify-center hover:bg-[#a31919] transition-all ml-2';
        denunciaButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
          </svg>
        `;
        authDiv.appendChild(denunciaButton);
      }
    }
  } catch (error) {
    console.error("Erro ao verificar sessão:", error);
  }
});





// document.getElementById('btn-criar-forum').addEventListener('click', function () {
//         document.getElementById('modal-criar-forum').classList.remove('hidden');
//       });

//       function fecharModal() {
//         document.getElementById('modal-criar-forum').classList.add('hidden');
//       }

//       document.getElementById('form-criar-forum').addEventListener('submit', function (e) {
//         e.preventDefault();

//         const titulo = document.getElementById('titulo').value;
//         const descricao = document.getElementById('descricao').value;
//         const tema = document.getElementById('tema').value;

//         // Substitua com chamada para API se necessário
//         console.log({ titulo, descricao, tema });

//         fecharModal();
//       });

