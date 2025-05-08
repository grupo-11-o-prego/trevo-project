function handleSubmit() {
    const form = document.getElementById("alterarsenha-form");
    
    const formData = new FormData(form);
    var senhaat = formData.get('senha_atual');
    var senhanov = formData.get('senha_nova');
    // console.log(formData, formData.get('senha-atual'));
    alert(senhaat)
    
    var ok = "";
    // Faz a requisição POST com os dados capturados do formulário
    requisitar('POST', '/trevo-project/public/api/alterarsenha', formData, 'formdata')
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
                        title: "Senha atualizada!",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        willClose: () => {
                          window.location.href = "/trevo-project/public/login"; // URL desejada para redirecionamento
                        }
                      });
                } else {
                    alert(result.dados.message);
                }
            }
            // window.location.reload();
        });
}