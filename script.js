// --- CONFIGURAÇÃO GLOBAL E CHAVE DA IA ---
const apiKey = ""; // Deixe em branco se for usar o ambiente de execução local

// Estados globais do aplicativo
let currentTab = 'home';
let currentTextSize = 'large'; // Opções: 'normal', 'large', 'huge'
let isHighContrast = false;

// --- DADOS DO APLICATIVO ---

// Dicionário Simplificado (Glossário)
const GLOSSARY = [
  { term: "Pix", definition: "Uma forma rápida e gratuita de mandar dinheiro para outra pessoa usando o celular. O dinheiro cai na conta em poucos segundos." },
  { term: "Link", definition: "Um texto sublinhado ou colorido (geralmente azul) que, quando você clica ou toca com o dedo, te leva para uma página da internet." },
  { term: "Vírus / Malware", definition: "Um 'bichinho virtual' malvado que entra no celular ou computador escondido e pode estragar o aparelho ou roubar informações." },
  { term: "Senha", definition: "A sua chave secreta digital. Nunca deve ser compartilhada com ninguém, nem mesmo com funcionários do banco ou familiares." },
  { term: "Aplicativo (App)", definition: "Um programinha que você baixa no celular para fazer tarefas, como conversar com amigos (WhatsApp) ou mexer no banco." },
  { term: "Phishing (Pescaria)", definition: "Quando os golpistas criam mensagens falsas para tentar 'pescar' sua senha ou dados pessoais." },
  { term: "Golpista / Hacker", definition: "Pessoas mal-intencionadas que usam a internet e o telefone para enganar os outros e roubar dinheiro." },
  { term: "Spam", definition: "Aquelas mensagens chatas de propaganda ou de desconhecidos que chegam sem você pedir." }
];

// Tutoriais Guiados
const GUIDES = [
  {
    title: "Como criar uma senha segura e forte",
    steps: [
      "Evite usar datas de nascimento, seu próprio nome ou sequências fáceis como '123456'.",
      "Pense em uma frase fácil de lembrar, por exemplo: 'Gosto de bolo de cenoura com café'.",
      "Pegue as primeiras letras de cada palavra para criar a senha: 'Gdbdccc'.",
      "Adicione um número e um símbolo que você gosta para deixá-la imbatível: 'Gdbdccc#2026'."
    ],
    alert: "Guarde suas senhas escritas em um caderninho físico em casa, em um lugar seguro, ao invés de salvá-las soltas no celular."
  },
  {
    title: "Como saber se um site é confiável para comprar",
    steps: [
      "Olhe o topo do navegador: deve haver o desenho de um cadeado fechado ao lado do endereço.",
      "O endereço do site deve começar com 'https://' (o 's' significa Seguro!).",
      "Verifique se o nome do site está escrito corretamente. Golpistas criam sites como 'lojas-americanas-promo.com' em vez de 'americanas.com.br'.",
      "Desconfie de preços excessivamente baratos. Se uma TV de R$ 3.000 está custando R$ 300, provavelmente é um golpe."
    ],
    alert: "Se for comprar na internet, dê preferência por pagar com Boleto ou Pix, ou use o recurso de 'Cartão Virtual' do aplicativo do seu banco."
  },

  {
    title: "Uso seguro do WhatsApp no dia a dia",
    steps: [
      "Ative a 'Confirmação em Duas Etapas' nas configurações de segurança do seu WhatsApp.",
      "Nunca passe para ninguém um código de 6 números que chegar por mensagem SMS no seu celular.",
      "Se algum conhecido pedir dinheiro emprestado, ligue imediatamente para o telefone normal dele para confirmar.",
      "Não repasse notícias que pareçam assustadoras ou vantajosas demais sem antes verificar se são verdadeiras."
    ],
    alert: "Os golpistas tentam roubar sua conta do WhatsApp fingindo ser de empresas de entrega, hotéis ou sites de vendas."
  }
];

