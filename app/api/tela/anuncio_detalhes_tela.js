window.onload = async function () {
  const container = document.getElementById('posts-container');

  const urlParams = new URLSearchParams(window.location.search);
  const anuncioId = urlParams.get('id');

  if (!anuncioId) {
    alert('Anuncio nao encontrado');
    return;
  }

  try {
    const result = await requisitar('GET', '/trevo-project/public/api/anuncio/listar');

    if (result.erro) {
      console.error('Erro:', result.erro);
      alert('Ocorreu um erro ao buscar os anúncios.');
      return;
    }

    const anuncios = result.dados.result;
    const post = anuncios.find(p => p.anun_id == anuncioId);

    if (!post) {
      container.innerHTML = '<p class="text-center text-red-500 mt-6">Anúncio não encontrado.</p>';
      return;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mb-6';

    const btnVoltar = document.createElement('button');
    btnVoltar.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white hover:text-gray-200 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    `;
    btnVoltar.className = 'absolute top-4 right-4 z-10 bg-[#6F23D9] p-2 rounded-full shadow-md';
    btnVoltar.title = 'Voltar';
    btnVoltar.onclick = () => history.back();

    const capa = document.createElement('div');
    capa.className = 'bg-gradient-to-r from-[#6F23D9] to-indigo-600 h-64 flex items-end px-6 py-6';
    const titulo = document.createElement('h1');
    titulo.className = 'text-3xl font-bold text-white drop-shadow-md';
    titulo.textContent = post.anun_titulo;
    capa.appendChild(titulo);

    const conteudo = document.createElement('div');
    conteudo.className = 'p-6 grid grid-cols-1 md:grid-cols-2 gap-6';

    const colunaEsquerda = document.createElement('div');

    const descTitulo = document.createElement('h2');
    descTitulo.className = 'text-xl font-semibold text-gray-800 mb-2';
    descTitulo.textContent = 'Descrição';

    const descTexto = document.createElement('p');
    descTexto.className = 'text-gray-600 mb-6 leading-relaxed';
    descTexto.textContent = post.anun_descricao;

    const detalhesTitulo = document.createElement('h2');
    detalhesTitulo.className = 'text-xl font-semibold text-gray-800 mb-2';
    detalhesTitulo.textContent = 'Detalhes';

    const listaDetalhes = document.createElement('ul');
    listaDetalhes.className = 'text-gray-700 space-y-2 text-sm';

    function criaItemDetalhe(svgPath, texto, extraSpan) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.className = 'font-semibold text-gray-600 flex items-center gap-1';

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('viewBox', '0 0 448 512');
      svg.classList.add('w-4', 'h-4', 'inline-block');

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', svgPath);
      svg.appendChild(path);

      span.appendChild(svg);
      span.appendChild(document.createTextNode(' ' + texto));
      li.appendChild(span);

      if (extraSpan) li.appendChild(extraSpan);
      return li;
    }

    const dataCriacaoPath = 'M96 32v32H48c-26.5 0-48 21.5-48 48v48h448v-48c0-26.5-21.5-48-48-48h-48V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v32H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0v272c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192z';
    const tipoPath = 'M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192 32 192c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512L430 512c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32l-85.6 0L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192l-232.6 0L253.3 35.1zM192 304l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm128 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16z';
    const statusPath = 'M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z';
    const estadoPath = 'M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z';

    listaDetalhes.appendChild(criaItemDetalhe(dataCriacaoPath, `Data de Criação: ${post.anun_data}`));
    listaDetalhes.appendChild(criaItemDetalhe(tipoPath, `Tipo: ${post.anun_tipo}`));

    const statusSpan = document.createElement('span');
    statusSpan.className = 'text-green-600 font-medium';
    statusSpan.textContent = post.anun_status;
    listaDetalhes.appendChild(criaItemDetalhe(statusPath, 'Status:', statusSpan));

    listaDetalhes.appendChild(criaItemDetalhe(estadoPath, `Estado: ${post.user_estado}`));

    colunaEsquerda.appendChild(descTitulo);
    colunaEsquerda.appendChild(descTexto);
    colunaEsquerda.appendChild(detalhesTitulo);
    colunaEsquerda.appendChild(listaDetalhes);

    const colunaDireita = document.createElement('div');
    colunaDireita.className = 'bg-gray-50 rounded-xl p-6 flex flex-col justify-between shadow-inner border border-gray-200';

    const vendedorDiv = document.createElement('div');
    vendedorDiv.className = 'space-y-4';

    const vendedorInfo = document.createElement('div');
    const vendedorLabel = document.createElement('span');
    vendedorLabel.className = 'text-sm text-gray-500';
    vendedorLabel.textContent = '👤 Vendedor';
    const vendedorNome = document.createElement('p');
    vendedorNome.className = 'text-lg font-semibold text-gray-800';
    vendedorNome.textContent = post.user_nome;

    vendedorInfo.appendChild(vendedorLabel);
    vendedorInfo.appendChild(vendedorNome);

    const precoInfo = document.createElement('div');
    const precoLabel = document.createElement('span');
    precoLabel.className = 'text-sm text-gray-500';
    precoLabel.textContent = '💰 Preço';
    const precoValor = document.createElement('p');
    precoValor.className = 'text-3xl font-extrabold text-[#6F23D9]';
    precoValor.textContent = `R$ ${post.anun_preco}`;

    precoInfo.appendChild(precoLabel);
    precoInfo.appendChild(precoValor);

    vendedorDiv.appendChild(vendedorInfo);
    vendedorDiv.appendChild(precoInfo);

    const botoesDiv = document.createElement('div');
    botoesDiv.className = 'mt-6 flex gap-3';

    const btnEditar = document.createElement('button');
    btnEditar.className = 'flex-1 flex items-center justify-center gap-1 text-[#6F23D9] hover:text-indigo-700 border border-[#6F23D9] hover:border-indigo-700 py-1 px-2 rounded-md text-sm transition duration-500 hover:bg-purple-700 hover:text-white cursor-pointer';
    btnEditar.title = 'Editar anúncio';
    btnEditar.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15.232 5.232l3.536 3.536M9 11l6.364-6.364a1.5 1.5 0 112.121 2.121L11.121 13.5H9v-2.5z"/>
      </svg> Editar
    `;

    const btnExcluir = document.createElement('button');
    btnExcluir.className = 'flex-1 flex items-center justify-center gap-1 text-red-500 hover:text-red-600 border border-red-500 hover:border-red-600 py-1 px-2 rounded-md text-sm transition cursor-pointer';
    btnExcluir.title = 'Excluir anúncio';
    btnExcluir.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"/>
      </svg> Excluir
    `;
    btnExcluir.onclick = () => {
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
              const resposta = await requisitar('GET', '/trevo-project/public/api/deletaranuncio', { id: post.anun_id });
              console.log(resposta);
              if (resposta.sucesso) {
                Swal.fire({
                  icon: 'error',
                  title: 'Erro',
                  text: resposta.mensagem || 'Não foi possível deletar seu anúncio.',
                });
              } else {
                Swal.fire({
                  icon: 'success',
                  title: 'Anúcio deletada!',
                  text: 'Seu anúncio foi removido com sucesso.',
                  confirmButtonColor: '#6F23D9'
                }).then(() => {
                  history.back()
                });
              }
            } catch (erro) {
              console.error('Erro ao deletar anúncio:', erro);
              Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao deletar seu anúncio.',
              });
            }
          }

        });
      }

    botoesDiv.appendChild(btnEditar);
    botoesDiv.appendChild(btnExcluir);

    colunaDireita.appendChild(vendedorDiv);
    colunaDireita.appendChild(botoesDiv);

    conteudo.appendChild(colunaEsquerda);
    conteudo.appendChild(colunaDireita);

    wrapper.appendChild(capa);
    wrapper.appendChild(conteudo);
    

    container.appendChild(wrapper);
  } catch (e) {
    console.error('Erro ao carregar o anúncio:', e);
    alert('Erro inesperado ao carregar o anúncio.');
  }
};
