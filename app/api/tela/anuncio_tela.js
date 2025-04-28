window.onload = async function () {
    if (document.getElementById('body-anuncios')) {
        await requisitar('GET', 'api/anuncio/listar')
        .then(result => {
            if (result.erro) {
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
            } else {
                const body = document.querySelector('.body');
                if (result.dados.sucesso && result.dados.result) {
                    result.dados.result.forEach(produto => {
                        
                        const containerDiv = document.createElement('div');
                        containerDiv.className = 'rounded overflow-hidden shadow-lg mb-4';

                        const imagemDiv = document.createElement('div');
                        imagemDiv.className = 'h-48 bg-gray-300';
                        if (produto.imagem) {
                            imagemDiv.style.backgroundImage = `url('${produto.imagem}')`;
                            imagemDiv.style.backgroundSize = 'cover';
                            imagemDiv.style.backgroundPosition = 'center';
                        }
                        containerDiv.appendChild(imagemDiv);

                        const infoDiv = document.createElement('div');
                        infoDiv.className = 'p-4';

                        const titulo = document.createElement('h3');
                        titulo.className = 'text-lg font-semibold mb-1';
                        titulo.textContent = produto.anun_titulo;
                        infoDiv.appendChild(titulo);

                        const vendedorSpan = document.createElement('span');
                        vendedorSpan.textContent = produto.user_nome;
                        infoDiv.appendChild(vendedorSpan);

                        const priceAndButtonDiv = document.createElement('div');
                        priceAndButtonDiv.className = 'flex justify-between items-center text-sm mt-2';

                        const precoSpan = document.createElement('span');
                        precoSpan.textContent = 'R$ ' + produto.anun_preco;
                        priceAndButtonDiv.appendChild(precoSpan);

                        const favoriteBtn = document.createElement('button');
                        favoriteBtn.className = 'cursor-pointer transition duration-300';
                        favoriteBtn.innerHTML = `
                            <span id="coracao_cheio">
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-heart fill-gray-400 hover:fill-red-500 transition duration-300" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                </svg>
                            </span>
                        `;
                        favoriteBtn.onclick = function() {
                            mudaCoracao(this);
                        };
                        priceAndButtonDiv.appendChild(favoriteBtn);

                        infoDiv.appendChild(priceAndButtonDiv);

                        containerDiv.appendChild(infoDiv);

                        const deleteBtn = document.createElement('button');
                        deleteBtn.className = 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2';
                        deleteBtn.textContent = 'Deletar Anúncio';
                        deleteBtn.value = produto.anun_id;
                        deleteBtn.onclick = function () {
                            requisitar('GET', 'api/anuncio/deletar', { id: this.value })
                                .then(result => {
                                    if (result.erro) {
                                        console.error('Erro:', result.erro);
                                        alert('Ocorreu um erro ao deletar. Tente novamente.');
                                    } else if (result.dados.sucesso) {
                                        Swal.fire({
                                            icon: "success",
                                            title: "Anúncio Removido!",
                                            showConfirmButton: false,
                                            timer: 1500,
                                            timerProgressBar: true,
                                            willClose: () => {
                                                window.location.reload();
                                            }
                                        });
                                    } else {
                                        alert("Erro ao deletar anúncio!");
                                    }
                                });
                        };
                        containerDiv.appendChild(deleteBtn);

                        body.appendChild(containerDiv);
                    });
                } else {
                    console.error("Erro: Não há dados de produtos disponíveis.");
                }
            }
        });
    }
}











// window.onload = async function () {
//     const params = new URLSearchParams(window.location.search);
//     const id = params.get('id');
    
//     await requisitar('GET', 'api/anuncio/listar', { id: id })
//         .then(result => {
//             if (result.erro) {
//                 console.error('Erro:', result.erro);
//                 alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
//             } else {
//                 const body = document.querySelector('.body');
//                 if (result.dados.sucesso && result.dados.result) {
//                     result.dados.result.forEach(produto => {
                        
//                         const containerDiv = document.createElement('div');
//                         containerDiv.className = 'rounded overflow-hidden shadow-lg mb-4';

//                         const imagemDiv = document.createElement('div');
//                         imagemDiv.className = 'h-48 bg-gray-300';
//                         if (produto.imagem) {
//                             imagemDiv.style.backgroundImage = `url('${produto.imagem}')`;
//                             imagemDiv.style.backgroundSize = 'cover';
//                             imagemDiv.style.backgroundPosition = 'center';
//                         }
//                         containerDiv.appendChild(imagemDiv);

//                         const infoDiv = document.createElement('div');
//                         infoDiv.className = 'p-4';

//                         const titulo = document.createElement('h3');
//                         titulo.className = 'text-lg font-semibold mb-1';
//                         titulo.textContent = produto.anun_titulo;
//                         infoDiv.appendChild(titulo);

//                         const vendedorSpan = document.createElement('span');
//                         vendedorSpan.textContent = produto.user_nome;
//                         infoDiv.appendChild(vendedorSpan);

//                         const priceAndButtonDiv = document.createElement('div');
//                         priceAndButtonDiv.className = 'flex justify-between items-center text-sm mt-2';

//                         const precoSpan = document.createElement('span');
//                         precoSpan.textContent = 'R$ ' + produto.anun_preco;
//                         priceAndButtonDiv.appendChild(precoSpan);

//                         const favoriteBtn = document.createElement('button');
//                         favoriteBtn.className = 'cursor-pointer transition duration-300';
//                         favoriteBtn.innerHTML = `
//                             <span id="coracao_cheio">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-heart fill-gray-400 hover:fill-red-500 transition duration-300" viewBox="0 0 16 16">
//                                     <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
//                                 </svg>
//                             </span>
//                         `;
//                         favoriteBtn.onclick = function() {
//                             mudaCoracao(this);
//                         };
//                         priceAndButtonDiv.appendChild(favoriteBtn);

//                         infoDiv.appendChild(priceAndButtonDiv);

//                         containerDiv.appendChild(infoDiv);

//                         const deleteBtn = document.createElement('button');
//                         deleteBtn.className = 'bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2';
//                         deleteBtn.textContent = 'Deletar Anúncio';
//                         deleteBtn.value = produto.anun_id;
//                         deleteBtn.onclick = function () {
//                             requisitar('GET', 'api/anuncio/deletar', { id: this.value })
//                                 .then(result => {
//                                     if (result.erro) {
//                                         console.error('Erro:', result.erro);
//                                         alert('Ocorreu um erro ao deletar. Tente novamente.');
//                                     } else if (result.dados.sucesso) {
//                                         Swal.fire({
//                                             icon: "success",
//                                             title: "Anúncio Removido!",
//                                             showConfirmButton: false,
//                                             timer: 1500,
//                                             timerProgressBar: true,
//                                             willClose: () => {
//                                                 window.location.reload();
//                                             }
//                                         });
//                                     } else {
//                                         alert("Erro ao deletar anúncio!");
//                                     }
//                                 });
//                         };
//                         containerDiv.appendChild(deleteBtn);

//                         body.appendChild(containerDiv);
//                     });
//                 } else {
//                     console.error("Erro: Não há dados de produtos disponíveis.");
//                 }
//             }
//         });
// };