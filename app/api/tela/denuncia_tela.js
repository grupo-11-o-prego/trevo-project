window.onload = async function () {
    if (document.getElementById('body-denuncias')) {
        await requisitar('GET', 'api/denuncia/listar')  // A URL da API
            .then(result => {
                if (result.erro) {
                    console.log(result);
                    console.error('Erro:', result.erro);
                    alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
                } else {
                    body = document.getElementById('body-denuncias');
                    console.log(result.dados);
                    if (result.dados.sucesso && result.dados.result) {
                        result.dados.result.forEach(denuncia => {
                            const tr = document.createElement('tr');
    
                            const id = document.createElement('td');
                            id.textContent = denuncia.den_id;
    
                            const nome = document.createElement('td');
                            nome.textContent = denuncia.user_nome;
    
                            const email = document.createElement('td');
                            email.textContent = denuncia.user_email;
    
                            const buttons = document.createElement('td');
                            const buttonRevisar = document.createElement('button');
                            buttonRevisar.className = 'btn btn-edit';
                            buttonRevisar.textContent = 'Revisar';
                            buttonRevisar.onclick = function () { revisarDenuncia(denuncia.den_id) };
    
                            const buttonExcluir = document.createElement('button');
                            buttonExcluir.className = 'btn btn-delete';
                            buttonExcluir.textContent = 'Excluir';
                            buttonExcluir.onclick = function () { excluirDenuncia(denuncia.den_id) };

    
                            buttons.appendChild(buttonRevisar);
                            buttons.appendChild(buttonExcluir);
                            
                            tr.appendChild(id);
                            tr.appendChild(nome);
                            tr.appendChild(email);
                            tr.appendChild(buttons);
    
                            body.appendChild(tr)
    
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