// Perguntas para o Simulador
const SIMULATOR_SCENARIOS = [
  {
    sender: "Número Desconhecido (Foto do seu Filho)",
    message: "Oi pai/mãe, esse é meu número novo. Tive um problema com meu banco hoje e preciso pagar uma conta urgente de R$ 850. Você consegue fazer um Pix pra mim? Amanhã eu te devolvo sem falta!",
    isScam: true,
    title: "Mensagem urgente pedindo dinheiro",
    explanation: "Golpes de falso filho são muito comuns! Golpistas pegam fotos de redes sociais e fingem ser seus parentes. Sempre ligue para o número antigo do seu parente ou faça uma chamada de vídeo antes de enviar qualquer dinheiro.",
    tip: "Dica de Ouro: Nunca transfira dinheiro sem falar por voz ou ver a pessoa por chamada de vídeo!"
  },

  {
    sender: "Banco Alerta",
    message: "Prezado cliente, sua conta bancária está prestes a ser bloqueada devido a uma atividade suspeita. Atualize seus dados agora mesmo clicando no link: [www.bancoseguro-atualiza-cadastro.com](https://www.bancoseguro-atualiza-cadastro.com)",
    isScam: true,
    title: "Mensagem de banco com link de urgência",
    explanation: "Os bancos NUNCA mandam mensagens de texto com links pedindo atualizações de conta, dados pessoais ou senhas. Se tiver dúvidas, abra o aplicativo oficial do seu banco ou ligue no número que está atrás do seu cartão físico.",
    tip: "Dica de Ouro: Nunca clique em links recebidos por mensagem ou e-mail!"
  },
  {
    sender: "Dona Maria (Sua Amiga)",
    message: "Oi! Tudo bem? Olha só que foto linda do aniversário do meu neto ontem! Ficamos muito felizes que você pôde vir comemorar com a gente.",
    isScam: false,
    title: "Mensagem normal de amigo/familiar",
    explanation: "Essa mensagem é segura! Ela tem um contexto real de algo que aconteceu (o aniversário do neto), não te pede dinheiro, senhas nem cliques em links esquisitos.",
    tip: "Dica de Ouro: Conversas normais sem tom de urgência ou pedidos financeiros são geralmente seguras."
  },
  {
    sender: "Suporte do Banco S.A.",
    message: "Olá, identificamos uma compra de R$ 2.400 nas Lojas Americanas em seu nome. Se você não reconhece essa compra, digite 1 ou fale com um atendente agora para cancelar.",
    isScam: true,
    title: "O golpe da falsa central de atendimento",
    explanation: "Esse é o 'Golpe da Falsa Central de Atendimento'. Os golpistas usam gravações idênticas às dos bancos para te assustar e fazer você transferir dinheiro ou falar sua senha.",
    tip: "Dica de Ouro: Desligue imediatamente e ligue para o telefone oficial do seu banco."
  },
  {
    sender: "Seu José (Vizinho de confiança)",
    message: "Olá! Conforme combinamos ontem à noite quando nos encontramos na calçada, você poderia me transferir os R$ 20 do bolo que comprei para você?",
    isScam: false,
    title: "Cobrança combinada previamente",
    explanation: "Seguro! É uma situação que você combinou pessoalmente antes. Não há surpresas ou alarmismo.",
    tip: "Dica de Ouro: Sempre confirme o nome completo da pessoa na tela do celular antes de apertar o botão de confirmar o Pix."
  }
];

let currentScenarioIndex = 0;
let score = 0;
let answeredCurrent = false;

// Mensagens predefinidas de ajuda
const MESSAGE_TEMPLATES = [
  "Oi, tudo bem? Estou com uma dúvida sobre segurança aqui no meu celular. Pode me dar uma ajuda rapidinho?",
  "Oi! Acabei de receber uma mensagem esquisita e suspeita aqui no meu celular. Pode me ajudar a ver se é golpe ou se é segura?",
  "Oi, por favor fale comigo assim que ler esta mensagem! Acho que cliquei em um link esquisito ou caí em um golpe e preciso de ajuda com minha conta."
];
let selectedTemplateIndex = 0;

// Log inicial do Chat de Perguntas
let chatHistory = [
  {
    sender: 'assistant',
    text: 'Olá! Sou o seu Guia de Segurança Digital. Estou aqui para responder qualquer dúvida que você tenha sobre celular, computador, golpes ou mensagens esquisitas. Pode me perguntar qualquer coisa de forma simples!'
  }
];
let isTyping = false;

// --- INICIALIZADOR PRINCIPAL ---
window.addEventListener('DOMContentLoaded', () => {
  // Carrega os ícones na tela
  lucide.createIcons();
  
  // Renderiza os dados dinâmicos do início do aplicativo
  renderGlossary();
  renderGuides();
  loadScenario();
  renderChat();
  renderSuggestedQueries();
});

