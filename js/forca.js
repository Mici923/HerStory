let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;

const palavras = [
    palavra001 ={
        nome : "REVOLUCAO INDUSTRIAL",
        categoria : " Surgimento de máquinas a vapor, urbanização acelerada, transformação dos métodos de produção, crescimento das indústrias têxtil e siderúrgica, mudanças sociais e econômicas profundas."
    },
    palavra002={
        nome : "REVOLUCAO FRANCESA",
        categoria : "Derrubada do Antigo Regime, proclamação dos direitos do homem e do cidadão, execução do rei Luís XVI, ascensão e queda de Robespierre, período do Terror, surgimento do nacionalismo."
    },
    palavra003={
        nome : "SEGUNDA GUERRA MUNDIAL",
        categoria : "O conflito global mais devastador da história, envolvendo a maioria das nações do mundo. Caracterizou-se pelo uso de armas avançadas, incluindo aviões, tanques e armas nucleares. A guerra resultou em milhões de mortes, incluindo o Holocausto, e teve consequências geopolíticas duradouras, como o surgimento da Guerra Fria entre as superpotências vitoriosas."

    },
    palavra004={
        nome : "REFORMA PROTESTANTE",
        categoria : "Movimento liderado por figuras como Martinho Lutero e João Calvino, que contestou a autoridade da Igreja Católica Romana, resultando em divisões religiosas e transformações na sociedade europeia."
    }


];
criarPalavraSecreta();
function criarPalavraSecreta(){
    const indexPalavra = parseInt(Math.random() *palavras.length)

    palavraSecretaSorteada = palavras [indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
    console.log(palavraSecretaSorteada)
    console.log(palavraSecretaCategoria)

}
montarPalavraNaTela();
function montarPalavraNaTela(){
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";

    console.log(palavraSecretaSorteada)

    for(i = 0; i< palavraSecretaSorteada.length; i++){
        if(listaDinamica[i] == undefined){
            if (palavraSecretaSorteada[i]== " ") {
                listaDinamica[i]=" ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                listaDinamica[i] = "&nbsp;"
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }
           
        }
        else{
            if (palavraSecretaSorteada[i]== " ") {
                listaDinamica[i]=" ";
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'>" + listaDinamica[i] + "</div>"
            }
            else{
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
            }
           
        }
    }

};

function verificaLetraEscolhida(letra){
    document.getElementById("tecla-" + letra).disabled = true;
    if(tentativas > 0)
    {
        mudarStyleLetra("tecla-" + letra, false);
        comparalistas(letra);
        montarPalavraNaTela();

    }

}

document.addEventListener('keydown', function(event) {

    var codigoTecla = event.keyCode || event.which;
    
    if ((codigoTecla >= 65 && codigoTecla <= 90) || (codigoTecla >= 97 && codigoTecla <= 122)) {
        
        var letra = String.fromCharCode(codigoTecla).toUpperCase();
        
       
        var botaoLetra = document.getElementById("tecla-" + letra);
        if (!botaoLetra.disabled) {
            
            verificaLetraEscolhida(letra);
            
           
            botaoLetra.disabled = true;
            
            
            mudarStyleLetra("tecla-" + letra);
        }
    }
});


function mudarStyleLetra(idBotao) {
    var botao = document.getElementById(idBotao);
    botao.style.backgroundColor = "gray";
    botao.style.color = "white";
    botao.style.cursor = "default";
}

function mudarStyleLetra(tecla, condicao) {
    if(condicao == false)
    {
        document.getElementById(tecla).style.background = "#4682b4";
        document.getElementById(tecla).style.color = "#ffffff";
    }
    else{
        document.getElementById(tecla).style.background = "#008000";
        document.getElementById(tecla).style.color = "#ffffff";
    }
}

function carregaImagemForca(){
    switch(tentativas){
        case 5:
            document.getElementById("imagem").style.background = "url('./img/forca2.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background = "url('./img/forca3.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background = "url('./img/forca4.png')";
            break;
        case 2:S
           document.getElementById("imagem").style.background = "url('./img/forca5.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background = "url('./img/forca6.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background = "url('./img/forca7.png')";
            break;
        default:
            document.getElementById("imagem").style.background = "url('./img/forca1.png')";
            break;
    }

}

function comparalistas(letra){
    const pos = palavraSecretaSorteada.indexOf(letra)
    if(pos < 0){
        tentativas--
        carregaImagemForca();

        if(tentativas == 0)
        {
            abreModal("OPS!", "Não foi dessa vez... A palavra secreta era <br> " + palavraSecretaSorteada);
           piscarBotaoJogarNovamente();
        }
     
    }
    else{
        mudarStyleLetra("tecla-" + letra, true);
        for(i = 0; i < palavraSecretaSorteada.length; i++)
        {
            if(palavraSecretaSorteada[i] == letra){
                listaDinamica[i] = letra;
                
            }
        
        }
     
    }

    let vitoria = true;
    for(i = 0; i < palavraSecretaSorteada.length; i++ ){
        if(palavraSecretaSorteada[i] != listaDinamica[i]){
            vitoria = false; 
        }
    }

    if(vitoria == true)
    {
        abreModal("PARABÉNS!", "Você venceu...");
        tentativas = 0;
        piscarBotaoJogarNovamente();
    }
}

async function piscarBotaoJogarNovamente(){
    while (jogarNovamente == true) {
        document.getElementById("btnReiniciar").style.backgroundColor = 'blue';
        document.getElementById("btnReiniciar").style.scale = 1.3;
        await atraso(500)
        document.getElementById("btnReiniciar").style.backgroundColor = 'red';
        document.getElementById("btnReiniciar").style.scale = 1.2;
        await atraso(500)
        document.getElementById("btnReiniciar").style.backgroundColor = 'green';
        document.getElementById("btnReiniciar").style.scale = 1;
        await atraso(500)
    }
 
}

async function atraso(tempo){
    return new Promise(x => setTimeout(x, tempo))
}

function abreModal( titulo, mensagem){
    let modalTitulo = document.getElementById("exampleModalLabel")
    modalTitulo.innerText = titulo;

    let modalBody = document.getElementById("modaBody")
    modalBody.innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

let btnReiniciar = document.querySelector("#btnReiniciar")
btnReiniciar.addEventListener("click", function(){
    jogarNovamente = false;
    location.reload();
});
