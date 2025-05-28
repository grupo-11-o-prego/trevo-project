window.onload = async function () {
  if (document.getElementById("posts-container")) {
    await requisitar("GET", "/trevo-project/public/api/forum/getuserforuns").then(
      (result) => {
        if (result.erro) {
          console.error("Erro:", result.erro);
          alert("Ocorreu um erro ao buscar os anúncios. Tente novamente.");
        } else {
          if (result.dados.sucesso) {
            const forumList = result.dados.result;

            const main = document.querySelector("main");
            main.innerHTML = "";

            const header = document.createElement("div");
            header.className = "flex items-center justify-between mb-6";

            const titulo = document.createElement("div");
            titulo.className = "text-2xl font-semibold text-gray-800";
            titulo.textContent = "Fórum de Discussão";

            const divBtns = document.createElement("div");
            divBtns.className = "flex justify-between items-center w-xs";

            const botaoCriar = document.createElement("button");
            botaoCriar.id = "btn-criar-forum";
            botaoCriar.className =
              "bg-[#6F23D9] text-white px-4 py-2 rounded-lg hover:bg-[#4f179c] transition font-medium shadow cursor-pointer";
            botaoCriar.textContent = "+ Criar Fórum";
            botaoCriar.onclick = () => {
              const modal = document.getElementById("modal-criar-forum");
              if (modal) modal.classList.remove("hidden");
            };

            const botaoEntrar = document.createElement("button");
            botaoEntrar.id = "btn-entrar-forum";
            botaoEntrar.className =
              "bg-[#6F23D9] text-white px-4 py-2 rounded-lg hover:bg-[#4f179c] transition font-medium shadow cursor-pointer";
            botaoEntrar.textContent = "Entrar Fórum";
            botaoEntrar.onclick = () => {
              window.location.href = "/trevo-project/public/forum-entrar";
            };

            header.appendChild(titulo);
            header.appendChild(divBtns);
            divBtns.appendChild(botaoCriar);
            divBtns.appendChild(botaoEntrar);
            main.appendChild(header);

            const container = document.createElement("div");
            container.className = "flex gap-6 h-[70vh]";

            const mensagens = document.createElement("div");
            mensagens.className =
              "flex flex-col flex-1 bg-white rounded-xl shadow-md overflow-hidden p-4";

            const tituloMensagens = document.createElement("div");
            tituloMensagens.id = "chat-title";
            tituloMensagens.className =
              "text-xl font-semibold text-purple-700 mb-4";
            tituloMensagens.textContent = "Selecione um fórum";

            const listaMensagens = document.createElement("div");
            listaMensagens.id = "chat-messages";
            listaMensagens.className = "flex-1 overflow-y-auto space-y-4 pr-2";
            listaMensagens.innerHTML = `
              <div class="border-b border-gray-200 pb-6 mb-6">
                <div class="flex items-start gap-4">
                  <img src="https://ui-avatars.com/api/?name=Joao&background=6F23D9&color=fff" alt="João" class="w-12 h-12 rounded-full shadow" />
                  <div class="flex-1">
                    <div class="flex justify-between items-center">
                      <span class="font-semibold text-gray-900 text-base">João</span>
                    </div>
                    <p class="text-gray-800 text-sm mt-1 leading-relaxed">
                      Olá pessoal! Alguém já teve problemas com o carregamento de anúncios no fórum?
                    </p>
                    <div class="flex gap-6 text-gray-400 text-sm mt-3">
                      <div class="flex items-center gap-1 hover:text-purple-600 cursor-pointer transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                          <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                        </svg>
                        Comentar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;


            const form = document.createElement("form");
            form.id = "chat-form";
            form.className = "mt-4 border-t pt-4 flex items-center gap-4";
            form.innerHTML = `
              <input
                id="chat-input"
                type="text"
                placeholder="Digite sua mensagem..."
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button type="submit" class="bg-[#6F23D9] text-white px-4 py-2 rounded-lg cursor-pointer">
                Enviar
              </button>
            `;

            mensagens.appendChild(tituloMensagens);
            mensagens.appendChild(listaMensagens);
            mensagens.appendChild(form);
            container.appendChild(mensagens);

            const aside = document.createElement("aside");
            aside.className =
              "w-80 bg-white rounded-xl shadow-md p-4 flex flex-col gap-4";

            const inputPesquisa = document.createElement("input");
            inputPesquisa.type = "text";
            inputPesquisa.placeholder = "Pesquisar fóruns...";
            inputPesquisa.id = "pesquisa";
            inputPesquisa.className =
              "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300";
            aside.appendChild(inputPesquisa);

            const lista = document.createElement("ul");
            lista.id = "forum-list";
            lista.className = "space-y-3";

            if (forumList) {
              forumList.forEach((f) => {
                const item = document.createElement("li");
                const tituloForum = f.for_titulo || "Fórum sem título";

                item.setAttribute("data-search", tituloForum.toLowerCase());
                item.dataset.id = `forum-${f.for_id}`;
                item.dataset.name = tituloForum;
                item.className =
                  "forum-item p-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-purple-200 cursor-pointer transition";

                const h3 = document.createElement("h3");
                h3.className = "font-semibold";
                h3.textContent = tituloForum;

                const p = document.createElement("p");
                p.className = "text-sm text-gray-600";
                p.textContent = f.for_descricao || "Sem descrição disponível.";

                item.appendChild(h3);
                item.appendChild(p);
                lista.appendChild(item);
              });
            } else {
              const p = document.createElement("p");
              p.className = "text-sm text-gray-500 font-semibold text-center";
              p.textContent = "Entre em um fórum para poder ver seus posts.";
              lista.appendChild(p);
            }

            aside.appendChild(lista);
            container.appendChild(aside);
            main.appendChild(container);
          }
        }
      }
    );
  }

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
