window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"), 10);
  const forumId = urlParams.get("idfr");

  const resultPosts = await requisitar(
    "GET",
    `/trevo-project/public/api/post/getforumposts?id=${forumId}`
  );
  const comentarios = await requisitar(
    "GET",
    `/trevo-project/public/api/comentario/getpostcomentarios?id=${postId}`
  );

  const comentList = comentarios.dados.result;

  const postList = resultPosts.dados.result;
  const post = postList.find((p) => p.pos_id === postId);

  const main = document.querySelector("main");
  main.className = "bg-gray-50 min-h-screen py-10";

  const container = document.createElement("div");
  container.className =
    "max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8";

  const btnVoltar = document.createElement("button");
  btnVoltar.className =
    "text-purple-600 hover:text-purple-800 transition font-semibold flex items-center gap-1";
  btnVoltar.onclick = () => history.back();
  btnVoltar.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    Voltar
  `;
  container.appendChild(btnVoltar);

  const postOriginal = document.createElement("div");
  postOriginal.className =
    "bg-purple-50 border border-purple-200 p-5 rounded-xl shadow-sm";

  const nomeUsuarioPost = document.createElement("div");
  nomeUsuarioPost.className = "text-sm text-purple-700 font-semibold mb-1";
  nomeUsuarioPost.textContent = post ? post.user_nome : "Usuário desconhecido";

  const textoPost = document.createElement("div");
  textoPost.className = "text-gray-800 text-base";
  textoPost.textContent = post
    ? post.pos_texto
    : "Texto do post não encontrado.";

  postOriginal.appendChild(nomeUsuarioPost);
  postOriginal.appendChild(textoPost);
  container.appendChild(postOriginal);

  const comentariosBox = document.createElement("div");
  comentariosBox.className = "space-y-4 border-t pt-6";

  const tituloComentarios = document.createElement("h3");
  tituloComentarios.textContent = "Comentários";
  tituloComentarios.className = "text-lg font-semibold text-gray-800 mb-2";
  comentariosBox.appendChild(tituloComentarios);

  if (!comentList) {
  } else {
    comentList.forEach((coment) => {
      const comentario = document.createElement("div");
      comentario.className =
        "bg-gray-100 p-3 rounded-md shadow-sm flex justify-between items-start";

      const conteudo = document.createElement("div");

      const nomeEl = document.createElement("div");
      nomeEl.className = "font-semibold text-sm text-gray-700 mb-1";
      nomeEl.textContent = coment.user_nome;

      const textoEl = document.createElement("div");
      textoEl.className = "text-gray-800 text-sm";
      textoEl.textContent = coment.com_comentario;

      conteudo.appendChild(nomeEl);
      conteudo.appendChild(textoEl);
      comentario.appendChild(conteudo);

      const btns = document.createElement("div");

      const btnDeletar = document.createElement("button");
      btnDeletar.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zM3.042 3.5l.846 10.58a1 1 0 0 0 .997.92h6.23a1 1 0 0 0 .997-.92L12.958 3.5H3.042zM5.513 4.5a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 1 1-.998.06L5.513 4.5zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
      </svg>
      `;

      btnDeletar.className = "ml-4 mt-1";
      btnDeletar.onclick = () => {
        Swal.fire({
          title: "Você tem certeza?",
          text: "Você não poderá reverter isso!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, deletar!",
          cancelButtonText: "Cancelar",
        }).then(async (res) => {
          if (res.isConfirmed) {
            try {
              const resposta = await requisitar(
                "GET",
                "/trevo-project/public/api/comentario/deletar",
                { id: coment.com_id }
              );
              console.log(resposta);
              if (resposta.sucesso) {
                Swal.fire({
                  icon: "error",
                  title: "Erro",
                  text:
                    resposta.mensagem ||
                    "Não foi possível deletar seu comentario.",
                });
              } else {
                Swal.fire({
                  icon: "success",
                  title: "Comentário deletado!",
                  text: "Seu comentario foi removido com sucesso.",
                  confirmButtonColor: "#6F23D9",
                }).then(() => {
                  window.location.reload();
                });
              }
            } catch (erro) {
              console.error("Erro ao deletar comentario:", erro);
              Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Erro ao deletar seu comentario.",
              });
            }
          }
        });
      };

      const btnEditar = document.createElement("button");
      btnEditar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12q" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
      </svg>
      `;

      btnEditar.onclick = () => {
        Swal.fire({
          title: "Editar comentário",
          html: `
            <form id="alterarnome-comentario">
              <input type="text" name="comentario" id="comentario" class="swal2-input" placeholder="Novo comentario">
              <input
                      name="id"
                      value="${coment.com_id}"
                      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 hidden"
                    />
            </form>
          `,
          showCancelButton: true,
          confirmButtonText: "Salvar",
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#6F23D9",
          preConfirm: () => {
            const nome = Swal.getPopup().querySelector("#comentario").value;
            if (!nome)
              Swal.showValidationMessage("Por favor, preencha o campo");
          },
        }).then(async (res) => {
          if (res.isConfirmed) {
            handleSubmitComentario();
          }
        });
      };

      btns.appendChild(btnEditar);
      btns.appendChild(btnDeletar);
      comentario.appendChild(btns);
      comentariosBox.appendChild(comentario);

      container.appendChild(comentariosBox);
    });
  }

  const form = document.createElement("form");
  form.className = "pt-6 border-t border-gray-200 flex flex-col gap-3";

  // const inputComentario = document.createElement("input");
  // inputComentario.type = "text";
  // inputComentario.name = "comentario";
  // inputComentario.placeholder = "Escreva um comentário...";
  // inputComentario.required = true;
  // inputComentario.className =
  //   "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300";

  const botaoComentar = document.createElement("button");
  botaoComentar.type = "submit";
  botaoComentar.className =
    "bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium shadow transition w-fit";
  botaoComentar.textContent = "Comentar";

  form.innerHTML = `
                    <input
                      type="text"
                      name="comentario"
                      autocomplete="off"
                      placeholder="Digite seu comentario..."
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                    <input
                      name="id"
                      value="${post.pos_id}"
                      class="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-300 hidden"
                    />
                  `;

  form.onsubmit = function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData.get("comentario"));
    console.log(formData.get("id"));

    requisitar(
      "POST",
      "/trevo-project/public/api/comentario/criar",
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
              window.location.href = "/trevo-project/public/forum";
            },
          });
        } else {
          alert(result.dados.message);
        }
      }
    });
  };

  // form.appendChild(inputComentario);
  form.appendChild(botaoComentar);
  container.appendChild(form);

  main.appendChild(container);
};
