// Inicialização de Variáveis de Controle
let currentScale = 1.1; // Inicial ligeiramente maior para idosos
let currentTheme = 'light';
let isTtsEnabled = false; // Controle de Leitura em Voz Alta
let currentQuizIndex = 0;
let quizScore = 0;

// Dados das Dicas dos Modais
const tipData = {
  whatsapp: {
    title: "Golpe do WhatsApp (Falso Parente)",
    icon: "message-square",
    iconColor: "bg-emerald-100 text-emerald-800",
    colorClass: "border-emerald-600",
    steps: [
      { title: "Como funciona o golpe?", desc: "Um criminoso consegue uma foto do seu filho ou parente e manda mensagem de um número desconhecido dizendo: 'Oi mãe/pai, mudei de número, salve este novo aí!'." },
      { title: "A desculpa do dinheiro:", desc: "Logo em seguida, o golpista diz que precisa pagar uma conta urgente e pede para você fazer um Pix ou transferência bancária rápido." },
      { title: "🚨 Regra de Ouro:", desc: "NUNCA envie dinheiro na hora! Antes de qualquer coisa, ligue para o número ANTIGO do seu parente por chamada de voz normal. Não confie apenas em áudios gravados ou mensagens de texto." }
    ]
  },
  bancos: {
    title: "Atenção com Ligações e Pix",
    icon: "wallet",
    iconColor: "bg-blue-100 text-blue-800",
    colorClass: "border-blue-600",
    steps: [
      { title: "A falsa ligação do banco:", desc: "Eles ligam fingindo que são da segurança do seu banco dizendo que sua conta foi invadida ou que há um Pix suspeito agendado." },
      { title: "O que o banco NUNCA faz:", desc: "O banco de verdade nunca telefona pedindo para você realizar um Pix para 'salvar' ou 'proteger' seu dinheiro. O banco também nunca pede suas senhas por telefone ou que instale novos programas." },
      { title: "🚨 Regra de Ouro:", desc: "Desligue o telefone na cara! Vá até a sua agência bancária pessoalmente ou pegue seu cartão físico e ligue para o número de suporte que está escrito no verso dele." }
    ]
  },
  links: {
    title: "Mensagens com Links Falsos",
    icon: "link",
    iconColor: "bg-purple-100 text-purple-800",
    colorClass: "border-purple-600",
    steps: [
      { title: "SMS ou e-mail de mentira:", desc: "Você recebe mensagens como: 'Sua fatura está em atraso, evite o bloqueio' ou 'Você ganhou um prêmio de R$ 5.000, clique para resgatar'." },
      { title: "O que acontece ao clicar?", desc: "Esses sites falsos roubam suas senhas bancárias ou instalam vírus espiões no seu celular para ver suas conversas." },
      { title: "🚨 Regra de Ouro:", desc: "Se você não comprou nada ou não estava esperando nenhuma entrega, ignore a mensagem. Não clique em links enviados por números desconhecidos." }
    ]
  },
  senhas: {
    title: "Criando Senhas Seguras",
    icon: "key-round",
    iconColor: "bg-amber-100 text-amber-800",
    colorClass: "border-amber-600",
    steps: [
      { title: "O que evitar nas senhas?", desc: "Evite usar sua data de nascimento, seu nome, nome de filhos ou sequências fáceis como '123456'. Ladrões testam isso primeiro!" },
      { title: "Uma técnica fácil de lembrar:", desc: "Pense em uma frase curta que você ama e use apenas as primeiras letras. Exemplo: 'O meu cachorro Totó tem 5 anos' vira: 'Omctt5a!'." },
      { title: "🚨 Regra de Ouro:", desc: "NUNCA anote suas senhas no celular ou em papéis guardados na sua carteira. Se perder o celular ou a carteira, os criminosos terão acesso a tudo." }
    ]
  }
};

