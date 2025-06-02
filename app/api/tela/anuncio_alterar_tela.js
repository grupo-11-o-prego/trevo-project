window.onload = async function () {
  const container = document.getElementById('anuncio-container');

  const urlParams = new URLSearchParams(window.location.search);
  const anunId = parseInt(urlParams.get("id"), 10);
  
  const comentarios = await requisitar(
    "GET",
    `/trevo-project/public/api/anuncio/listar?id=${anunId}`
  );

  const anuncio = comentarios.dados.result;
  console.log(anuncio)
//   console.log(anuncio[0].anun_titulo)

  const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6';

    const header = document.createElement('div');
    header.className = 'flex justify-between items-center'; 

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
    nome.textContent = anuncio[0].anun_titulo;

    nomeContainer.appendChild(imagem);
    nomeContainer.appendChild(nome);

    header.appendChild(nomeContainer);

    const fields = document.createElement('div');
    fields.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';

    const criarCampo = (label, valor, campo, tipo = 'text') => {
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

      const btn = document.createElement('button');
      btn.className = 'text-gray-400 hover:text-purple-600 transition cursor-pointer p-1';
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15.232 5.232l3.536 3.536M9 11l6.364-6.364a1.5 1.5 0 112.121 2.121L11.121 13.5H9v-2.5z"/>
        </svg>`;

      btn.onclick = () => {
        let inputHTML = '';

        if (campo === 'anun_titulo') {
          inputHTML = `
            <form id="alterartitulo-form">
            <input type="number" name="id" id="id" class="hidden" value="${anunId}">
              <input type="text" name="titulo" id="titulo" class="swal2-input" placeholder="Novo titulo">
            </form>
          `;
        } else if (campo === 'anun_descricao') {
          inputHTML = `
            <form id="alterardescricao-form">
            <input type="number" name="id" id="id" class="hidden" value="${anunId}">
              <input type="text" name="descricao" id="descricao" class="swal2-input" placeholder="Nova descricao">
            </form>
          `;
        } else if (campo === 'anun_tipo') {
          inputHTML = `
            <form id="alterartipo-form">
            <input type="number" name="id" id="id" class="hidden" value="${anunId}">
                <select name="tipo" id="tipo" class="swal2-input " required>
                    <option value="">Selecione...</option>
                    <option value="venda" class="cursor-pointer">Venda</option>
                    <option value="troca" class="cursor-pointer">Troca</option>
                </select>
            </form>
          `;
        } else if (campo === 'anun_status') {
          inputHTML = `
            <form id="alterarstatus-form">
            <input type="number" name="id" id="id" class="hidden" value="${anunId}">
              <input type="text" name="status" id="status" class="swal2-input">
            </form>
          `;
        } else if (campo === 'anun_estado') {
          inputHTML = `
            <form id="alterarestado-form">
            <input type="number" name="id" id="id" class="hidden" value="${anunId}">
                <select name="estado" id="estado"  class="swal2-input" required>
                    <option value="">Selecione...</option>
                    <option value="Novo" class="cursor-pointer">Novo</option>
                    <option value="Seminovo" class="cursor-pointer">Seminovo</option>
                    <option value="Velho" class="cursor-pointer">Velho</option>
                </select>
            </form>
          `;
        } else if (campo === 'anun_preco') {
          inputHTML = `
            <form id="alterarpreco-form">
            <input type="number" name="id" id="id" class="hidden" value="${anunId}">
              <input type="text" name="preco" id="preco" class="swal2-input">
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
            if (campo === 'anun_titulo') {
              const titulo = Swal.getPopup().querySelector('#titulo').value;
              return { titulo };
            } else if (campo === 'anun_descricao') {
              const descricao = Swal.getPopup().querySelector('#descricao').value;
              if (!descricao) Swal.showValidationMessage('Por favor, preencha o campo');
            } else if (campo === 'user_tipo') {
              const tipo = Swal.getPopup().querySelector('#tipo').value;
              if (!tipo) Swal.showValidationMessage('Por favor, preencha o campo');
              return { tipo };
            } else if (campo === 'anun_status') {
              const status = Swal.getPopup().querySelector('#status').value;
              if (!status) Swal.showValidationMessage('Por favor, preencha o campo');
              return { status };
            } else if (campo === 'anun_estado') {
              const estado = Swal.getPopup().querySelector('#estado').value;
              if (!estado) Swal.showValidationMessage('Por favor, preencha o campo');
              return { estado };
            } else if (campo === 'anun_preco') {
              const preco = Swal.getPopup().querySelector('#preco').value;
              if (!preco) Swal.showValidationMessage('Por favor, preencha o campo');
              return { preco };
            }
          }
        }).then(async (res) => {
          if (res.isConfirmed) {
            if (campo == 'anun_titulo') handleSubmitTitulo();
            else if (campo == 'anun_descricao') handleSubmitDescricao();
            else if (campo == 'anun_tipo') handleSubmitTipo();
            else if (campo == 'anun_status') handleSubmitStatus();
            else if (campo == 'anun_estado') handleSubmitEstado();
            else if (campo == 'anun_preco') handleSubmitPreco();
          }
        });
      };

      wrapper.appendChild(textContainer);
      wrapper.appendChild(btn);
      return wrapper;
    };

    fields.appendChild(criarCampo('Titulo', anuncio[0].anun_titulo, 'anun_titulo'));
    fields.appendChild(criarCampo('Descrição', anuncio[0].anun_descricao, 'anun_descricao'));
    fields.appendChild(criarCampo('Tipo', anuncio[0].anun_tipo, 'anun_tipo'));
    fields.appendChild(criarCampo('Status', anuncio[0].anun_status, 'anun_status'));
    fields.appendChild(criarCampo('Estado', anuncio[0].anun_estado, 'anun_estado'));
    fields.appendChild(criarCampo('Preço', anuncio[0].anun_preco, 'anun_preco'));

    card.appendChild(header);
    card.appendChild(fields);
    container.appendChild(card);

};
