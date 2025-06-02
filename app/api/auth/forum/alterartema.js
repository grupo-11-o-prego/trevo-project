function handleSubmitForTema() {
    const form = document.getElementById("alterartema-form");
    
    const formData = new FormData(form);
    
    var ok = "";
    // Faz a requisição POST com os dados capturados do formulário
    requisitar('POST', '/trevo-project/public/api/forum/alterartema', formData, 'formdata')
        .then(result => {
            console.log(result)
            if (result.erro) {
                console.log('ERRO', result);
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente .');
                ok = false;
            } else {
                console.log(result);
                if (result.dados.sucesso) {
                    Swal.fire({
                        icon: "success",
                        title: "Tema atualizado!",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                         willClose: () => {
                           window.location.href = "/trevo-project/public/forum-entrar"; // URL desejada para redirecionamento
                        }
                      });
                } else {
                    alert(result.dados.message);
                }
            }
            // window.location.reload();
        });
}