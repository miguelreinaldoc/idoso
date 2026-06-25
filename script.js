// --- CONFIGURACAO GLOBAL E CHAVE DA IA ---
const apiKey = ""; // Deixe em branco se for usar o ambiente de execucao local

// Estados globais do aplicativo
let abaAtual = 'inicio';
let tamanhoTextoAtual = 'large'; // Opcoes: 'normal', 'large', 'huge'
let isAltoContraste = false;

// --- DADOS DO APLICATIVO ---

// Dicionario Simplificado (Glossario)
const DICIONARIO = [
  { term: "Pix", definition: "Uma forma rapida e gratuita de mandar dinheiro para outra pessoa usando o celular. O dinheiro cai na conta em poucos segundos." },
  { term: "Link", definition: "Um texto sublinhado ou colorido (geralmente azul) que, quando voce clica ou toca com o dedo, te leva para uma pagina da internet." },
  { term: "Virus / Malware", definition: "Um 'bichinho virtual' malvado que entra no celular ou computador escondido e pode estragar o aparelho ou roubar informacoes." },
  { term: "Senha", definition: "A sua chave secreta digital. Nunca deve ser compartilhada com ninguem, nem mesmo com funcionarios do banco ou familiares." },
  { term: "Aplicativo (App)", definition: "Um programinha que voce baixa no celular para fazer tarefas, como conversar com amigos (WhatsApp) ou mexer no banco." },
  { term: "Phishing (Pescaria)", definition: "Quando os golpistas criam mensagens falsas para tentar 'pescar' sua senha ou dados pessoais." },
  { term: "Golpista / Hacker", definition: "Pessoas mal-intencionadas que usam a internet e o telefone para enganar os outros e roubar dinheiro." },
  { term: "Spam", definition: "Aquelas mensagens chatas de propaganda ou de desconhecidos que chegam sem voce pedir." }
];

// Tutoriais Guiados
const GUIAS = [
  {
    title: "Como criar uma senha segura e forte",
    steps: [
      "Evite usar datas de nascimento, seu proprio nome ou sequencias faceis como '123456'.",
      "Pense em uma frase facil de lembrar, por exemplo: 'Gosto de bolo de cenoura com cafe'.",
      "Pegue as primeiras letras de cada palavra para criar a senha: 'Gdbdccc'.",
      "Adicione um numero e um simbolo que voce gosta para deixa-la imbativel: 'Gdbdccc#2026'."
    ],
    alert: "Guarde suas senhas escritas em um caderninho fisico em casa, em um lugar seguro, ao inves de salva-las soltas no celular."
  },
  {
    title: "Como saber se um site e confiavel para comprar",
    steps: [
      "Olhe o topo do navegador: deve haver o desenho de um cadeado fechado ao lado do endereco.",
      "O endereco do site deve comecar com 'https://' (o 's' significa Seguro!).",
      "Verifique se o nome do site esta escrito corretamente. Golpistas criam sites como 'lojas-americanas-promo.com' ao inves de 'americanas.com.br'.",
      "Desconfie de precos excessivamente baratos. Se uma TV de R$ 3.000 esta custando R$ 300, provavelmente e um golpe."
    ],
    alert: "Se for comprar na internet, de preferencia por pagar com Boleto ou Pix, ou use o recurso de 'Cartao Virtual' do aplicativo do seu banco."
  },
  {
    title: "Uso seguro do WhatsApp no dia a dia",
    steps: [
      "Ative a 'Confirmacao em Duas Etapas' nas configuracoes de seguranca do seu WhatsApp.",
      "Nunca passe para ninguem um codigo de 6 numeros que chegar por mensagem SMS no seu celular.",
      "Se algum conhecido pedir dinheiro emprestado, ligue imediatamente para o telefone normal dele para confirmar.",
      "Nao repasse noticias que parecam assustadoras ou vantajosas demais sem antes verificar se sao verdadeiras."
    ],
    alert: "Os golpistas tentam roubar sua conta do WhatsApp fingindo ser de empresas de entrega, hoteis ou sites de vendas."
  }
];

