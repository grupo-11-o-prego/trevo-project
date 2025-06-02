function handleSubmitStatus() {
    const form = document.getElementById("alterarstatus-form");
    
    const formData = new FormData(form);
    var contato = formData.get('contato');
    
    var ok = "";
    requisitar('POST', '/trevo-project/public/api/anuncio/alterarstatus', formData, 'formdata')
        .then(result => {
            console.log(result)
            if (result.erro) {
                console.log('ERRO', result);
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente a.');
                ok = false;
            } else {
                console.log(result);
                if (result.dados.sucesso) {
                    Swal.fire({
                        icon: "success",
                        title: "Status atualizado!",
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