// Dados do Quiz Interativo
const quizData = [
  {
    title: "Caso do WhatsApp Urgente",
    scenario: "Seu neto te manda mensagem de um número novo com a foto dele dizendo:\n'Vovó, troquei de número, me passa R$ 400 por Pix rápido que preciso pagar um remédio.'",
    question: "Qual é a sua atitude?",
    options: [
      { text: "Fazer o Pix na hora para ajudar meu neto querido o mais rápido possível.", isCorrect: false, feedback: "Perigo! Se for um criminoso, você perderá esse dinheiro para sempre. Ligue para o telefone antigo dele primeiro!" },
      { text: "Não mandar dinheiro e fazer uma ligação para o número antigo do meu neto para conferir se é verdade.", isCorrect: true, feedback: "Excelente escolha! Ligar no telefone tradicional confirma se ele realmente trocou de número ou se é um golpista tentando te enganar." }
    ]
  },
  {
    title: "A Ligação de Alerta de Fraude",
    scenario: "Um atendente muito simpático liga se identificando do seu banco e diz:\n'Sua conta está prestes a ser bloqueada devido a um vírus. Para proteger seu saldo, faça um Pix para nossa conta de segurança.'",
    question: "Como você procede?",
    options: [
      { text: "Digo que vou desligar e irei pessoalmente à minha agência bancária ou usarei o número do verso do meu cartão.", isCorrect: true, feedback: "Perfeito! Bancos nunca ligam pedindo transferências de emergência por Pix para salvar dinheiro de vírus." },
      { text: "Sigo as instruções do atendente com pressa para não perder minhas economias de uma vida.", isCorrect: false, feedback: "Atenção extrema! Esse é o famoso golpe da falsa central telefônica. O banco de verdade nunca faria isso." }
    ]
  },
  {
    title: "SMS de Entrega Retida",
    scenario: "Você recebe um SMS de um número comum (tipo celular comum) escrito:\n'SEDEX: Sua mercadoria está retida na alfândega. Clique aqui para pagar a taxa: correios-seguros-taxas.net/pagar'",
    question: "Como você reage?",
    options: [
      { text: "Ignoro e apago a mensagem imediatamente, pois sei que os Correios não mandam SMS com cobranças desse tipo.", isCorrect: true, feedback: "Fantástico! Sites de correios reais terminam em '.com.br' e os Correios não mandam mensagens cobrando taxas de surpresa." },
      { text: "Clico no link logo para liberar logo minha suposta encomenda que pode ser um presente.", isCorrect: false, feedback: "Risco Alto! Clicar em links duvidosos de SMS pode infectar seu aparelho de telefone com vírus espiões." }
    ]
  },
  {
    title: "Sorteio do Pix Premiado",
    scenario: "Um amigo seu compartilha no WhatsApp um link com a foto de uma marca famosa escrito:\n'A Nestlé está distribuindo R$ 500 no Pix em comemoração aos seus 100 anos! Resgate agora digitando seu CPF e senha bancária.'",
    question: "O que você decide fazer?",
    options: [
      { text: "Digitar meu CPF e dados para ganhar o prêmio, afinal meu amigo de confiança que mandou no grupo.", isCorrect: false, feedback: "Cuidado! Muitas vezes o celular do seu amigo foi hackeado ou ele foi enganado. Grandes marcas não pedem senhas bancárias em promoções." },
      { text: "Não clico e aviso meu amigo que esse link pode ser perigoso e falso.", isCorrect: true, feedback: "Maravilhoso! Proteger a si mesmo e alertar seus amigos queridos é a melhor forma de combater essas armadilhas online." }
    ]
  }
];

window.onload = function() {
  lucide.createIcons();
  updateAccessibilityStyles();
  loadTrustedContact();
  loadQuestion();
};

function changeFontSize(delta) {
  currentScale += delta;
  if (currentScale < 0.9) currentScale = 0.9;
  if (currentScale > 1.8) currentScale = 1.8;
  updateAccessibilityStyles();
  const text = delta > 0 ? "Letras aumentadas" : "Letras diminuídas";
  announceToScreenReader(text);
}

function resetFontSize() {
  currentScale = 1.1;
  updateAccessibilityStyles();
  announceToScreenReader("Tamanho de letra restaurado para o padrão confortável");
}

function toggleTheme() {
  const body = document.getElementById('appBody');
  body.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast');

  if (currentTheme === 'light') {
    currentTheme = 'dark';
    body.classList.add('theme-dark');
    announceToScreenReader("Modo Escuro ativado.");
  } else if (currentTheme === 'dark') {
    currentTheme = 'high-contrast';
    body.classList.add('theme-high-contrast');
    announceToScreenReader("Modo Alto Contraste ativado. Fundo preto com letras amarelas.");
  } else {
    currentTheme = 'light';
    body.classList.add('theme-light');
    announceToScreenReader("Modo Claro Suave ativado.");
  }
}

function updateAccessibilityStyles() {
  document.documentElement.style.fontSize = `${16 * currentScale}px`;
}

function toggleAudioAssistant() {
  isTtsEnabled = !isTtsEnabled;
  const btn = document.getElementById('ttsToggleBtn');
  const text = document.getElementById('ttsText');

  if (isTtsEnabled) {
    btn.classList.remove('bg-emerald-700', 'hover:bg-emerald-800');
    btn.classList.add('bg-orange-600', 'hover:bg-orange-700');
    text.innerText = "Som Ativo 🔊";
    announceToScreenReader("O leitor de voz está ativado. Agora, qualquer texto ou botão que você clicar será lido em voz alta.");
  } else {
    window.speechSynthesis.cancel();
    btn.classList.remove('bg-orange-600', 'hover:bg-orange-700');
    btn.classList.add('bg-emerald-700', 'hover:bg-emerald-800');
    text.innerText = "Som Desativado 🔇";
  }
}

