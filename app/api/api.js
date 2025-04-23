/**
 * Realiza request HTTP
 * 
 * @param {string} metodo - Solicitação (POST/GET)
 * @param {string} url - Para qual rota será enviada a requisição
 * @param {Object} dados - Dados a serem enviados
 * @returns {Promise<Object>} Array com "dados" e "erro"
 */
function requisitar(metodo, url, dados, tipo = 'json') {
    return new Promise((resolve) => {


        // Configuração do método e headers padrão
        let config = {
            method: metodo,
        }

        if (metodo === 'POST') {
            if (tipo == 'json'){
                // Adiciona o corpo da requisição se for POST
                config.body = JSON.stringify(dados);
            } else if (tipo == 'formdata') {
                config.body = dados;
            }
        } else if (metodo === 'GET' && dados) {
            // Constrói a URL com parâmetros de consulta
            const params = new URLSearchParams(dados).toString();
            url += '?' + params;
        }

        // console.log(url);

        //Realiza a requisição
        fetch(url, config)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: (' + response.statusText + ')');
                }

                return response.json();
            })
            .then(data => {
                resolve({
                    dados: data,
                    erro: null
                });
            })
            .catch(error => {
                resolve({
                    dados: null,
                    erro: error.message
                });
            });
    });
}
