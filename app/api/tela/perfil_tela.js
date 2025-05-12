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
    header.className = 'flex items-center gap-6';

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

    header.appendChild(imagem);
    header.appendChild(nome);

    const fields = document.createElement('div');
    fields.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';

    const criarCampo = (label, valor, campo, tipo = 'text') => {
      const wrapper = document.createElement('div');
      wrapper.className = 'flex justify-between items-start border-b border-gray-200 pb-3';

      const textContainer = document.createElement('div');

      const labelEl = document.createElement('p');
      labelEl.className = 'text-sm text-gray-500';
      labelEl.textContent = label;

      const valorEl = document.createElement('p');
      valorEl.className = 'text-lg text-gray-800 font-medium';
      valorEl.textContent = valor;

      textContainer.appendChild(labelEl);
      textContainer.appendChild(valorEl);

      const btn = document.createElement('button');
      btn.className = 'text-gray-500 hover:text-purple-600 transition cursor-pointer';
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mt-1" fill="none" viewBox="0 0 25 20" stroke="currentColor" width="20" height="20">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 11l6.364-6.364a1.5 1.5 0 112.121 2.121L11.121 13.5H9v-2.5z"/>
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
              <input type="date" name="data_nasc-novo" id="data_nasc-novo" class="swal2-input" placeholder="Nova">
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

    // Botões adicionais
    const acoesExtras = document.createElement('div');
    acoesExtras.className = 'flex gap-4 mt-6';

    const btnDeletarConta = document.createElement('button');
    btnDeletarConta.textContent = 'Deletar Conta';
    btnDeletarConta.className = 'bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300';
    btnDeletarConta.onclick = async () => {
      const confirm = await Swal.fire({
        title: 'Tem certeza?',
        text: "Essa ação não pode ser desfeita.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e3342f',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
      });

      if (confirm.isConfirmed) {
        try {
          const res = await requisitar('DELETE', 'api/usuario/deletar');
          if (res.sucesso) {
            Swal.fire('Deletado!', 'Sua conta foi excluída.', 'success');
            setTimeout(() => window.location.href = '/trevo-project/public/login', 2000);
          } else {
            Swal.fire('Erro', 'Não foi possível deletar a conta.', 'error');
          }
        } catch (e) {
          console.error(e);
          Swal.fire('Erro', 'Erro ao conectar com o servidor.', 'error');
        }
      }
    };

    const btnVendedor = document.createElement('button');
    btnVendedor.textContent = 'Virar Vendedor';
    btnVendedor.className = 'bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-300';
    btnVendedor.onclick = async () => {
      try {
        const res = await requisitar('POST', 'api/usuario/virar-vendedor');
        if (res.sucesso) {
          Swal.fire('Parabéns!', 'Agora você é um vendedor.', 'success');
        } else {
          Swal.fire('Erro', 'Não foi possível atualizar o status.', 'error');
        }
      } catch (e) {
        console.error(e);
        Swal.fire('Erro', 'Erro ao conectar com o servidor.', 'error');
      }
    };

    acoesExtras.appendChild(btnVendedor);
    acoesExtras.appendChild(btnDeletarConta);
    card.appendChild(acoesExtras);

    // Seção de Posts
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

  } catch (e) {
    console.error('Erro inesperado:', e);
    alert('Erro ao carregar o perfil.');
  }
};
