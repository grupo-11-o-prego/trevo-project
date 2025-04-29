document.getElementById('anuncio-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    var ok = "";
    requisitar('POST', '/trevo-project/public/api/criaranuncio', formData, 'formdata')
        .then(result => {
            console.log(result)
            if (result.erro) {
                // console.log('ERRO', result);
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente ss.');
				ok = false;
            } else {
                console.log(result);
                if (result.dados.sucesso) {
                    Swal.fire({
                        icon: "success",
                        title: "Cadastro realizado!",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        willClose: () => {
                          window.location.href = "/trevo-project/public/anuncio"; 
                        }
                      });
                } else {
                    alert(result.dados.message);
                }
            }
            // window.location.reload();
        });
});