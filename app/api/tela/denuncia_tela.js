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
                            card.className = 'bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto mt-10';

                            const titulo = document.createElement('h2');
                            titulo.className = 'text-lg font-semibold text-gray-600 mb-2';
                            titulo.textContent = `Denúncia #${denuncia.den_id}`;

                            const gridInfo = document.createElement('div');
                            gridInfo.className = 'grid grid-cols-2 gap-4 mb-2 text-sm';

                            const tipo = (denuncia.den_user_id) ? 'Usuário'  : (denuncia.den_anun_id) ? 'Anúncio' : (denuncia.den_for_id) ? 'Fórum' : (denuncia.den_post_id) ? 'Post' : (denuncia.den_com_id)? 'Comentário' : 'Desconhecido';
                            const data = denuncia.den_data;

                            const divTipo = document.createElement('div');
                            divTipo.innerHTML = `<span class="font-semibold text-gray-800">Tipo:</span> ${tipo}`;

                            const divData = document.createElement('div');
                            divData.innerHTML = `<span class="font-semibold text-gray-800">Data:</span> ${data}`;

                            const nome = denuncia.den_user_id ? denuncia.user_nome : denuncia.den_anun_id ? denuncia.anun_titulo : denuncia.den_for_id ? denuncia.for_titulo : denuncia.den_post_id ? denuncia.dono_post_nome : denuncia.den_com_id ? denuncia.dono_comentario_nome : 'Desconhecido';
                            const nomeLabel = denuncia.den_user_id ? 'Denunciado(a):' : denuncia.den_anun_id ? 'Título do Anúncio:' : denuncia.den_for_id ? 'Título do Fórum:' : denuncia.den_post_id ? 'Dono do Post:' : denuncia.den_com_id ? 'Autor do Comentário:' : 'Tipo Desconhecido:';
                            const divNome = document.createElement('div');
                            divNome.innerHTML = `<span class="font-semibold text-gray-800">${nomeLabel}</span> <span class="text-indigo-600 font-semibold">${nome}</span>`;

                            const divMotivo = document.createElement('div');
                            divMotivo.innerHTML = `<span class="font-semibold text-gray-800">Motivo:</span> ${denuncia.den_motivo}`;

                            const email = denuncia.den_user_id ? denuncia.user_email : denuncia.den_anun_id ? denuncia.anun_user_email : denuncia.den_for_id ? denuncia.for_criador_user_email : denuncia.den_post_id ? denuncia.dono_post_email : denuncia.den_com_id ? denuncia.dono_comentario_email: 'Email desconhecido';
                            const divEmail = document.createElement('div');
                            divEmail.className = 'col-span-2';
                            divEmail.innerHTML = `<span class="font-semibold text-gray-800">Email:</span> ${email}`;

                            const divDescricaoDenuncia = document.createElement('div');
                            divDescricaoDenuncia.className = 'col-span-2';
                            divDescricaoDenuncia.innerHTML = `<span class="font-semibold text-gray-800">Descrição da denúncia:</span> ${denuncia.den_descricao || '—'}`;

                            const divDescricao = document.createElement('div');
                            divDescricao.className = 'col-span-2';

                            if (denuncia.den_com_id) {
                                divDescricao.innerHTML = `<span class="font-semibold text-gray-800">Comentário denunciado:</span> ${denuncia.com_comentario || '—'}`;
                            } else if (denuncia.den_post_id) {
                                divDescricao.innerHTML = `<span class="font-semibold text-gray-800">Texto do post denunciado:</span> ${denuncia.pos_texto || '—'}`;
                            } else if (denuncia.den_for_id) {
                                divDescricao.innerHTML = `<span class="font-semibold text-gray-800">Descrição do fórum:</span> ${denuncia.for_descricao || '—'}`;
                            } else if (denuncia.den_anun_id) {
                                divDescricao.innerHTML = `<span class="font-semibold text-gray-800">Descrição do anúncio:</span> ${denuncia.anun_descricao || '—'}`;
                            } else {
                                divDescricao.innerHTML = `<span class="font-semibold text-gray-800">Descrição:</span> —`;
                            }



                            // Monta o grid
                            gridInfo.appendChild(divTipo);
                            gridInfo.appendChild(divData);
                            gridInfo.appendChild(divNome);
                            gridInfo.appendChild(divMotivo);
                            gridInfo.appendChild(divEmail);
                            gridInfo.appendChild(divDescricaoDenuncia);                            
                            gridInfo.appendChild(divDescricao);

                            // Botões
                            const botoes = document.createElement('div');
                            botoes.className = 'flex flex-wrap gap-4 mt-6';

                            const buttonCancelar = document.createElement('button');
                            buttonCancelar.className = 'cursor-pointer px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition';
                            buttonCancelar.textContent = 'Cancelar Denúncia';
                            buttonCancelar.onclick = function () {
                                excluirDenuncia(denuncia.den_id);
                            };

                            // const buttonSuspender = document.createElement('button');
                            // buttonSuspender.className = 'cursor-pointer px-4 py-2 border border-red-500 text-red-600 font-semibold rounded-md hover:bg-red-50 transition';
                            // buttonSuspender.textContent = 'Suspender usuário';
                            // buttonSuspender.onclick = function () {
                            //     suspenderUsuario(denuncia.den_user_id);
                            // };

                            const buttonBanir = document.createElement('button');
                            buttonBanir.className = 'cursor-pointer px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition';
                            buttonBanir.textContent = 'Banir usuário';
                            buttonBanir.onclick = function () {
                                const id = denuncia.den_anun_id
                                    ? denuncia.dono_anuncio_user_id
                                    : denuncia.den_user_id
                                    ? denuncia.den_user_id
                                    : denuncia.den_for_id
                                    ? denuncia.for_criador_user_id
                                    : denuncia.den_post_id
                                    ? denuncia.dono_post_user_id
                                    : denuncia.dono_comentario_user_id;
                                    excluirDenuncia(denuncia.den_id);
                                    banirUsuario(id);
                            };

                            botoes.appendChild(buttonCancelar);
                            // botoes.appendChild(buttonSuspender);
                            botoes.appendChild(buttonBanir);

                            // Monta o card completo
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
};



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
    await requisitar('GET', 'api/denuncia/suspenderusuario', {id: id})
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