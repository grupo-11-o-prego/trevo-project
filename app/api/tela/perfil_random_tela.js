window.onload = async function () {
  const container = document.getElementById('posts-container');
  if (!container) return;

  try {
    const result = await requisitar('GET', 'api/perfil');

    const urlParams = new URLSearchParams(window.location.search);
    const idVendedor = urlParams.get('id');

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

    const statusDiv = document.createElement('div')
    statusDiv.className = 'p-1 flex'
    const status = document.createElement('span');
    status.className = 'text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium';
    status.textContent = 'Vendedor';
    statusDiv.appendChild(status); 
    const denunciar = document.createElement('span');
    denunciar.className = 'text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium cursor-pointer transition hover:scale-110 duration-200';
    denunciar.textContent = '!';
    denunciar.onclick = () => {
        Swal.fire({
            title: `Você deseja denunciar o vendedor '${post.user_nome}'?`,
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#6F23D9",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, denunciar!",
            cancelButtonText: 'Cancelar',
          }).then(async (res) => {
            if (res.isConfirmed) {
              idanun = post.user_id
              window.location.href = `/trevo-project/public/denunciar?tipo=user&&id=${idanun}`;
            }
          });
    }
    statusDiv.appendChild(denunciar); 
    
    header.appendChild(statusDiv); 
    card.appendChild(header);

    const acoesExtras = document.createElement('div');
    acoesExtras.className = 'flex gap-4 mt-6';

    const postsSection = document.createElement('div');
    postsSection.className = 'mt-8';
    nomeVendedor = post.user_nome
    postsSection.innerHTML = `
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Posts</h3>
      <div id="user-posts" class="grid gap-4">
        <p class="text-gray-500">${nomeVendedor} ainda não publicou nada.</p>
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
            imagemDiv.className = 'h-44 bg-gradient-to-r from-[#6F23D9] to-indigo-600 flex items-center justify-center text-white text-xl font-bold';
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
