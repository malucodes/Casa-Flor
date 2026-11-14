/* script/script.js */

document.addEventListener('DOMContentLoaded', function() {

    // 1. Array e sorteio de reflexões poéticas da Casa Flor de Dentro
    const reflexoes = [
        "Florescer também é respeitar o próprio tempo.",
        "Respire. Você não precisa ter todas as respostas agora.",
        "Um encontro pode transformar duas vidas.",
        "O carinho também é uma forma de presença.",
        "Cultive a calma. Espalhe afeto.",
        "Às vezes, tudo começa com uma pequena conexão.",
        "Que a gentileza seja parte do caminho."
    ];

    const btnReflexao = document.getElementById('btnNovaReflexao');
    const textoReflexao = document.getElementById('textoReflexao');
    let indiceReflexao = 0;

    if (btnReflexao && textoReflexao) {
        btnReflexao.addEventListener('click', function() {
            indiceReflexao = (indiceReflexao + 1) % reflexoes.length;
            textoReflexao.textContent = '"' + reflexoes[indiceReflexao] + '"';
        });
    }

    // 2. Atribuição de eventos aos botões de Modal na Home via querySelectorAll e laço for
    const botoesModal = document.querySelectorAll('.acionar-modal');
    for (let i = 0; i < botoesModal.length; i++) {
        botoesModal[i].addEventListener('click', function(event) {
            const chave = event.currentTarget.getAttribute('data-item');
            abrirModalCatalogo(chave);
        });
    }

    const btnFecharModal = document.getElementById('btnFecharModal');
    if (btnFecharModal) {
        btnFecharModal.addEventListener('click', fecharModal);
    }

    // 3. Máscara Regex de Telefone e validação complementar no formulário (form.html)
    const celularInput = document.getElementById('celular');
    if (celularInput) {
        celularInput.addEventListener('keydown', mascaraTelefone);
    }

    const formulario = document.getElementById('formFlorDeDentro');
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            const celularValor = celularInput.value;
            if (celularValor.length < 14) {
                alert('Por gentileza, informe o número de celular completo com DDD no formato (XX) XXXXX-XXXX.');
                celularInput.focus();
                event.preventDefault();
            }
        });
    }

    // 4. Recuperação e tratamento dos dados enviados via método GET (formAction.html)
    const diarioResultado = document.getElementById('resultadoGet');
    if (diarioResultado) {
        const params = new URLSearchParams(window.location.search);
        const nome = params.get('nome');
        const email = params.get('email');
        const celular = params.get('celular');
        const interesse = params.get('interesse');
        const modalidade = params.get('modalidade');
        const dataEncontro = params.get('dataEncontro');
        const termos = params.get('termosBemEstar');

        if (nome && email && celular && interesse) {
            diarioResultado.innerHTML = `
                <span class="caligrafia">Registro de Encontro</span>
                <h3>Acolhemos sua intenção, ${nome}.</h3>
                <p class="frase-poetica">"Há muitas formas de encontrar paz. Um lar ou uma prática pode começar com um encontro."</p>
                <ul class="lista-botanica">
                    <li><strong>Nome registrado:</strong> ${nome}</li>
                    <li><strong>E-mail para correspondência:</strong> ${email}</li>
                    <li><strong>Telefone / WhatsApp:</strong> ${celular}</li>
                    <li><strong>Caminho escolhido:</strong> ${interesse}</li>
                    <li><strong>Modalidade preferida:</strong> ${modalidade}</li>
                    <li><strong>Data desejada para visita:</strong> ${dataEncontro}</li>
                    <li><strong>Pacto de Bem-Estar Animal:</strong> ${termos ? 'Confirmado com respeito e afeto' : 'Pendente'}</li>
                </ul>
                <p>Nossa equipe e protetores parceiros entrarão em contato em breve para confirmar seu horário com tranquilidade.</p>
            `;
        } else {
            diarioResultado.innerHTML = `
                <span class="caligrafia">Página em Branco</span>
                <h3>Nenhuma inscrição localizada nesta folha</h3>
                <p>Para registrar seu agendamento de prática ou interesse em adoção responsável, preencha nosso formulário.</p>
                <p><a class="btn-editorial" href="form.html">Ir para Agendamento e Adoção</a></p>
            `;
        }
    }
});

