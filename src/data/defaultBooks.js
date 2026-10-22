export const GENRES = [
  "Fantasia & Aventura",
  "Ficção Científica",
  "Mistério",
  "Policial",
  "Ação",
  "Terror & Suspense",
  "Drama",
  "Romance"
];

export const DEFAULT_COLLECTIONS = [
  {
    id: "colecao-reino-magico",
    name: "Coleção O Reino Mágico de Jhully",
    description: "A saga fantástica completa onde palavras ganham vida e os portais da imaginação despertam perigos ancestrais.",
    author: "Paulo Ricardo Cordova",
    genre: "Fantasia & Aventura",
    coverUrl: "./covers/reino_magico_oficial_jhully.jpg",
    themeColor: "#8b5cf6",
    createdAt: "2026-09-28"
  },
  {
    id: "colecao-cronicas-cosmos",
    name: "Coleção Crônicas do Cosmos e o Relógio Estelar",
    description: "Uma fascinante odisseia espacial desvendando as engrenagens ocultas do tempo e saltos dimensionais.",
    author: "Paulo Ricardo Cordova",
    genre: "Ficção Científica",
    coverUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop",
    themeColor: "#3b82f6",
    createdAt: "2026-09-28"
  }
];

export const DEFAULT_BOOKS = [
  {
    id: "pai-de-dois",
    title: "Pai de Dois",
    author: "Paulo Ricardo Cordova",
    category: "Drama",
    tags: ["Drama", "Família", "Superação", "Paternidade", "Amor", "História Real"],
    coverUrl: "./covers/pai_de_dois_capa.jpg",
    themeColor: "#f59e0b",
    synopsis: "Uma narrativa pessoal emocionante sobre infância difícil, abandono paterno, convulsões e superação, celebrando o maior presente da vida: ser pai de Benjamin Lucca e Isabella Emanuelly. Uma história real de amor, erros, recomeços e presença incondicional.",
    backCoverText: `“Eu não posso reescrever cada página do passado, mas posso escolher o amor com que escrevo as próximas.”

Pai de Dois é uma história real, com dores, recomeços, risos, lágrimas e muito amor. Dedicado a todos os pais que, assim como eu, carregam no peito a esperança de um futuro melhor para seus filhos. E, principalmente, aos meus filhos, que são a minha maior inspiração.

— Paulo Ricardo Cordova • Benjamin Lucca • Isabella Emanuelly`,
    createdAt: "2026-10-22",
    views: 1680,
    banners: [
      {
        id: "banner-capa",
        title: "Capa Oficial — Pai de Dois",
        subtitle: "Paulo Ricardo Cordova, Benjamin Lucca & Isabella Emanuelly",
        imageUrl: "./covers/pai_de_dois_capa.jpg",
        description: "A arte oficial da capa retratando o autor Paulo Ricardo Cordova com seus dois filhos, Benjamin e Isabella, sob o pôr do sol do Rio de Janeiro."
      },
      {
        id: "banner-mirante",
        title: "Mirante Panorâmico Widescreen — Sonho & Família",
        subtitle: "“Nunca desista. Você consegue!”",
        imageUrl: "./covers/pai_de_dois_mirante.jpg",
        description: "Visão widescreen do pai e seus dois filhos admirando o horizonte no mirante, com jaquetas 'SONHO' e 'FAMÍLIA'."
      },
      {
        id: "banner-silhueta",
        title: "Silhueta ao Pôr do Sol — Presença e Afeto",
        subtitle: "“Pai não é quem faz, mas quem se faz presente.”",
        imageUrl: "./covers/pai_de_dois_silhueta.jpg",
        description: "De mãos dadas no cume ao pôr do sol radiante, celebrando a presença real e o compromisso paterno."
      },
      {
        id: "banner-benjamin",
        title: "Benjamin Lucca — Meu Primeiro Presente",
        subtitle: "“Você não é apenas um filho. Você é a razão de eu continuar.” (06/05/2018)",
        imageUrl: "./covers/pai_de_dois_benjamin.jpg",
        description: "Retrato carinhoso do primogênito Benjamin Lucca, repleto de curiosidade, inteligência e paixão pelos números."
      },
      {
        id: "banner-isabella",
        title: "Isabella Emanuelly — Uma Nova Luz",
        subtitle: "Nossa pequena especialista em tudo (23/12/2023)",
        imageUrl: "./covers/pai_de_dois_isabella.jpg",
        description: "Retrato encantador da caçula Isabella Emanuelly, cheia de graça, personalidade forte e amor pelo lar."
      }
    ],
    slides: [
      {
        id: "pdd-s1",
        type: "cover",
        title: "Pai de Dois",
        subtitle: "Uma história de infância, cicatrizes, amor e superação",
        content: "Por Paulo Ricardo Cordova\\n\\nUma história real de luta, amor, superação e o maior presente da vida: ser pai.",
        imageUrl: "./covers/pai_de_dois_capa.jpg",
        badge: "História Real • Drama"
      },
      {
        id: "pdd-s2",
        type: "banner",
        isBanner: true,
        title: "Ser Pai É Fazer-se Presente",
        subtitle: "Uma história real, com dores, recomeços, risos, lágrimas e muito amor",
        imageUrl: "./covers/pai_de_dois_mirante.jpg",
        badge: "Banner Oficial Widescreen",
        content: `“Ser pai não é apenas dar a vida, mas escolher estar presente, mesmo quando tudo parece difícil.”

Este livro é a minha história. Uma história real, com dores, recomeços, risos, lágrimas e muito amor.

Dedico a todos os pais que, assim como eu, carregam no peito a esperança de um futuro melhor para seus filhos. E, principalmente, aos meus filhos, que são a minha maior inspiração.

Pai de Dois é sobre amor, superação e o poder de nunca desistir.`
      },
      {
        id: "pdd-s3",
        type: "dedication",
        title: "Dedicatória",
        badge: "Do Coração",
        content: `A Benjamin Lucca e Isabella Emanuelly, meus dois maiores presentes. Que estas páginas sejam, para vocês, uma lembrança de que o amor de um pai não precisa ser perfeito para ser verdadeiro: ele precisa ser honesto, presente e disposto a aprender.

À minha mãe, que enfrentou dias difíceis antes mesmo de eu nascer, e a todas as pessoas que permaneceram quando a vida ficou complicada. Vocês também fazem parte destas páginas.`
      },
      {
        id: "pdd-s4",
        type: "chapter",
        title: "Uma palavra antes de começar",
        badge: "Introdução",
        content: `Este livro é uma narrativa pessoal inspirada nas lembranças e experiências compartilhadas pelo autor. Algumas cenas foram desenvolvidas literariamente para dar fluidez à história; diálogos e detalhes não informados diretamente são tratados como reconstruções narrativas, não como registros exatos.

As referências a convulsões na infância e às crises de Benjamin são apresentadas com respeito. O livro não substitui orientação médica. Cada criança tem sua própria história, e qualquer preocupação de saúde deve ser acompanhada por profissionais qualificados.

A intenção destas páginas é celebrar a paternidade possível: aquela que aprende, erra, repara e escolhe amar todos os dias.`
      },
      {
        id: "pdd-s5",
        type: "chapter",
        title: "📖 Capítulo 1 – As raízes da minha história",
        content: `Nasci em 18 de novembro de 1990, numa época em que a vida da minha família já carregava perguntas difíceis. Antes mesmo de eu chegar ao mundo, meu pai foi embora. Minha mãe ainda estava grávida de mim quando precisou encarar a maternidade sem a presença dele. Eu não guardo lembranças daquele abandono, porque era pequeno demais para entender o que significava uma ausência. Mas, com o tempo, aprendi que algumas histórias começam antes da primeira memória.

Minha mãe teve de ser forte quando talvez também precisasse de colo. Imagino quantas noites ela passou pensando no futuro, fazendo contas, criando coragem e tentando acreditar que tudo daria certo. Eu era apenas uma vida a caminho, sem saber dos desafios que me esperavam. Ainda assim, fui recebido por alguém que continuou. E, às vezes, continuar é o primeiro grande ato de amor.

Quando eu tinha pouco mais de um ano, minha mãe conheceu o homem que se tornaria meu padrasto. Ele entrou na nossa história quando eu ainda não entendia parentesco, sobrenomes ou promessas. Para uma criança, família é quem aparece, quem cuida, quem dá segurança e quem fica quando o dia fica difícil. A vida me ensinaria que laços de amor podem nascer de caminhos que não estavam no plano original.

Hoje, olhando para trás, não quero transformar minha história numa acusação. Quero contá-la como ela foi: com ausências, sim, mas também com pessoas que chegaram, mãos que ajudaram e oportunidades de recomeçar. O passado explica algumas cicatrizes, mas não tem o direito de escrever sozinho o final da nossa história.

Às vezes, só entendemos o valor de uma fase quando ela já passou. O que parecia pequeno se torna lembrança; o que parecia impossível se torna prova de que conseguimos continuar.`
      },
      {
        id: "pdd-s6",
        type: "banner",
        isBanner: true,
        title: "Mensagem para levar: Presença",
        subtitle: "Uma pausa para lembrar",
        imageUrl: "./covers/pai_de_dois_silhueta.jpg",
        badge: "Banner Reflexão • Presença",
        content: `“Nem toda vitória faz barulho. Às vezes, ela é simplesmente acordar e tentar outra vez.”

PRESENÇA
Estar presente é oferecer atenção de verdade. Nem sempre será possível resolver o problema, mas quase sempre será possível ouvir, acolher e buscar uma saída juntos.

Pergunta para o coração: que gesto simples posso fazer hoje para que alguém que amo se sinta visto, seguro e importante?`
      },
      {
        id: "pdd-s7",
        type: "chapter",
        title: "📖 Capítulo 2 – Uma infância de coragem",
        content: `Entre o primeiro e o sétimo ano de vida, enfrentei convulsões. Eu era uma criança e não compreendia por que meu corpo, de repente, parecia escapar do meu controle. Os adultos ao redor tentavam entender, procuravam respostas e carregavam seus próprios medos. Para mim, a infância tinha brinquedos, descobertas e vontade de correr; para minha família, também tinha consultas, preocupação e a esperança de que tudo ficasse bem.

Não lembro de cada detalhe com a precisão de uma fotografia. Algumas histórias chegaram até mim contadas por quem estava presente; outras ficaram guardadas em sensações. Sei que não foi simples. Uma doença ou um susto na infância não atinge apenas a criança: atravessa a casa inteira, muda o silêncio dos corredores e faz qualquer pequena melhora parecer uma vitória gigantesca.

Cresci aprendendo, mesmo sem saber dar esse nome, que a coragem nem sempre é enfrentar algo sem medo. Às vezes, coragem é voltar ao médico, tomar o remédio, esperar o resultado, respirar fundo e tentar brincar de novo. É deixar que os adultos cuidem de você sem acreditar que isso diminui sua força.

Aos sete anos, aquela fase das convulsões ficou para trás. Não significa que eu tenha saído dela sem marcas, mas significa que atravessei uma etapa que parecia enorme quando eu era pequeno. Hoje, quando penso nisso, entendo por que a saúde dos meus filhos me toca tão profundamente. Existem medos que a gente não esquece; aprende a transformar em cuidado.`
      },
      {
        id: "pdd-s8",
        type: "banner",
        isBanner: true,
        title: "Mensagem para levar: Coragem",
        subtitle: "Uma pausa para lembrar",
        imageUrl: "./covers/pai_de_dois_mirante.jpg",
        badge: "Banner Reflexão • Coragem",
        content: `“Cuidar também é procurar ajuda, respeitar os limites e não enfrentar o medo sozinho.”

CORAGEM
Coragem não é ausência de medo. É agir com cuidado apesar dele, pedir ajuda quando necessário e não deixar que a preocupação roube todos os momentos de alegria.

Pergunta para o coração: que gesto simples posso fazer hoje para que alguém que amo se sinta visto, seguro e importante?`
      },
      {
        id: "pdd-s9",
        type: "chapter",
        title: "📖 Capítulo 3 – As pessoas que ficam",
        content: `Conforme fui crescendo, conheci pessoas boas. Algumas chegaram para ficar por muitos anos; outras caminharam comigo por um trecho e depois seguiram outra direção. Houve quem se afastasse sem explicação, quem eu precisasse deixar para trás e quem me ensinasse algo importante sem sequer perceber. A vida não entrega um mapa com a legenda de quem é verdadeiro. Às vezes, ela revela isso quando tudo parece desmoronar.

Também conheci pessoas que se aproximavam pelo interesse. Enquanto eu tinha alguma coisa para oferecer, havia mensagens, convites e promessas. Quando fiquei praticamente sem nada, o movimento mudou. Algumas pessoas desapareceram como se nunca tivessem conhecido meu nome. No começo, doeu. A gente tenta encontrar uma explicação elegante para a decepção, mas a verdade costuma ser simples: certas presenças só gostam da nossa fase boa.

Foi justamente nesse período que comecei a reconhecer quem era de verdade. Quem não tinha muito, mas perguntava se eu estava bem. Quem não podia resolver meus problemas, mas sentava ao meu lado. Quem não precisava de plateia para demonstrar amizade. Descobri que o valor de uma pessoa não está no tamanho do presente que ela oferece, e sim na sinceridade com que permanece.

Não quero dizer que devemos desconfiar de todos. Pelo contrário: ainda acredito em gente incrível. Só aprendi a observar atitudes, a proteger minha paz e a não confundir movimento com lealdade. Uma sala cheia não significa um coração acompanhado. Às vezes, dois amigos verdadeiros valem mais que cem contatos que só aparecem quando há algo a ganhar.

Não quero que meus filhos herdem meus medos como se fossem regras. Quero que conheçam minha história para entenderem que é possível aprender com ela e seguir por caminhos próprios.`
      },
      {
        id: "pdd-s10",
        type: "banner",
        isBanner: true,
        title: "Mensagem para levar: Lealdade",
        subtitle: "Uma pausa para lembrar",
        imageUrl: "./covers/pai_de_dois_silhueta.jpg",
        badge: "Banner Reflexão • Lealdade",
        content: `“A família se constrói no cotidiano: no pedido de desculpas, no abraço e na conversa sincera.”

LEALDADE
Observe quem permanece com respeito quando a vida muda. E seja você também alguém cuja palavra tem valor, mesmo quando ninguém está olhando.

Pergunta para o coração: que gesto simples posso fazer hoje para que alguém que amo se sinta visto, seguro e importante?`
      },
      {
        id: "pdd-s11",
        type: "chapter",
        title: "📖 Capítulo 4 – Reescrevendo o caminho",
        content: `Depois de algumas quedas, entendi que recomeçar não é fingir que nada aconteceu. É juntar o que sobrou, aprender com o que doeu e construir com mais consciência. Eu não podia voltar à infância para corrigir a ausência do meu pai, nem apagar os sustos de saúde, nem obrigar ninguém a permanecer. Mas podia decidir como seguiria dali em diante.

Conheci pessoas incríveis, algumas inesperadas, e fui reescrevendo minha história. Não aconteceu de uma hora para outra. Houve dias em que eu me senti forte e outros em que só consegui dar um passo pequeno. Aprendi que a vida não muda apenas nos grandes anúncios. Muda quando a gente escolhe levantar, pedir desculpas, procurar trabalho, aceitar ajuda e tentar mais uma vez.

A superação não é uma linha reta. Às vezes, a gente avança e depois volta alguns passos. O importante é não transformar um dia ruim numa sentença sobre a vida inteira. Eu passei a compreender que não precisava provar nada a quem tinha ido embora. Meu compromisso era com a pessoa que eu queria me tornar.

Sem perceber, eu estava me preparando para uma responsabilidade muito maior do que qualquer conquista pessoal: ser pai. Eu ainda não sabia que meus filhos me ensinariam a olhar para a própria infância com outros olhos, nem que o amor poderia despertar medos antigos e, ao mesmo tempo, me dar forças que eu nem imaginava possuir.

Às vezes, só entendemos o valor de uma fase quando ela já passou. O que parecia pequeno se torna lembrança; o que parecia impossível se torna prova de que conseguimos continuar.`
      },
      {
        id: "pdd-s12",
        type: "banner",
        isBanner: true,
        title: "Mensagem para levar: Recomeço",
        subtitle: "Uma pausa para lembrar",
        imageUrl: "./covers/pai_de_dois_mirante.jpg",
        badge: "Banner Reflexão • Recomeço",
        content: `“O sonho de uma criança merece incentivo, não pressão. Acompanhar é diferente de decidir por ela.”

RECOMEÇO
Você não precisa apagar o passado para construir um futuro diferente. Aprenda com ele, reconheça suas feridas e escolha o próximo passo com consciência.

Pergunta para o coração: que gesto simples posso fazer hoje para que alguém que amo se sinta visto, seguro e importante?`
      },
      {
        id: "pdd-s13",
        type: "chapter",
        title: "📖 Capítulo 5 – Benjamin Lucca: meu primeiro presente",
        content: `No dia 6 de maio de 2018, nasceu Benjamin Lucca, meu primogênito. Há momentos em que o mundo parece diminuir até caber em um rostinho. Foi assim comigo. Aquele menino não chegou apenas para ocupar um espaço na família; chegou para reorganizar minhas prioridades, minhas preocupações e o sentido das palavras futuro e responsabilidade.

Eu olhava para ele e pensava em tudo o que queria oferecer: proteção, oportunidades, carinho, presença e a certeza de que ele seria amado. Talvez eu não soubesse ser pai de maneira perfeita — ninguém recebe um manual completo na maternidade ou na paternidade. Mas sabia que queria aprender. Queria ser o adulto que escuta, que explica, que assume os erros e que tenta fazer melhor no dia seguinte.

Benjamin foi meu primeiro grande presente. E, junto com ele, veio uma nova versão de mim. De repente, decisões que antes pareciam individuais passaram a ter outro peso. O que eu fazia, o que eu dizia e a forma como tratava as pessoas se tornaram exemplos que poderiam morar na memória de alguém pequeno.

A paternidade não me transformou num homem sem falhas. Transformou-me num homem que tinha mais motivos para enfrentá-las. Eu precisava aprender a ter paciência, a organizar o tempo, a celebrar pequenas conquistas e a entender que, para uma criança, cinco minutos de atenção verdadeira podem valer mais que um dia inteiro de presença distraída.`
      },
      {
        id: "pdd-s14",
        type: "banner",
        isBanner: true,
        title: "Banner Especial – Benjamin Lucca (06/05/2018)",
        subtitle: "“Você não é apenas um filho. Você é a razão de eu continuar.”",
        imageUrl: "./covers/pai_de_dois_benjamin.jpg",
        badge: "Banner Primogênito • Alta Resolução",
        content: `“As pequenas descobertas de hoje serão as histórias que, amanhã, vamos contar com saudade.”

INDIVIDUALIDADE
Cada filho tem seu ritmo, seu temperamento e seus sonhos. Amar bem é conhecer a criança real, não tentar encaixá-la numa comparação.

Pergunta para o coração: que gesto simples posso fazer hoje para que alguém que amo se sinta visto, seguro e importante?`
      },
      {
        id: "pdd-s15",
        type: "chapter",
        title: "📖 Capítulo 6 – O medo que voltou",
        content: `Nas vésperas de Benjamin completar um ano, aconteceu algo que mexeu com tudo o que eu acreditava ter deixado para trás: ele teve a primeira crise convulsiva. O desespero foi enorme. A memória do meu próprio passado, que eu pensava estar guardada numa gaveta distante, abriu-se de uma vez. Era como se a vida repetisse diante de mim uma cena que eu jamais desejaria ver no meu filho.

Naquele instante, não havia espaço para discursos bonitos. Havia medo, urgência, perguntas e a necessidade de agir. Ver um filho passando por algo que você conhece desde criança é uma sensação difícil de explicar. Eu queria trocar de lugar com ele, absorver qualquer sofrimento e garantir que nada de ruim voltasse a acontecer. Mas ser pai também é descobrir que amor não significa ter controle sobre tudo.

Começamos tratamentos e acompanhamento. Mesmo assim, Benjamin teve mais quatro crises ao longo dos anos, sendo a última por volta dos quatro anos de idade. Cada episódio trazia uma mistura de preocupação e esperança. A gente aprende a valorizar os dias tranquilos de um jeito diferente, mas também precisa lembrar que a criança não pode ser resumida ao que aconteceu com sua saúde.

Benjamin continuava sendo Benjamin: curioso, cheio de personalidade, capaz de fazer graça, aprender coisas novas e surpreender a todos. O medo precisava existir sem ocupar todos os lugares da casa. Com apoio médico e cuidado, fomos atravessando aquela etapa. Eu não podia prometer que nunca sentiria medo; podia prometer que buscaria ajuda e estaria ao lado dele.

Não quero que meus filhos herdem meus medos como se fossem regras. Quero que conheçam minha história para entenderem que é possível aprender com ela e seguir por caminhos próprios.`
      },
      {
        id: "pdd-s16",
        type: "banner",
        isBanner: true,
        title: "Mensagem para levar: Humildade",
        subtitle: "Uma pausa para lembrar",
        imageUrl: "./covers/pai_de_dois_silhueta.jpg",
        badge: "Banner Reflexão • Humildade",
        content: `“Filhos não precisam de pais perfeitos. Precisam de adultos que permaneçam, escutem e tentem de novo.”

HUMILDADE
Pedir desculpas a um filho ensina que o respeito vale para todos. A autoridade mais forte é aquela que não precisa humilhar.

Pergunta para o coração: que gesto simples posso fazer hoje para que alguém que amo se sinta visto, seguro e importante?`
      },
      {
        id: "pdd-s17",
        type: "chapter",
        title: "📖 Capítulo 7 – Ser pai sem ser perfeito",
        content: `Há uma cobrança silenciosa que acompanha muitos pais: a ideia de que precisamos saber tudo, resolver tudo e nunca demonstrar fraqueza. Eu não acredito mais nisso. Crianças não precisam de um super-herói que finge não sentir medo. Precisam de adultos confiáveis, que saibam pedir ajuda, reconhecer limites e agir com responsabilidade.

Aprendi que pedir desculpas não diminui a autoridade de um pai. Pelo contrário, mostra que respeito não é uma ordem de mão única. Se eu quero que meus filhos reconheçam os próprios erros, preciso ser capaz de reconhecer os meus. Se quero que falem a verdade, preciso escutá-los sem transformar cada conversa num julgamento.

Também aprendi que disciplina e carinho não são inimigos. Limites ajudam a criança a se sentir segura quando são explicados com clareza e aplicados sem humilhação. A casa precisa ter regras, mas também precisa ter risadas, brincadeiras e espaço para perguntas que parecem absurdas — porque, para uma criança, descobrir o mundo é um trabalho sério.

Às vezes, o melhor que um pai pode fazer é abaixar-se para ficar na altura dos olhos do filho e perguntar: “Me conta o que aconteceu.” Não para preparar uma resposta enquanto a criança fala, mas para realmente ouvir. O vínculo se constrói nessas pequenas escolhas, repetidas ao longo dos dias.`
      },
      {
        id: "pdd-s18",
        type: "banner",
        isBanner: true,
        title: "Mensagem para levar: Esperança",
        subtitle: "Uma pausa para lembrar",
        imageUrl: "./covers/pai_de_dois_mirante.jpg",
        badge: "Banner Reflexão • Esperança",
        content: `“Cuidar também é procurar ajuda, respeitar os limites e não enfrentar o medo sozinho.”

ESPERANÇA
Não transforme um dia difícil numa previsão para a vida inteira. Há capítulos que começam na dor e terminam em aprendizado.

Pergunta para o coração: que gesto simples posso fazer hoje para que alguém que amo se sinta visto, seguro e importante?`
      },
      {
        id: "pdd-s19",
        type: "chapter",
        title: "📖 Capítulo 8 – Isabella Emanuelly: uma nova luz",
        content: `No dia 23 de dezembro de 2023, chegou Isabella Emanuelly. Minha menina. A chegada dela abriu outro capítulo no livro da família e me mostrou que o coração não divide o amor em pedaços menores: ele aprende a crescer. Eu já conhecia a emoção de segurar um filho nos braços, mas cada nascimento tem sua própria luz, seu próprio silêncio e sua própria maneira de transformar a casa.

Isabella sempre demonstrou ser muito esperta. Antes de completar dois anos, já reconhecia cores e sabia contar. Observava tudo como se o mundo fosse um grande enigma que ela pretendia resolver antes do almoço. E tinha também suas exigências: mão suja? Problema. Boca suja? Situação gravíssima. A pequena fiscal da limpeza surgia com uma expressão indignada, como se alguém tivesse violado uma cláusula muito séria do contrato da infância.

Com ela, aprendi que a personalidade aparece cedo e sem pedir licença. Isabella tem seu jeito, suas preferências e uma capacidade impressionante de deixar todos ao redor atentos. É carinhosa, intensa, curiosa e dona de uma opinião que parece ter sido escrita em letras maiúsculas. Às vezes, uma criança pequena consegue conduzir uma reunião familiar inteira apenas apontando para a própria mão suja.

O humor ajuda a guardar essas lembranças com ternura. Um dia, talvez ela leia estas páginas e reclame que eu contei seus segredos. E eu responderei que foi tudo registrado com amor — e que, se ela quiser contestar, precisará primeiro limpar a boca depois do lanche.`
      },
      {
        id: "pdd-s20",
        type: "banner",
        isBanner: true,
        title: "Banner Especial – Isabella Emanuelly (23/12/2023)",
        subtitle: "Nossa doce e viva menina iluminando tudo",
        imageUrl: "./covers/pai_de_dois_isabella.jpg",
        badge: "Banner Caçula • Alta Resolução",
        content: `“A família se constrói no cotidiano: no pedido de desculpas, no abraço e na conversa sincera.”

AMOR
Amor é sentimento, mas também é prática: proteger, orientar, escutar, impor limites justos e voltar para conversar depois do conflito.

Pergunta para o coração: que gesto simples posso fazer hoje para que alguém que amo se sinta visto, seguro e importante?`
      },
      {
        id: "pdd-s21",
        type: "chapter",
        title: "📖 Capítulo 9 – A matemática de Benjamin",
        content: `Chegando perto do fim de 2026, Benjamin está com oito anos e demonstra uma inteligência que me enche de orgulho, principalmente em matemática. Ele diz que quer ser professor de matemática. Quando escuto isso, imagino quantas contas, cadernos, explicações e descobertas ainda o esperam. Mais do que a profissão, admiro a curiosidade que existe por trás desse sonho.

Uma criança que diz querer ensinar talvez já esteja mostrando que gosta de compreender e compartilhar. Eu quero que Benjamin saiba que pode mudar de ideia, descobrir outras paixões ou continuar nesse caminho. O sonho não deve virar uma obrigação; deve ser uma janela. Meu papel não é escolher o futuro por ele, mas ajudá-lo a encontrar ferramentas para construí-lo.

Quando ele resolve uma conta difícil, vejo mais do que um resultado certo. Vejo concentração, tentativa, erro e persistência. A vida também é assim: nem sempre a primeira resposta funciona. Às vezes é preciso refazer a conta, mudar o método e pedir ajuda. Quero que ele aprenda que errar não significa ser incapaz; significa estar aprendendo algo que ainda não dominou.

Se um dia Benjamin se tornar professor, espero que ensine com paciência. Que lembre que cada aluno tem seu ritmo e que a inteligência aparece de muitas formas. E, se escolher outra profissão, continuarei orgulhoso. O meu maior sonho não é que ele siga o caminho que imagino; é que tenha liberdade, caráter e coragem para descobrir o próprio.

Não quero que meus filhos herdem meus medos como se fossem regras. Quero que conheçam minha história para entenderem que é possível aprender com ela e seguir por caminhos próprios.`
      },
      {
        id: "pdd-s22",
        type: "chapter",
        title: "📖 Capítulo 10 – A pequena especialista em tudo",
        content: `Isabella, quase com três anos, fala sobre tudo. Pergunta, comenta, explica e surpreende. Sabe as cores, reconhece detalhes e transforma qualquer passeio numa sequência de descobertas. Às vezes, parece que ela acorda com uma pauta completa para o dia e fica sinceramente decepcionada quando os adultos não acompanham a velocidade das ideias.

Uma das histórias que mais nos surpreendeu aconteceu quando tiramos a fralda. No primeiro dia, com apenas dois aninhos, ela aprendeu a fazer xixi no pinico. Foi uma daquelas pequenas vitórias que viram assunto de família, mensagem para parentes e comemoração como se alguém tivesse acabado de ganhar uma medalha olímpica. E, convenhamos, naquele universo, a medalha era merecida.

O mais bonito não foi apenas ter aprendido rápido. Foi perceber como as crianças conseguem surpreender quando encontram incentivo, paciência e oportunidade. Cada criança tem seu tempo, e o tempo de Isabella não precisa ser a régua para medir o de nenhuma outra. A conquista dela merece alegria sem virar comparação.

Talvez, quando crescer, Isabella não se lembre do pinico, das cores ou das expressões que fazia ao sujar as mãos. Mas eu quero que ela se lembre de algo maior: em nossa casa, suas descobertas foram celebradas. Ela não precisava ser perfeita para receber aplausos. Bastava estar crescendo, tentando e sendo ela mesma.`
      },
      {
        id: "pdd-s23",
        type: "chapter",
        title: "📖 Capítulo 11 – Dois filhos, dois universos",
        content: `Ser pai de dois é descobrir que o amor pode ser igual em importância e diferente em expressão. Benjamin tem seu jeito de pensar, suas perguntas e seus sonhos. Isabella tem seu ritmo, suas opiniões e seu próprio brilho. Não existe uma fórmula única para chegar ao coração de cada um. O que funciona numa conversa com um pode precisar de outra abordagem com o outro.

Comparar irmãos parece fácil para os adultos, mas pode pesar no coração das crianças. Por isso, quero aprender a enxergar cada um em sua individualidade. Benjamin não precisa ser o irmão mais velho responsável por tudo. Isabella não precisa ser a menor que sempre recebe proteção extra. Ambos precisam de espaço para errar, aprender, brincar e serem vistos como pessoas completas.

O amor de pai não é uma balança em que cada gesto precisa ter o mesmo tamanho. É mais parecido com uma casa: cada cômodo tem uma função, mas todos fazem parte do mesmo lar. Às vezes um filho precisa de conversa; o outro, de abraço. Um precisa de incentivo; o outro, de limite. O essencial é que nenhum deles tenha de disputar o direito de ser amado.

Quero que, quando discordarem, encontrem em casa um lugar onde possam resolver conflitos sem crueldade. Irmãos podem brigar por brinquedos, atenção e até pelo último pedaço de alguma coisa. Faz parte. Mas também podem aprender a dividir, defender um ao outro e entender que a família não exige perfeição: exige respeito e vontade de reparar.

O amor aparece em gestos repetidos: preparar, acompanhar, perguntar, ouvir e voltar. São gestos simples, mas é deles que uma criança aprende a confiar no mundo.`
      },
      {
        id: "pdd-s24",
        type: "chapter",
        title: "📖 Capítulo 12 – O humor que salva o dia",
        content: `A vida de pai é feita de momentos emocionantes e de situações que, se alguém filmasse, renderiam uma comédia inteira. Há dias em que você prepara uma fala séria sobre responsabilidade e termina negociando com uma criança que se recusa a usar a roupa escolhida. Há manhãs em que sair de casa parece uma operação militar, mas o item decisivo da missão é encontrar um brinquedo que estava na mão da própria criança.

Com Isabella, a sujeira pode virar uma emergência nacional. Com Benjamin, uma conta de matemática pode render uma explicação tão detalhada que o pai acaba sendo o aluno. E eu, que às vezes acho que vou ensinar alguma coisa, descubro que estou sendo treinado em paciência, improviso e negociação. A paternidade é uma escola em que os professores são pequenos, os intervalos são imprevisíveis e a mensalidade é paga em sono.

O humor não apaga as dificuldades. Ele ajuda a atravessá-las sem deixar que tudo fique pesado o tempo inteiro. Rir junto cria memórias, aproxima e ensina que nem todo erro precisa virar uma tragédia. Claro que há momentos em que precisamos falar sério. Mas, quando a situação permite, uma risada pode abrir uma porta que uma bronca jamais abriria.

Um dia, meus filhos talvez contem histórias sobre mim: o pai que tentava resolver tudo, que às vezes se atrapalhava, que fazia planos e esquecia algum detalhe. Espero que contem rindo e que, por trás das brincadeiras, saibam que eu sempre tentei oferecer o melhor que tinha naquele momento.

Não quero que meus filhos herdem meus medos como se fossem regras. Quero que conheçam minha história para entenderem que é possível aprender com ela e seguir por caminhos próprios.`
      },
      {
        id: "pdd-s25",
        type: "chapter",
        title: "📖 Capítulo 13 – As feridas que viraram cuidado",
        content: `Durante muito tempo, a ausência do meu pai foi uma parte da história que eu não sabia exatamente onde colocar. Uma criança pode crescer sem ter palavras para explicar o que sente. Mais tarde, o adulto tenta organizar lembranças, perguntas e expectativas. Nem sempre encontra todas as respostas. E talvez amadurecer seja aceitar que algumas perguntas ficam sem resposta, mas não precisam governar cada decisão.

Quando Benjamin nasceu, comecei a perceber o peso e a beleza de estar presente. A presença não é apenas morar na mesma casa ou aparecer numa fotografia. É acompanhar, perguntar, ensinar, escutar e assumir responsabilidade até nos dias cansativos. É participar da vida real, não só dos momentos que ficam bonitos para contar.

Não escrevo isso para afirmar que todo pai ausente é igual, nem para julgar histórias que não conheço por inteiro. Escrevo porque sei como a ausência pode doer e como a presença consciente pode construir segurança. Quero que meus filhos tenham lembranças de um pai que se esforçou para estar ali, que admitiu quando falhou e que voltou para conversar.

Talvez a maior superação não seja vencer alguém ou provar que conseguimos viver sem quem foi embora. Talvez seja interromper uma dor antes que ela vire herança. Eu não posso mudar o que aconteceu comigo, mas posso escolher quais valores quero passar adiante: respeito, responsabilidade, afeto, honestidade e coragem para pedir ajuda.`
      },
      {
        id: "pdd-s26",
        type: "chapter",
        title: "📖 Capítulo 14 – O que quero ensinar a eles",
        content: `Quero ensinar a Benjamin e Isabella que dinheiro é importante para viver, mas não mede o valor de ninguém. Que ter sucesso não significa humilhar quem está começando. Que amizade se reconhece nas atitudes e que pedir desculpas é sinal de maturidade, não de fraqueza. Quero que saibam dizer não quando algo fere seus valores e sim quando a vida oferecer uma oportunidade honesta de crescer.

Quero ensinar que emoções não são inimigas. Sentir medo não torna ninguém covarde; sentir tristeza não torna ninguém fraco; sentir alegria não precisa de justificativa. Eles podem falar sobre o que sentem, mesmo quando eu não souber responder na hora. Prometo tentar escutar com respeito, porque muitas vezes uma criança não precisa que o adulto resolva tudo imediatamente — precisa primeiro ser compreendida.

Quero ensinar que o corpo merece cuidado, que saúde precisa de atenção e que buscar profissionais quando necessário é um ato de responsabilidade. A experiência com as convulsões me fez entender que não devemos brincar com sinais importantes nem tratar o sofrimento como falta de força. Cuidar é procurar orientação, seguir tratamentos indicados e apoiar quem precisa.

Acima de tudo, quero que aprendam a tratar as pessoas com dignidade. Que não usem a inteligência para diminuir alguém, nem a força para intimidar, nem a popularidade para excluir. O mundo já tem dureza suficiente. Se meus filhos puderem ser pessoas que aliviam um pouco o peso de quem cruza o caminho deles, terão feito algo extraordinário.`
      },
      {
        id: "pdd-s27",
        type: "chapter",
        title: "📖 Capítulo 15 – Quando eu também precisar de colo",
        content: `Existe uma verdade pouco falada sobre a paternidade: pais também se cansam, também sentem medo e também precisam de apoio. Durante muito tempo, eu imaginei que precisava suportar tudo em silêncio para proteger meus filhos. Hoje entendo que cuidar de mim faz parte de cuidar deles. Um pai esgotado que nunca pede ajuda pode acabar tentando carregar sozinho aquilo que deveria ser dividido.

Isso não significa colocar nos ombros das crianças os problemas dos adultos. Significa procurar apoio adequado, conversar com pessoas confiáveis e reconhecer quando é hora de respirar. Os filhos precisam de segurança, não de uma encenação de invulnerabilidade. Podem saber que o pai teve um dia difícil e, ao mesmo tempo, sentir que continua sendo o adulto responsável por cuidar deles.

A vida adulta traz boletos, decisões, incertezas e preocupações que não desaparecem com um abraço. Mas um abraço pode lembrar por que vale a pena enfrentar tudo isso. Quando vejo Benjamin concentrado em seus números ou Isabella explicando o mundo com sua lógica particular, encontro motivos para continuar construindo um amanhã melhor.

Não quero que meus filhos cresçam acreditando que amar é se sacrificar até desaparecer. Quero que aprendam que amor também envolve limites, descanso, honestidade e cuidado mútuo. Ser pai é dar muito de si, mas também é preservar forças para continuar presente amanhã.

Não quero que meus filhos herdem meus medos como se fossem regras. Quero que conheçam minha história para entenderem que é possível aprender com ela e seguir por caminhos próprios.`
      },
      {
        id: "pdd-s28",
        type: "chapter",
        title: "📖 Capítulo 16 – Pequenas cenas, grandes lembranças",
        content: `Imagino que, no futuro, algumas das nossas maiores lembranças não serão viagens caras nem presentes grandiosos. Serão cenas simples: uma conversa no caminho, uma brincadeira antes de dormir, um desenho colado na parede, uma pergunta inesperada durante o jantar. A vida acontece enquanto tentamos organizar a agenda; por isso, quero aprender a não deixar tudo o que importa para depois.

Talvez eu me lembre de Benjamin explicando uma conta como se estivesse diante de uma turma inteira. Talvez me lembre de Isabella fiscalizando as mãos e a boca de todos, inclusive as minhas. Talvez eu me recorde do barulho da casa, dos brinquedos espalhados e de uma paz estranha que só aparece quando todos estão por perto. Na hora, a bagunça parece enorme. Anos depois, pode virar saudade.

Quero fotografar menos momentos apenas com o celular e viver mais momentos com os olhos. Registrar é bonito, mas estar presente é ainda melhor. Há coisas que nenhuma câmera consegue guardar: o jeito exato de uma risada, a confiança de uma mão pequena segurando a nossa, o alívio depois de um susto e a sensação de que, naquele instante, estamos exatamente onde deveríamos estar.

Se existe uma riqueza que desejo deixar aos meus filhos, ela começa nessas memórias. Não posso garantir uma vida sem perdas, frustrações ou dificuldades. Posso trabalhar para que eles saibam que não precisam enfrentar tudo sozinhos e que terão, em mim, alguém disposto a conversar e a recomeçar.`
      },
      {
        id: "pdd-s29",
        type: "chapter",
        title: "📖 Capítulo 17 – Uma carta para Benjamin",
        content: `Meu filho, Benjamin Lucca: quando você ler estas palavras, talvez já tenha crescido bastante. Talvez esteja ensinando matemática, talvez tenha encontrado outro sonho, talvez esteja apenas tentando descobrir qual caminho combina com você. Seja qual for a resposta, quero que saiba que meu orgulho nunca dependeu de uma profissão.

Lembro da alegria de sua chegada e do medo que senti quando você teve a primeira convulsão. Eu queria controlar o mundo para que nada lhe acontecesse. Com o tempo, fui entendendo que meu papel não era controlar tudo, e sim caminhar ao seu lado, buscar ajuda quando necessário e confiar na sua capacidade de crescer.

Você me ensinou a olhar para a infância com mais cuidado. Quando eu era pequeno, enfrentei situações que não conseguia compreender. Ao acompanhar você, senti novamente parte daquele medo, mas também descobri uma forma diferente de amar: estar atento sem deixar que a preocupação apague a alegria de viver.

Meu desejo é que você seja curioso, justo e gentil. Que continue fazendo perguntas. Que não tenha vergonha de começar de novo. Que encontre pessoas que valorizem seu coração e que você também seja alguém digno de confiança. Se um dia o mundo parecer complicado demais, lembre-se: você não precisa resolver a vida inteira de uma vez. Faça a próxima conta, dê o próximo passo, peça ajuda. Eu estarei torcendo por você.`
      },
      {
        id: "pdd-s30",
        type: "chapter",
        title: "📖 Capítulo 18 – Uma carta para Isabella",
        content: `Minha menina, Isabella Emanuelly: talvez, quando você ler esta carta, já não se lembre de como ficava indignada com uma mão suja ou de como surpreendeu todo mundo ao aprender a usar o pinico no primeiro dia. Eu, porém, espero guardar essas cenas por muito tempo, porque nelas vejo sua personalidade aparecendo com força e graça.

Você chegou em dezembro, perto do Natal, e trouxe uma luz muito sua. É inteligente, curiosa, falante e cheia de opinião. Quero que continue fazendo perguntas, que descubra o mundo com coragem e que saiba que não precisa esconder sua intensidade para caber nas expectativas dos outros. Aprenda a respeitar as pessoas, mas não abandone sua voz.

Quando crescer, talvez encontre desafios que hoje nem conseguimos imaginar. Haverá dias em que você se sentirá segura e outros em que duvidará de si mesma. Nesses dias, lembre-se de que aprender leva tempo, que ninguém precisa acertar sempre e que pedir ajuda não diminui sua independência.

Quero que saiba que seu lugar nesta família não depende de notas, conquistas ou comportamento impecável. Você é amada porque é você. Eu vou errar algumas vezes, como todo pai erra, mas espero ter humildade para reconhecer, conversar e tentar fazer melhor. Que você nunca confunda amor com medo: em nossa casa, seu coração deve encontrar abrigo.`
      },
      {
        id: "pdd-s31",
        type: "chapter",
        title: "📖 Capítulo 19 – O futuro que estamos construindo",
        content: `Quando penso no futuro, não imagino uma estrada sem obstáculos. Imagino meus filhos crescendo, fazendo escolhas, aprendendo com consequências e descobrindo o que os faz sentir vivos. Quero oferecer ferramentas, não correntes; orientação, não uma vida pronta. A paternidade exige a difícil tarefa de proteger enquanto se prepara a criança para caminhar com as próprias pernas.

Talvez um dia Benjamin e Isabella saiam de casa para construir seus próprios lares. Talvez levem comigo uma receita, uma frase, uma brincadeira ou uma forma de olhar para o mundo. Espero que levem principalmente a certeza de que foram amados de maneira real: com presença, conversa, limites, perdão e incentivo.

Eu também quero continuar crescendo. Não quero que meus filhos tenham de carregar a obrigação de me salvar ou de realizar sonhos que são meus. Quero que vejam um pai que aprende, trabalha, pede desculpas e tenta ser melhor. Que entendam que recomeçar não tem idade e que nenhuma história precisa ficar presa ao primeiro capítulo.

Se a vida me der muitos anos, quero estar por perto para assistir às conquistas, ouvir as histórias e conhecer as pessoas em que eles se transformarão. Se algum dia eu não puder estar fisicamente ao lado deles, espero que as lições de amor e dignidade continuem presentes nas escolhas que fizerem.`
      },
      {
        id: "pdd-s32",
        type: "chapter",
        title: "📖 Capítulo 20 – Pai de dois: o sentido de tudo",
        content: `Cheguei a esta parte da história diferente do menino que nasceu em 1990. Ainda sou feito das mesmas raízes, mas hoje consigo olhar para elas com mais compreensão. Vivi a ausência, atravessei problemas de saúde na infância, conheci decepções, encontrei pessoas boas e precisei aprender a recomeçar. Nada disso foi simples, mas cada capítulo contribuiu para a pessoa que sou.

Depois vieram Benjamin e Isabella, dois universos que mudaram a medida de quase tudo. Com Benjamin, revisitei o medo e aprendi a permanecer. Com Isabella, descobri novas formas de surpresa, humor e ternura. Os dois me lembram diariamente que a vida não é apenas o que nos acontece; é também o amor que escolhemos construir depois.

Ser pai de dois não significa ter todas as respostas. Significa ter duas mãos pequenas que, em diferentes momentos, procuram a minha. Significa entender que o exemplo fala mesmo quando não estamos discursando. Significa perceber que os filhos observam como tratamos as pessoas, como reagimos aos erros e como nos levantamos depois das quedas.

Eu não sou um pai perfeito. Sou um pai em construção. E talvez essa seja a parte mais bonita: enquanto ensino meus filhos a crescer, eles me ensinam a ser mais paciente, mais presente e mais consciente do tempo. O amor não apagou meu passado, mas deu a ele um novo sentido. Agora, minha história também é feita das histórias que ajudo a escrever.`
      },
      {
        id: "pdd-s33",
        type: "chapter",
        title: "📖 Capítulo 21 – O final que é começo",
        content: `Se eu pudesse sentar ao lado do menino que fui, não tentaria prometer que tudo seria fácil. Eu diria que algumas coisas doeriam, que certas pessoas iriam embora e que haveria momentos em que ele se sentiria perdido. Mas também diria que conheceria gente boa, que encontraria forças que ainda não sabia ter e que, um dia, seguraria dois filhos nos braços.

Diria que Benjamin chegaria com perguntas, números e sonhos. Que Isabella apareceria com sua esperteza, suas cores e suas regras muito particulares sobre mãos limpas. Diria que o coração poderia sentir medo e, mesmo assim, continuar cheio de amor. E que a vida, apesar das cicatrizes, ainda guardaria manhãs bonitas.

Hoje, quando olho para os dois, não vejo apenas o que conquistei. Vejo o que me foi confiado: duas vidas que merecem respeito, cuidado e liberdade para florescer. Não posso escolher todas as tempestades que virão, mas posso construir um abrigo de afeto. Posso ouvir. Posso aprender. Posso estar presente. Posso dizer “eu te amo” sem esperar uma ocasião especial.

O meu final perfeito não é um mundo em que nada dá errado. É um futuro em que meus filhos saibam que são amados mesmo quando erram, que podem voltar para conversar, que têm direito de sonhar e que a família é um lugar de apoio, não de medo. Se conseguirmos construir isso, já teremos escrito algo bonito.`
      },
      {
        id: "pdd-s34",
        type: "chapter",
        title: "Mensagens para Guardar no Coração",
        badge: "Guia de Vida",
        content: `• PARA QUEM CRESCEU COM UMA AUSÊNCIA:
A falta de alguém pode deixar perguntas, mas não determina o seu valor. Você merece amor, cuidado e relações que sejam construídas com respeito.
“A mudança que você deseja para o mundo pode começar na forma como trata quem depende do seu cuidado.”

• PARA QUEM ESTÁ CRIANDO FILHOS:
Não espere ter tudo resolvido para oferecer carinho. Crianças precisam de segurança e honestidade, não de uma vida de vitrine. Faça o melhor possível e procure apoio quando precisar.

• PARA QUEM ENFRENTA O MEDO:
Respire, procure informação confiável e peça ajuda. Não precisa atravessar uma tempestade fingindo que ela não existe.

• PARA QUEM SE DECEPCIONOU COM AMIZADES:
A decepção ensina discernimento, mas não precisa roubar sua capacidade de confiar. Aprenda a observar atitudes e continue aberto às pessoas que demonstram sinceridade.

• PARA QUEM ESTÁ RECOMEÇANDO:
Recomeçar pode ser lento e silencioso. Um passo pequeno ainda é um passo. A vida não exige que você resolva tudo hoje.

• PARA PAIS DE CRIANÇAS DIFERENTES ENTRE SI:
Não compare trajetórias. Celebre cada conquista sem transformar um filho em medida para o outro. Igualdade de amor pode precisar de formas diferentes de cuidado.

• PARA OS FILHOS QUE UM DIA VÃO CRESCER:
Que vocês tenham coragem de escolher, humildade para aprender e segurança para voltar quando precisarem conversar. O amor não deve ser uma prisão; deve ser um lugar de apoio.

• PARA O PAI QUE EU AINDA ESTOU APRENDENDO A SER:
Que eu nunca confunda sustento com presença, autoridade com medo, nem proteção com controle. Que eu continue aprendendo a amar com atitudes.`
      },
      {
        id: "pdd-s35",
        type: "chapter",
        title: "Uma promessa de pai & O que nunca esquecer",
        badge: "Legado",
        content: `Eu não prometo nunca errar. Prometo, porém, tentar reconhecer meus erros, pedir desculpas e aprender. Prometo não exigir que vocês sejam cópias de mim. Quero conhecer quem vocês são, apoiar seus sonhos e ajudá-los a entender as consequências das escolhas. Prometo lembrar que cada fase passa e que o tempo que temos juntos merece atenção.

Se algum dia eu estiver cansado demais para responder com calma, quero aprender a fazer uma pausa em vez de ferir com palavras. Se vocês estiverem com medo, quero escutar antes de aconselhar. Se falharem, quero ajudar a encontrar o caminho de volta. E se vencerem, quero celebrar sem transformar a conquista numa cobrança pela próxima.

O QUE DESEJO QUE VOCÊS NUNCA ESQUEÇAM:
• Vocês não precisam conquistar meu amor: ele já existe.
• Podem sonhar grande e mudar de sonho quando descobrirem novos caminhos.
• Respeitar os outros nunca deve exigir que abandonem o respeito por si mesmos.
• Pedir ajuda é uma forma de coragem.
• Uma nota, um emprego ou um título não mede o valor de uma pessoa.
• Quando errarem, assumam; quando ferirem, reparem; quando puderem, ajudem.
• A família não precisa ser perfeita para ser um lugar seguro.
• Eu tenho orgulho de vocês não apenas pelo que fazem, mas por quem estão se tornando.`
      },
      {
        id: "pdd-s36",
        type: "chapter",
        title: "Agradecimento & FIM? Não. COMEÇO.",
        badge: "Palavras Finais",
        content: `“Meus filhos não são a prova de que minha vida foi perfeita. São a prova de que, mesmo com imperfeições, ainda posso construir algo cheio de amor.”
— Pai de Dois • Paulo Ricardo Cordova

“Que Benjamin nunca perca a curiosidade de aprender. Que Isabella nunca perca a coragem de perguntar. E que ambos saibam que sempre haverá amor esperando por eles.”
— Para Benjamin Lucca e Isabella Emanuelly

AGRADECIMENTO
A todos que fizeram parte dos meus recomeços, aos que me estenderam a mão quando eu precisava e aos que me ensinaram, inclusive pela ausência, a reconhecer o que realmente importa: obrigado. Cada encontro deixou uma marca, e cada experiência ajudou a formar a pessoa que escreve estas páginas.

Aos meus filhos, meu obrigado mais profundo. Vocês transformaram a minha maneira de enxergar o tempo, a infância, o medo e o futuro. Eu espero que, ao lerem este livro, sintam o tamanho do amor que existe em cada lembrança aqui registrada.

FIM? Não. COMEÇO.
A história continua em cada abraço, em cada conversa e em cada escolha de amar.`
      },
      {
        id: "pdd-s37",
        type: "backcover",
        isBanner: true,
        title: "📜 Contracapa Oficial — Pai de Dois",
        subtitle: "Uma história de luta, amor, superação e o maior presente da vida: ser pai.",
        imageUrl: "./covers/pai_de_dois_mirante.jpg",
        badge: "Contracapa Oficial",
        content: `“Eu não posso reescrever cada página do passado, mas posso escolher o amor com que escrevo as próximas.”

Pai de Dois é uma narrativa pessoal comovente sobre as cicatrizes da infância, o abandono paterno, as batalhas contra convulsões e a descoberta da força do amor ao se tornar pai de Benjamin Lucca e Isabella Emanuelly.

Dedico a todos os pais que, assim como eu, carregam no peito a esperança de um futuro melhor para seus filhos. E, principalmente, aos meus filhos, que são a minha maior inspiração.

— Paulo Ricardo Cordova • Benjamin Lucca • Isabella Emanuelly`
      }
    ]
  },
  {
    id: "reino-magico-jhully",
    collectionId: "colecao-reino-magico",
    title: "O Reino Mágico de Jhully",
    author: "Paulo Ricardo Cordova",
    category: "Fantasia & Aventura",
    tags: ["Magia", "Aventura", "Amizade", "Portais", "Jovem Adulto"],
    coverUrl: "./covers/reino_magico_oficial_jhully.jpg",
    themeColor: "#8b5cf6",
    synopsis: "Aos 14 anos, Jhully descobre que o reino encantado que criou em seu caderno de capa roxa é real e está em perigo. Ao lado de Isadora, uma garota enfeitiçada, Eron, um jovem feiticeiro de linhagem antiga, e Dicky, o guardião místico, ela deve enfrentar as sombras e o misterioso Reescritor para restaurar o Cristal da Verdade.",
    backCoverText: `O Reino Mágico de Jhully é mais do que uma aventura — é uma jornada de coragem, amizade e descobertas.

Aos 14 anos, Jhully entra em um mundo mágico criado por ela mesma, onde criaturas místicas existem, memórias ganham vida e até um coelho chamado Dicky é capaz de parar o tempo.

Ao lado de um feiticeiro que ainda não conhece todo seu poder, de uma fantasminha invisível chamada Isadora, e enfrentando um inimigo esquecido que quer reescrever tudo, Jhully descobrirá que há mais dentro dela do que imaginava.

Porque às vezes… o que escrevemos pode se tornar real.
E salvar um reino mágico pode começar com uma única palavra.`,
    createdAt: "2026-09-28",
    views: 142,
    slides: [
      {
        id: "slide-1",
        type: "cover",
        title: "O Reino Mágico de Jhully",
        subtitle: "Por Paulo Ricardo Cordova",
        content: "Uma jornada inesquecível pelo poder da imaginação, da coragem e das escolhas do coração.",
        imageUrl: "./covers/reino_magico_oficial_jhully.jpg",
        badge: "Edição Especial Digital"
      },
      {
        id: "slide-2",
        type: "chapter",
        title: "📖 Capítulo 1 – O Chamado da Imaginação",
        content: `Jhully sempre teve uma imaginação forte demais para caber no mundo real. Aos 14 anos, enquanto outras pessoas se preocupavam com redes sociais ou festas da escola, ela passava horas com sua caneta e seu caderno de capa dura roxa, escrevendo histórias. Mas havia uma em especial — O Reino Mágico de Jhully — que ela nunca mostrou a ninguém.

Era um lugar que só ela conhecia. Um castelo flutuante sobre nuvens douradas, florestas que mudavam de cor com o humor dos ventos, criaturas encantadas como os alafins (seres alados com olhos de estrela) e os nymbrons (felinos falantes guardiões de segredos antigos). Jhully inventava tudo com tanto amor que o reino parecia vivo. E talvez… estivesse mesmo.

Numa noite chuvosa, enquanto relia uma das páginas, algo estranho aconteceu. As letras começaram a brilhar. Primeiro uma, depois outra. E antes que ela pudesse reagir, uma luz dourada saiu do papel e a envolveu completamente.

Quando abriu os olhos… já não estava mais em seu quarto.

Ela se encontrava no meio de uma floresta de árvores azuis, e o céu acima pulsava com estrelas que se moviam como se respirassem. O cheiro de magia estava no ar. E na frente dela, flutuando, estava uma criatura com asas de cristal e olhos brilhantes como fogo.

— Bem-vinda, Jhully — disse a criatura. — O seu reino precisa de você. Algo saiu errado. E apenas quem escreveu a história pode reescrevê-la.

Jhully mal podia acreditar…
Mas estava ali. No Reino Mágico de Jhully. E sua própria criação agora era real.
E estava em perigo.`
      },
      {
        id: "slide-3",
        type: "chapter",
        title: "📖 Capítulo 2 – A Menina Invisível (Parte 1)",
        content: `Jhully andava com cuidado entre as árvores azuladas, com os olhos arregalados e o coração batendo forte. Cada passo que dava parecia ecoar como um sussurro mágico no chão de folhas cintilantes. Tudo naquele lugar parecia saído diretamente das páginas que ela escreveu… mas havia algo diferente. Algo que ela não lembrava de ter criado.

De repente, sentiu um frio sutil passando por ela — como se uma brisa tivesse atravessado seu corpo.

— Você… você consegue me ouvir? — disse uma voz suave atrás dela.

Jhully se virou bruscamente. Não havia ninguém. Mas a sensação ainda estava ali. E então, de repente, algo surgiu — ou quase surgiu. Uma silhueta pálida, transparente como névoa, de uma menina com cabelos longos e soltos, usando um vestido que flutuava levemente, como se estivesse debaixo d'água.

— Ah! — Jhully deu um salto para trás. — Q-quem é você?

— Meu nome é Isadora — respondeu a aparição, com um sorriso tímido. — E você… você é Jhully. Eu esperei muito tempo por você.

— Você é um... um fantasma?

— Não exatamente. Fui enfeitiçada há dois anos… fiquei presa assim, invisível para todos. Todos… menos você.

Jhully arregalou os olhos.
— Mas… por quê eu?

— Porque você escreveu este mundo — disse Isadora, aproximando-se. — E só quem tem o coração ligado à criação pode me ver. Alguém poderoso lançou um feitiço cruel sobre mim… e se não for quebrado logo, eu vou desaparecer de vez. Só você pode mudar isso.`
      },
      {
        id: "slide-4",
        type: "chapter",
        title: "📖 Capítulo 3 – O Feiticeiro Perdido",
        content: `Jhully sentiu um arrepio. Um misto de medo e responsabilidade. Ela nunca imaginou que suas histórias pudessem ter consequências tão reais.

— Como posso ajudar?
— O feitiço está ligado ao Cristal da Verdade, que foi roubado e escondido nas Cavernas de Sombra. Para quebrá-lo, você terá que enfrentá-los… os Sombrílios.

Jhully respirou fundo. A aventura estava apenas começando. Ela não estava mais escrevendo a história. Ela era a história. E agora, tinha uma missão: Salvar Isadora.

O caminho até as Cavernas de Sombra era silencioso, exceto pelas folhas que sussurravam segredos antigos ao vento. Isadora flutuava ao lado de Jhully, quase invisível sob a luz cinzenta da manhã.

Foi quando ouviram um som: shhhhRAHHH! — como uma explosão de energia mágica no ar.

Jhully se agachou instintivamente, enquanto Isadora desapareceu entre as árvores. Um clarão azul atravessou os galhos, e uma criatura sombria, com olhos vermelhos e pele feita de fumaça, voou por cima delas… e caiu no chão, imobilizada por correntes de luz.

— Quem está aí?! — gritou uma voz firme e impaciente.

Um jovem apareceu, usando uma capa longa de tom escuro, o rosto meio encoberto por um capuz. Em sua mão, uma varinha de cristal pulsava com energia viva. Os olhos dele, profundos e marcados pelo cansaço, encontraram os de Jhully.

— Você está bem? — perguntou ele.`
      },
      {
        id: "slide-5",
        type: "chapter",
        title: "📖 Capítulo 3 – O Encontro Entre Irmãos",
        content: `— Sim… eu… quem é você?

Ele hesitou por um momento antes de responder:
— Meu nome é Eron. Sou um aprendiz de feiticeiro. Estou… procurando alguém.

Jhully sentiu seu coração acelerar. Ela olhou para o lado, onde Isadora flutuava em silêncio, visivelmente emocionada.

— É ele… — sussurrou Isadora, com a voz embargada. — Meu irmão…

Eron olhou em volta, como se tivesse ouvido alguma coisa, mas não viu nada. Seus ombros caíram em frustração.

— Minha irmã… Isadora… desapareceu há dois anos. Ninguém consegue explicar. Um dia ela estava lá… no outro, sumiu. Eu procurei por todos os reinos, todos os magos, todas as respostas. Mas é como se ela tivesse sido apagada do mundo.

Jhully olhou para Isadora e sentiu um aperto no peito. A dor de Eron era real. E o vínculo entre os dois era mais forte do que o feitiço que os separava.

— Eron… — disse ela, com cuidado — e se… e se sua irmã ainda estivesse aqui, mas de um jeito diferente? Se ela tivesse sido enfeitiçada?

Ele a encarou, os olhos arregalados:
— O que você sabe?

— Não muito ainda… mas prometo que vou ajudá-lo a encontrá-la. De verdade.

Eron a olhou fundo, e por um breve instante, a varinha em sua mão brilhou mais forte — como se tivesse reagido ao que ele sentia. Um poder adormecido dentro dele… começava a despertar.

— Então vamos — disse ele. — Juntos.`
      },
      {
        id: "slide-6",
        type: "chapter",
        title: "📖 Capítulo 4 – As Sombras Sussurram",
        content: `Isadora, mesmo invisível aos olhos do irmão, sorriu com os olhos cheios de lágrimas brilhantes. Jhully agora não estava mais sozinha. E o Reino Mágico também não estava mais em silêncio.

A trilha que levava às Cavernas de Sombra era cada vez mais escura. As árvores pareciam se curvar sobre o caminho, como se tentassem impedir que alguém chegasse até lá. Jhully sentia o ar ficar mais denso, como se a própria magia do lugar tentasse sussurrar advertências ao seu ouvido.

Eron seguia na frente, firme, com a varinha em punho. Jhully vinha logo atrás, com Isadora ao seu lado.

— Está sentindo isso? — murmurou Isadora. — Esse lugar… está vivo.

Jhully assentiu. O chão tremia sutilmente, e vozes ecoavam nas paredes de pedra à medida que se aproximavam da entrada da caverna — vozes distorcidas, como lamentos presos no tempo.

As Sombras sussurravam:
“Ela é a chave…”
“…não deveria ter vindo…”
“…o poder dela é antigo…”

Jhully parou, gelada.
— Vocês ouviram… isso?
— O quê? — disse Eron, olhando para os lados, tenso.
— As sombras. Elas estão… falando comigo.

De repente, um portal escuro se abriu no meio do chão, e uma criatura feita de fumaça e relâmpagos surgiu diante deles. Tinha olhos brancos sem pupilas e uma voz que parecia sair de todos os lados:

— A criadora retornou… e com ela, o despertar do herdeiro da Luz. Nenhum de vocês deveria ter entrado aqui!`
      },
      {
        id: "slide-7",
        type: "chapter",
        title: "📖 Capítulo 5 – O Despertar das Sombras",
        content: `Eron se lançou à frente, tentando proteger Jhully.
— Fique atrás de mim!

Mas antes que ele atacasse, a criatura falou com um tom mais profundo:
— Você… feiticeiro nascido da linhagem antiga. Seu poder foi selado para protegê-lo. Mas agora… está despertando.

Eron hesitou. A varinha em sua mão brilhou intensamente e soltou uma descarga de luz azul, empurrando a criatura de volta para o portal. A escuridão se retraiu.

Jhully sentiu as palavras da sombra ecoando dentro de si: “Criadora… herdeiro da Luz…”
Ela olhou para Eron. Ele parecia confuso, ofegante, mas algo nele havia mudado. Seu poder começava a responder — não à varinha, mas aos sentimentos que carregava.

Lá no fundo da caverna, uma luz fraca tremeluzia. O caminho era perigoso, cheio de enigmas e armadilhas mágicas… Mas a jornada estava longe de acabar.

Assim que se aproximaram, as paredes tremularam, e o chão começou a tremer com força. Do meio da floresta ao redor das cavernas, as Sombras despertaram.

Uma a uma, criaturas feitas de escuridão, com garras longas e olhos de fogo branco, emergiram entre as árvores. Algumas rastejavam como névoas vivas, outras voavam, e algumas andavam eretas, imitando formas humanas deformadas.`
      },
      {
        id: "slide-8",
        type: "chapter",
        title: "📖 Capítulo 5 – O Guardião da Balança",
        content: `— Jhully, fique atrás de mim! — gritou Eron, levantando sua varinha.

Isadora flutuou para o alto, gritando:
— Eles não podem me ver, mas são guiados pela energia do feitiço… eles vieram para impedir que vocês avancem!

Eron avançou com coragem, lançando feixes de luz azul de sua varinha. As explosões de magia iluminavam a floresta escura. Algumas criaturas foram destruídas, mas outras continuavam vindo… cada vez mais.

Jhully tentou usar a voz para afastá-las, gritar palavras que ela mesma escrevera no livro, mas elas não a obedeciam. Era como se uma parte da história tivesse sido corrompida.

Uma das criaturas, maior do que todas as outras, surgiu entre as árvores — com chifres retorcidos, braços como galhos e dentes afiados como lâminas. Ela rugiu e avançou direto sobre Eron, que tentou criar um escudo mágico, mas foi jogado para longe, batendo com força contra uma pedra!

Jhully correu até ele, desesperada:
— Eron! Aguenta firme!

A criatura se aproximava, preparando-se para o golpe final. Foi então que, do nada, um estalo seco preencheu a floresta: um bater de bastão no chão. E uma voz serena ecoou:

— Já basta.

Das sombras surgiu um coelho branco, de olhos dourados e túnica azul-escura. Em sua pata, segurava um cajado com uma pedra reluzente na ponta.

— Eu sou Dicky, Guardião da Balança entre a Luz e a Escuridão. E vocês... não tocarão em nenhum fio de cabelo deles enquanto eu respirar.`
      },
      {
        id: "slide-9",
        type: "chapter",
        title: "📖 Capítulo 6 – O Guardião do Cristal e as Três Provações",
        content: `Com um movimento sutil de seu cajado, toda a floresta brilhou em azul, e as criaturas foram puxadas para o chão como fumaça sendo sugada para dentro da terra. Em segundos… silêncio. Apenas o vento e o bater acelerado dos corações.

O coelho se aproximou e olhou para Jhully nos olhos:
— Você tem mais poder do que imagina, Jhully. Mas também tem mais inimigos do que consegue ver. O que foi escrito… está começando a mudar.

— Você… você me conhece?
— Desde antes de você nascer.

— O Cristal da Verdade está nas profundezas da Caverna dos Ecos — explicou Dicky. — Mas para alcançá-lo, vocês terão de passar pelas Três Provações do Reino: a Provação da Coragem, a Provação da Verdade e a Provação da Essência. Porque a magia verdadeira nunca se entrega fácil.

Eles caminharam por horas, passando por campos flutuantes, riachos que corriam para cima e árvores que murmuravam nomes de viajantes antigos.

Chegaram à entrada da caverna. Uma imensa muralha de pedra com símbolos brilhantes bloqueava a passagem. No centro, três portais — um dourado, um prateado e um negro — pulsavam com energia viva.

— Separados? — perguntou Jhully, assustada.
— Apenas por um momento. Eron enfrentará a Provação da Coragem. Isadora, a Provação da Verdade. E você, Jhully… enfrentará a mais difícil: a Provação da Essência.`
      },
      {
        id: "slide-10",
        type: "chapter",
        title: "📖 Capítulo 7 – 🛡️ A Provação da Coragem (Eron)",
        content: `Eron respirou fundo, encarando o portal dourado:
— Pela minha irmã… eu enfrento o que for.

Isadora flutuou com determinação diante do portal prateado:
— Se eu tiver que encarar o que aconteceu… eu estou pronta.

Jhully olhou para o portal negro, profundo como um espelho de sua alma:
— E se eu não for forte o bastante?
Dicky tocou sua mão com a pata macia, mas firme:
— Você criou este mundo, Jhully. Agora chegou a hora… de criar a si mesma.

Assim que atravessaram os portais, o mundo ao redor se desfez como areia soprada pelo vento.

🛡️ A Provação da Coragem – Eron
Eron surgiu numa clareira em chamas. O céu era vermelho, e as árvores estavam queimando. Gritos ecoavam de todos os lados.
— Isadora! — gritou ele, girando em círculos.

Uma sombra surgiu diante dele: uma versão sombria de si mesmo:
— Você falhou com ela. Sempre foi fraco. Sempre escondeu seu poder.
— Cale a boca! — Eron ergueu a varinha, mas nenhuma luz saiu.
— Você não precisa de magia para ter coragem — disse uma voz atrás dele.

Era sua irmã, Isadora, jovem e viva, como antes do feitiço:
— Você só precisa parar de fugir de quem é.

Eron fechou os olhos, inspirou… e o medo se transformou em força. Quando abriu os olhos, sua varinha brilhou com um azul intenso, dissipando a escuridão. Ele havia vencido. A coragem não era ausência de medo — era enfrentá-lo mesmo assim.`
      },
      {
        id: "slide-11",
        type: "chapter",
        title: "📖 Capítulo 7 – 👻 A Provação da Verdade & 🌑 Essência",
        content: `👻 A Provação da Verdade – Isadora
Isadora apareceu no antigo jardim de sua infância. Viu o momento em que o feitiço foi lançado. A verdade que ela nunca quis aceitar: ela não foi vítima por acaso. Ela havia mexido num livro proibido, tentando usar magia antiga para proteger Eron… mas acabou sendo enfeitiçada.

— Foi culpa minha… — sussurrou.
— Não — disse sua própria imagem com empatia. — Você tentou proteger quem ama. Isso não é culpa. É amor.

Isadora caiu em lágrimas. E, ao aceitá-las, sua alma brilhou. A verdade havia sido enfrentada e o feitiço começou a enfraquecer.

🌑 A Provação da Essência – Jhully
Jhully se encontrou num mundo vazio. Apenas ela… e um espelho.
No reflexo, ela viu várias versões de si mesma: triste, insegura… e uma coberta de sombra.

— Quem é você? — perguntou Jhully.
— Eu sou o que você teme ser. Insignificante. Sem poder. Sozinha. Você só escreve… porque tem medo de viver.

Por um instante, a dúvida quase venceu. Mas então lembrou de Isadora, de Eron, de Dicky:
— Eu não sou só escritora. Eu sou parte dessa história. Eu sou… a essência!

Uma luz nasceu em seu peito, preenchendo todo o espaço escuro. A sombra se dissipou.
Os três portais explodiram em luz, e os três reapareceram — transformados, mais fortes, os verdadeiros heróis do Reino Mágico.`
      },
      {
        id: "slide-12",
        type: "chapter",
        title: "📖 Capítulo 8 – O Cristal e o Surgimento do Reescritor",
        content: `Quando chegaram à última câmara, o Cristal da Verdade flutuava sobre um pedestal de mármore, cercado por um anel de energia dourada. Ele pulsava como um coração vivo, e dentro dele, Jhully viu imagens: momentos que viveu, escreveu… e outros que jamais tinha criado.

— Isso não faz sentido — murmurou ela. — Tem cenas aqui… que eu nunca escrevi.
— Porque alguém escreveu com você — disse uma voz que ecoou pelas paredes.

Das sombras emergiu uma figura envolta em um manto negro, com olhos que brilhavam em prata:

— Quem é você?! — gritou Eron, levantando sua varinha. A figura, com um gesto simples, parou a magia no ar.

— Eu sou o que você deixou para trás, Jhully. Sou o personagem esquecido. A criação que você abandonou… quando decidiu que este mundo era só fantasia.

Jhully recuou um passo:
— Não… você era um vilão secundário… que escrevi quando era pequena. Mas eu nunca terminei sua história…

— Exato. E por isso, eu ganhei vida própria. Porque você não me limitou com palavras. Eu cresci no silêncio. Eu me tornei O Reescritor! Eu não quero ser apagado. Quero ser o novo protagonista. Quero reescrever este mundo… à minha maneira!`
      },
      {
        id: "slide-13",
        type: "chapter",
        title: "📖 Capítulo 9 – A Última Página e a Batalha",
        content: `O Reescritor estendeu a mão em direção ao Cristal:
— Com o poder da Verdade… eu posso alterar tudo o que foi criado. Até você, Jhully.

— Não vai conseguir — disse ela, avançando.
— E como pretende me impedir? — zombou ele.

Jhully olhou para Eron, para Isadora, para Dicky.
— Eu não vou impedir sozinha!

Ela estendeu a mão. Eron juntou sua magia à dela. Isadora começou a brilhar com o mesmo tom do cristal. Dicky bateu o cajado no chão. Um feixe de luz envolveu os quatro.

— Você acha que pode simplesmente apagar o que não gosta? — gritou Jhully. — Eu escrevo esta história, sim. Mas ela não é só minha. É de todos que a vivem!

O Reescritor manipulava o próprio cenário como se rabiscasse a realidade. Mas Jhully percebeu: precisava usar a força suprema da esperança. Ela puxou seu livro mágico e começou a proferir em voz alta:

— No Reino Mágico de Jhully, a luz sempre encontra um caminho. Os heróis nunca desistem, e o amor supera o medo. Mesmo a escuridão mais profunda se dissolve diante da coragem daqueles que acreditam!

A cada palavra, as formas sombrias do Reescritor se desfaziam como tinta na chuva. Eron, Isadora e Dicky uniram suas vozes em um brado de união e a escuridão se dissipou por completo!`
      },
      {
        id: "slide-14",
        type: "chapter",
        title: "✨ Epílogo – A Nova História",
        content: `O Cristal da Verdade brilhou forte e, em um instante, Isadora sentiu o feitiço quebrado. Seu corpo se solidificou, as cores retornaram à sua pele e ela abraçou seu irmão Eron em lágrimas de alegria.

Meses se passaram desde que o Cristal da Verdade foi restaurado. O reino florescia novamente. As árvores cantavam ao vento, as estrelas dançavam no céu e os rios sussurravam poemas.

Isadora agora caminhava livre. Eron treinava ao lado dos grandes magos do reino, descobrindo todo o seu potencial. E Dicky se consolidava como uma lenda viva entre os guardiões da magia.

Jhully sentava no jardim flutuante, com um novo caderno nas mãos. Na última página do livro… uma nova frase havia surgido sozinha, escrita com tinta dourada:

“Toda história verdadeira sempre deixa uma porta entreaberta.”

E quando ela olhou para o céu naquela noite, viu uma nova estrela nascer.
Sabia que algo estava por vir.
E que a próxima história… já estava a caminho.

✨ CONTINUA...`
      },
      {
        id: "slide-15",
        type: "backcover",
        title: "📚 Sinopse & Contracapa Oficial",
        subtitle: "O Reino Mágico de Jhully",
        content: `O Reino Mágico de Jhully é mais do que uma aventura — é uma jornada de coragem, amizade e descobertas.

Aos 14 anos, Jhully entra em um mundo mágico criado por ela mesma, onde criaturas místicas existem, memórias ganham vida e até um coelho chamado Dicky é capaz de parar o tempo.

Ao lado de um feiticeiro que ainda não conhece todo seu poder, de uma fantasminha invisível chamada Isadora, e enfrentando um inimigo esquecido que quer reescrever tudo, Jhully descobrirá que há mais dentro dela do que imaginava.

Porque às vezes… o que escrevemos pode se tornar real.
E salvar um reino mágico pode começar com uma única palavra.

— Autor: Paulo Ricardo Cordova`,
        imageUrl: "./covers/reino_magico_oficial_jhully.jpg",
        badge: "Fim do Volume 1"
      }
    ]
  },
  {
    id: "reino-magico-jhully-vol2",
    collectionId: "colecao-reino-magico",
    title: "O Reino Mágico de Jhully – Prólogo: A Porta Entreaberta",
    author: "Paulo Ricardo Cordova",
    category: "Fantasia & Aventura",
    tags: ["Magia", "Aventura", "Continuação", "Portais", "Novos Mundos"],
    coverUrl: "./covers/reino_magico_oficial_jhully.jpg",
    themeColor: "#8b5cf6",
    synopsis: "Após a restauração do Cristal da Verdade, a misteriosa frase dourada se torna realidade: uma nova estrela surge no céu do reino e uma porta entreaberta conduz Jhully, Eron e Isadora a reinos que nem mesmo a escritora sonhara existir.",
    backCoverText: "Quando a história que você criou ganha vontade própria, os limites entre criador e criatura deixam de existir. O prólogo especial da saga mágica de Jhully.",
    createdAt: "2026-09-28",
    views: 64,
    slides: [
      {
        id: "vol2-s1",
        type: "cover",
        title: "O Reino Mágico de Jhully",
        subtitle: "Prólogo: A Porta Entreaberta",
        content: "O prelúdio oficial da jornada mágica de Jhully, Isadora e Eron.",
        imageUrl: "./covers/reino_magico_oficial_jhully.jpg",
        badge: "Prólogo"
      },
      {
        id: "vol2-s2",
        type: "chapter",
        title: "📖 Prólogo – O Brilho da Nova Estrela",
        content: `O caderno de capa roxa de Jhully repousava sobre a mesa de madeira, quando as bordas de suas folhas começaram a emitir uma névoa iridescente. Não era mais a caligrafia de Jhully que se desenhava ali, mas um mapa estelar desconhecido.

Do lado de fora da janela, o céu noturno do reino ressoava com um zumbido grave e acolhedor.

— A porta se abriu — sussurrou Dicky, aparecendo de pé na soleira com seu cajado luminoso. — E desta vez, quem está chamando não é um feitiço... são os ecos do além-mundo.`
      }
    ]
  },
  {
    id: "jhully-veu-dos-mundos",
    collectionId: "colecao-reino-magico",
    title: "Jhully e o Véu dos Mundos",
    author: "Paulo Ricardo Cordova",
    category: "Fantasia & Aventura",
    tags: ["Magia", "Aventura", "O Reino Mágico", "Véu dos Mundos", "Paulo Ricardo Cordova"],
    coverUrl: "./covers/jhully_veu_dos_mundos.jpg",
    themeColor: "#9333ea",
    synopsis: "O sol se punha quando livros começaram a se mexer sozinhos na estante de Jhully e um sussurro misterioso ecoou: 'O Véu está caindo...'. Ao lado do coelho guardião Dicky, do feiticeiro Eron, da fantasminha Isadora e de novos aliados como a arqueira Lira e a misteriosa Selene, Jhully parte em uma jornada épica através de florestas de espelhos, labirintos sombrios e templos ancestrais para reunir os Fragmentos do Véu, resgatar o antigo guardião Morrath da corrupção e derrotar Kaelthar, o temível Senhor do Caos.",
    backCoverText: `O Reino Mágico de Jhully é uma aventura mágica que leva o leitor a um mundo onde a imaginação e a realidade se entrelaçam. Jhully, uma jovem de 14 anos, descobre que o reino que criou em seu livro é real — um lugar cheio de magia, mistérios e criaturas fantásticas.

Junto com seus amigos — o feiticeiro Eron, a fantasminha Isadora, o poderoso coelho Dicky e o próprio Morrath, um antigo guardião — ela embarca em uma jornada épica para salvar o Véu dos Mundos da destruição. Enfrentando perigos sombrios, desafios emocionantes e descobrindo o verdadeiro poder da amizade, Jhully aprende que a coragem e a esperança são as magias mais fortes que existem.

— Autor: Paulo Ricardo Cordova`,
    createdAt: "2026-10-02",
    views: 180,
    slides: [
      {
        id: "veu-s1",
        type: "cover",
        title: "Jhully e o Véu dos Mundos",
        subtitle: "Por Paulo Ricardo Cordova",
        content: "Quando as fronteiras do invisível se enfraquecem, a verdade deve ser buscada além do conhecido.",
        imageUrl: "./covers/jhully_veu_dos_mundos.jpg",
        badge: "Novo Lançamento Oficial"
      },
      {
        id: "veu-s2",
        type: "chapter",
        title: "📖 Capítulo 1 – Ecos do Invisível",
        content: `O sol já começava a se pôr, tingindo o céu com tons alaranjados e púrpuras, quando Jhully fechou seu novo caderno com um suspiro satisfeito. Sentada na varanda de casa, sentia o vento morno acariciar seu rosto, trazendo uma sensação de paz… ou ao menos era o que deveria sentir.

Nos últimos dias, algo estranho vinha acontecendo.

Livros de sua estante pareciam mexer sozinhos — páginas viravam, palavras desapareciam e reapareciam como se tivessem vontade própria. E sempre, ao olhar para o horizonte, Jhully sentia um sussurro, uma voz distante que parecia chamá-la, mas que se desfazia antes que pudesse entender.

Ela tentou ignorar, atribuindo tudo ao cansaço da escola e à rotina agitada. Mas naquela tarde, ao abrir o caderno para escrever, percebeu que as palavras que tentava colocar no papel simplesmente… não saíam. Era como se sua própria caneta estivesse presa, como se algo além dela mesma bloqueasse a criação.

Foi quando a luz no quarto piscou, e um vento gelado atravessou a janela aberta, fechando-a com força.

Jhully levantou, inquieta. Seu olhar foi até a estante, onde um antigo livro — O Reino Mágico de Jhully — repousava. Ela havia terminado aquela história meses atrás, mas agora, algo parecia diferente.

Um brilho tênue emanava do livro, quase imperceptível, como se ele respirasse.

Curiosa, Jhully abriu o livro, e ao virar a primeira página, viu uma inscrição que não estava lá antes:

“Quando as fronteiras do invisível se enfraquecem, a verdade deve ser buscada além do conhecido.”

Ela sentiu um calafrio. Era como se a própria história a estivesse chamando para algo novo — algo que ela ainda não entendia.

Naquela noite, enquanto tentava dormir, o sussurro voltou, mais forte e claro:`
      },
      {
        id: "veu-s3",
        type: "chapter",
        title: "📖 Capítulo 2 – O Chamado da Outra Realidade",
        content: `“Jhully… Jhully… o Véu está caindo…”

Ela se levantou e olhou pela janela para o céu estrelado. Entre as estrelas, uma nova luz brilhava, diferente de todas as outras.

Era um convite.
E Jhully sabia que não poderia mais ignorar.

As primeiras horas da madrugada traziam um silêncio estranho para a casa de Jhully. Ela estava sentada na mesa do seu quarto, com o antigo livro do Reino Mágico aberto à sua frente. Aquela inscrição recém-aparecida ainda brilhava levemente nas páginas — parecia pulsar com uma energia própria.

Jhully tocou o papel com o dedo, e uma sensação estranha percorreu seu braço. Como se o livro quisesse algo dela.

— O Véu… — murmurou, pensando na palavra que ecoava em seus pensamentos desde o dia anterior.

Mas o que era esse Véu? Um segredo antigo? Uma barreira entre mundos?

Ela decidiu que precisava descobrir. Afinal, sua vida tinha mudado tanto desde a aventura no Reino Mágico. Ela se sentia diferente, como se carregasse um peso invisível, uma responsabilidade que não sabia explicar.

No dia seguinte, na escola, Jhully tentou se concentrar, mas tudo parecia… distante. As vozes dos colegas, as matérias, até mesmo os professores — tudo parecia estar em segundo plano diante da pergunta que martelava sua mente:

O que estava acontecendo com o Reino Mágico?`
      },
      {
        id: "veu-s4",
        type: "chapter",
        title: "📖 Capítulo 2 – O Retorno de Dicky",
        content: `Durante o intervalo, ela se afastou dos grupos e foi até o jardim. Sentou-se sob uma árvore antiga e fechou os olhos, tentando se conectar com aquela sensação, aquele sussurro.

Foi então que uma figura surgiu lentamente entre as árvores — alguém que Jhully jamais esperava ver ali.

Era Dicky, o coelho guardião, mas em sua forma real — maior, imponente, com olhos dourados que brilhavam na penumbra do jardim.

— Dicky? — Jhully sussurrou, incrédula. — Mas como você está aqui? No meu mundo?

— O Véu entre os mundos está enfraquecendo, Jhully — respondeu ele com uma voz calma, porém carregada de urgência. — E é por isso que precisei vir. Não só para avisar, mas para pedir sua ajuda.

Jhully sentiu seu coração acelerar.

— Minha ajuda? O que eu posso fazer? Eu sou só uma garota que escreve histórias…

— Você é mais do que isso. Você é a criadora, a portadora da imaginação, e a ligação entre todos esses mundos. Sem você, as fronteiras entre eles se romperão — disse Dicky, dando um passo à frente. — O Véu está caindo, e com ele, criaturas de sombras e luz começarão a se misturar, causando caos.

Jhully engoliu em seco:
— Então, o que precisa ser feito?

Dicky olhou para o céu, onde as nuvens começavam a se mover de forma estranha, formando símbolos antigos:
— Primeiro, você deve encontrar os Fragmentos do Véu — pedras mágicas espalhadas pelos mundos que sustentam a barreira entre eles. Eles estão desaparecendo, e a cada fragmento perdido, o Véu enfraquece mais.

— Como eu vou encontrar essas pedras?
— Você não estará sozinha — disse Dicky. — Eron está procurando por você. Ele sente que algo está errado, assim como Isadora. Eles precisam se reunir antes que a ruptura seja irreversível.

Jhully respirou fundo.
— Então, eu preciso encontrá-los. E salvar o Véu.

Dicky assentiu:
— Sim. Mas cuidado: não são apenas os fragmentos que estão desaparecendo. Também há quem deseja que o Véu se rompa.

Jhully olhou para a noite que caía lentamente. Sabia que a jornada seria difícil, mas sentia uma força nova crescer dentro de si — aquela chama que a tinha guiado antes.

— Estou pronta.
— Então, vamos começar.

E juntos, eles desapareceram em um brilho dourado.`
      },
      {
        id: "veu-s5",
        type: "chapter",
        title: "📖 Capítulo 3 – O Encontro e a Primeira Ruptura",
        content: `O céu sobre a pequena cidade começava a perder suas cores naturais, ganhando tons esverdeados e púrpura, como se uma tempestade invisível estivesse prestes a romper. Jhully, agora ao lado de Dicky, sentia a tensão no ar — uma mistura de ansiedade e determinação.

— Dicky, onde vamos encontrá-los? — perguntou ela, ajustando a mochila nas costas.

— Eron está perto da antiga clareira, onde costumávamos treinar. Isadora está com ele. Mas... a energia por lá está instável — respondeu o coelho, guiando-a por ruas e vielas que pareciam mudar de forma a cada instante.

Ao chegarem à clareira, Jhully sentiu um arrepio. O lugar que antes era calmo e cheio de vida agora tinha uma aura escura, como se as sombras sussurrassem segredos sombrios.

De repente, uma luz azulada cortou a escuridão, e Eron apareceu diante deles, segurando firme sua varinha, olhos atentos.

— Jhully! — exclamou ele, aliviado ao vê-la. — Pensei que você não viria a tempo.

— Cheguei. Dicky me avisou — disse Jhully, olhando ao redor. — O que está acontecendo aqui?

Antes que Eron pudesse responder, uma névoa espessa começou a se espalhar pela clareira. De dentro dela, formas sombrias começaram a emergir — criaturas feitas de fumaça negra e olhos vermelhos, os primeiros sinais da ruptura do Véu.

Isadora apareceu flutuando ao lado de Eron, seu rosto sério:
— Eles estão tentando atravessar para cá — disse ela, sua voz soando firme, mas preocupada. — Se conseguirem, não só este mundo, mas todos os outros estarão em perigo.

— Precisamos proteger a clareira — disse Jhully, tentando controlar o medo que crescia dentro dela.

Dicky bateu seu cajado no chão, criando um escudo de luz que começou a se expandir em torno deles:
— Vamos mostrar a eles que este mundo não vai cair.`
      },
      {
        id: "veu-s6",
        type: "chapter",
        title: "📖 Capítulo 3 – A Força das Palavras",
        content: `A batalha começou.

Eron disparava feixes de luz azul, desviando dos ataques sombrios. Isadora usava sua energia para enfraquecer as criaturas, enquanto Jhully tentava encontrar uma forma de reforçar a barreira com as palavras do seu livro — palavras que agora pareciam ter um poder real.

No meio da luta, Jhully percebeu algo: as criaturas recuavam diante de certas palavras que ela escrevia rapidamente em seu caderno — palavras antigas, invocações que ela nem lembrava ter aprendido.

— Eron! — gritou ela. — Concentre sua magia nas palavras que eu escrever!

Ele assentiu, e juntos criaram uma corrente de energia que empurrou as sombras de volta para a névoa de onde vieram.

Quando a última criatura desapareceu, a clareira ficou silenciosa novamente.

— Isso foi só o começo — disse Dicky, com um olhar grave. — O Véu está se rasgando cada vez mais rápido. Precisamos encontrar os Fragmentos antes que seja tarde.

Jhully olhou para seus amigos. Sentiu que, apesar do medo, aquela era a verdadeira aventura que ela sempre esperou.

— Então vamos atrás desses fragmentos. Juntos.

E assim, o grupo partiu para uma jornada que atravessaria mundos, mistérios e desafios nunca antes imaginados.`
      },
      {
        id: "veu-s7",
        type: "chapter",
        title: "📖 Capítulo 4 – A Busca pelo Primeiro Fragmento",
        content: `O sol ainda estava baixo quando o grupo deixou a clareira. O ar carregava a promessa de uma jornada longa e cheia de surpresas. Dicky guiava o caminho, seu olhar atento a cada sinal.

— O primeiro Fragmento está escondido na Floresta dos Espelhos — explicou o coelho. — Lá, as realidades se dobram e se confundem. Será difícil encontrar a pedra entre as ilusões.

Jhully sentiu um arrepio. A Floresta dos Espelhos era conhecida por enganar até os magos mais experientes.

Enquanto caminhavam, Eron e Isadora discutiam estratégias, mas Jhully se concentrava no caderno, anotando símbolos que surgiam em sua mente, como se o livro quisesse ajudá-la.

Chegaram à entrada da floresta, onde árvores com troncos espelhados brilhavam sob a luz do amanhecer.

— Cuidado — alertou Dicky. — Aqui, o que você vê pode não ser real. Precisamos confiar em nossos sentidos… e no coração.

Assim que entraram, o mundo começou a mudar.

Reflexos distorcidos os cercavam. Jhully via versões de si mesma e dos amigos em cada espelho — algumas tristes, outras assustadas, outras ainda rindo e brincando, como se pudessem escolher qualquer realidade.

De repente, Eron desapareceu, como engolido por um dos espelhos.

— Eron! — gritou Jhully, correndo até o local.

Do outro lado do vidro, ele tentava se libertar, mas uma força invisível o segurava.

Isadora usou sua voz etérea para cantar uma canção antiga, e a névoa começou a se dissipar.

— Estamos presos em uma ilusão — disse Dicky, os olhos brilhando. — Precisamos encontrar o Fragmento para quebrar o feitiço.

Jhully fechou os olhos, respirou fundo e segurou o caderno com força:
— O Fragmento não está aqui para nos confundir, mas para nos mostrar quem realmente somos.

Ela começou a recitar palavras escritas no caderno, descrevendo a coragem, a amizade e a verdade que unia o grupo.

Os espelhos começaram a se quebrar, um a um, até que Eron apareceu livre.

No centro da floresta, um brilho azul pulsava: o primeiro Fragmento.

Jhully se aproximou e, ao tocar a pedra, sentiu uma onda de energia que a conectou a todos os mundos.

— Conseguimos o primeiro — disse ela, sorrindo.

Mas, ao longe, uma sombra observava. O Véu podia até estar sendo reparado, mas as forças que queriam sua destruição estavam mais próximas do que imaginavam.`
      },
      {
        id: "veu-s8",
        type: "chapter",
        title: "📖 Capítulo 5 – A Sombra do Passado",
        content: `Enquanto Jhully segurava o primeiro Fragmento, sentiu uma presença gelada observando cada movimento do grupo. A sombra, oculta entre as árvores da Floresta dos Espelhos, não era apenas um espectador — era alguém com intenções sombrias e um passado conectado ao Reino Mágico.

Na clareira, Dicky ficou alerta, farejando o ar com atenção.

— Algo se aproxima — avisou ele.

De repente, uma figura encapuzada emergiu da penumbra, os olhos brilhando em vermelho sob o capuz.

— Vocês são mais persistentes do que imaginei — disse a voz com um tom cortante.

Jhully deu um passo à frente, protegendo Eron e Isadora.

— Quem é você? O que quer com o Véu?

A figura riu, um som frio e cruel.

— Eu sou Morrath, o ex-guarda do Reino Mágico, expulso por trair os seus — revelou. — O Véu deve cair para que o verdadeiro poder ressuscite. Vocês não vão impedir o destino.

Eron apertou o punho, pronto para atacar.

— Não vamos deixar que destrua tudo que amamos.

Morrath ergueu a mão, conjurando sombras que começaram a cercar o grupo.

— Então preparem-se para lutar… porque esta batalha está apenas começando.`
      },
      {
        id: "veu-s9",
        type: "chapter",
        title: "📖 Capítulo 6 – A Batalha na Floresta dos Espelhos",
        content: `A atmosfera ficou densa enquanto Morrath liberava uma onda de energia negra que se espalhou pela clareira, fazendo as árvores refletirem sombras ameaçadoras. Jhully, Eron, Isadora e Dicky se posicionaram lado a lado, prontos para enfrentar o inimigo.

— Não subestimem o poder de quem já caminhou entre as sombras — avisou Morrath, com um sorriso cruel.

Eron avançou primeiro, lançando feixes brilhantes de luz que colidiram com a escuridão conjurada pelo vilão. Isadora, com sua aura etérea, criou um campo protetor ao redor do grupo, enquanto Dicky brandia seu cajado, invocando uma barreira mágica para conter os ataques.

Jhully, segurando o Fragmento do Véu, tentou usar as palavras mágicas que descobrira para fortalecer a proteção, recitando versos de coragem e união.

Porém, Morrath era mais rápido e astuto do que esperavam. Ele absorvia as sombras da floresta, tornando-se quase intangível, e atacava com rajadas de energia que ameaçavam desintegrar tudo.

No meio da batalha, Jhully percebeu algo estranho: Morrath hesitava toda vez que a luz do Fragmento brilhava intensamente.

— Eron, concentre sua magia para amplificar o brilho do Fragmento! — ordenou ela.

Com esforço, Eron direcionou um feixe de energia para a pedra, que emitiu um clarão ofuscante.

Morrath recuou, gritando em raiva e dor:
— Isso não pode ser! — rugiu ele.

Aproveitando a fraqueza, Isadora usou sua voz para entoar uma canção antiga que enfraquecia as sombras ao redor de Morrath, enquanto Dicky se preparava para o golpe final.

— Agora, Dicky! — gritou Jhully.

Com um movimento rápido, Dicky bateu seu cajado no chão, liberando uma explosão de luz dourada que envolveu Morrath. O vilão gritou, desaparecendo em uma nuvem de fumaça negra, deixando apenas um rastro de escuridão.

— Ele fugiu, mas não por muito tempo — avisou Dicky. — Morrath é poderoso, mas não invencível. Precisamos estar preparados para o que vem a seguir.

Jhully olhou para o Fragmento do Véu em suas mãos, sentindo o peso da responsabilidade.
— Vamos continuar. Temos muito a proteger.`
      },
      {
        id: "veu-s10",
        type: "chapter",
        title: "📖 Capítulo 7 & 8 – O Labirinto das Sombras",
        content: `Após a fuga de Morrath, o grupo sabia que o tempo era curto. O Véu estava cada vez mais frágil, e os fragmentos restantes precisavam ser encontrados antes que o equilíbrio entre os mundos se rompesse de vez.

Dicky, com seu olhar atento, indicou o próximo destino:
— O segundo Fragmento está escondido no Labirinto das Sombras, um lugar onde a escuridão domina e as ilusões são perigosas.

— Parece que não vai ser fácil — comentou Eron, ajustando sua capa.

Ao entrarem no labirinto, a luz do dia desapareceu completamente. As paredes de pedra negra refletiam apenas sombras que se moviam sozinhas. Vozes sussurravam segredos antigos, tentando confundir o grupo.

— Fiquem juntos — alertou Dicky. — Aqui, a escuridão quer nos separar.

Enquanto avançavam, Jhully percebeu que cada um enfrentava suas próprias ilusões — medos e dúvidas tomavam formas assustadoras. Eron viu seu passado cheio de falhas; Isadora enfrentou a sombra do feitiço que ainda ameaçava sua alma; Jhully encarou suas inseguranças sobre o poder da criação.

Mas, apoiando-se uns nos outros, conseguiram resistir.

No centro do labirinto, uma luz tênue emanava de uma pequena pedra que flutuava sobre um pedestal negro: o segundo Fragmento do Véu. Jhully estendeu a mão e, ao tocá-lo, sentiu uma onda de energia que fortaleceu o vínculo do grupo.

Porém, um ruído atrás deles fez todos se virarem. Morrath havia retornado, acompanhado por criaturas sombrias ainda mais ferozes:
— O Véu vai cair, e com ele, todos os mundos se dissolverão!

Eron travou um duelo direto de feitiços com Morrath. Enquanto isso, Jhully percebeu que as criaturas sombrias eram alimentadas pelo medo e dúvidas de cada um. Então, com coragem, começou a falar palavras que lembravam os momentos em que o grupo venceu desafios, suas amizades e conquistas. As palavras enfraqueceram as criaturas até se desfarem em fumaça!

Com um golpe monumental de luz de Dicky, Morrath recuou furioso mais uma vez:
— Isso não acabou. O Véu vai cair, com ou sem vocês!`
      },
      {
        id: "veu-s11",
        type: "chapter",
        title: "📖 Capítulo 9 & 10 – Segredos do Véu e a Arqueira Lira",
        content: `Depois da batalha no Labirinto das Sombras, o grupo se refugiou em uma clareira iluminada pela luz suave do entardecer. Jhully segurava os dois fragmentos, sentindo seu poder pulsar em suas mãos.

— Precisamos entender quem é Morrath — disse ela, olhando para Dicky. — E por que ele quer que o Véu caia.

Dicky assentiu:
— Morrath não é apenas um traidor comum. Ele foi um dos primeiros guardiões do Reino Mágico, até sua queda. Mas o que o corrompeu foi algo mais profundo.

De repente, uma luz suave emanou dos fragmentos. Jhully sentiu uma voz — antiga e misteriosa — ecoar em sua mente:

“O Véu não é apenas uma barreira, mas um guardião. E dentro dele, a chave para a verdadeira criação.”

— O que isso significa? — perguntou Eron.
— Que o Véu pode ser mais do que pensamos. Se Morrath conseguir destruí-lo, ele poderá controlar não só os mundos, mas a própria essência da criação.

O grupo seguiu em direção ao próximo destino: o Templo das Estrelas, nas montanhas. Na pequena vila aos pés dos picos, encontraram Lira, uma jovem e habilidosa arqueira com vasto conhecimento sobre lendas ancestrais:

— Eu conheço o Templo das Estrelas — disse Lira, com um sorriso confiante. — E posso ajudar vocês.

Com Lira no grupo, superaram os enigmas do santuário e encontraram o terceiro Fragmento, reluzindo com esplendor estelar.`
      },
      {
        id: "veu-s12",
        type: "chapter",
        title: "📖 Capítulo 11 & 12 – O Guardião da Montanha dos Ecos",
        content: `Ao redor da fogueira, Lira revelou:
— O Véu não é apenas uma barreira entre os mundos, mas também uma fonte de energia ancestral. Aqueles que tentam destruí-lo buscam controlar essa energia para moldar a realidade ao seu bel-prazer.

Determinados, iniciaram a subida rumo ao cume da Montanha dos Ecos em busca do quarto Fragmento.

No topo da montanha, foram recebidos por uma enorme criatura feita de pedra e raízes ancestrais, com olhos brilhantes que pareciam olhar diretamente para suas almas:
— Eu sou Gorath, o Guardião. Para levar o fragmento, devem provar que são dignos.

Gorath os submeteu a provas que testavam coragem, lealdade e pureza de coração.

Jhully enfrentou uma visão de seus maiores medos, amparada pela força dos amigos. Lira demonstrou maestria incomparável com seu arco, abatendo ameaças invisíveis. Isadora fortaleceu a todos com sua aura etérea e Dicky canalizou os ventos da montanha.

Gorath reconheceu a dignidade do grupo e entregou o quarto Fragmento, que reluzia em um verde esmeralda resplandecente:
— Guardem este poder com sabedoria. A verdadeira batalha ainda está por vir.`
      },
      {
        id: "veu-s13",
        type: "chapter",
        title: "📖 Capítulo 13 & 14 – Luminara e as Runas Antigas",
        content: `O grupo fez uma pausa na vila mágica de Luminara, famosa por sua harmonia entre natureza e feitiçaria. Lá encontraram o sábio Orin:

— O Véu é mais do que uma barreira — disse Orin. — É a linha que separa o possível do impossível. E os Fragmentos são pedaços dessa linha, mantidos juntos pela fé e pela coragem.

Orin revelou que o quinto Fragmento estava em um templo sagrado protegido por runas ancestrais.

Durante a expedição ao templo, o caderno de Jhully começou a brilhar intensamente, revelando pistas ocultas nas runas e traduzindo a linguagem esquecida dos primeiros criadores.

Com a sabedoria do livro, desvendaram o enigma final e encontraram o quinto Fragmento sobre o altar.

Mas passos rápidos e silenciosos ecoaram pelo templo. Alguém os estava perseguindo.`
      },
      {
        id: "veu-s14",
        type: "chapter",
        title: "📖 Capítulo 15 & 16 – Selene e a Aliança nas Sombras",
        content: `Uma figura encapuzada emergiu das sombras, revelando olhos azul gélido e cabelos prateados:
— Vocês têm ido longe demais. Morrath não é o único interessado no Véu. Me chamo Selene. Também protejo o equilíbrio entre os mundos, mas com métodos diferentes dos seus.

— Como podemos confiar em alguém que surge das sombras? — indagou Isadora.

— Não precisam confiar em mim. Mas se quiserem continuar, terão que me aceitar como aliada temporária.

Jhully compreendeu que a gravidade da ameaça exigia união e aceitou Selene. Caminhando juntas, as próprias sombras pareciam se curvar à nova aliada. Selene ensinou magias antigas que seriam cruciais para a defesa dos Fragmentos do Véu.`
      },
      {
        id: "veu-s15",
        type: "chapter",
        title: "📖 Capítulo 17 & 18 – O Teste da Confiança e a Câmara Azul",
        content: `Avançando rumo ao sexto Fragmento, Selene alertou:
— O próximo desafio não será contra inimigos visíveis. Será uma prova da nossa união.

Na câmara mística, as paredes projetaram os medos mais profundos de cada um: perdas, culpas e inseguranças. Mas, ao compartilharem suas dores e apoiarem-se mutuamente, as ilusões se quebraram, revelando o sexto Fragmento em azul celeste.

Foi quando o Guardião das Sombras emergiu do solo, tentando tomá-lo. Com um escudo de luz de Selene e as magias combinadas de Eron, Isadora, Lira e Dicky, o monstro sombrio foi dissipado, consolidando a sexta pedra sagrada.`
      },
      {
        id: "veu-s16",
        type: "chapter",
        title: "📖 Capítulo 19 a 21 – A Conexão com a Alma de Morrath",
        content: `Nas Ruínas de Eldara, onde passado e presente se cruzavam, o grupo descobriu a verdadeira tragédia de Morrath: ele fora um dedicado protetor do Reino Mágico, corrompido após ser abandonado e traído por quem mais amava.

Quando uma nova tempestade de sombras cercou o templo, Jhully teve uma intuição corajosa: utilizou o poder do caderno para criar uma ponte mental com Morrath.

Em sua consciência, ela viu sua agonia:
— Morrath, não precisa continuar nessa escuridão. Há esperança. Podemos ajudá-lo!

Morrath vacilou, e por um instante uma centelha de luz cintilou em seus olhos antes que uma explosão de energia o afastasse. Jhully soube então: salvar o Véu também significava resgatar a alma perdida de Morrath.`
      },
      {
        id: "veu-s17",
        type: "chapter",
        title: "📖 Capítulo 22 a 24 – O Passado Revelado e a Redenção",
        content: `Criaturas sombrias atacaram novamente em massa. Em meio ao caos, a voz sofrida de Morrath sussurrou através do Véu:
— Jhully... Ajude-me...

Morrath apareceu, envolto em sombras, mas seus olhos mostravam uma dor insuportável. Jhully deu um passo à frente, desarmada:
— Por que escolheu esse caminho, Morrath?

— Eu fui traído... quem eu mais confiava me abandonou, e a escuridão me abraçou para não sentir mais a solidão.

Jhully segurou suas mãos com ternura:
— Você não está sozinho. Nós estamos aqui com você!

A energia dos Fragmentos do Véu envolveu Morrath em uma luz dourada brilhante, quebrando as correntes que aprisionavam seu coração. As sombras começaram a se dissolver.

Mas uma risada gélida e trovejante ecoou pelo céu.`
      },
      {
        id: "veu-s18",
        type: "chapter",
        title: "📖 Capítulo 25 a 27 – O Senhor do Caos e a Chave da Luz",
        content: `Uma entidade cósmica aterrorizante emergiu das fendas do tempo:
— Eu sou Kaelthar, o Senhor do Caos! O Véu será destruído, e com ele a ordem será quebrada. Eu trarei o verdadeiro caos!

Morrath, recuperando sua consciência nobre, colocou-se ao lado de Jhully:
— Lutarei ao seu lado. Desta vez, pela luz!

A batalha foi brutal. Kaelthar era poderoso demais para ser derrotado por feitiços comuns.

Lira consultou pergaminhos sagrados e descobriu a resposta: a mítica “Chave da Luz”, uma relíquia capaz de desestabilizar a essência de Kaelthar, escondida nas terras esquecidas de Althera.`
      },
      {
        id: "veu-s19",
        type: "chapter",
        title: "📖 Capítulo 28 a 31 – As Provas de Althera e Veyran",
        content: `Em Althera, o grupo foi testado pelas três provas ancestrais:
1. Prova da Coragem (enfrentando o guardião flamejante).
2. Prova da Sabedoria (decifrando o código das runas com o caderno de Jhully).
3. Prova do Coração Puro (onde Jhully superou o medo do fracasso).

O altar se abriu, revelando a reluzente Chave da Luz!

Nesse momento, Veyran, o lorde das sombras e general de Kaelthar, atacou com magias de distorção temporal. Jhully uniu a Chave da Luz aos feitiços de Eron e Isadora, criando uma onda luminosa que repeliu Veyran e garantiu o artefato supremo.`
      },
      {
        id: "veu-s20",
        type: "chapter",
        title: "📖 Capítulo 32 a 34 – Os Preparativos para a Batalha Decisiva",
        content: `Sob a luz da lua de Althera, Selene explicou que, para restaurar plenamente o equilíbrio e purificar Morrath, deviam realizar o Cerimonial da Harmonia no lendário Coração do Véu.

O grupo dedicou dias aos preparativos: Eron fortaleceu suas barreiras, Lira encantou suas flechas, Isadora refinou sua magia curativa, Dicky sintonizou os espíritos da natureza e Morrath relembrou seus tempos como protetor do reino.

A união de todos era sua maior armadura.`
      },
      {
        id: "veu-s21",
        type: "chapter",
        title: "📖 Capítulo 35 & 36 – O Cerimonial da Harmonia",
        content: `Cruzando as Terras Invertidas, chegaram ao Coração do Véu, um santuário divino onde todas as energias dos mundos convergem.

Colocaram a Chave da Luz no altar. Os Fragmentos do Véu flutuaram ao redor em uma dança cósmica. De mãos dadas em um círculo inquebrável, entoaram os versos sagrados.

Uma onda de luz pura e calorosa envolveu Morrath. As últimas marcas da escuridão foram erradicadas de sua alma.

Morrath abriu os olhos, sereno e renovado:
— Obrigado... Agora estou pronto para lutar pelo que é certo.`
      },
      {
        id: "veu-s22",
        type: "chapter",
        title: "📖 Capítulo 37 & 38 – O Abismo das Sombras",
        content: `O confronto final os levou ao Abismo das Sombras, um desfiladeiro tempestuoso sob um céu arroxeado.

No centro da arena cósmica estava Kaelthar, rodeado por milhares de criaturas sombrias.

— Finalmente chegaram — rugiu o Senhor do Caos. — Preparem-se para o fim de todos os mundos!

Jhully ergueu a Chave da Luz e os Fragmentos. Ao seu redor, Eron, Isadora, Dicky, Lira, Selene e Morrath formavam uma muralha inabalável de bravura.`
      },
      {
        id: "veu-s23",
        type: "chapter",
        title: "📖 Capítulo 39 & 40 – O Despertar da Luz e o Desfecho",
        content: `A batalha foi colossal. Relâmpagos de magia e trevas rasgavam o céu. Lira derrubava inimigos com precisão, Isadora curava as feridas, Dicky invocava vendavais e Eron criava escudos contra as ondas de energia negra.

No momento crucial, Jhully canalizou a energia dos Fragmentos através da Chave da Luz, abrindo um feixe ofuscante direto no peito de Kaelthar.

— Morrath, agora! — gritou ela.

Morrath uniu toda a luz renascida em seu peito e desferiu o golpe de redenção. Com um grito estarrecedor, a forma sombria de Kaelthar desintegrou-se em poeira estelar levada pelo vento.

O silêncio reinou. O Abismo das Sombras iluminou-se com o sol suave da vitória.

O Reino Mágico estava a salvo.`
      },
      {
        id: "veu-s24",
        type: "chapter",
        title: "✨ Epílogo – A Guardiã do Véu dos Mundos",
        content: `Com Kaelthar derrotado e Morrath liberto das sombras, o Reino Mágico entrou em uma nova era de paz e esperança.

Jhully, agora reconhecida como a guardiã do Véu, continuou escrevendo suas histórias, sabendo que a magia nunca desaparece — ela apenas espera para ser descoberta. Ao lado de seus amigos, Jhully sabia que novas jornadas surgiriam, pois proteger o equilíbrio entre os mundos seria uma missão eterna.

FIM`
      },
      {
        id: "veu-s25",
        type: "backcover",
        title: "📜 Resumo para a Contracapa Oficial",
        subtitle: "Jhully e o Véu dos Mundos",
        content: `O Reino Mágico de Jhully é uma aventura mágica que leva o leitor a um mundo onde a imaginação e a realidade se entrelaçam. Jhully, uma jovem de 14 anos, descobre que o reino que criou em seu livro é real — um lugar cheio de magia, mistérios e criaturas fantásticas.

Junto com seus amigos — o feiticeiro Eron, a fantasminha Isadora, o poderoso coelho Dicky e o próprio Morrath, um antigo guardião — ela embarca em uma jornada épica para salvar o Véu dos Mundos da destruição.

Enfrentando perigos sombrios, desafios emocionantes e descobrindo o verdadeiro poder da amizade, Jhully aprende que a coragem e a esperança são as magias mais fortes que existem.

— Autor: Paulo Ricardo Cordova`,
        imageUrl: "./covers/jhully_veu_dos_mundos.jpg",
        badge: "Coleção O Reino Mágico de Jhully"
      }
    ]
  },
  {
    id: "cronicas-do-cosmos",
    collectionId: "colecao-cronicas-cosmos",
    title: "Crônicas do Cosmos e o Relógio Estelar",
    author: "Paulo Ricardo Cordova",
    category: "Ficção Científica",
    tags: ["Espaço", "Ficção Científica", "Viagem Temporal", "Estrelas"],
    coverUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop",
    themeColor: "#3b82f6",
    synopsis: "Nas profundezas do setor nebuloso de Orion, uma estação de pesquisa descobre um antigo artefato mecânico suspenso no vácuo: um relógio que não mede horas, mas sim as linhas temporais do universo.",
    backCoverText: "Uma odisseia espacial instigante onde a física se entrelaça com o destino da humanidade entre as galáxias.",
    createdAt: "2026-09-28",
    views: 89,
    slides: [
      {
        id: "cosmos-s1",
        type: "cover",
        title: "Crônicas do Cosmos",
        subtitle: "O Relógio Estelar",
        content: "Um artefato ancestral. O tempo em contagem regressiva através dos confins da galáxia.",
        imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1000&auto=format&fit=crop",
        badge: "Sci-Fi Épico"
      },
      {
        id: "cosmos-s2",
        type: "chapter",
        title: "Capítulo 1 – O Silêncio de Orion",
        content: `A nave de exploração Aethelgard navegava pela borda da Nebulosa de Órion há quarenta e dois ciclos solares sem detectar qualquer anomalia. No posto de comando, o comandante Ryan monitorava os pulsos eletromagnéticos que ecoavam pelo vácuo estrelado.

Foi quando os sensores de gravidade dispararam um alerta inusitado. Uma massa quase imperceptível curvava o espaço-tempo logo além do anel de poeira cósmica.

— Ryan, olhe isto — chamou a astrofísica Maya, apontando para o holograma central.

No centro da tela tridimensional, flutuava um dispositivo colossal feito de um metal desconhecido com engrenagens douradas que giravam no ritmo das pulsações estelares.

Não era apenas uma máquina. Era uma bússola de eras esquecidas.`
      },
      {
        id: "cosmos-s3",
        type: "chapter",
        title: "Capítulo 2 – A Engrenagem do Destino",
        content: `Quando a cápsula de contenção foi aproximada do artefato, as luzes da estação piscaram. Uma frequência harmônica ressoou diretamente na consciência de cada tripulante a bordo.

— Ele não está medindo o passado — sussurrou Ryan, tocando o visor térmico. — Ele está contando o tempo até o próximo salto dimensional.

No horizonte infinito de estrelas azuis, uma fenda luminosa começava a se abrir. O destino da humanidade estava prestes a cruzar a maior fronteira já concebida.

✨ CONTINUA...`
      }
    ]
  },
  {
    id: "cronicas-do-cosmos-vol2",
    collectionId: "colecao-cronicas-cosmos",
    title: "Crônicas do Cosmos – Prólogo: Os Guardiões do Tempo",
    author: "Paulo Ricardo Cordova",
    category: "Ficção Científica",
    tags: ["Espaço", "Mistério", "Dimensões", "Sci-Fi"],
    coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
    themeColor: "#3b82f6",
    synopsis: "Após a ativação do Relógio Estelar, a tripulação da Aethelgard atravessa a fenda quântica e encontra uma civilização ancestral que vive fora do fluxo linear do tempo, guardando segredos que podem reescrever a história do cosmos.",
    backCoverText: "O tempo não é uma linha contínua, mas um labirinto cósmico. O prólogo revelador dos Guardiões do Tempo.",
    createdAt: "2026-09-28",
    views: 45,
    slides: [
      {
        id: "cosmos2-s1",
        type: "cover",
        title: "Crônicas do Cosmos",
        subtitle: "Prólogo: Os Guardiões do Tempo",
        content: "Além da fenda temporal. Onde passado e futuro colidem.",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        badge: "Prólogo"
      },
      {
        id: "cosmos2-s2",
        type: "chapter",
        title: "Capítulo 1 – Do Outro Lado do Vácuo",
        content: `Quando os motores de dobra cessaram, não havia poeira estelar nem galáxias conhecidas. A tripulação observava silhuetas de catedrais de cristal flutuando no hiperespaço, banhadas pela luz de pulsares multicolores.

— Não estamos em lugar nenhum do nosso universo físico — anunciou Maya, os olhos refletindo a infinitude. — Estamos no centro do tear temporal.`
      }
    ]
  }
];
