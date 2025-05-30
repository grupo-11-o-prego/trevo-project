window.onload = async function () {
    if (document.getElementById('posts-container')) {
        const response = await fetch('/trevo-project/public/api/perfil');
        const data = response.dados.users;
        console.log('admin', data.user_moderador);
        
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
                        
                        if (isModerador==1) {
                            const denunciaButton = document.createElement('div');
                            denunciaButton.href = '/trevo-project/public/denuncia';
                            denunciaButton.className = 'w-10 h-10 rounded-full bg-[#D92323] text-white flex items-center justify-center hover:bg-[#a31919] transition-all ml-2';
                            denunciaButton.innerHTML = `
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
                                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z"/>
                                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                              </svg>
                            `;        
                          }else{
                            console.log('oi');
                          }
                        result.dados.result.forEach(post => {
                            console.log(result)

                                const card = document.createElement('div');
                                card.className = 'search-card bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden flex flex-col cursor-pointer';
                                const titulosr = post.anun_titulo.toLowerCase();
                                const nomesr = post.user_nome.toLowerCase();
                                const precosr = post.anun_preco.toLowerCase().replace("R$", "");
                                card.setAttribute("data-search", `${titulosr} ${nomesr} ${precosr}`);


                            card.onclick = () => {
                                // alert("oi")
                                window.location.href = `/trevo-project/public/anuncio-detalhes?id=${post.anun_id}`;
                            }

                            const imagemDiv = document.createElement('div');
                            imagemDiv.className = 'h-44 bg-gradient-to-r from-[#6F23D9] to-indigo-600 flex items-center justify-center text-white text-xl font-bold';
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
                        alert("Não há anúncios disponíveis")
                    }
                }
            });

        }
        document.getElementById("pesquisa").addEventListener("keyup",(e) => {
            // console.log("_>",e.target.value);
            const termo = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('[data-search]');

            cards.forEach(card => {
                const texto = card.getAttribute('data-search');
                if (texto.includes(termo)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
    });
        })
}