// Perguntas para o Simulador
const CENARIOS_SIMULADOR = [
  {
    sender: "Numero Desconhecido (Foto do seu Filho)",
    message: "Oi pai/mae, esse e meu numero novo. Tive um problema com meu banco hoje e preciso pagar uma conta urgente de R$ 850. Voce consegue fazer um Pix pra mim? Amanha eu te devolvo sem falta!",
    isScam: true,
    title: "Mensagem urgente pedindo dinheiro",
    explanation: "Golpes de falso filho sao muito comuns! Golpistas pegam fotos de redes sociais e fingem ser seus parentes. Sempre ligue para o numero antigo do seu parente ou faca uma chamada de video antes de enviar qualquer dinheiro.",
    tip: "Dica de Ouro: Nunca transfira dinheiro sem falar por voz ou ver a pessoa por chamada de video!"
  },
  {
    sender: "Banco Alerta",
    message: "Prezado cliente, sua conta bancaria esta prestes a ser bloqueada devido a uma atividade suspeita. Atualize seus dados agora mesmo clicando no link: [www.bancoseguro-atualiza-cadastro.com](https://www.bancoseguro-atualiza-cadastro.com)",
    isScam: true,
    title: "Mensagem de banco com link de urgencia",
    explanation: "Os bancos NUNCA mandam mensagens de texto com links pedindo atualizacoes de conta, dados pessoais ou senhas. Se tiver duvidas, abra o aplicativo oficial do seu banco ou ligue no numero que esta atras do seu cartao fisico.",
    tip: "Dica de Ouro: Nunca clique em links recebidos por mensagem ou e-mail!"
  },
  {
    sender: "Dona Maria (Sua Amiga)",
    message: "Oi! Tudo bem? Olha so que foto linda do aniversario do meu neto ontem! Ficamos muito felizes que voce pode vir comemorar com a gente.",
    isScam: false,
    title: "Mensagem normal de amigo/familiar",
    explanation: "Essa mensagem e segura! Ela tem um contexto real de algo que aconteceu (o aniversario do neto), nao te pede dinheiro, senhas nem cliques em links esquisitos.",
    tip: "Dica de Ouro: Conversas normais sem tom de urgencia ou pedidos financeiros sao geralmente seguras."
  },
  {
    sender: "Suporte do Banco S.A.",
    message: "Ola, identificamos uma compra de R$ 2.400 nas Lojas Americanas em seu nome. Se voce nao reconhece essa compra, digite 1 ou fale com um atendente agora para cancelar.",
    isScam: true,
    title: "O golpe da falsa central de atendimento",
    explanation: "Esse e o 'Golpe da Falsa Central de Atendimento'. Os golpistas usam gravacoes identicas as dos bancos para te assustar e fazer voce transferir dinheiro ou falar sua senha.",
    tip: "Dica de Ouro: Desligue imediatamente e ligue para o telefone oficial do seu banco."
  },
  {
    sender: "Seu Jose (Vizinho de confianca)",
    message: "Ola! Conforme combinamos ontem a noite quando nos encontramos na calcada, voce poderia me transferir os R$ 20 do bolo que comprei para voce?",
    isScam: false,
    title: "Cobranca combinada previamente",
    explanation: "Seguro! E uma situacao que voce combinou pessoalmente antes. Nao ha surpresas ou alarmismo.",
    tip: "Dica de Ouro: Sempre confirme o nome completo da pessoa na tela do celular antes de apertar o botao de confirmar o Pix."
  }
];

let indiceCenarioAtual = 0;
let pontuacao = 0;
let respondidoAtual = false;

// Mensagens predefinidas de ajuda
const MODELOS_MENSAGEM = [
  "Oi, tudo bem? Estou com uma duvida sobre seguranca aqui no meu celular. Pode me dar uma ajuda rapidinho?",
  "Oi! Acabei de receber uma mensagem esquisita e suspeita aqui no meu celular. Pode me ajudar a ver se e golpe ou se e segura?",
  "Oi, por favor fale comigo assim que ler esta mensagem! Acho que cliquei em um link esquisito ou cai em um golpe e preciso de ajuda com minha conta."
];
let indiceModeloSelecionado = 0;

// Log inicial do Chat de Perguntas
let historicoChat = [
  {
    sender: 'assistant',
    text: 'Ola! Sou o seu Guia de Seguranca Digital. Estou aqui para responder qualquer duvida que voce tenha sobre celular, computador, golpes ou mensagens esquisitas. Pode me perguntar qualquer coisa de forma simples!'
  }
];
let estaDigitando = false;

