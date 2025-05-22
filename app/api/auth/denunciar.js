document.getElementById('denuncia-form').addEventListener('submit', function(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo');
    const id = urlParams.get('id');
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('tipo', tipo);
    formData.append('id', id);
    // console.log("Form: ",formData)
    // var senha = formData.get('tipo');
    // alert(senha)
    var ok = "";
    requisitar('POST', '/trevo-project/public/api/denuncia/denunciar', formData, 'formdata')
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
                        title: "Denunciado com sucesso!",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        willClose: () => {
                          window.location.href = "/trevo-project/public/"; 
                        }
                      });
                } else {
                    alert(result.dados.message);
                }
            }
            // window.location.reload();
        });
});