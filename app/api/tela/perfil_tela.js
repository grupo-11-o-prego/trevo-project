window.onload = async function () {
  const container = document.getElementById('posts-container');
  if (!container) return;

  try {
    const result = await requisitar('GET', 'api/perfil');

    if (result.erro) {
      const aviso = document.createElement('div');
      aviso.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mt-8';
      aviso.innerHTML = `
        <strong class="font-bold">Você não está logado.</strong>
        <span class="block sm:inline">
          Por favor, <a href="trevo-project/public/login" class="text-purple-600 underline hover:text-purple-800">faça login</a> para acessar seu perfil.
        </span>
      `;
      container.appendChild(aviso);
      return;
    }

    const post = result.dados.users;
    if (!post) return;

    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6';

    const header = document.createElement('div');
    header.className = 'flex justify-between items-center'; // espaço entre os filhos

    const nomeContainer = document.createElement('div');
    nomeContainer.className = 'flex items-center gap-6';

    const imagem = document.createElement('div');
    imagem.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"
        class="w-24 h-24 text-purple-500 bg-purple-100 rounded-full p-4">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
      </svg>
    `;

    const nome = document.createElement('h2');
    nome.className = 'text-3xl font-semibold text-gray-800';
    nome.textContent = post.user_nome;

    nomeContainer.appendChild(imagem);
    nomeContainer.appendChild(nome);

    header.appendChild(nomeContainer);

    if (post.user_vendedor) {
      const status = document.createElement('span');
      status.className = 'text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium';
      status.textContent = 'Vendedor';
      header.appendChild(status); 
    }

    const fields = document.createElement('div');
    fields.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';

    const criarCampo = (label, valor, campo, tipo = 'text') => {
      const wrapper = document.createElement('div');
      wrapper.className = 'flex justify-between items-center border-b border-gray-200 py-2'; // padding menor

      const textContainer = document.createElement('div');

      const labelEl = document.createElement('p');
      labelEl.className = 'text-xs text-gray-500'; // fonte menor
      labelEl.textContent = label;

      const valorEl = document.createElement('p');
      valorEl.className = 'text-base text-gray-800'; // um pouco menor
      valorEl.textContent = valor;

      textContainer.appendChild(labelEl);
      textContainer.appendChild(valorEl);

      const btn = document.createElement('button');
      btn.className = 'text-gray-400 hover:text-purple-600 transition cursor-pointer p-1'; // ícone menor com menos espaço
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15.232 5.232l3.536 3.536M9 11l6.364-6.364a1.5 1.5 0 112.121 2.121L11.121 13.5H9v-2.5z"/>
        </svg>`;

      btn.onclick = () => {
        let inputHTML = '';

        if (campo === 'user_senha') {
          inputHTML = `
            <form id="alterarsenha-form">
              <input type="password" name="senha_atual" id="senha-atual" class="swal2-input" placeholder="Senha Atual">
              <input type="password" name="senha_nova" id="nova-senha" class="swal2-input" placeholder="Nova Senha">
            </form>
          `;
        } else if (campo === 'user_nome') {
          inputHTML = `
            <form id="alterarnome-form">
              <input type="text" name="nome" id="nome" class="swal2-input" placeholder="Novo nome">
            </form>
          `;
        } else if (campo === 'user_contato') {
          inputHTML = `
            <form id="alterarcontato-form">
              <input type="tel" name="contato" id="contato-novo" class="swal2-input" placeholder="Novo contato">
            </form>
          `;
        } else if (campo === 'user_data_nasc') {
          inputHTML = `
            <form id="alterardata_nasc-form">
              <input type="date" name="data-nasc" id="data_nasc-novo" class="swal2-input">
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
          didOpen: () => {
            const inputContato = Swal.getPopup().querySelector('#contato-novo');
            if (inputContato) {
              inputContato.addEventListener('input', function (e) {
                let v = e.target.value.replace(/\D/g, '');
                if (v.length > 11) v = v.slice(0, 11);
                if (v.length >= 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
                if (v.length >= 9) v = `${v.slice(0, 10)}-${v.slice(10)}`;
                e.target.value = v;
              });
            }
          },
          preConfirm: () => {
            if (campo === 'user_senha') {
              const senhaAtual = Swal.getPopup().querySelector('#senha-atual').value;
              const novaSenha = Swal.getPopup().querySelector('#nova-senha').value;
              if (!senhaAtual || !novaSenha) {
                Swal.showValidationMessage('Por favor, preencha ambos os campos');
              }
              return { senhaAtual, novaSenha };
            } else if (campo === 'user_nome') {
              const nome = Swal.getPopup().querySelector('#nome').value;
              if (!nome) Swal.showValidationMessage('Por favor, preencha o campo');
            } else if (campo === 'user_data_nasc') {
              const data_nasc = Swal.getPopup().querySelector('#data_nasc-novo').value;
              if (!data_nasc) Swal.showValidationMessage('Por favor, preencha o campo');
              return { data_nasc };
            } else if (campo === 'user_contato') {
              const contato = Swal.getPopup().querySelector('#contato-novo').value;
              if (!contato) Swal.showValidationMessage('Por favor, preencha o campo');
              return { contato };
            }
          }
        }).then(async (res) => {
          if (res.isConfirmed) {
            if (campo == 'user_senha') handleSubmitSenha();
            else if (campo == 'user_nome') handleSubmitNome();
            else if (campo == 'user_data_nasc') handleSubmitDataNasc();
            else if (campo == 'user_contato') handleSubmitContato();
          }
        });
      };

      wrapper.appendChild(textContainer);
      wrapper.appendChild(btn);
      return wrapper;
    };

    fields.appendChild(criarCampo('Nome', post.user_nome, 'user_nome'));
    fields.appendChild(criarCampo('Telefone', post.user_contato, 'user_contato'));
    fields.appendChild(criarCampo('Data de Nascimento', post.user_data_nasc, 'user_data_nasc'));
    fields.appendChild(criarCampo('Senha', '********', 'user_senha', 'password'));

    card.appendChild(header);
    card.appendChild(fields);

    const acoesExtras = document.createElement('div');
    acoesExtras.className = 'flex gap-4 mt-6';

    const btnDeletarConta = document.createElement('button');
    btnDeletarConta.textContent = 'Deletar Conta';
    btnDeletarConta.className = 'bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 rounded-lg transition duration-300 cursor-pointer';
    btnDeletarConta.onclick = () => {
      Swal.fire({
          title: "Você tem certeza?",
          text: "Você não poderá reverter isso!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, deletar!",
          cancelButtonText: 'Cancelar',
        }).then(async (res) => {
          if (res.isConfirmed) {
            try {
              const resposta = await requisitar('GET', '/trevo-project/public/api/deleteuser', { id: post.user_id });
              console.log(resposta);
              if (resposta.sucesso) {
                Swal.fire({
                  icon: 'error',
                  title: 'Erro',
                  text: resposta.mensagem || 'Não foi possível deletar sua conta.',
                });
              } else {
                Swal.fire({
                  icon: 'success',
                  title: 'Conta deletada!',
                  text: 'Sua conta foi removida com sucesso.',
                  confirmButtonColor: '#6F23D9'
                }).then(() => {
                  window.location.href = '/trevo-project/public/login';
                });
              }
            } catch (erro) {
              console.error('Erro ao deletar conta:', erro);
              Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao deletar sua conta.',
              });
            }
          }

        });
    }

    if (!post.user_vendedor) {
      const btnVendedor = document.createElement('button');
      btnVendedor.textContent = 'Virar Vendedor';
      btnVendedor.className = 'bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 cursor-pointer';
      btnVendedor.onclick = async () => {
        let inputHTMLcpf = `
          <form id="modo-vendedor-form">
            <input type="text" name="cpf" id="vendedor-cpf" class="swal2-input" placeholder="Digite seu CPF">
          </form>
        `;
        Swal.fire({
          title: 'Tem certeza?',
          html: inputHTMLcpf,
          showCancelButton: true,
          confirmButtonColor: '#6F23D9',
          cancelButtonColor: '#aaa',
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Cancelar',
          preConfirm: () => {
            const cpf = Swal.getPopup().querySelector('#vendedor-cpf').value;
            if (!cpf) {
              Swal.showValidationMessage('Por favor, preencha o campo!');
            }
            return { cpf };
          }
        }).then(async (res) => {
          if (res.isConfirmed) {
            handleSubmitModoVendedor();
            btnVendedor.remove(); 
          }
        });
      };

      acoesExtras.appendChild(btnVendedor);
    }

    acoesExtras.appendChild(btnDeletarConta);
    card.appendChild(acoesExtras);

    const postsSection = document.createElement('div');
    postsSection.className = 'mt-8';
    postsSection.innerHTML = `
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Seus Posts</h3>
      <div id="user-posts" class="grid gap-4">
        <p class="text-gray-500">Você ainda não publicou nada.</p>
      </div>
    `;

    card.appendChild(postsSection);
    container.appendChild(card);

    // Lógica para mostrar anúncios
    try {
      const anunciosResult = await requisitar('GET', '/trevo-project/public/api/anuncio/listar');
      const userPostsContainer = document.getElementById('user-posts');

      if (anunciosResult.dados && anunciosResult.dados.result) {
        const anunciosDoUsuario = anunciosResult.dados.result.filter(anuncio => anuncio.anun_user_id === post.user_id);

        if (anunciosDoUsuario.length > 0) {
          userPostsContainer.innerHTML = '';
          userPostsContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';

          anunciosDoUsuario.forEach(anuncio => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col h-full';

            card.onclick = () => {
              window.location.href = `/trevo-project/public/anuncio-detalhes?id=${anuncio.anun_id}`;
            }

            const imagemDiv = document.createElement('div');
            imagemDiv.className = 'h-44 bg-gradient-to-tr from-purple-200 to-purple-300 flex items-center justify-center text-white text-xl font-bold';
            imagemDiv.textContent = 'Imagem';

            const conteudo = document.createElement('div');
            conteudo.className = 'p-4 space-y-2 flex flex-col flex-grow';

            const titulo = document.createElement('h3');
            titulo.className = 'text-lg font-semibold';
            titulo.textContent = anuncio.anun_titulo;

            const autor = document.createElement('p');
            autor.className = 'text-sm text-gray-500';
            autor.textContent = post.user_nome;

            const footer = document.createElement('div');
            footer.className = 'flex justify-between items-center text-sm pt-2 mt-auto';

            const preco = document.createElement('span');
            preco.className = 'font-semibold text-[#6F23D9]';
            preco.textContent = `R$ ${anuncio.anun_preco}`;

            const botaoCoracao = document.createElement('button');
            botaoCoracao.className = 'transition hover:scale-110';
            botaoCoracao.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                class="bi bi-heart fill-gray-400 hover:fill-red-500 transition duration-300"
                viewBox="0 0 16 16">
                <path d="..."/>
              </svg>
            `;

            footer.appendChild(preco);
            footer.appendChild(botaoCoracao);

            conteudo.appendChild(titulo);
            conteudo.appendChild(autor);
            conteudo.appendChild(footer);

            card.appendChild(imagemDiv);
            card.appendChild(conteudo);

            userPostsContainer.appendChild(card);
          });
        }
      }
    } catch (error) {
      console.error('Erro ao buscar os posts do usuário:', error);
    }

  } catch (e) {
    console.error('Erro inesperado:', e);
    alert('Erro ao carregar o perfil.');
  }
};
