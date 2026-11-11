
let cpfsRecusados = [
    "90978532165",
    "19301134097",
    "44986872897",
    "83451879346",
    "20305735201"
];

let cpfsAceitos =[
    "78432620913",
    "99853375649",
    "98972300123",
    "33106789342",
    "16588700243"
];

function validarCPF() {

    let cpf = document.getElementById("cpf").value;

    if (cpfsRecusados.includes(cpf)) {
        alert("Este CPF está na lista de recusados.");
        return;
    }

}

function consultarCep() {

    let cep = document.getElementById("cep").value;

    fetch("https://viacep.com.br/ws/" + cep + "/json/")
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(dados) {

        document.getElementById("estado").value = dados.estado;

        document.getElementById("cidade").value = dados.localidade;

        document.getElementById("logradouro").value = dados.logradouro;

        document.getElementById("bairro").value = dados.bairro;

         console.log(dados);
        });

}