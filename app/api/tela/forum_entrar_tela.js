window.onload = async function () {
  if (document.getElementById("posts-container")) {
    const resultPerfil = await requisitar('GET', '/trevo-project/public/api/perfil');
    await requisitar("GET", "/trevo-project/public/api/forum/getforum").then(
      (result) => {
        if (result.erro) {
          console.error("Erro:", result.erro);
          alert("Ocorreu um erro ao buscar os anúncios. Tente novamente.");
        } else {
          const container = document.getElementById('posts-container');
          const dadosPessoa = resultPerfil.dados.users;
          
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
          cardsContainer.className = "flex flex-col gap-4";
          cardsContainer.id = "forums-container";

          if (result.dados.sucesso && result.dados.result) {
            result.dados.result.forEach((forum) => {
              const card = document.createElement("div");
              card.className =
                "bg-white border-l-4 border-purple-500 rounded-xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition";
              card.setAttribute(
                "data-search",
                `${forum.for_titulo.toLowerCase()} ${forum.for_descricao.toLowerCase()}`
              );

              const conteudo = document.createElement("div");
              conteudo.className = "flex-1 space-y-1";

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
              botao.onclick = () => {
                window.location.href = `/trevo-project/public/api/forum/entrarforum?id=${forum.for_id}`;
              };

              conteudo.appendChild(titulo);
              conteudo.appendChild(descricao);  
              conteudo.appendChild(tema);
              conteudo.appendChild(info);

              card.appendChild(conteudo);
              card.appendChild(botao);

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
        }
      }
    );
  }
};