// Controle da Janela Modal utilizando estrutura condicional switch
function abrirModalCatalogo(item) {
    const titulo = document.getElementById('modalTitulo');
    const descricao = document.getElementById('modalDescricao');
    const detalhe = document.getElementById('modalDetalhe');

    switch (item) {
        case 'yoga-tradicional':
            titulo.textContent = 'Yoga Tradicional e Contemplação';
            descricao.textContent = 'Prática fluida de posturas (ásanas) e respiração consciente voltada ao florescimento interior e respeito aos limites do corpo.';
            detalhe.textContent = 'Encontros às terças e quintas, às 08h e 18h. Grupos reduzidos de até 8 pessoas.';
            break;
        case 'cat-puppy-yoga':
            titulo.textContent = 'Cat Yoga, Puppy Yoga e Encontros Afetivos';
            descricao.textContent = 'Sessões suaves de mindfulness e alongamento em um jardim seguro onde cães e gatos resgatados circulam livremente, se e quando desejarem.';
            detalhe.textContent = 'Sábados às 10h. 100% da contribuição apoia o abrigo parceiro e incentiva a adoção responsável.';
            break;
        case 'meditacao-budista':
            titulo.textContent = 'Meditação Guiada e Silêncio Contemplativo';
            descricao.textContent = 'Inspirada na serenidade das tradições orientais para cultivar atenção plena (mindfulness), compaixão e presença.';
            detalhe.textContent = 'Quartas e sextas às 19h. Espaço silencioso com almofadas orgânicas e infusões de camomila.';
            break;
        case 'bento':
            titulo.textContent = 'História de Bento (Cão Adulto • 3 anos)';
            descricao.textContent = 'Bento foi resgatado próximo a um jardim chuvoso. Tem olhar sereno, adora cochilar ao sol da manhã e ouvir leitura em voz baixa.';
            detalhe.textContent = 'Vacinado, castrado e vermifugado. Procura um lar tranquilo com espaço para sonecas longas.';
            break;
        case 'aurora':
            titulo.textContent = 'História de Aurora (Gata Jovem • 1 ano e meio)';
            descricao.textContent = 'Aurora observa as folhas caírem pela janela como quem lê poesia. É delicada, afetuosa no próprio tempo e adora companhia silenciosa.';
            detalhe.textContent = 'Vacinada, castrada e acostumada com outros gatos. Exige lar telado e seguro.';
            break;
        case 'oliver':
            titulo.textContent = 'História de Oliver (Filhote • 7 meses)';
            descricao.textContent = 'Curioso e gentil, Oliver aprendeu a confiar nas pessoas durante nossas rodas de relaxamento no gramado.';
            detalhe.textContent = 'Vacinado e microchipado. Adoção mediante entrevista com organização protetora parceira.';
            break;
        default:
            titulo.textContent = 'Casa Flor de Dentro';
            descricao.textContent = 'Um espaço para respirar, florescer e acolher.';
            detalhe.textContent = 'Consulte nossa agenda completa de práticas e encontros.';
    }

    document.getElementById('janelaModal').style.display = 'block';
}

function fecharModal() {
    document.getElementById('janelaModal').style.display = 'none';
}

// Função de Máscara de Telefone baseada em Expressão Regular (Regex)
function mascaraTelefone(event) {
    let tecla = event.key;
    let telefone = event.target.value.replace(/\D+/g, "");

    if (/^[0-9]$/i.test(tecla)) {
        telefone = telefone + tecla;
        let tamanho = telefone.length;

        if (tamanho >= 12) {
            event.preventDefault();
            return false;
        }
        if (tamanho > 10) {
            telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (tamanho > 5) {
            telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (tamanho > 2) {
            telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
            telefone = telefone.replace(/^(\d*)/, "($1");
        }
        event.target.value = telefone;
    }

    if (!["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(tecla)) {
        event.preventDefault();
    }
}