// --- SISTEMA DE ABAS (NAVEGAÇÃO) ---
function switchTab(tabId) {
  const sections = ['home', 'simulator', 'guides', 'chatbot', 'emergency'];
  
  sections.forEach(sec => {
    document.getElementById(`tab-${sec}`).classList.add('hidden');
  });

  document.getElementById(`tab-${tabId}`).classList.remove('hidden');
  currentTab = tabId;

  // Atualiza cores dos botões inferiores com base no contraste selecionado
  sections.forEach(btn => {
    const element = document.getElementById(`nav-btn-${btn}`);
    if (btn === 'emergency') {
      element.className = "flex flex-col items-center justify-center p-2 rounded-xl transition-all focus:outline-none " + 
        (currentTab === 'emergency' 
          ? (isHighContrast ? 'text-red-500 bg-zinc-900 font-extrabold ring-2 ring-red-500' : 'text-red-600 bg-red-50 font-bold') 
          : 'text-red-500/70 hover:text-red-600');
    } else {
      element.className = "flex flex-col items-center justify-center p-2 rounded-xl transition-all focus:outline-none " + 
        (currentTab === btn 
          ? (isHighContrast ? 'text-yellow-400 bg-zinc-900 font-extrabold ring-2 ring-yellow-400' : 'text-blue-600 bg-blue-50 font-bold') 
          : 'text-slate-500 hover:text-slate-800');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- CONFIGURAÇÕES DE ACESSIBILIDADE ---
function changeTextSize(size) {
  currentTextSize = size;
  const mainContent = document.getElementById('main-content');
  const btnNormal = document.getElementById('btn-size-normal');
  const btnLarge = document.getElementById('btn-size-large');
  const btnHuge = document.getElementById('btn-size-huge');

  [btnNormal, btnLarge, btnHuge].forEach(btn => {
    btn.className = "px-3 py-1 text-xs md:text-sm rounded-md font-bold transition-all text-white hover:bg-white/10";
  });

  if (size === 'normal') {
    mainContent.className = "flex-grow max-w-4xl w-full mx-auto p-4 md:p-6 mb-24 text-base";
    btnNormal.className = "px-3 py-1 text-xs rounded-md font-bold transition-all bg-white text-blue-800 shadow-sm";
  } else if (size === 'large') {
    mainContent.className = "flex-grow max-w-4xl w-full mx-auto p-4 md:p-6 mb-24 text-lg";
    btnLarge.className = "px-3 py-1 text-sm rounded-md font-bold transition-all bg-white text-blue-800 shadow-sm";
  } else if (size === 'huge') {
    mainContent.className = "flex-grow max-w-4xl w-full mx-auto p-4 md:p-6 mb-24 text-xl";
    btnHuge.className = "px-3 py-1 text-base rounded-md font-bold transition-all bg-white text-blue-800 shadow-sm";
  }

  renderGlossary();
}

function toggleHighContrast() {
  isHighContrast = !isHighContrast;
  const body = document.getElementById('app-body');
  const header = document.getElementById('app-header');
  const btnContrast = document.getElementById('btn-contrast');
  const navBar = document.getElementById('bottom-navigation');

  if (isHighContrast) {
    body.className = "bg-black text-white min-h-screen flex flex-col transition-colors duration-200";
    header.className = "sticky top-0 z-30 px-4 py-4 flex flex-col md:flex-row justify-between items-center shadow-lg transition-colors bg-zinc-900 border-b-4 border-yellow-400 text-white";
    btnContrast.className = "px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all bg-yellow-400 text-black hover:bg-yellow-300 border-2 border-black";
    navBar.className = "fixed bottom-0 left-0 w-full z-40 border-t shadow-2xl flex justify-around items-center px-2 py-3 bg-black border-yellow-400";
  } else {
    body.className = "bg-slate-50 text-slate-800 min-h-screen flex flex-col transition-colors duration-200";
    header.className = "sticky top-0 z-30 px-4 py-4 flex flex-col md:flex-row justify-between items-center shadow-lg transition-colors bg-blue-600 text-white";
    btnContrast.className = "px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold flex items-center gap-1.5 transition-all bg-zinc-800 text-white hover:bg-zinc-700 border border-white/20";
    navBar.className = "fixed bottom-0 left-0 w-full z-40 border-t shadow-2xl flex justify-around items-center px-2 py-3 bg-white border-slate-200";
  }

  switchTab(currentTab);
  renderGlossary();
  renderGuides();
  renderChat();
}

// --- CONSTRUTORES DE LAYOUT DINÂMICO ---
function renderGlossary() {
  const container = document.getElementById('glossary-container');
  container.innerHTML = '';

  GLOSSARY.forEach(item => {
    const itemBox = document.createElement('div');

    const termColorClass = isHighContrast ? 'text-yellow-400' : 'text-indigo-600';
    const bgClass = isHighContrast ? 'bg-zinc-900 border-2 border-yellow-400' : 'bg-slate-100/50 border border-slate-200/50';

    itemBox.className = `p-4 rounded-xl ${bgClass}`;
    itemBox.innerHTML = `
      <span class="font-bold ${termColorClass} block mb-1 text-lg">${item.term}</span>
      <p class="opacity-90 text-sm md:text-base leading-relaxed">${item.definition}</p>
    `;
    container.appendChild(itemBox);
  });
}

function renderGuides() {
  const container = document.getElementById('guides-container');
  container.innerHTML = '';

  const cardBg = isHighContrast ? 'bg-zinc-900 border-2 border-yellow-400 text-white' : 'bg-white shadow-md border border-slate-100 text-slate-800';
  const accentText = isHighContrast ? 'text-yellow-400 border-b pb-2' : 'text-blue-600 border-b pb-2';
  const bulletBg = isHighContrast ? 'bg-zinc-800 text-yellow-400 border border-yellow-400' : 'bg-blue-100 text-blue-700';

  GUIDES.forEach(guide => {
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
function loadScenario() {
  answeredCurrent = false;
  const current = SIMULATOR_SCENARIOS[currentScenarioIndex];

  document.getElementById('scenario-counter').innerText = `Cenário ${currentScenarioIndex + 1} de ${SIMULATOR_SCENARIOS.length}`;
  document.getElementById('simulator-progress').style.width = `${((currentScenarioIndex + 1) / SIMULATOR_SCENARIOS.length) * 100}%`;
  document.getElementById('current-score').innerText = `${score} / ${SIMULATOR_SCENARIOS.length}`;

  document.getElementById('sender-avatar').innerText = current.sender.charAt(0);
  document.getElementById('sender-name').innerText = current.sender;
  document.getElementById('scenario-message').innerText = current.message;

  document.getElementById('sim-actions-container').classList.remove('hidden');
  document.getElementById('explanation-panel').classList.add('hidden');


  const nextBtn = document.getElementById('btn-next-scenario');
  if (currentScenarioIndex < SIMULATOR_SCENARIOS.length - 1) {
    nextBtn.innerHTML = `Próximo Desafio <i data-lucide="arrow-right" class="w-5 h-5"></i>`;
  } else {
    nextBtn.innerHTML = `Ver Meu Desempenho e Recomeçar <i data-lucide="rotate-ccw" class="w-5 h-5"></i>`;
  }
  lucide.createIcons();
}

function submitAnswer(userChoseScam) {
  if (answeredCurrent) return;
  answeredCurrent = true;

  const current = SIMULATOR_SCENARIOS[currentScenarioIndex];
  const isCorrect = (userChoseScam === current.isScam);

  if (isCorrect) {
    score++;
  }

  const headline = document.getElementById('feedback-headline');
  const text = document.getElementById('explanation-text');
  const title = document.getElementById('explanation-title');
  const tip = document.getElementById('explanation-tip');

  if (isCorrect) {
    headline.className = "flex items-center gap-2 text-emerald-600 font-extrabold text-xl";
    headline.innerHTML = `<i data-lucide="check-circle-2" class="w-8 h-8 text-emerald-600"></i> Parabéns, você acertou!`;
  } else {
    headline.className = "flex items-center gap-2 text-red-600 font-extrabold text-xl";
    headline.innerHTML = `<i data-lucide="x-circle" class="w-8 h-8 text-red-600"></i> Atenção! Não era bem isso...`;
  }

  title.innerText = current.title;
  text.innerText = current.explanation;
  tip.innerText = current.tip;

  document.getElementById('sim-actions-container').classList.add('hidden');
  document.getElementById('explanation-panel').classList.remove('hidden');
  lucide.createIcons();
}

function advanceScenario() {
  if (currentScenarioIndex < SIMULATOR_SCENARIOS.length - 1) {
    currentScenarioIndex++;
  } else {
    currentScenarioIndex = 0;
    score = 0;
  }
  loadScenario();
}

// --- CENTRAL DE SOCORRO ---
function setTemplateMessage(index) {
  selectedTemplateIndex = index;
  
  for (let i = 0; i < 3; i++) {
    const btn = document.getElementById(`tpl-btn-${i}`);
    if (i === index) {
      btn.className = "p-3 rounded-lg text-left text-sm font-semibold transition-all border bg-blue-100 border-blue-500 text-blue-900 font-extrabold";
    } else {
      btn.className = "p-3 rounded-lg text-left text-sm font-semibold transition-all border bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
    }
  }

  updateEmergencyMessage();
}

function updateEmergencyMessage() {
  const familyName = document.getElementById('family-contact-name').value;
  const baseMessage = MESSAGE_TEMPLATES[selectedTemplateIndex];
  const previewText = document.getElementById('generated-message-preview');

  if (familyName.trim()) {
    previewText.innerText = `Para: ${familyName}\n\n${baseMessage}`;
  } else {
    previewText.innerText = baseMessage;
  }
}

function copyGeneratedMessage() {
  const familyName = document.getElementById('family-contact-name').value;
  const baseMessage = MESSAGE_TEMPLATES[selectedTemplateIndex];
  const fullText = familyName.trim() ? `Mensagem para: ${familyName}\n\n${baseMessage}` : baseMessage;

  const tempInput = document.createElement("textarea");
  tempInput.value = fullText;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  const btn = document.getElementById('btn-copy-msg');
  const originalHTML = btn.innerHTML;
  btn.innerHTML = `<i data-lucide="check" class="w-6 h-6"></i> Copiado! Cole no seu WhatsApp`;
  lucide.createIcons();

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    lucide.createIcons();
  }, 3000);
}

// --- CHAT DE DÚVIDAS COM IA (INTEGRAÇÃO GEMINI) ---
function renderChat() {
  const chatLog = document.getElementById('chat-log');
  chatLog.innerHTML = '';

  chatHistory.forEach(msg => {
    const wrapper = document.createElement('div');
    wrapper.className = `flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`;

    const isUser = msg.sender === 'user';
    let bubbleStyle = "";

    if (isUser) {
      bubbleStyle = isHighContrast 
        ? 'bg-yellow-400 text-black font-bold' 
        : 'bg-blue-600 text-white rounded-tr-none';
    } else {
      bubbleStyle = isHighContrast 
        ? 'bg-zinc-800 text-white border border-yellow-400 rounded-tl-none' 
        : 'bg-slate-100 text-slate-850 rounded-tl-none';
    }

    wrapper.innerHTML = `
      <div class="max-w-[85%] rounded-2xl p-4 shadow-sm ${bubbleStyle}">
        <span class="block text-xs uppercase tracking-wider font-extrabold opacity-60 mb-1">
          ${isUser ? 'Você' : 'Assistente'}
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

function renderSuggestedQueries() {
  const container = document.getElementById('suggested-queries');
  const queries = [
    "Recebi um SMS dizendo que ganhei R$1.000 de cashback. É golpe?",
    "Como faço para redefinir minha senha do banco de forma segura?",
    "Minha amiga me mandou um link esquisito de promoção. Devo clicar?",
    "O que fazer se eu cliquei em um golpe sem querer?"
  ];

  container.innerHTML = '';
  queries.forEach(q => {
    const btn = document.createElement('button');
    btn.className = "px-3 py-1.5 rounded-full text-xs md:text-sm text-left transition-all hover:scale-[1.01] bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200";
    btn.innerHTML = `💡 "${q}"`;
    btn.onclick = () => {
      document.getElementById('chat-input-field').value = q;
    };
    container.appendChild(btn);
  });
}

async function sendChatMessage(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('chat-input-field');
  const userText = input.value;
  if (!userText.trim() || isTyping) return;

  chatHistory.push({ sender: 'user', text: userText });
  input.value = '';
  isTyping = true;
  renderChat();

  const chatLog = document.getElementById('chat-log');
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

  const systemPrompt = `Você é um assistente virtual carinhoso, extremamente paciente e focado na segurança digital de pessoas idosas.
Seu nome é 'Guia do Vovô e da Vovó'.
Suas diretrizes de escrita:
1. Use frases curtas, de leitura fácil e tom carinhoso (use termos gentis como "meu amigo", "minha amiga").
2. NUNCA use termos em inglês sem explicá-los antes de forma muito simples (ex: se falar "Link", explique que é um endereço azul clicável).
3. Seja sempre muito focado em segurança: se a pessoa perguntar se algo é golpe, analise com cuidado e diga "Isso parece um golpe! Tenha cuidado!" se for suspeito.
4. Explique passo a passo o que ela deve fazer em caso de perigo (ex: ligar para o banco, falar com um filho, não digitar senhas).
5. Escreva em parágrafos bem espaçados.`;

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
        throw new Error('Erro na conexão.');
      }

      const data = await response.json();
      botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, meu pensamento falhou por um segundinho. Pode fazer a pergunta de novo?";
      success = true;
    } catch (err) {
      retries--;
      if (retries === 0) {
        botResponse = "Hum, parece que estou com dificuldades para me conectar à internet agora. Se precisar de uma ajuda imediata sobre alguma mensagem que recebeu, recomendo perguntar a um familiar de confiança ou vizinho querido!";
      } else {
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2;
      }
    }
  }

  const ind = document.getElementById('typing-indicator');
  if (ind) ind.remove();

  isTyping = false;
  chatHistory.push({ sender: 'assistant', text: botResponse });
  renderChat();
}
