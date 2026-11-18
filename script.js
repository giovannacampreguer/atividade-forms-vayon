
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
let formularioValido = true;

function validarCPF() {

    let cpf = document.getElementById("cpf").value;

    if (cpfsRecusados.includes(cpf)) {

        document.getElementById("cpf").classList.add("erro");
        document.getElementById("erroCpf").innerText = "Este CPF está na lista de recusados.";

        return false;

    } else {

        document.getElementById("cpf").classList.remove("erro");
        document.getElementById("erroCpf").innerText = "";

        return true;

    }

}

function validarInicioVigencia() {

    let inicio = document.getElementById("inicioVigencia").value;

    let hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let dataInicio = new Date(inicio + "T00:00:00");

    if (inicio !== "" && dataInicio < hoje) {

        document.getElementById("inicioVigencia").classList.add("erro");
        document.getElementById("erroInicio").innerText = "A data não pode ser anterior ao dia atual.";

        return false;

    } else {

        document.getElementById("inicioVigencia").classList.remove("erro");
        document.getElementById("erroInicio").innerText = "";

        return true;

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

    if (dias < 365){

    
        document.getElementById("fimVigencia").classList.add("erro");
        document.getElementById("erroFim").innerText = "A vigência precisa ser de pelo menos 365 dias.";

        document.getElementById("diasVigencia").value = "";

        return false;

    } else {

        document.getElementById("fimVigencia").classList.remove("erro");
        document.getElementById("erroFim").innerText = "";

        document.getElementById("diasVigencia").value = dias;

        return true;

    } }


function consultarCep() {

    let cep = document.getElementById("cep").value;

    if (cepsRecusados.includes(cep)) {
        document.getElementById("cep").classList.add("erro");
        document.getElementById("erroCep").innerText = "Este CEP está na lista de recusados.";
        return Promise.resolve(false);
    }

    return fetch("https://viacep.com.br/ws/" + cep + "/json/")
        .then(function(resposta) {
            return resposta.json();
        })
        .then(function(dados) {

            document.getElementById("cep").classList.remove("erro");
            document.getElementById("erroCep").innerText = "";

            document.getElementById("estado").value = dados.estado;
            document.getElementById("cidade").value = dados.localidade;
            document.getElementById("logradouro").value = dados.logradouro;
            document.getElementById("bairro").value = dados.bairro;

            return true;
        })
        .catch(function() {
            document.getElementById("cep").classList.add("erro");
            document.getElementById("erroCep").innerText = "Não foi possível consultar o CEP.";
            return false;
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

        document.getElementById("valorPremio").classList.add("erro");
        document.getElementById("erroPremio").innerText = "O valor mínimo do prêmio é R$ 5.000,00.";

        return false;

    }

    if (cobertura === "incendio" && valor > 1000000) {

        document.getElementById("valorPremio").classList.add("erro");
        document.getElementById("erroPremio").innerText = "O valor máximo para incêndio é R$ 1.000.000,00.";

        return false;

    }

    if (cobertura === "furtos" && valor > 500000) {

        document.getElementById("valorPremio").classList.add("erro");
        document.getElementById("erroPremio").innerText = "O valor máximo para furtos é R$ 500.000,00.";

        return false;

    }

    if (cobertura === "danosEletricos" && valor > 1500000) {

        document.getElementById("valorPremio").classList.add("erro");
        document.getElementById("erroPremio").innerText = "O valor máximo para danos elétricos é R$ 1.500.000,00.";

        return false;

    }

    document.getElementById("valorPremio").classList.remove("erro");
    document.getElementById("erroPremio").innerText = "";

    return true;

}

function enviarFormulario(event) {
    event.preventDefault();

    let cpfValido = validarCPF();
    let inicioValido = validarInicioVigencia();
    let vigenciaValida = calcularVigencia();
    let premioValido = validarPremio();

    if (cpfValido === false || inicioValido === false || vigenciaValida === false || premioValido === false) {
        return false;
    }

    consultarCep().then(function(cepValido) {

        if (cepValido === false) {
            return;
        }

        alert("Formulário enviado com sucesso!");

    });

    return false;
}