window.onload = async function () {
    if (document.getElementById('posts-container')) {
        await requisitar('GET', '/trevo-project/public/api/anuncio/listar')
            .then(result => {
                console.log(result)
                if (result.erro) {
                    console.error('Erro:', result.erro);
                    alert('Ocorreu um erro ao buscar os anúncios. Tente novamnte.');
                } else {
                    const container = document.getElementById('posts-container');
                    console.log(result.dados);

                    if (result.dados.sucesso && result.dados.result) {
                        result.dados.result.forEach(post => {
                            console.log(result)

                            const card = document.createElement('div');
                            card.className = 'bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col';

                            const imagemDiv = document.createElement('div');
                            imagemDiv.className = 'h-44 bg-gradient-to-tr from-purple-200 to-purple-300 flex items-center justify-center text-white text-xl font-bold';
                            imagemDiv.textContent = 'Imagem';

                            const conteudo = document.createElement('div');
                            conteudo.className = 'p-4 space-y-2';

                            const titulo = document.createElement('h3');
                            titulo.className = 'text-lg font-semibold';
                            titulo.textContent = post.anun_titulo;

                            const autor = document.createElement('p');
                            autor.className = 'text-sm text-gray-500';
                            autor.textContent = post.user_nome;

                            const footer = document.createElement('div');
                            footer.className = 'flex justify-between items-center text-sm pt-2';

                            const preco = document.createElement('span');
                            preco.className = 'font-semibold text-[#6F23D9]';
                            preco.textContent = `R$ ${post.anun_preco}`;

                            const botaoCoracao = document.createElement('button');
                            botaoCoracao.className = 'transition hover:scale-110';
                            botaoCoracao.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                                    class="bi bi-heart fill-gray-400 hover:fill-red-500 transition duration-300"
                                    viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 
                                        2.514.878 1.4 3.053c-.523 1.023-.641 
                                        2.5.314 4.385.92 1.815 2.834 3.989 
                                        6.286 6.357 3.452-2.368 5.365-4.542 
                                        6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 
                                        10.4.28 8.717 2.01zM8 15C-7.333 4.868 
                                        3.279-3.04 7.824 1.143q.09.083.176.171a3 
                                        3 0 0 1 .176-.17C12.72-3.042 23.333 
                                        4.867 8 15" />
                                </svg>
                            `;

                            footer.appendChild(preco);
                            footer.appendChild(botaoCoracao);

                            conteudo.appendChild(titulo);
                            conteudo.appendChild(autor);
                            conteudo.appendChild(footer);

                            card.appendChild(imagemDiv);
                            card.appendChild(conteudo);

                            container.appendChild(card);
                        });
                    } else {
                        console.error("Erro: Não há dados de anúncios disponíveis.");
                    }
                }
            });
    }
}
