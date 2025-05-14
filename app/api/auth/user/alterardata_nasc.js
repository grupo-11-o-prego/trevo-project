function handleSubmitDataNasc() {
    const form = document.getElementById("alterardata_nasc-form");
    
    const formData = new FormData(form);
    var data_nasc = formData.get('data-nasc');
    
    var ok = "";
    console.log(data_nasc);
    requisitar('POST', '/trevo-project/public/api/alterardatanasc', formData, 'formdata')
        .then(result => {
            console.log(result)
            if (result.erro) {
                console.log('ERRO', result);
                console.error('Erro:', result.erro);
                alert('Ocorreu um erro ao enviar os dados. Tente as.');
                ok = false;
            } else {
                console.log(result);
                if (result.dados.sucesso) {
                    Swal.fire({
                        icon: "success",
                        title: "Data de nascimento atualizada!",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                         willClose: () => {
                           window.location.href = "/trevo-project/public/perfil"; // URL desejada para redirecionamento
                        }
                      });
                } else {
                    alert(result.dados.message);
                }
            }
            // window.location.reload();
        });
}