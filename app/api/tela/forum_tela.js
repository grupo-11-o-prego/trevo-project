window.onload = async function () {
  if (document.getElementById("posts-container")) {
    await requisitar("GET", "/trevo-project/public/api/forum/getuserforuns").then(
      (result) => {
        if (result.erro) {
          console.error("Erro:", result.erro);
          alert("Ocorreu um erro ao buscar os anúncios. Tente novamente.");
        } else {
          console.log(result.dados.sucesso);
          console.log(result.dados.result);
          if (result.dados.sucesso) {
            const forumList = result.dados.result;
            console.log(forumList);

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
            botaoEntrar.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
              <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
            </svg>`;
            botaoEntrar.textContent = `Entrar Forum`;
            botaoEntrar.onclick = () => {
              window.location.href = '/trevo-project/public/forum-entrar'
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
            mensagens.appendChild(tituloMensagens);

            const listaMensagens = document.createElement("div");
            listaMensagens.id = "chat-messages";
            listaMensagens.className = "flex-1 overflow-y-auto space-y-4 pr-2";
            mensagens.appendChild(listaMensagens);

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
              <button type="submit" class="bg-[#6F23D9] text-white px-4 py-2 rounded-lg hover:bg-[#5515b3] transition cursor-pointer">
                Enviar
              </button>
            `;
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

            let currentForum = null;
            const forumChats = {};

            const messagesEl = document.getElementById("chat-messages");
            const input = document.getElementById("chat-input");
            const titleEl = document.getElementById("chat-title");

            function renderMessages(forumId) {
              messagesEl.innerHTML = "";
              (forumChats[forumId] || []).forEach(({ user, text }) => {
                messagesEl.innerHTML += `
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 bg-blue-200 text-blue-700 rounded-full flex items-center justify-center font-bold">${user.charAt(
                      0
                    )}</div>
                    <div>
                      <div class="font-semibold text-sm text-gray-700">${user}</div>
                      <div class="bg-gray-100 p-3 rounded-lg text-sm text-gray-800 max-w-md">${text}</div>
                    </div>
                  </div>
                `;
              });
              messagesEl.scrollTop = messagesEl.scrollHeight;
            }

            document.querySelectorAll(".forum-item").forEach((item) => {
              item.addEventListener("click", () => {
                currentForum = item.dataset.id;
                titleEl.textContent = item.dataset.name;

                document
                  .querySelectorAll(".forum-item")
                  .forEach((f) =>
                    f.classList.remove(
                      "bg-purple-100",
                      "text-purple-800",
                      "font-semibold"
                    )
                  );
                item.classList.add(
                  "bg-purple-100",
                  "text-purple-800",
                  "font-semibold"
                );

                renderMessages(currentForum);
              });
            });

            form.addEventListener("submit", (e) => {
              e.preventDefault();
              const text = input.value.trim();
              if (!text || !currentForum) return;

              const newMsg = { user: "Você", text };
              forumChats[currentForum] = forumChats[currentForum] || [];
              forumChats[currentForum].push(newMsg);

              renderMessages(currentForum);
              input.value = "";
            });

            renderMessages(currentForum);
          } else {
            
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
