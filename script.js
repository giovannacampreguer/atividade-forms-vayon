
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

let cepsRecusados =[
    "01310100",
    "20040002",
    "30130000",
    "70040010",
    "80010000"
]

let cepsAceitos =[
    "66010000",
    "50010000",
    "60060440",
    "90010150",
    "69005040"
]

function validarCPF() {

    let cpf = document.getElementById("cpf").value;

    if (cpfsRecusados.includes(cpf)) {
        alert("Este CPF está na lista de recusados.");
        return;
    }

}

function validarInicioVigencia() {

    let inicio = document.getElementById("inicioVigencia").value;

    let hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let dataInicio = new Date(inicio + "T00:00:00");

    if (dataInicio < hoje) {
        alert("A data não pode ser anterior ao dia atual.");
        document.getElementById("inicioVigencia").value = "";
    }

}


function calcularVigencia() {

    let inicio = document.getElementById("inicioVigencia").value;
    let fim = document.getElementById("fimVigencia").value;

    if (inicio === "" || fim === "") {
        return;
    }

    let dataInicio = new Date(inicio + "T00:00:00");
    let dataFim = new Date(fim + "T00:00:00");

    let diferenca = dataFim - dataInicio;

    let dias = diferenca / (1000 * 60 * 60 * 24);

    if (dias < 365) {
        alert("A vigência precisa ser de pelo menos 365 dias.");

        document.getElementById("fimVigencia").value = "";
        document.getElementById("diasVigencia").value = "";

        return;
    }

    document.getElementById("diasVigencia").value = dias;

}


function consultarCep() {

    let cep = document.getElementById("cep").value;

    if (cepsRecusados.includes(cep)) {
    alert("Este CEP está na lista de recusados.");
    return;
}

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


function validarPremio() {

    let cobertura = document.getElementById("cobertura").value;
    let valor = document.getElementById("valorPremio").value;

    if (cobertura === "" || valor === "") {
        return;
    }

    valor = Number(valor);

    if (valor < 5000) {
        alert("O valor mínimo do prêmio é R$ 5.000,00.");
        return;
    }

    if (cobertura === "incendio" && valor > 1000000) {
        alert("O valor máximo para incêndio é R$ 1.000.000,00.");
        return;
    }

    if (cobertura === "furtos" && valor > 500000) {
        alert("O valor máximo para furtos é R$ 500.000,00.");
        return;
    }

    if (cobertura === "danosEletricos" && valor > 1500000) {
        alert("O valor máximo para danos elétricos é R$ 1.500.000,00.");
        return;
    }

}