function readAloud(text) {
  if (!isTtsEnabled) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 0.95; 
  window.speechSynthesis.speak(utterance);
}

function announceToScreenReader(text) {
  if (isTtsEnabled) {
    readAloud(text);
  }
}

function switchTab(tabId) {
  document.getElementById('tab-dicas').classList.add('hidden');
  document.getElementById('tab-jogo').classList.add('hidden');
  document.getElementById('tab-ajuda').classList.add('hidden');

  const tabs = ['dicas', 'jogo', 'ajuda'];
  tabs.forEach(tab => {
    const btn = document.getElementById(`tabBtn-${tab}`);
    btn.className = "big-target flex items-center justify-center gap-3 border-4 rounded-xl font-black text-xl transition-all shadow-md bg-white border-gray-300 text-gray-700 hover:border-black hover:text-black";
  });

  document.getElementById(`tab-${tabId}`).classList.remove('hidden');
  const activeBtn = document.getElementById(`tabBtn-${tabId}`);
  activeBtn.className = "big-target flex items-center justify-center gap-3 border-4 rounded-xl font-black text-xl transition-all shadow-md bg-amber-500 border-black text-black";

  let pageName = "";
  if (tabId === 'dicas') pageName = "Aba de Aprendizado de Dicas de Segurança";
  if (tabId === 'jogo') pageName = "Aba do Jogo e Treinamento Prático de Golpes";
  if (tabId === 'ajuda') pageName = "Aba de Telefones e Contatos de Ajuda Úteis";
  
  announceToScreenReader(pageName);
}

function openTipModal(tipKey) {
  const data = tipData[tipKey];
  if (!data) return;

  const modal = document.getElementById('tipModal');
  const title = document.getElementById('modalTitle');
  const iconContainer = document.getElementById('modalIconContainer');
  const content = document.getElementById('modalContent');

  title.innerText = data.title;
  iconContainer.className = `p-3 rounded-2xl ${data.iconColor}`;
  iconContainer.innerHTML = `<i data-lucide="${data.icon}" class="w-10 h-10"></i>`;

  let htmlContent = "";
  data.steps.forEach((step, index) => {
    htmlContent += `
      <div class="p-4 rounded-xl border-2 border-gray-200 bg-slate-50 space-y-1">
        <h3 class="text-xl font-black text-slate-900" onclick="readAloud(this.innerText)">${index + 1}. ${step.title}</h3>
        <p class="text-lg text-slate-700 leading-relaxed" onclick="readAloud(this.innerText)">${step.desc}</p>
      </div>
    `;
  });
  content.innerHTML = htmlContent;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; 
  lucide.createIcons();

  announceToScreenReader(`Abriu os detalhes de: ${data.title}. Clique nos blocos de dicas para ler cada um.`);
}

function closeTipModal() {
  const modal = document.getElementById('tipModal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto'; 
  window.speechSynthesis.cancel(); 
  announceToScreenReader("Janela de informações fechada.");
}

function readModalContent() {
  const title = document.getElementById('modalTitle').innerText;
  let fullText = `${title}. Aqui estão as dicas importantes: `;

  const cards = document.getElementById('modalContent').querySelectorAll('h3, p');
  cards.forEach(element => {
    fullText += " " + element.innerText;
  });

  readAloud(fullText);
}

function loadQuestion() {
  const currentQuestion = quizData[currentQuizIndex];
  
  document.getElementById('quiz-progress-text').innerText = `Pergunta ${currentQuizIndex + 1} de ${quizData.length}`;
  document.getElementById('quiz-score-text').innerText = `Pontos: ${quizScore}`;
  document.getElementById('quiz-title').innerText = currentQuestion.title;
  document.getElementById('quiz-simulated-content').innerText = currentQuestion.scenario;
  document.getElementById('quiz-question-prompt').innerText = currentQuestion.question;

  const optionsContainer = document.getElementById('quiz-options');
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = "big-target bg-white text-black text-left p-5 rounded-2xl border-4 border-gray-300 hover:border-black hover:bg-slate-50 transition-all font-bold text-lg leading-relaxed flex flex-col justify-between";
    btn.onclick = () => selectOption(index);
    btn.innerHTML = `
      <span class="text-blue-700 font-extrabold text-xl mb-2">Opção ${index + 1}:</span>
      <span onclick="event.stopPropagation(); readAloud(this.innerText)">${option.text}</span>
    `;
    optionsContainer.appendChild(btn);
  });

  if (isTtsEnabled) {
    const announcement = `Cenário do Jogo. ${currentQuestion.title}. ${currentQuestion.scenario}. Pergunta: ${currentQuestion.question}. Escolha a opção 1 ou a opção 2.`;
    readAloud(announcement);
  }
}

