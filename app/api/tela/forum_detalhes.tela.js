window.onload = function () {
  const container = document.getElementById('forum-container');
  if (!container) return;

  // não peguei da api, so exemplo
  const forum = {
    forum_nome: 'Fórum Exemplo',
    forum_tema: 'Tecnologia',
    forum_descricao: 'Este é um fórum para discutir novidades e tendências tecnológicas.',
    forum_proprietario: 'João Silva',
    forum_proprietario_id: 123,
    isOwner: true
  };

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
  nome.textContent = forum.forum_nome;

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

    if (forum.isOwner && campo !== 'forum_proprietario') {
      const btn = document.createElement('button');
      btn.className = 'text-gray-400 hover:text-purple-600 transition cursor-pointer p-1';
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15.232 5.232l3.536 3.536M9 11l6.364-6.364a1.5 1.5 0 112.121 2.121L11.121 13.5H9v-2.5z"/>
        </svg>
      `;

      btn.onclick = () => {
        Swal.fire({
          title: `Editar ${label}`,
          input: campo === 'forum_descricao' ? 'textarea' : 'text',
          inputValue: valor,
          showCancelButton: true,
          confirmButtonText: 'Salvar',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#6F23D9',
          inputAttributes: campo === 'forum_descricao' ? { rows: 4 } : {},
          preConfirm: (novoValor) => {
            if (!novoValor) {
              Swal.showValidationMessage('Por favor, preencha o campo.');
            }
            return novoValor;
          }
        }).then((res) => {
          if (res.isConfirmed) {
            valorEl.textContent = res.value;
            console.log(`Atualizar campo ${campo} para:`, res.value);
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

  fields.appendChild(criarCampo('Nome do Fórum', forum.forum_nome, 'forum_nome'));
  fields.appendChild(criarCampo('Tema', forum.forum_tema, 'forum_tema'));
  fields.appendChild(criarCampo('Descrição', forum.forum_descricao, 'forum_descricao'));
  fields.appendChild(criarCampo('Proprietário', forum.forum_proprietario, 'forum_proprietario'));

  card.appendChild(fields);

  if (forum.isOwner) {
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
      }).then((res) => {
        if (res.isConfirmed) {
          console.log('Deletar fórum acionado');
          Swal.fire('Deletado!', 'Seu fórum foi deletado.', 'success');
        }
      });
    };

    acoesExtras.appendChild(btnDeletarForum);
    card.appendChild(acoesExtras);
  }

  container.appendChild(card);
};
