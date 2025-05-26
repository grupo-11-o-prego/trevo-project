window.onload = async function () {
    if (document.getElementById('body-denuncias')) {
        await requisitar('GET', 'api/denuncia/listar')
            .then(result => {
                if (result.erro) {
                    console.error('Erro:', result.erro);
                    alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
                } else {
                    const body = document.getElementById('body-denuncias');
                    console.log(result.dados);
                    
                    if (result.dados.sucesso && result.dados.result) {
                        result.dados.result.forEach(denuncia => {
                    
                            const card = document.createElement('section');
                            card.className = 'bg-white p-6 rounded-xl shadow-md';

                            const titulo = document.createElement('h2');
                            titulo.className = 'text-lg font-semibold text-gray-600 mb-2';
                            titulo.textContent = `Denúncia #${denuncia.den_id}`;

                            const gridInfo = document.createElement('div');
                            gridInfo.className = 'grid grid-cols-2 gap-4 mb-2 text-sm';

                            let tipo = '';
                            if(denuncia.den_user_id){
                                tipo = 'Usuário';                                
                            } else if(denuncia.den_anun_id){
                                tipo = `Anúncio`;
                            } else{
                                tipo = 'desconhecido';
                            }

                            const divTipo = document.createElement('div');
                            divTipo.innerHTML = `<span class="font-semibold text-gray-800">Tipo:</span> ${tipo}`;

                            const divNome = document.createElement('div');
                            let nomeLabel = 'Nome';
                            let nomeValor = '';
                            if(denuncia.den_user_id){
                                nomeValor = denuncia.user_nome;
                            }else if(denuncia.den_anun_id){
                                nomeLabel = 'Titulo'
                                nomeValor = denuncia.anun_titulo;
                            }
                            divNome.innerHTML = `<span class="font-semibold text-gray-800">${nomeLabel}:</span> ${nomeValor}`;

                            const divEmail = document.createElement('div');                            
                            divEmail.innerHTML = `<span class="font-semibold text-gray-800">Email:</span> ${denuncia.user_email}`;

                            const divMotivo = document.createElement('div');
                            divMotivo.innerHTML = `<span class="font-semibold text-gray-800">Motivo:</span> ${denuncia.den_motivo}`;

                            const divDescricao = document.createElement('div');
                            divDescricao.innerHTML = `<span class="font-semibold text-gray-800">Descrição:</span> ${denuncia.den_descricao}`;

                            const divData = document.createElement('div');
                            divData.innerHTML = `<span class="font-semibold text-gray-800">Data:</span> ${denuncia.den_data}`;

                            gridInfo.appendChild(divTipo);
                            gridInfo.appendChild(divNome);
                            gridInfo.appendChild(divEmail);
                            gridInfo.appendChild(divMotivo);
                            gridInfo.appendChild(divDescricao);
                            gridInfo.appendChild(divData);

                            const botoes = document.createElement('div');
                            botoes.className = 'flex flex-wrap gap-4 mt-6';

                            const buttonRevisar = document.createElement('button');
                            buttonRevisar.className = 'cursor-pointer px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition';
                            buttonRevisar.textContent = 'Revisar Denúncia';
                            buttonRevisar.onclick = function () { revisarDenuncia(denuncia.den_id) };

                            const buttonExcluir = document.createElement('button');
                            buttonExcluir.className = 'cursor-pointer px-4 py-2 border border-red-500 text-red-600 font-semibold rounded-md hover:bg-red-50 transition';
                            buttonExcluir.textContent = 'Excluir Denúncia';
                            buttonExcluir.onclick = function () { excluirDenuncia(denuncia.den_id) };

                            const buttonBanir = document.createElement('button');
                            buttonBanir.className = 'cursor-pointer px-4 py-2 border border-red-500 text-red-600 font-semibold rounded-md hover:bg-red-50 transition';
                            buttonBanir.textContent = 'Banir Usuário';
                            buttonBanir.onclick = function () { banirUsuario(denuncia.den_user_id) };

                            botoes.appendChild(buttonRevisar);
                            botoes.appendChild(buttonExcluir);
                            botoes.appendChild(buttonBanir);

                            card.appendChild(titulo);
                            card.appendChild(gridInfo);
                            card.appendChild(botoes);

                            body.appendChild(card);
                        });
                    } else {
                        console.error("Erro: Não há dados de denúncias disponíveis.");
                    }
                }
            });
    }
}

async function revisarDenuncia(id) {
    await requisitar('GET', 'api/denuncia/revisar', {id: id})
        .then(result => {
            if (result.erro) {
                console.log(result);
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
                ok = false;
            } else {
                if (result.dados.sucesso) {
                    Swal.fire({
                        icon: "success",
                        title: "Denúncia revisada!",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        willClose: () => {
                          window.location.href = "denuncia"; // URL desejada para redirecionamento
                        }
                      });
                } else {
                    alert(result.dados.message);
                }
            }
    
        }); 
}

async function excluirDenuncia(id) {
    await requisitar('GET', 'api/denuncia/deletar', {id: id})
        .then(result => {
            if (result.erro) {
                console.log(result);
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
                ok = false;
            } else {
                if (result.dados.sucesso) {
                    Swal.fire({
                        icon: "success",
                        title: "Denúncia excluída!",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        willClose: () => {
                          window.location.href = "denuncia"; // URL desejada para redirecionamento
                        }
                      });
                } else {
                    alert(result.dados.message);
                }
            }
    
        }); 
}

async function banirUsuario(id) {
    await requisitar('GET', 'api/deleteuser', {id: id})
        .then(result => {
            if (result.erro) {
                console.log(result);
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
                ok = false;
            } else {
                if (result.dados.sucesso) {
                    Swal.fire({
                        icon: "success",
                        title: "Usuário banido!",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        willClose: () => {
                          window.location.href = "denuncia"; // URL desejada para redirecionamento
                        }
                      });
                } else {
                    alert(result.dados.message);
                }
            }
    
        }); 
}

if (document.getElementById('denuncia-button')){
    document.getElementById('denuncia-button').addEventListener('click', async function() {
        var idDen = document.getElementById('denuncia-button').value;
        
        await requisitar('GET', '/api/denunciar', {id: idDen})
        .then(result => {
            if (result.erro) {
                console.log(result);
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
                ok = false;
            } else {
                if (result.dados.sucesso) {
                    alert("Denúncia realizada!");
                } else {
                    alert("Erro ao cadastrar!");
                }
            }
    
        }); 
    });
}