function selectOption(index) {
  const currentQuestion = quizData[currentQuizIndex];
  const selectedOption = currentQuestion.options[index];

  if (selectedOption.isCorrect) {
    quizScore += 10;
  }

  openFeedbackModal(selectedOption.isCorrect, selectedOption.feedback);
}

function openFeedbackModal(isCorrect, feedbackText) {
  const modal = document.getElementById('tipModal');
  const title = document.getElementById('modalTitle');
  const iconContainer = document.getElementById('modalIconContainer');
  const content = document.getElementById('modalContent');

  if (isCorrect) {
    title.innerText = "Parabéns! Resposta Correta!";
    iconContainer.className = "p-3 rounded-2xl bg-emerald-100 text-emerald-800";
    iconContainer.innerHTML = `<i data-lucide="check-circle" class="w-10 h-10"></i>`;
    content.innerHTML = `
      <div class="text-center space-y-4">
        <span class="text-6xl">🎉</span>
        <p class="text-2xl font-black text-emerald-700">Você tomou a decisão de proteção perfeita!</p>
        <p class="text-lg text-gray-700 mt-2">${feedbackText}</p>
      </div>
    `;
    announceToScreenReader(`Muito bem! Resposta Correta! ${feedbackText}`);
  } else {
    title.innerText = "Atenção! Cuidado com essa Escolha.";
    iconContainer.className = "p-3 rounded-2xl bg-red-100 text-red-800";
    iconContainer.innerHTML = `<i data-lucide="alert-triangle" class="w-10 h-10"></i>`;
    content.innerHTML = `
      <div class="text-center space-y-4">
        <span class="text-6xl">⚠️</span>
        <p class="text-2xl font-black text-red-600">Isso pode colocar seus dados em risco!</p>
        <p class="text-lg text-gray-700 mt-2">${feedbackText}</p>
      </div>
    `;
    announceToScreenReader(`Cuidado com essa escolha. ${feedbackText}`);
  }

  const footerBtn = modal.querySelector('footer, button[onclick="closeTipModal()"]:last-of-type');
  if (footerBtn) {
    footerBtn.innerText = "Próxima Pergunta ➡️";
    footerBtn.onclick = () => {
      closeTipModal();
      advanceQuiz();
    };
  }

  modal.classList.remove('hidden');
  lucide.createIcons();
}

function advanceQuiz() {
  currentQuizIndex++;
  if (currentQuizIndex < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById('quiz-container').classList.add('hidden');
    document.getElementById('quiz-result-card').classList.remove('hidden');

    const resultTitle = document.getElementById('quiz-result-title');
    const resultDesc = document.getElementById('quiz-result-desc');

    resultTitle.innerText = "Treinamento Finalizado!";
    resultDesc.innerText = `Você concluiu o treinamento de segurança digital e fez um total de ${quizScore} pontos! Compartilhe o que aprendeu com seus amigos idosos.`;
    
    announceToScreenReader(`Treinamento Finalizado! Parabéns, você concluiu com ${quizScore} pontos.`);
  }

  const modal = document.getElementById('tipModal');
  const footerBtn = modal.querySelector('button[onclick*="advanceQuiz"], button[onclick*="closeTipModal"]');
  if (footerBtn) {
    footerBtn.innerText = "Entendi, Obrigado!";
    footerBtn.onclick = () => closeTipModal();
  }
}

function restartQuiz() {
  currentQuizIndex = 0;
  quizScore = 0;
  document.getElementById('quiz-container').classList.remove('hidden');
  document.getElementById('quiz-result-card').classList.add('hidden');
  loadQuestion();
}

function saveTrustedContact() {
  const name = document.getElementById('contact-name').value;
  const phone = document.getElementById('contact-phone').value;

  if (name && phone) {
    localStorage.setItem('guardiao_trusted_name', name);
    localStorage.setItem('guardiao_trusted_phone', phone);
    updateTrustedContactUI(name, phone);
    announceToScreenReader(`Salvo com sucesso! Seu contato de confiança agora é o parente ${name}.`);
  } else {
    document.getElementById('call-trusted-container').classList.add('hidden');
  }
}

function loadTrustedContact() {
  const name = localStorage.getItem('guardiao_trusted_name');
  const phone = localStorage.getItem('guardiao_trusted_phone');

  if (name && phone) {
    document.getElementById('contact-name').value = name;
    document.getElementById('contact-phone').value = phone;
    updateTrustedContactUI(name, phone);
  }
}

function updateTrustedContactUI(name, phone) {
  const container = document.getElementById('call-trusted-container');
  const btn = document.getElementById('call-trusted-btn');
  const spanName = document.getElementById('call-trusted-name');

  spanName.innerText = name;
  btn.href = `tel:${phone.replace(/\D/g, '')}`;
  container.classList.remove('hidden');
}