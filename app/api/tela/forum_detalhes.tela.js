window.onload = async function () {
  const container = document.getElementById('forum-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const forumId = urlParams.get('id');

  if (!forumId) {
    alert('Fórum não encontrado');
    return;
  }

  try {
    const result = await requisitar('GET', '/trevo-project/public/api/forum/getforum');
    const resultPerfil = await requisitar('GET', '/trevo-project/public/api/perfil');

    if (result.erro) {
      console.error('Erro:', result.erro);
      alert('Ocorreu um erro ao buscar o fórum.');
      return;
    }

    const foruns = result.dados.result;
    const dadosPessoa = resultPerfil.dados.users;

    console.log("Forum:");
    console.log(foruns);

    const forum = foruns.find(f => f.for_id == forumId);

    if (!forum) {
      container.innerHTML = '<p class="text-center text-red-500 mt-6">Fórum não encontrado.</p>';
      return;
    }

    //Verificando se o usuário logado é o dono do fórum
    let isOwner = false;
    if (forum.for_criador_user_id == dadosPessoa.user_id || dadosPessoa.user_moderador == 1) {
      isOwner = true;
    }

    console.log("Forum:");
    console.log(forum);

    console.log(isOwner);

    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6';

    const header = document.createElement('div');
    header.className = 'flex justify-between items-center';

    const nomeContainer = document.createElement('div');
    nomeContainer.className = 'flex items-center gap-6';

    const iconeForum = document.createElement('div');
    iconeForum.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"
        class="w-16 h-16 text-purple-500 bg-purple-100 rounded-full p-3">
        <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zM5 7h6v2H5z"/>
      </svg>
    `;

    const nome = document.createElement('h2');
    nome.className = 'text-3xl font-semibold text-gray-800';
    nome.textContent = forum.for_titulo;

    nomeContainer.appendChild(iconeForum);
    nomeContainer.appendChild(nome);
    header.appendChild(nomeContainer);

    card.appendChild(header);

    const fields = document.createElement('div');
    fields.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';

    const criarCampo = (label, valor, campo) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'flex justify-between items-center border-b border-gray-200 py-2';

      const textContainer = document.createElement('div');

      const labelEl = document.createElement('p');
      labelEl.className = 'text-xs text-gray-500';
      labelEl.textContent = label;

      const valorEl = document.createElement('p');
      valorEl.className = 'text-base text-gray-800';
      valorEl.textContent = valor;

      textContainer.appendChild(labelEl);
      textContainer.appendChild(valorEl);

      if (isOwner && campo !== 'forum_proprietario') {
        const btn = document.createElement('button');
        btn.className = 'text-gray-400 hover:text-purple-600 transition cursor-pointer p-1';
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15.232 5.232l3.536 3.536M9 11l6.364-6.364a1.5 1.5 0 112.121 2.121L11.121 13.5H9v-2.5z"/>
          </svg>
        `;

        btn.onclick = () => {
          let inputHTML = '';

          if (campo === 'forum_titulo') {
            inputHTML = `
              <form id="alterartitulo-form">
                <input type="number" name="id" id="id" class="hidden" value="${forum.for_id}">
                <input type="text" name="titulo" id="titulo" class="swal2-input" placeholder="Novo título">
              </form>
            `;
          } else if (campo === 'forum_tema') {
            inputHTML = `
              <form id="alterartema-form">
                <input type="number" name="id" id="id" class="hidden" value="${forum.for_id}">
                <input type="text" name="tema" id="tema" class="swal2-input" placeholder="Novo tema">
              </form>
            `;
          } else if (campo === 'forum_descricao') {
            inputHTML = `
              <form id="alterardescricao-form">
                <input type="number" name="id" id="id" class="hidden" value="${forum.for_id}">
                <input type="tel" name="descricao" id="descricao" class="swal2-input" placeholder="Nova descrição">
              </form>
            `;
          }

          Swal.fire({
            title: `Editar ${label}`,
            html: inputHTML,
            showCancelButton: true,
            confirmButtonText: 'Salvar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#6F23D9',
            preConfirm: () => {
              if (campo === 'forum_titulo') {
                const titulo = Swal.getPopup().querySelector('#titulo').value;
                if (!titulo) Swal.showValidationMessage('Por favor, preencha o campo');
                return { titulo };
              } else if (campo === 'forum_tema') {
                const tema = Swal.getPopup().querySelector('#tema').value;
                if (!tema) Swal.showValidationMessage('Por favor, preencha o campo');
                return { tema };
              } else if (campo === 'forum_descricao') {
                const descricao = Swal.getPopup().querySelector('#descricao').value;
                if (!descricao) Swal.showValidationMessage('Por favor, preencha o campo');
                return { descricao };
              }
            }
          }).then((res) => {
            if (res.isConfirmed) {
              if (campo == 'forum_titulo') handleSubmitForTitulo();
              else if (campo == 'forum_tema') handleSubmitForTema();
              else if (campo == 'forum_descricao') handleSubmitForDescricao();
            }
          });
        };

        wrapper.appendChild(textContainer);
        wrapper.appendChild(btn);
      } else {
        wrapper.appendChild(textContainer);
      }

      return wrapper;
    };

    fields.appendChild(criarCampo('Título', forum.for_titulo, 'forum_titulo'));
    fields.appendChild(criarCampo('Tema', forum.for_tema, 'forum_tema'));
    fields.appendChild(criarCampo('Descrição', forum.for_descricao, 'forum_descricao'));
    fields.appendChild(criarCampo('Proprietário', forum.user_nome, 'forum_proprietario'));

    card.appendChild(fields);

    if (isOwner) {
      const acoesExtras = document.createElement('div');
      acoesExtras.className = 'flex gap-4 mt-6';

      const btnDeletarForum = document.createElement('button');
      btnDeletarForum.textContent = 'Deletar Fórum';
      btnDeletarForum.className = 'bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 rounded-lg transition duration-300 cursor-pointer';

      btnDeletarForum.onclick = () => {
        Swal.fire({
          title: "Você tem certeza?",
          text: "Essa ação não pode ser revertida!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, deletar!",
          cancelButtonText: 'Cancelar',
        }).then( async (res) => {
          if (res.isConfirmed) {
            try {
              const resposta = await requisitar('GET', '/trevo-project/public/api/forum/deletarforum', { id: forum.for_id });
              console.log(resposta);
              if (resposta.sucesso) {
                Swal.fire({
                  icon: 'error',
                  title: 'Erro',
                  text: resposta.mensagem || 'Não foi possível deletar o fórum.',
                });
              } else {
                Swal.fire({
                  icon: 'success',
                  title: 'Fórum deletada!',
                  confirmButtonColor: '#6F23D9'
                }).then(() => {
                  window.location.href = '/trevo-project/public/forum-entrar';
                });
              }
            } catch (erro) {
              console.error('Erro ao deletar fórum:', erro);
              Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao deletar o fórum.',
              });
            }
          }
        });
      };

      acoesExtras.appendChild(btnDeletarForum);
      card.appendChild(acoesExtras);
    }

    container.appendChild(card);
  } catch (e) {
    console.error('Erro ao carregar o anúncio:', e);
    alert('Erro inesperado ao carregar o anúncio.');
  }
};
