window.onload = async function () {
  const container = document.getElementById('anuncio-detalhado');
  const urlParams = new URLSearchParams(window.location.search);
  const anuncioId = urlParams.get('id');

  if (container && anuncioId) {
    await requisitar('GET', `/trevo-project/public/api/anuncio/listar`)
      .then(result => {
        console.log(result);

        if (result.erro) {
          console.error('Erro:', result.erro);
          container.innerHTML = '<p class="text-red-500">Erro ao carregar anúncio.</p>';
        } else {
          const anuncio = result.dados.result;

          const card = document.createElement('div');
          card.className = 'max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6';

          const imagem = document.createElement('div');
          imagem.className = 'w-full h-64 bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center';
          imagem.innerHTML = `<span class="text-gray-500 text-lg">Imagem do Anúncio</span>`;

          const header = document.createElement('div');
          header.className = 'flex justify-between items-center';
          header.innerHTML = `
            <h1 class="text-3xl font-bold text-gray-800">${anuncio.anun_titulo}</h1>
            <span class="px-4 py-1 bg-green-100 text-green-700 text-sm rounded-full font-semibold">
              ${anuncio.anun_status || 'Disponível'}
            </span>
          `;

          const tipoEstado = document.createElement('div');
          tipoEstado.className = 'flex gap-4 text-sm text-gray-600';
          tipoEstado.innerHTML = `
            <p><strong>Tipo:</strong> ${anuncio.anun_tipo}</p>
            <p><strong>Estado:</strong> ${anuncio.anun_estado}</p>
          `;

          const descricao = document.createElement('div');
          descricao.innerHTML = `
            <h2 class="text-xl font-semibold text-gray-800 mb-2">Descrição</h2>
            <p class="text-gray-700 leading-relaxed">${anuncio.anun_descricao}</p>
          `;

          const vendedor = document.createElement('div');
          vendedor.className = 'pt-4 border-t border-gray-200';
          vendedor.innerHTML = `
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Informações do Vendedor</h3>
            <p class="text-gray-700"><strong>Nome:</strong> ${anuncio.user_nome}</p>
            <p class="text-gray-700"><strong>Status:</strong> ${anuncio.user_verificado ? 'Vendedor Verificado' : 'Vendedor'}</p>
            <p class="text-gray-700"><strong>Data de Criação:</strong> ${anuncio.anun_data}</p>
          `;

          const botao = document.createElement('div');
          botao.className = 'flex justify-end mt-6';
          botao.innerHTML = `
            <button class="bg-[#6F23D9] hover:bg-[#4f179c] text-white font-semibold px-6 py-2 rounded-lg transition duration-300">
              Entrar em Contato
            </button>
          `;

          // Montar todos os elementos
          card.appendChild(imagem);
          card.appendChild(header);
          card.appendChild(tipoEstado);
          card.appendChild(descricao);
          card.appendChild(vendedor);
          card.appendChild(botao);

          container.appendChild(card);
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        container.innerHTML = '<p class="text-red-500">Erro inesperado ao carregar anúncio.</p>';
      });
  }
};
