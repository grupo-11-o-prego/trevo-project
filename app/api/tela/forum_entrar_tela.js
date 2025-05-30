window.onload = async function () {
  const container = document.getElementById("posts-container");

  const resultPerfil = await requisitar(
    "GET",
    "/trevo-project/public/api/perfil"
  );
  const resultForum = await requisitar(
    "GET",
    "/trevo-project/public/api/forum/getforum"
  );

  const dadosUsuarios = resultPerfil.dados.users;
  const forumList = resultForum.dados.result;

  const searchDiv = document.createElement("div");
  searchDiv.className = "w-full";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "pesquisa";
  input.placeholder = " Pesquisar fóruns...";
  input.className =
    "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder:text-gray-400";

  searchDiv.appendChild(input);
  container.appendChild(searchDiv);

  const cardsContainer = document.createElement("div");
  cardsContainer.className = "flex flex-col gap-4 ";
  cardsContainer.id = "forums-container";

  if (forumList.length > 0) {
    forumList.forEach((forum) => {
      const card = document.createElement("div");
      card.className =
        "bg-white border-l-4 border-purple-500 rounded-xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition hover:bg-gray-200 cursor-pointer";
      card.setAttribute(
        "data-search",
        `${forum.for_titulo.toLowerCase()} ${forum.for_descricao.toLowerCase()} ${forum.for_tema.toLowerCase()}`
      );

      const conteudo = document.createElement("div");
      conteudo.className = "flex-1 space-y-1";
      conteudo.onclick = async () => {
        const forumId = forum.for_id;

        const membrosResult = await requisitar(
          "GET",
          `/trevo-project/public/api/forum/getmembros?id=${forumId}`
        );

        const membrosForum = membrosResult.dados.result;

        const divInfo = document.createElement("div");
        divInfo.id = "modal-info-forum";
        divInfo.className =
          "fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50";

        const modal = document.createElement("div");
        modal.className =
          "bg-white rounded-xl shadow-2xl w-full max-w-md text-white font-sans relative flex flex-col max-h-[90vh]";

        const btnFechar = document.createElement("button");
        btnFechar.className =
          "absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl cursor-pointer";
        btnFechar.innerHTML = '<i class="fas fa-times"></i>';
        btnFechar.onclick = () => divInfo.remove();
        modal.appendChild(btnFechar);

        const topo = document.createElement("div");
        topo.className = "flex flex-col items-center py-6";

        const svg = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        svg.setAttribute(
          "class",
          "w-20 h-20 text-white bg-gray-800 p-4 rounded-full shadow"
        );
        svg.setAttribute("fill", "none");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "1.5");

        svg.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          `;

        topo.appendChild(svg);

        const titulo = document.createElement("h1");
        titulo.className = "text-xl font-semibold mt-4 text-gray-900";
        titulo.textContent = forum.for_titulo;
        topo.appendChild(titulo);

        const subtitulo = document.createElement("p");
        subtitulo.className = "text-gray-900 text-sm";
        subtitulo.textContent = `Grupo · ${membrosForum.length} membros`;
        topo.appendChild(subtitulo);

        modal.appendChild(topo);

        const listaWrapper = document.createElement("div");
        listaWrapper.className = "overflow-y-auto px-6 pb-4 space-y-4 flex-1";

        const membrosCont = membrosResult.result;

        console.log("Quantidade de membros:", membrosForum.length);

        if (membrosForum.length == 14) {
          const aviso = document.createElement("p");
          aviso.className = "text-center text-gray-500 py-4";
          aviso.textContent = "Este fórum ainda não possui membros.";
          subtitulo.textContent = `Grupo · 0 membros`;

          listaWrapper.appendChild(aviso);
        } else {
          membrosForum.forEach(async (membro) => {
            const membrosLista = await requisitar(
              "GET",
              `/trevo-project/public/api/getuser?id${membro.foruser_user_id}`
            );

            const membrosArray = membrosLista.dados.result;
            const membroInfo = membrosArray.find(
              (u) => u.user_id === membro.foruser_user_id
            );

            const item = document.createElement("div");
            item.className =
              "flex justify-between items-center bg-gray-100 rounded-lg p-3 text-gray-900 border-l-4 border-purple-500";

            const nome = document.createElement("p");
            nome.className = "font-medium";
            nome.textContent = membroInfo.user_nome;

            item.appendChild(nome);

            if (membro.foruser_user_id === forum.for_criador_user_id) {
              const status = document.createElement("span");
              status.className =
                "text-white bg-indigo-600 text-xs px-2 py-1 rounded";
              status.textContent = "Proprietário";
              item.appendChild(status);
            }

            listaWrapper.appendChild(item);
          });
        }

        modal.appendChild(listaWrapper);

        const acoes = document.createElement("div");
        acoes.className = "border-t border-gray-700 pt-4 px-6 space-y-3";

        // const sair = document.createElement("button");
        // sair.className =
        //   "flex items-center gap-3 text-red-500 hover:text-red-400 w-full cursor-pointer p-2";
        // sair.innerHTML =
        //   '<i class="fas fa-sign-out-alt"></i><span>Sair do fórum</span>';
        // sair.onclick = () => {
        //   alert("Você saiu do fórum.");
        //   divInfo.remove();
        // };
        // acoes.appendChild(sair);

        const denunciar = document.createElement("button");
        denunciar.className =
          "flex items-center gap-3 text-red-500 hover:text-red-400 w-full cursor-pointer p-2";
        denunciar.innerHTML =
          '<i class="fas fa-flag"></i><span>Denunciar fórum</span>';
        denunciar.onclick = () => {
          alert("Grupo denunciado.");
        };
        acoes.appendChild(denunciar);

        modal.appendChild(acoes);

        divInfo.appendChild(modal);
        document.body.appendChild(divInfo);
      };

      const titulo = document.createElement("h3");
      titulo.className =
        "text-xl font-semibold text-purple-700 flex items-center gap-2";
      titulo.innerHTML = `<i class="fa-solid fa-comments text-purple-500"></i> ${forum.for_titulo}`;

      const descricao = document.createElement("p");
      descricao.className = "text-sm text-gray-600";
      descricao.textContent = forum.for_descricao;

      const tema = document.createElement("p");
      tema.className = "text-sm text-gray-600 font-medium";
      tema.innerHTML = `<i class="fa-solid fa-tag mr-1"></i>Tema: ${forum.for_tema}`;

      const info = document.createElement("div");
      info.className = "flex gap-4 text-xs text-gray-500";
      info.innerHTML = `
          <span><i class="fa-solid fa-user text-gray-400 mr-1"></i>Theo</span>
          <span><i class="fa-solid fa-calendar-days text-gray-400 mr-1"></i>20/08/2025</span>
        `;

      const botao = document.createElement("button");
      botao.className =
        "mt-4 sm:mt-0 sm:ml-6 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md transition text-sm font-medium cursor-pointer";
      botao.textContent = "Entrar no Fórum";
      botao.onclick = async () => {
        try {
          const result = await requisitar(
            "GET",
            `/trevo-project/public/api/forum/entrarforum?id=${forum.for_id}`
          );

          if (result.erro) {
            alert("Erro ao entrar no fórum.");
            console.error(result.erro);
          } else if (result.dados.sucesso) {
            window.location.href = "/trevo-project/public/forum";
          } else {
            alert(result.dados.message || "Não foi possível entrar no fórum.");
          }
        } catch (e) {
          console.error("Erro ao fazer requisição:", e);
          alert("Erro inesperado ao entrar no fórum.");
        }
      };

      const opcoes = document.createElement("button");
      opcoes.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
        </svg>
      `;
      opcoes.className = "hover:bg-gray-100 p-1 rounded-full cursor-pointer";

      const menu = document.createElement("div");
      menu.className =
        "hidden absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-10";
      menu.innerHTML = `
                      <ul class="text-sm text-gray-700">
                
                        <li class="flex items-center hover:text-red-500 px-4 py-2 hover:bg-gray-100 cursor-pointer" id="denunciar">
                          Denunciar
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                            <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                            <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                          </svg>
                        </li>
                      </ul>
                    `;
      menu.querySelector("#denunciar").addEventListener("click", () => {
         Swal.fire({
            title: "Você deseja denunciar o fórum?",
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6F23D9",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, denunciar!",
            cancelButtonText: 'Cancelar',
          }).then(async (res) => {
            if (res.isConfirmed) {
            
              window.location.href = `/trevo-project/public/api/denuncia/denunciar`;
            }
          });
      });

      const container = document.createElement("div");
      container.className = "relative inline-block";
      container.appendChild(opcoes);
      container.appendChild(menu);

      opcoes.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("hidden");
      });

      document.addEventListener("click", () => {
        menu.classList.add("hidden");
      });

      
      conteudo.appendChild(titulo);
      conteudo.appendChild(descricao);
      conteudo.appendChild(tema);
      conteudo.appendChild(info);
      
      card.appendChild(conteudo);
      card.appendChild(botao);
      card.appendChild(container);

      cardsContainer.appendChild(card);
    });
  } else {
    const vazio = document.createElement("p");
    vazio.className = "text-center text-gray-500";
    vazio.textContent = "Nenhum fórum encontrado.";
    cardsContainer.appendChild(vazio);
  }

  container.appendChild(cardsContainer);

  document.addEventListener("keyup", (e) => {
    if (e.target && e.target.id === "pesquisa") {
      const termo = e.target.value.toLowerCase();
      const cards = document.querySelectorAll("[data-search]");

      cards.forEach((card) => {
        const texto = card.getAttribute("data-search");
        card.style.display = texto.includes(termo) ? "block" : "none";
      });
    }
  });
};
