/* ================================================================
   script.js — ContábilGold
   Arquivo de comportamentos e interatividade
   Importado no index.html ANTES do </body>:
   <script src="script.js"></script>
   
   POR QUE NO FIM DO BODY?
   O script precisa encontrar os elementos do HTML (divs, buttons...).
   Se o <script> ficasse no <head>, o HTML ainda não teria sido
   processado pelo navegador, e os getElementById() retornariam null.
   Colocar no fim garante que o DOM está completo antes de executar.
   ================================================================

   ÍNDICE DE MÓDULOS:
   1. Navbar     — Menu hambúrguer mobile + fechar ao clicar fora
   2. Carrossel  — Slider de depoimentos com auto-play e dots
   3. Observer   — Animações ao rolar a página (IntersectionObserver)
   4. Formulário — Validação de campos + envio simulado
   5. Utilitários — Ano no rodapé + máscara de telefone + smooth scroll
   ================================================================ */


/* ================================================================
   MÓDULO 1 — NAVBAR
   ----------------------------------------------------------------
   Funcionalidades:
   • Botão hambúrguer abre/fecha o menu em mobile
   • Clicar em um link fecha o menu (melhora UX)
   • Clicar fora do menu fecha o menu
   
   CONCEITOS:
   • document.getElementById(id) → busca 1 elemento pelo id=""
   • document.querySelector(seletor) → busca 1 elemento por CSS selector
   • addEventListener(evento, função) → "ouve" um evento e reage
   • classList.toggle/add/remove/contains → manipula classes CSS
   • setAttribute → define um atributo HTML (usado para acessibilidade)
   ================================================================ */

/* Seleciona os elementos da navbar no DOM
   DOM = Document Object Model: a representação JS do HTML */
const navToggle = document.getElementById('navToggle'); /* Botão ≡ */
const navLinks  = document.getElementById('navLinks');  /* Lista <ul> de links */
const navbar    = document.querySelector('.navbar');    /* Barra inteira */

/* addEventListener('click', fn) → executa fn toda vez que houver clique */
navToggle.addEventListener('click', function () {
  /* classList.toggle('aberto'):
     → Se o elemento TEM a classe 'aberto': remove
     → Se o elemento NÃO TEM a classe 'aberto': adiciona
     É o equivalente a um if/else para classes CSS */
  navLinks.classList.toggle('aberto');

  /* Atualiza aria-expanded para leitores de tela (acessibilidade)
     aria-expanded="true" → informa que o menu está aberto
     aria-expanded="false" → informa que o menu está fechado */
  const estaAberto = navLinks.classList.contains('aberto');
  navToggle.setAttribute('aria-expanded', estaAberto.toString());
});

/* ── Navbar: transparente → sólida ao sair da seção hero ────
   IntersectionObserver detecta quando o hero deixa de estar visível.
   Quando entry.isIntersecting = false → hero saiu da tela → adiciona .navbar--scrolled
   Quando entry.isIntersecting = true  → hero voltou      → remove  .navbar--scrolled */
const heroSection = document.getElementById('hero');
if (heroSection) {
  const navbarObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        navbar.classList.toggle('navbar--scrolled', !entry.isIntersecting);
      });
    },
    { threshold: 0.1 } /* dispara quando menos de 10% do hero ainda está visível */
  );
  navbarObserver.observe(heroSection);
}

/* Fecha o menu ao clicar em qualquer link dentro dele
   querySelectorAll → retorna um NodeList (parecido com array) de todos os <a> */
const todosLinks = navLinks.querySelectorAll('a');

