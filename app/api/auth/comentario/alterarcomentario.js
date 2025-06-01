function handleSubmitComentario() {
    const form = document.getElementById("alterarnome-comentario");
    
    const formData = new FormData(form);
    var senhaat = formData.get('comentario');
    // console.log(formData, formData.get('senha-atual'));
    alert(senhaat)
    
    var ok = "";
    // Faz a requisição POST com os dados capturados do formulário
    requisitar('POST', '/trevo-project/public/api/comentario/alterar', formData, 'formdata')
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
                        title: "Comentario atualizado!",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                         willClose: () => {
                           window.location.reload()
                        }
                      });
                } else {
                    alert(result.dados.message);
                }
            }
            // window.location.reload();
        });
}