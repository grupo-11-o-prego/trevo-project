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

                            const divNome = document.createElement('div');
                            divNome.innerHTML = `<span class="font-semibold text-gray-800">Nome:</span> ${denuncia.user_nome}`;

                            const divEmail = document.createElement('div');
                            divEmail.innerHTML = `<span class="font-semibold text-gray-800">Email:</span> ${denuncia.user_email}`;

                            gridInfo.appendChild(divNome);
                            gridInfo.appendChild(divEmail);

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

                            botoes.appendChild(buttonRevisar);
                            botoes.appendChild(buttonExcluir);

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