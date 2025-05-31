window.onload = async function () {
  if (document.getElementById("posts-container")) {
    const resultPerfil = await requisitar(
      "GET",
      "/trevo-project/public/api/perfil"
    );
    await requisitar(
      "GET",
      "/trevo-project/public/api/forum/getuserforuns"
    ).then((result) => {
      if (result.erro) {
        console.error("Erro:", result.erro);
        alert("Ocorreu um erro ao buscar os anúncios. Tente novamente.");
      } else {
        if (result.dados.sucesso) {
          const forumList = result.dados.result;
          const dadosUsuarios = resultPerfil.dados.users;

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
            "text-lg font-semibold text-purple-700 mb-4";
          tituloMensagens.textContent = "Selecione um fórum";

          const listaMensagens = document.createElement("div");
          listaMensagens.id = "chat-messages";
          listaMensagens.className =
            "text-lg text-red-300 flex-1 overflow-y-auto space-y-4 pr-2";
          listaMensagens.innerHTML = `
              selecione um forum.
            `;

          const form = document.createElement("form");
          form.id = "post-form";
          form.className = "mt-4 border-t pt-4 flex items-center gap-4";
          form.innerHTML = `
              <input
                id="chat-input"
                type="text"
                name="texto"
                autocomplete="off"
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

            const forumItems = lista.querySelectorAll(".forum-item");
            forumItems.forEach((item) => {
              item.addEventListener("click", async () => {
                const titulo = item.dataset.name;
                const id = item.dataset.id;
                const idForm = id.charAt(id.length - 1);
                console.log(item)

                const resultPosts = await requisitar(
                  "GET",
                  `/trevo-project/public/api/post/getforumposts?id=${idForm}`
                );
                const postList = resultPosts.dados.result;

                const chatTitle = document.getElementById("chat-title");
                if (chatTitle) {
                  chatTitle.innerHTML = "";
                  chatTitle.append(titulo);
                  chatTitle.className =
                    "flex justify-center items-center text-2xl text-center font-semibold text-[#6F23D9]";
                }             

                

                listaMensagens.innerHTML = "";

                if (postList) {
                  postList.forEach((post) => {
                    const mensagemContainer = document.createElement("div");
                    mensagemContainer.className =
                      "border-b border-gray-200 pb-6 mb-6";

                    const mensagemFlex = document.createElement("div");
                    mensagemFlex.className = "flex items-start gap-4";

                    const nomeUsuario = post.user_nome || "Usuário";
                    const iniciais = nomeUsuario
                      .split(" ")
                      .map((n) => n.charAt(0).toUpperCase())
                      .slice(0, 2)
                      .join("");

                    const avatar = document.createElement("img");
                    avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      iniciais
                    )}&background=6F23D9&color=fff`;
                    avatar.alt = nomeUsuario;
                    avatar.className = "w-12 h-12 rounded-full shadow";

                    const conteudo = document.createElement("div");
                    conteudo.className = "flex-1";

                    const headerMensagem = document.createElement("div");
                    headerMensagem.className =
                      "flex justify-between items-center relative";

                    const nome = document.createElement("span");
                    nome.className = "font-semibold text-gray-900 text-base";
                    nome.textContent = nomeUsuario;

                    const opcoes = document.createElement("button");
                    opcoes.innerHTML = `
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                      </svg>
                    `;
                    opcoes.className =
                      "hover:bg-gray-100 p-1 rounded-full cursor-pointer";

                    userid = dadosUsuarios.user_id;

                    const menu = document.createElement("div");
                    menu.className =
                      "hidden absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-10";

                    if (userid == post.pos_user_id) {
                      menu.innerHTML = `
                      <ul class="text-sm text-gray-700">
                        <li class="flex items-center hover:text-purple-600 px-4 py-2 hover:bg-gray-100 cursor-pointer hoe" id="editar">
                          Editar
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                        </svg>
                        </li>
                        <li class="flex items-center hover:text-red-500 px-4 py-2 hover:bg-gray-100 cursor-pointer" id="excluir">
                          Excluir
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                        </li>
                      </ul>
                    `;

                      menu
                        .querySelector("#editar")
                        .addEventListener("click", () => {
                          alert("Editar clicado");
                        });

                      menu
                        .querySelector("#excluir")
                        .addEventListener("click", () => {
                          alert("Excluir clicado");
                        });
                    } else {
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

                      menu
                        .querySelector("#denunciar")
                        .addEventListener("click", () => {
                          swal.fire({
                            title: "Você deseja denunciar este post?",
                            text: "Você não poderá reverter isso!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#6F23D9",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Sim, denunciar!",
                            cancelButtonText: "Cancelar"
                          }).then((result) => {
                            if(result.isConfirmed){
                              window.location.href = `/trevo-project/public/denunciar?tipo=post&id=${post.pos_id}`;
                            }
                          });                 
                        });
                      }

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

                    headerMensagem.appendChild(nome);
                    headerMensagem.appendChild(container);

                    conteudo.appendChild(headerMensagem);

                    mensagemFlex.appendChild(avatar);
                    mensagemFlex.appendChild(conteudo);
                    mensagemContainer.appendChild(mensagemFlex);

                    listaMensagens.appendChild(mensagemContainer);

                    const texto = document.createElement("p");
                    texto.className =
                      "text-gray-800 text-sm mt-1 leading-relaxed";
                    texto.textContent = `${post.pos_texto}`;

                    const acoes = document.createElement("div");
                    acoes.className = "flex gap-6 text-gray-400 text-sm mt-3";

                    const comentar = document.createElement("div");
                    comentar.className =
                      "flex items-center gap-1 hover:text-purple-600 cursor-pointer transition";
                    comentar.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                                </svg>
                  `;
                    comentar.append("Comentar");

                    acoes.appendChild(comentar);
                    conteudo.appendChild(headerMensagem);
                    conteudo.appendChild(texto);
                    conteudo.appendChild(acoes);

                    mensagemFlex.appendChild(avatar);
                    mensagemFlex.appendChild(conteudo);
                    mensagemContainer.appendChild(mensagemFlex);
                    listaMensagens.appendChild(mensagemContainer);
                  });
                } else {
                  listaMensagens.innerHTML = `
                    Ainda não possui postagens nesse fórum.
                  `;
                }

                form.innerHTML = `
                    <input
                      id="chat-input"
                      type="text"
                      name="texto"
                      autocomplete="off"
                      placeholder="Digite sua mensagem..."
                      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                    <input
                      name="id"
                      value="${idForm}"
                      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 hidden"
                    />
                    <button type="submit" class="bg-[#6F23D9] text-white px-4 py-2 rounded-lg cursor-pointer">
                      Enviar
                    </button>
                  `;

                form.onsubmit = function (event) {
                  event.preventDefault();
                  const formData = new FormData(event.target);
                  console.log(formData.get("id"));

                  requisitar(
                    "POST",
                    "/trevo-project/public/api/post/criar",
                    formData,
                    "formdata"
                  ).then((result) => {
                    if (result.erro) {
                      console.error("Erro:", result.erro);
                      alert("Ocorreu um erro ao enviar os dados.");
                    } else {
                      if (result.dados.sucesso) {
                        Swal.fire({
                          icon: "success",
                          showConfirmButton: false,
                          timer: 500,
                          timerProgressBar: true,
                          willClose: () => {
                            window.location.href =
                              "/trevo-project/public/forum";
                          },
                        });
                      } else {
                        alert(result.dados.message);
                      }
                    }
                  });
                };
              });
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
    });
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