// --- INICIALIZADOR PRINCIPAL ---
window.addEventListener('DOMContentLoaded', () => {
  // Carrega os icones na tela
  lucide.createIcons();
  
  // Renderiza os dados dinamicos do inicio do aplicativo
  renderizarDicionario();
  renderizarGuias();
  carregarCenario();
  renderizarChat();
  renderizarPerguntasSugeridas();
});

// --- SISTEMA DE ABAS (NAVEGACAO) ---
function mudarAba(idAba) {
  const secoes = ['inicio', 'simulador', 'guias', 'chatbot', 'socorro'];
  
  secoes.forEach(sec => {
    document.getElementById(`aba-${sec}`).classList.add('hidden');
  });

  document.getElementById(`aba-${idAba}`).classList.remove('hidden');
  abaAtual = idAba;

  // Atualiza cores dos botoes inferiores com base no contraste selecionado
  secoes.forEach(btn => {
    const elemento = document.getElementById(`btn-nav-${btn}`);
    if (btn === 'socorro') {
      elemento.className = "flex flex-col items-center justify-center p-2 rounded-xl transition-all focus:outline-none " + 
        (abaAtual === 'socorro' 
          ? (isAltoContraste ? 'text-red-500 bg-zinc-900 font-extrabold ring-2 ring-red-500' : 'text-red-600 bg-red-50 font-bold') 
          : 'text-red-500/70 hover:text-red-600');
    } else {
      elemento.className = "flex flex-col items-center justify-center p-2 rounded-xl transition-all focus:outline-none " + 
        (abaAtual === btn 
          ? (isAltoContraste ? 'text-yellow-400 bg-zinc-900 font-extrabold ring-2 ring-yellow-400' : 'text-blue-600 bg-blue-50 font-bold') 
          : 'text-slate-500 hover:text-slate-800');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- CONFIGURACOES DE ACESSIBILIDADE ---
function mudarTamanhoTexto(tamanho) {
  tamanhoTextoAtual = tamanho;
  const conteudoPrincipal = document.getElementById('conteudo-principal');
  const btnNormal = document.getElementById('btn-tamanho-normal');
  const btnGrande = document.getElementById('btn-tamanho-grande');
  const btnGigante = document.getElementById('btn-tamanho-gigante');

  [btnNormal, btnGrande, btnGigante].forEach(btn => {
    btn.className = "px-3 py-1 text-xs md:text-sm rounded-md font-bold transition-all text-white hover:bg-white/10";
  });

  if (tamanho === 'normal') {
    conteudoPrincipal.className = "flex-grow max-w-4xl w-full mx-auto p-4 md:p-6 mb-24 text-base";
    btnNormal.className = "px-3 py-1 text-xs rounded-md font-bold transition-all bg-white text-blue-800 shadow-sm";
  } else if (tamanho === 'large') {
    conteudoPrincipal.className = "flex-grow max-w-4xl w-full mx-auto p-4 md:p-6 mb-24 text-lg";
    btnGrande.className = "px-3 py-1 text-sm rounded-md font-bold transition-all bg-white text-blue-800 shadow-sm";
  } else if (tamanho === 'huge') {
    conteudoPrincipal.className = "flex-grow max-w-4xl w-full mx-auto p-4 md:p-6 mb-24 text-xl";
    btnGigante.className = "px-3 py-1 text-base rounded-md font-bold transition-all bg-white text-blue-800 shadow-sm";
  }

  renderizarDicionario();
}

function alternarAltoContraste() {
  isAltoContraste = !isAltoContraste;
  const corpo = document.getElementById('corpo-app');
  const cabecalho = document.getElementById('cabecalho-app');
  const btnContraste = document.getElementById('btn-contrast');
  const barraNavegacao = document.getElementById('navegacao-inferior');

  if (isAltoContraste) {
    corpo.className = "bg-black text-white min-h-screen flex flex-col transition-colors duration-200";
    cabecalho.className = "sticky top-0 z-30 px-4 py-4 flex flex-col md:flex-row justify-between items-center shadow-lg transition-colors bg-zinc-900 border-b-4 border-yellow-400 text-white";
    btnContraste.className = "px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all bg-yellow-400 text-black hover:bg-yellow-300 border-2 border-black";
    barraNavegacao.className = "fixed bottom-0 left-0 w-full z-40 border-t shadow-2xl flex justify-around items-center px-2 py-3 bg-black border-yellow-400";
  } else {
    corpo.className = "bg-slate-50 text-slate-800 min-h-screen flex flex-col transition-colors duration-200";
    cabecalho.className = "sticky top-0 z-30 px-4 py-4 flex flex-col md:flex-row justify-between items-center shadow-lg transition-colors bg-blue-600 text-white";
    btnContraste.className = "px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all bg-zinc-800 text-white hover:bg-zinc-700 border border-white/20";
    barraNavegacao.className = "fixed bottom-0 left-0 w-full z-40 border-t shadow-2xl flex justify-around items-center px-2 py-3 bg-white border-slate-200";
  }

  mudarAba(abaAtual);
  renderizarDicionario();
  renderizarGuias();
  renderizarChat();
}

// --- CONSTRUTORES DE LAYOUT DINAMICO ---
function renderizarDicionario() {
  const container = document.getElementById('conteiner-dicionario');
  container.innerHTML = '';

  DICIONARIO.forEach(item => {
    const itemBox = document.createElement('div');
    const termColorClass = isAltoContraste ? 'text-yellow-400' : 'text-indigo-600';
    const bgClass = isAltoContraste ? 'bg-zinc-900 border-2 border-yellow-400' : 'bg-slate-100/50 border border-slate-200/50';

    itemBox.className = `p-4 rounded-xl ${bgClass}`;
    itemBox.innerHTML = `
      <span class="font-bold ${termColorClass} block mb-1 text-lg">${item.term}</span>
      <p class="opacity-90 text-sm md:text-base leading-relaxed">${item.definition}</p>
    `;
    container.appendChild(itemBox);
  });
}

function renderizarGuias() {
  const container = document.getElementById('conteiner-guias');
  container.innerHTML = '';

  const cardBg = isAltoContraste ? 'bg-zinc-900 border-2 border-yellow-400 text-white' : 'bg-white shadow-md border border-slate-100 text-slate-800';
  const accentText = isAltoContraste ? 'text-yellow-400 border-b pb-2' : 'text-blue-600 border-b pb-2';
  const bulletBg = isAltoContraste ? 'bg-zinc-800 text-yellow-400 border border-yellow-400' : 'bg-blue-100 text-blue-700';

  GUIAS.forEach(guide => {
    const guideCard = document.createElement('div');
    guideCard.className = `p-6 rounded-2xl ${cardBg}`;

    let stepsHTML = '';
    guide.steps.forEach((step, idx) => {
      stepsHTML += `
        <div class="flex gap-4 items-start">
          <span class="w-8 h-8 rounded-full ${bulletBg} flex items-center justify-center font-bold text-lg flex-shrink-0">
            ${idx + 1}
          </span>
          <p class="pt-0.5 leading-relaxed text-base md:text-lg">${step}</p>
        </div>
      `;
    });

    guideCard.innerHTML = `
      <h3 class="text-xl font-semibold mb-4 ${accentText}">${guide.title}</h3>
      <div class="space-y-4 mb-6">
        ${stepsHTML}
      </div>
      <div class="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/30 border-l-4 border-orange-500 text-orange-800 dark:text-orange-200">
        <span class="font-bold block mb-1">⚠️ Lembre-se:</span>
        <p class="text-sm md:text-base leading-relaxed">${guide.alert}</p>
      </div>
    `;
    container.appendChild(guideCard);
  });
}

// --- CONTROLE JOGO SIMULADOR ---
function carregarCenario() {
  respondidoAtual = false;
  const current = CENARIOS_SIMULADOR[indiceCenarioAtual];

  document.getElementById('contador-cenario').innerText = `Cenario ${indiceCenarioAtual + 1} de ${CENARIOS_SIMULADOR.length}`;
  document.getElementById('progresso-simulador').style.width = `${((indiceCenarioAtual + 1) / CENARIOS_SIMULADOR.length) * 100}%`;
  document.getElementById('pontuacao-atual').innerText = `${pontuacao} / ${CENARIOS_SIMULADOR.length}`;

  document.getElementById('avatar-remetente').innerText = current.sender.charAt(0);
  document.getElementById('nome-remetente').innerText = current.sender;
  document.getElementById('mensagem-cenario').innerText = current.message;

  document.getElementById('conteiner-acoes-simulador').classList.remove('hidden');
  document.getElementById('painel-explicacao').classList.add('hidden');

  const nextBtn = document.getElementById('btn-proximo-cenario');
  if (indiceCenarioAtual < CENARIOS_SIMULADOR.length - 1) {
    nextBtn.innerHTML = `Proximo Desafio <i data-lucide="arrow-right" class="w-5 h-5"></i>`;
  } else {
    nextBtn.innerHTML = `Ver Meu Desempenho e Recomecar <i data-lucide="rotate-ccw" class="w-5 h-5"></i>`;
  }
  lucide.createIcons();
}

function enviarResposta(usuarioEscolheuGolpe) {
  if (respondidoAtual) return;
  respondidoAtual = true;

  const current = CENARIOS_SIMULADOR[indiceCenarioAtual];
  const isCorrect = (usuarioEscolheuGolpe === current.isScam);

  if (isCorrect) {
    pontuacao++;
  }

  const headline = document.getElementById('manchete-feedback');
  const text = document.getElementById('texto-explicacao');
  const title = document.getElementById('titulo-explicacao');
  const tip = document.getElementById('dica-explicacao');

  if (isCorrect) {
    headline.className = "flex items-center gap-2 text-emerald-600 font-extrabold text-xl";
    headline.innerHTML = `<i data-lucide="check-circle-2" class="w-8 h-8 text-emerald-600"></i> Parabens, voce acertou!`;
  } else {
    headline.className = "flex items-center gap-2 text-red-600 font-extrabold text-xl";
    headline.innerHTML = `<i data-lucide="x-circle" class="w-8 h-8 text-red-600"></i> Atencao! Nao era bem isso...`;
  }

  title.innerText = current.title;
  text.innerText = current.explanation;
  tip.innerText = current.tip;

  document.getElementById('conteiner-acoes-simulador').classList.add('hidden');
  document.getElementById('painel-explicacao').classList.remove('hidden');
  lucide.createIcons();
}

function avancarCenario() {
  if (indiceCenarioAtual < CENARIOS_SIMULADOR.length - 1) {
    indiceCenarioAtual++;
  } else {
    indiceCenarioAtual = 0;
    pontuacao = 0;
  }
  carregarCenario();
}

// --- CENTRAL DE SOCORRO ---
function definirMensagemModelo(indice) {
  indiceModeloSelecionado = indice;
  
  for (let i = 0; i < 3; i++) {
    const btn = document.getElementById(`btn-modelo-${i}`);
    if (i === indice) {
      btn.className = "p-3 rounded-lg text-left text-sm font-semibold transition-all border bg-blue-100 border-blue-500 text-blue-900 font-extrabold";
    } else {
      btn.className = "p-3 rounded-lg text-left text-sm font-semibold transition-all border bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
    }
  }

  atualizarMensagemEmergencia();
}

function atualizarMensagemEmergencia() {
  const familyName = document.getElementById('nome-contato-familia').value;
  const baseMessage = MODELOS_MENSAGEM[indiceModeloSelecionado];
  const previewText = document.getElementById('visualizacao-mensagem-gerada');

  if (familyName.trim()) {
    previewText.innerText = `Para: ${familyName}\n\n${baseMessage}`;
  } else {
    previewText.innerText = baseMessage;
  }
}

function copiarMensagemGerada() {
  const familyName = document.getElementById('nome-contato-familia').value;
  const baseMessage = MODELOS_MENSAGEM[indiceModeloSelecionado];
  const fullText = familyName.trim() ? `Mensagem para: ${familyName}\n\n${baseMessage}` : baseMessage;

  const tempInput = document.createElement("textarea");
  tempInput.value = fullText;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  const btn = document.getElementById('btn-copiar-msg');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `<i data-lucide="check" class="w-6 h-6"></i> Copiado! Cole no seu WhatsApp`;
  lucide.createIcons();

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    lucide.createIcons();
  }, 3000);
}

// --- CHAT DE DUVIDAS COM IA (INTEGRACAO GEMINI) ---
function renderizarChat() {
  const chatLog = document.getElementById('registro-chat');
  chatLog.innerHTML = '';

  historicoChat.forEach(msg => {
    const wrapper = document.createElement('div');
    wrapper.className = `flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`;

    const isUser = msg.sender === 'user';
    let bubbleStyle = "";

    if (isUser) {
      bubbleStyle = isAltoContraste 
        ? 'bg-yellow-400 text-black font-bold' 
        : 'bg-blue-600 text-white rounded-tr-none';
    } else {
      bubbleStyle = isAltoContraste 
        ? 'bg-zinc-800 text-white border border-yellow-400 rounded-tl-none' 
        : 'bg-slate-100 text-slate-850 rounded-tl-none';
    }

    wrapper.innerHTML = `
      <div class="max-w-[85%] rounded-2xl p-4 shadow-sm ${bubbleStyle}">
        <span class="block text-xs uppercase tracking-wider font-extrabold opacity-60 mb-1">
          ${isUser ? 'Voce' : 'Assistente'}
        </span>
        <p class="leading-relaxed whitespace-pre-line text-sm md:text-base">
          ${msg.text}
        </p>
      </div>
    `;
    chatLog.appendChild(wrapper);
  });

  chatLog.scrollTop = chatLog.scrollHeight;
}

function renderizarPerguntasSugeridas() {
  const container = document.getElementById('perguntas-sugeridas');
  const queries = [
    "Recebi um SMS dizendo que ganhei R$1.000 de dinheiro de volta (cashback). E golpe?",
    "Como faco para redefinir minha senha do banco de forma segura?",
    "Minha amiga me mandou um link esquisito de promocao. Devo clicar?",
    "O que fazer se eu cliquei em um golpe sem querer?"
  ];

  container.innerHTML = '';
  queries.forEach(q => {
    const btn = document.createElement('button');
    btn.className = "px-3 py-1.5 rounded-full text-xs md:text-sm text-left transition-all hover:scale-[1.01] bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200";
    btn.innerHTML = `💡 "${q}"`;
    btn.onclick = () => {
      document.getElementById('campo-entrada-chat').value = q;
    };
    container.appendChild(btn);
  });
}

async function enviarMensagemChat(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('campo-entrada-chat');
  const userText = input.value;
  if (!userText.trim() || estaDigitando) return;

  historicoChat.push({ sender: 'user', text: userText });
  input.value = '';
  estaDigitando = true;
  renderizarChat();

  const chatLog = document.getElementById('registro-chat');
  const typingIndicator = document.createElement('div');
  typingIndicator.id = 'typing-indicator';
  typingIndicator.className = "flex justify-start";
  typingIndicator.innerHTML = `
    <div class="bg-slate-100 text-slate-600 rounded-2xl p-4 rounded-tl-none flex items-center gap-2">
      <div class="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></div>
      <div class="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
      <div class="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
      <span class="text-sm font-semibold ml-1">Pensando em uma resposta simples...</span>
    </div>
  `;
  chatLog.appendChild(typingIndicator);
  chatLog.scrollTop = chatLog.scrollHeight;

  const systemPrompt = `Voce e um assistente virtual carinhoso, extremamente paciente e focado na seguranca digital de pessoas idosas.
Seu nome e 'Guia do Vovo e da Vovo'.
Suas diretrizes de escrita:
1. Use frases curtas, de leitura facil e tom carinhoso (use termos gentis como "meu amigo", "minha amiga").
2. NUNCA use termos em ingles sem explica-los antes de forma muito simples (ex: se falar "Link", explique que e um endereco azul clicavel).
3. Seja sempre muito focado em seguranca: se a pessoa perguntar se algo e golpe, analise com cuidado e diga "Isso parece um golpe! Tenha cuidado!" se for suspeito.
4. Explique passo a passo o que ela deve fazer em caso de perigo (ex: ligar para o banco, falar com um filho, nao digitar senhas).
5. Escreva em paragrafos bem espacados.`;

  let retries = 5;
  let delay = 1000;
  let success = false;
  let botResponse = "";

  while (retries > 0 && !success) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: `Pergunta do idoso: ${userText}` }] }
          ],
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          }
        })
      });

      if (!response.ok) {
        throw new Error('Erro na conexao.');
      }

      const data = await response.json();
      botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, meu pensamento falhou por um segundinho. Pode fazer a pergunta de novo?";
      success = true;
    } catch (err) {
      retries--;
      if (retries === 0) {
        botResponse = "Hum, parece que estou com dificuldades para me conectar a internet agora. Se precisar de uma ajuda imediata sobre alguma mensagem que recebeu, recomendo perguntar a um familiar de confianca ou vizinho querido!";
      } else {
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  }

  const ind = document.getElementById('typing-indicator');
  if (ind) ind.remove();

  estaDigitando = false;
  historicoChat.push({ sender: 'assistant', text: botResponse });
  renderizarChat();
}