todosLinks.forEach(function (link) {
  /* forEach → itera sobre cada elemento (como um for, mas mais elegante) */
  link.addEventListener('click', function () {
    navLinks.classList.remove('aberto');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* Fecha o menu ao clicar em qualquer lugar FORA da navbar */
document.addEventListener('click', function (evento) {
  /* evento.target → o elemento exato que foi clicado
     navbar.contains(alvo) → verifica se o alvo está DENTRO da navbar
     Se NÃO está dentro (!), fechamos o menu */
  if (!navbar.contains(evento.target)) {
    navLinks.classList.remove('aberto');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});


/* ================================================================
   MÓDULO 2 — CARROSSEL DE DEPOIMENTOS
   ----------------------------------------------------------------
   Funcionamento visual:
   • Todos os cards ficam em linha (display: flex no CSS)
   • O wrapper tem overflow: hidden → oculta os cards "fora da tela"
   • O JS move o track com transform: translateX(-Xpx)
     → desloca para a esquerda, revelando o próximo card
   
   CONCEITOS:
   • createElement → cria novo elemento HTML dinamicamente
   • appendChild → adiciona elemento como filho de outro
   • setInterval → executa código repetidamente (auto-play)
   • clearInterval → cancela um setInterval em andamento
   • window.innerWidth → largura atual da janela
   ================================================================ */

/* Referências aos elementos do carrossel */
const track         = document.getElementById('carrosselTrack');  /* O trilho que se move */
const btnAnterior   = document.getElementById('btnAnterior');     /* Seta ← */
const btnProximo    = document.getElementById('btnProximo');      /* Seta → */
const dotsContainer = document.getElementById('carrosselDots');  /* Container dos pontos */

/* Estado do carrossel — variáveis de controle */
let indexAtual     = 0; /* Índice do slide atualmente visível */
let totalSlides    = 4; /* Total de depoimentos */
let slidesVisiveis = 2; /* Quantos slides aparecem ao mesmo tempo */

/* Máximo de posições que podemos avançar
   Ex: 4 slides, 2 visíveis → máximo = 2 (posições 0, 1, 2) */
const maxIndice = Math.max(0, totalSlides - slidesVisiveis);

/* Cria os pontos (dots) indicadores dinamicamente via JavaScript
   Assim, se mudarmos o número de slides, os dots se ajustam sozinhos */
for (let i = 0; i <= maxIndice; i++) {
  /* createElement('button') → cria um elemento <button> no JS
     (ele ainda não está na página, apenas na memória) */
  const dot = document.createElement('button');
  dot.classList.add('depoimentos__dot');
  dot.setAttribute('role', 'tab');
  dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);

  /* Cada dot clicável leva ao slide correspondente
     CLOSURE: a função "captura" o valor de i do loop */
  dot.addEventListener('click', function () {
    irParaSlide(i);
  });

  /* appendChild → insere o dot no container (aparece na página) */
  dotsContainer.appendChild(dot);
}

/* Função principal do carrossel: vai para um slide específico */
function irParaSlide(indice) {
  indexAtual = indice;

  /* Calcula quantos pixels deslocar o track para a esquerda
     Cada slide tem largura = (espaço do container / qtd de slides visíveis)
     + o gap de 16px entre os slides
     
     offsetWidth → largura real do elemento em pixels (inclui padding) */
  const larguraSlide   = track.parentElement.offsetWidth / slidesVisiveis;
  const deslocamentoPx = indice * (larguraSlide + 16);

  /* transform: translateX(-valor) → move o track N pixels para a esquerda
     O sinal negativo é necessário: queremos mover para a esquerda (direção -X) */
  track.style.transform = `translateX(-${deslocamentoPx}px)`;

  /* Atualiza os pontos indicadores:
     Remove .ativo de todos e adiciona só no dot do índice atual */
  const dots = dotsContainer.querySelectorAll('.depoimentos__dot');
  dots.forEach(function (dot, i) {
    /* classList.toggle(classe, condicao):
       → adiciona a classe se condição = true
       → remove a classe se condição = false */
    dot.classList.toggle('ativo', i === indice);
    dot.setAttribute('aria-selected', i === indice ? 'true' : 'false');
  });

  /* Desabilita botões nos extremos para evitar ir "além do limite"
     disabled = true → botão fica inativo (CSS mostra estado visual) */
  btnAnterior.disabled = (indice === 0);
  btnProximo.disabled  = (indice >= maxIndice);
}

/* Seta ← : vai para o slide anterior */
btnAnterior.addEventListener('click', function () {
  if (indexAtual > 0) irParaSlide(indexAtual - 1);
});

/* Seta → : vai para o próximo slide */
btnProximo.addEventListener('click', function () {
  if (indexAtual < maxIndice) irParaSlide(indexAtual + 1);
});

/* Inicializa o carrossel na posição 0 (primeiro slide) */
irParaSlide(0);

/* Auto-play: avança automaticamente a cada 5 segundos
   setInterval(função, intervalo_em_ms) → executa a função repetidamente */
let autoPlay = setInterval(function () {
  /* Operador ternário: condição ? valor_se_true : valor_se_false */
  const proximo = indexAtual >= maxIndice ? 0 : indexAtual + 1;
  irParaSlide(proximo);
}, 5000); /* 5000ms = 5 segundos */

/* Pausa o auto-play quando o mouse está sobre o carrossel (melhor UX) */
track.addEventListener('mouseenter', function () {
  clearInterval(autoPlay); /* Para o setInterval */
});

track.addEventListener('mouseleave', function () {
  /* Reinicia o auto-play quando o mouse sai */
  autoPlay = setInterval(function () {
    const proximo = indexAtual >= maxIndice ? 0 : indexAtual + 1;
    irParaSlide(proximo);
  }, 5000);
});

/* Responsividade do carrossel: ajusta de 2 para 1 slide no mobile */
function ajustarCarrossel() {
  /* window.innerWidth → largura atual da janela (muda ao redimensionar) */
  slidesVisiveis = window.innerWidth <= 768 ? 1 : 2;
  const maxAtual = totalSlides - slidesVisiveis;
  /* Math.min → garante que o índice não ultrapasse o novo máximo */
  irParaSlide(Math.min(indexAtual, maxAtual));
}

/* window 'resize' → dispara sempre que o tamanho da janela muda */
window.addEventListener('resize', ajustarCarrossel);


/* ================================================================
   MÓDULO 3 — INTERSECTION OBSERVER
   ----------------------------------------------------------------
   Detecta quando elementos entram na área visível da tela (viewport)
   e adiciona a classe .visivel → ativa a animação CSS definida em style.css
   
   VANTAGEM sobre o evento 'scroll':
   • O IntersectionObserver é assíncrono e não bloqueia a thread principal
   • Muito mais eficiente: não executa código em cada pixel de scroll
   
   CONCEITOS:
   • new IntersectionObserver(callback, options) → cria o observador
   • observer.observe(elemento) → começa a observar um elemento
   • observer.unobserve(elemento) → para de observar (libera memória)
   • entry.isIntersecting → true quando o elemento entrou na tela
   ================================================================ */

/* Cria o observador com callback e configurações */
const observer = new IntersectionObserver(
  function (entradas) {
    /* entradas = array de IntersectionObserverEntry
       Contém todos os elementos que mudaram de estado */
    entradas.forEach(function (entrada) {
      /* isIntersecting = true → o elemento entrou na área visível */
      if (entrada.isIntersecting) {
        /* Adiciona .visivel → CSS anima de opacidade 0 para 1 */
        entrada.target.classList.add('visivel');

        /* Para de observar o elemento após a primeira animação
           (animação acontece apenas UMA vez, ao entrar na tela) */
        observer.unobserve(entrada.target);
      }
    });
  },
  {
    threshold:   0.15, /* Dispara quando 15% do elemento está visível */
    rootMargin: '0px 0px -50px 0px'
    /* rootMargin: margem ao redor da viewport
       '-50px 0px' no bottom → dispara 50px ANTES do fim da tela
       Cria a sensação de que os elementos aparecem "antes da hora" */
  }
);

/* Seleciona TODOS os elementos com classe .animar e começa a observá-los */
document.querySelectorAll('.animar').forEach(function (elemento) {
  observer.observe(elemento);
});


/* ================================================================
   MÓDULO 4 — FORMULÁRIO DE CONTATO
   ----------------------------------------------------------------
   Funcionalidades:
   • Validação client-side (no navegador) antes de enviar
   • Feedback visual nos campos com erro (borda vermelha + mensagem)
   • Limpeza do erro em tempo real ao digitar
   • Simulação de envio com feedback de loading
   
   IMPORTANTE — Segurança:
   A validação client-side MELHORA A UX, mas NÃO garante segurança.
   Em produção, SEMPRE valide também no servidor (backend).
   Um usuário pode desativar o JavaScript e enviar dados inválidos.
   
   CONCEITOS:
   • event.preventDefault() → cancela o comportamento padrão do evento
   • .value → acessa o conteúdo de um input
   • .trim() → remove espaços do início e fim da string
   • RegExp (regex) → expressão regular para validar formatos
   • setTimeout → executa código após um tempo de espera
   ================================================================ */

/* Referências ao formulário e seus elementos */
const formContato = document.getElementById('formContato');
const formSucesso = document.getElementById('formSucesso');
const btnEnviar   = document.getElementById('btnEnviar');

/* Função auxiliar: exibe mensagem de erro em um campo específico */
function mostrarErro(campo, mensagem) {
  /* Muda a borda do input para vermelho (feedback visual imediato) */
  campo.style.borderColor = '#e57373';

  /* Constrói o id do span de erro correspondente ao campo
     Exemplo: campo.id = 'nome' → erroId = 'erroNome' */
  const primeiraLetra = campo.id.charAt(0).toUpperCase(); /* 'n' → 'N' */
  const restante      = campo.id.slice(1);                /* 'ome' */
  const erroId        = 'erro' + primeiraLetra + restante; /* 'erroNome' */

  const erroEl = document.getElementById(erroId);
  if (erroEl) {
    /* textContent → define o texto do elemento (sem HTML, mais seguro) */
    erroEl.textContent    = mensagem;
    erroEl.style.display  = 'block'; /* Exibe o span que estava hidden */
  }
}

/* Função auxiliar: remove a mensagem de erro de um campo */
function limparErro(campo) {
  campo.style.borderColor = ''; /* Remove o estilo inline (volta ao CSS) */

  const primeiraLetra = campo.id.charAt(0).toUpperCase();
  const restante      = campo.id.slice(1);
  const erroId        = 'erro' + primeiraLetra + restante;

  const erroEl = document.getElementById(erroId);
  if (erroEl) {
    erroEl.textContent   = '';
    erroEl.style.display = 'none'; /* Oculta novamente */
  }
}

/* Limpa erros em tempo real enquanto o usuário digita
   Eventos 'input' → dispara em cada tecla pressionada */
['nome', 'email', 'mensagem'].forEach(function (idCampo) {
  const campo = document.getElementById(idCampo);
  if (campo) {
    campo.addEventListener('input', function () {
      limparErro(campo);
    });
  }
});

/* Evento de envio do formulário */
formContato.addEventListener('submit', function (evento) {
  /* preventDefault() → IMPEDE que o formulário seja enviado normalmente
     Sem isso, a página recarregaria ao submeter (comportamento padrão do HTML) */
  evento.preventDefault();

  /* Captura os valores dos campos */
  const nome     = document.getElementById('nome');
  const email    = document.getElementById('email');
  const mensagem = document.getElementById('mensagem');
  const lgpd     = document.getElementById('lgpd');

  /* Flag de controle: começa true, vira false se houver qualquer erro */
  let formularioValido = true;

  /* ── VALIDAÇÃO 1: Nome obrigatório (mínimo 3 caracteres) ──── */
  /* .value → conteúdo atual do campo
     .trim() → remove espaços no início/fim: " João " → "João"
     .length → número de caracteres da string */
  if (!nome.value.trim() || nome.value.trim().length < 3) {
    mostrarErro(nome, 'Por favor, informe seu nome completo (mínimo 3 caracteres).');
    formularioValido = false;
  }

  /* ── VALIDAÇÃO 2: E-mail com formato válido ────────────────── */
  /* RegEx (Expressão Regular): padrão para validar formatos de texto
     /^[^\s@]+@[^\s@]+\.[^\s@]+$/
     ^ → início da string
     [^\s@]+ → 1+ caracteres que NÃO sejam espaço ou @
     @ → o símbolo @ literal
     \. → o ponto literal (\ escapa o . que normalmente = "qualquer char")
     $ → fim da string
     
     .test(valor) → retorna true se o valor bate com o padrão */
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !regexEmail.test(email.value)) {
    mostrarErro(email, 'Por favor, informe um e-mail válido.');
    formularioValido = false;
  }

  /* ── VALIDAÇÃO 3: Mensagem obrigatória (mínimo 10 caracteres) */
  if (!mensagem.value.trim() || mensagem.value.trim().length < 10) {
    mostrarErro(mensagem, 'Por favor, descreva sua necessidade (mínimo 10 caracteres).');
    formularioValido = false;
  }

  /* ── VALIDAÇÃO 4: Checkbox LGPD deve estar marcado ──────────
     lgpd.checked → true se o checkbox está marcado, false se não */
  if (!lgpd.checked) {
    lgpd.style.outline = '2px solid #e57373'; /* Destaca o checkbox com erro */
    alert('Por favor, aceite a Política de Privacidade para continuar.');
    formularioValido = false;
  } else {
    lgpd.style.outline = ''; /* Remove o destaque se estiver OK */
  }

  /* ── ENVIO SIMULADO ─────────────────────────────────────────
     Se todas as validações passaram, simulamos o envio.
     
     Em produção real, usaríamos a Fetch API:
     fetch('/api/contato', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ nome: nome.value, email: email.value, ... })
     })
     .then(response => response.json())
     .then(data => { exibir sucesso })
     .catch(error => { exibir erro })
  */
  if (formularioValido) {
    /* Feedback de loading: muda texto e desabilita o botão */
    btnEnviar.textContent = 'Enviando...';
    btnEnviar.disabled    = true;

    /* setTimeout(função, ms) → executa a função após N milissegundos
       Aqui simula o tempo de resposta de um servidor (1.5 segundos) */
    setTimeout(function () {
      /* Esconde o formulário e exibe a mensagem de sucesso */
      formContato.style.display = 'none';
      formSucesso.style.display = 'block';

      /* .reset() → limpa todos os campos do formulário */
      formContato.reset();
    }, 1500);
  }
});


/* ================================================================
   MÓDULO 5 — UTILITÁRIOS
   ----------------------------------------------------------------
   Pequenas funcionalidades independentes que melhoram a experiência
   ================================================================ */

/* ── Ano dinâmico no rodapé ───────────────────────────────────
   new Date() → cria um objeto com a data e hora atual
   .getFullYear() → retorna o ano com 4 dígitos (ex: 2025)
   textContent → define o texto do elemento (seguro contra XSS) */
const elementoAno = document.getElementById('anoAtual');
if (elementoAno) {
  elementoAno.textContent = new Date().getFullYear();
}

/* ── Máscara de telefone ──────────────────────────────────────
   Formata o campo de telefone enquanto o usuário digita:
   21999998888 → (21) 99999-8888
   
   REGEX usada:
   /\D/g → qualquer caractere que NÃO seja dígito, globalmente
   .replace(/\D/g, '') → remove tudo que não é número
   
   Depois aplicamos o formato com replace e grupos de captura:
   /^(\d{2})(\d{5})(\d{4})/ → captura 3 grupos: DDD, 5 dígitos, 4 dígitos
   '($1) $2-$3' → formata como (DDD) XXXXX-XXXX */
const campTelefone = document.getElementById('telefone');
if (campTelefone) {
  campTelefone.addEventListener('input', function (e) {
    /* Remove tudo que não é número */
    let valor = e.target.value.replace(/\D/g, '');

    /* Aplica a máscara progressivamente conforme o usuário digita */
    if (valor.length >= 11) {
      /* Celular com 11 dígitos: (21) 99999-8888 */
      valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (valor.length >= 7) {
      /* Fixo com 10 dígitos: (21) 2222-3344 */
      valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (valor.length >= 3) {
      /* Início da digitação: (21) ... */
      valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    }

    /* Atualiza o campo com o valor formatado */
    e.target.value = valor;
  });
}

/* ── Smooth scroll aprimorado ────────────────────────────────
   O CSS scroll-behavior: smooth cuida do scroll básico.
   Este JS adiciona o desconto da altura da navbar (sticky)
   para que o título da seção não fique escondido sob a barra.
   
   Seleciona todos os links que apontam para âncoras internas:
   a[href^="#"] → links cujo href COMEÇA com "#" */
document.querySelectorAll('a[href^="#"]').forEach(function (ancora) {
  ancora.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    /* Ignora o href="#" puro (que vai apenas ao topo) */
    if (href === '#') return;

    /* Tenta encontrar o elemento alvo na página */
    const alvo = document.querySelector(href);
    if (alvo) {
      e.preventDefault(); /* Cancela o comportamento padrão do link */

      /* getBoundingClientRect() → retorna a posição do elemento
         relativa à viewport (área visível da janela)
         .top → distância do topo da viewport
         window.pageYOffset → quanto a página já rolou (scroll atual)
         Soma = posição absoluta do elemento na página */
      const posicaoElemento = alvo.getBoundingClientRect().top + window.pageYOffset;

      /* offsetHeight → altura real do elemento em pixels
         Descontamos a navbar para o título não ficar escondido */
      const alturaNavbar = navbar.offsetHeight;
      const margemExtra  = 20; /* 20px de folga visual */

      /* scrollTo → rola a página para uma posição específica
         behavior: 'smooth' → animação suave */
      window.scrollTo({
        top:      posicaoElemento - alturaNavbar - margemExtra,
        behavior: 'smooth'
      });
    }
  });
});
