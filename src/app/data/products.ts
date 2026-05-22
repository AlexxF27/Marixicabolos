export interface Product {
  id: number;
  category: string; // 'bolos', 'cupcakes', 'sobremesas', 'doces', 'eventos', 'cookies'
  name: string;
  price: string;
  basePrice: number; // Used for price filtering
  image: string;
  description: string;
  ingredients: string[];
  details: string;
  customizable: boolean;
  occasions: string[];
  flavors: string[];
  sizes: string[];
}

export const products: Product[] = [
  {
    id: 1,
    category: 'bolos',
    name: 'Bolo de Aniversário Personalizado',
    price: 'A partir de 35€',
    basePrice: 35,
    image: 'https://images.unsplash.com/photo-1745905910425-553e68ad9cb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0ZWQlMjB0YWxsJTIwYmlydGhkYXklMjBjYWtlfGVufDF8fHx8MTc3Njg3NzgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Bolo artesanal perfeitamente personalizado para tornar o seu aniversário inesquecível.',
    ingredients: [
      'Farinha de trigo premium',
      'Ovos frescos biológicos',
      'Manteiga de qualidade superior',
      'Açúcar refinado',
      'Leite fresco',
      'Creme de pasteleiro',
      'Frutas frescas da época',
      'Decoração comestível personalizada'
    ],
    details: 'Cada bolo de aniversário é criado especialmente para si, com a possibilidade de escolher sabores, cores e decorações. Trabalhamos com ingredientes frescos e de qualidade para garantir um resultado delicioso e visualmente deslumbrante. Tamanhos disponíveis desde 8 até 30 pessoas.',
    customizable: true,
    occasions: ['Aniversário', 'Eventos'],
    flavors: ['Chocolate', 'Baunilha', 'Frutos vermelhos'],
    sizes: ['10-12', '15-20', '20+']
  },
  {
    id: 2,
    category: 'bolos',
    name: 'Bento Cake Personalizado',
    price: 'A partir de 15€',
    basePrice: 15,
    image: 'https://images.unsplash.com/photo-1659679120544-1a968f3003f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pJTIwZGVjb3JhdGVkJTIwY2FrZSUyMGJlbnRvfGVufDF8fHx8MTc3Njg3NzgzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Pequeno bolo individual, perfeito para uma celebração íntima e especial.',
    ingredients: [
      'Massa de bolo fofinha',
      'Creme de manteiga suave',
      'Frutas frescas',
      'Decoração personalizada',
      'Mensagem escrita à mão'
    ],
    details: 'Os Bento Cakes são a tendência do momento - pequenos bolos individuais (10cm x 10cm) perfeitos para celebrações a dois ou para oferecer. Totalmente personalizáveis com mensagens, cores e decorações à sua escolha. Ideal para aniversários, agradecimentos ou simplesmente para mimar alguém especial.',
    customizable: true,
    occasions: ['Aniversário', 'Dia dos Namorados'],
    flavors: ['Chocolate', 'Baunilha', 'Red Velvet'],
    sizes: ['Serve 1-2']
  },
  {
    id: 3,
    category: 'cupcakes',
    name: 'Cupcakes Artesanais',
    price: '3,00€/un',
    basePrice: 3,
    image: 'https://images.unsplash.com/photo-1723476369375-6e6dd9498517?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY3VwY2FrZXMlMjBkZWNvcmF0ZWR8ZW58MXx8fHwxNzc2ODc3NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Cupcakes deliciosos e decorados com elegância, perfeitos para qualquer ocasião.',
    ingredients: [
      'Massa de baunilha ou chocolate',
      'Buttercream cremoso',
      'Chocolates belgas',
      'Frutas frescas',
      'Decorações comestíveis',
      'Toppings variados'
    ],
    details: 'Os nossos cupcakes são feitos diariamente com ingredientes frescos. Disponíveis em vários sabores: baunilha clássica, chocolate intenso, red velvet, limão, morango, entre outros. Decorações personalizáveis para batizados, chás de bebé, casamentos e eventos corporativos. Encomenda mínima de 6 unidades.',
    customizable: false,
    occasions: ['Aniversário', 'Batizado', 'Eventos'],
    flavors: ['Chocolate', 'Baunilha', 'Red Velvet', 'Limão'],
    sizes: ['Serve 1']
  },
  {
    id: 4,
    category: 'bolos',
    name: 'Bolo de Casamento',
    price: 'A partir de 150€',
    basePrice: 150,
    image: 'https://images.unsplash.com/photo-1584158531321-2a1fefff2e51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGNha2V8ZW58MXx8fHwxNzc2ODc3NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Bolos de casamento elegantes e sofisticados, criados para o dia mais especial da sua vida.',
    ingredients: [
      'Andares de massa premium',
      'Recheios gourmet variados',
      'Cobertura fondant ou buttercream',
      'Flores comestíveis',
      'Decoração em pasta de açúcar',
      'Detalhes personalizados'
    ],
    details: 'Criamos bolos de casamento únicos que refletem a personalidade do casal. Desde designs minimalistas e modernos até criações românticas e elaboradas. Oferecemos consulta personalizada para escolher sabores, recheios, design e cores. Cada bolo é uma obra de arte comestível que complementa perfeitamente o seu grande dia. Marcação de prova de sabores disponível.',
    customizable: true,
    occasions: ['Casamento'],
    flavors: ['Chocolate', 'Baunilha', 'Limão', 'Red Velvet'],
    sizes: ['20+', '50+', '100+']
  },
  {
    id: 5,
    category: 'doces',
    name: 'Doces Finos para Eventos',
    price: 'A partir de 25€',
    basePrice: 25,
    image: 'https://images.unsplash.com/photo-1776722089433-3513d173f5ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwc3dlZXRzJTIwYnJpZ2FkZWlybyUyMG1hY2Fyb25zfGVufDF8fHx8MTc3Njg3NzQxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Variedade de doces finos artesanais, perfeitos para eventos e celebrações especiais.',
    ingredients: [
      'Brigadeiros gourmet',
      'Trufas de chocolate',
      'Macarons franceses',
      'Beijinhos premium',
      'Docinhos de coco',
      'Decorações personalizadas'
    ],
    details: 'Caixas de doces finos artesanais, perfeitas para oferecer ou servir em eventos. Cada docinho é feito à mão com ingredientes de qualidade superior. Apresentação elegante em caixas personalizadas. Ideal para batizados, comunhões, chás de bebé, aniversários e eventos corporativos. Várias opções de embalagem disponíveis.',
    customizable: true,
    occasions: ['Casamento', 'Batizado', 'Eventos'],
    flavors: ['Chocolate', 'Tradicional'],
    sizes: ['20-30', '50+']
  },
  {
    id: 6,
    category: 'sobremesas',
    name: 'Tartes Artesanais',
    price: '20,00€',
    basePrice: 20,
    image: 'https://images.unsplash.com/photo-1771623492237-4010e49fc0d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHRhcnQlMjBhcnRpc2FufGVufDF8fHx8MTc3Njg3NzQxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Tartes caseiras com frutas frescas e cremes deliciosos, perfeitas para qualquer momento.',
    ingredients: [
      'Massa quebrada artesanal',
      'Creme de pasteleiro',
      'Frutas frescas da época',
      'Compota caseira',
      'Nata fresca',
      'Amêndoas torradas'
    ],
    details: 'As nossas tartes são preparadas diariamente com frutas da época e ingredientes frescos. Disponíveis em vários sabores: tarte de maçã clássica, tarte de limão merengada, tarte de frutos vermelhos, tarte de noz e muito mais. Perfeitas para sobremesa, lanche ou café da manhã. Também disponíveis em versões individuais.',
    customizable: false,
    occasions: ['Natal', 'Eventos'],
    flavors: ['Frutado', 'Tradicional', 'Limão'],
    sizes: ['6-8', '10-12']
  },
  {
    id: 7,
    category: 'bolos',
    name: 'Bolo de Cenoura com Chocolate',
    price: '22,00€',
    basePrice: 22,
    image: 'https://images.unsplash.com/photo-1650937254058-d952a67a4f46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmF6aWxpYW4lMjBjYXJyb3QlMjBjYWtlJTIwY2hvY29sYXRlfGVufDF8fHx8MTc3Njg3NzgzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'O clássico bolo de cenoura com uma generosa cobertura de chocolate.',
    ingredients: [
      'Cenouras frescas',
      'Farinha de trigo',
      'Chocolate negro 70%',
      'Ovos',
      'Óleo vegetal',
      'Açúcar'
    ],
    details: 'O nosso bolo de cenoura é feito com cenouras frescas raladas no momento e leva uma cobertura espessa de brigadeiro de chocolate negro. Perfeito para o lanche da tarde.',
    customizable: false,
    occasions: ['Eventos', 'Aniversário'],
    flavors: ['Cenoura', 'Chocolate', 'Tradicional'],
    sizes: ['8-10']
  },
  {
    id: 8,
    category: 'bolos',
    name: 'Bolo Red Velvet Clássico',
    price: '28,00€',
    basePrice: 28,
    image: 'https://images.unsplash.com/photo-1621303838226-5dc7130d5e19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB2ZWx2ZXQlMjBjYWtlJTIwc2xpY2V8ZW58MXx8fHwxNzc2ODc3NDEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Massa aveludada em tons de vermelho com um recheio suave de cream cheese.',
    ingredients: [
      'Farinha fina',
      'Cacau em pó',
      'Leitelho (Buttermilk)',
      'Cream Cheese',
      'Açúcar em pó',
      'Corante vermelho natural'
    ],
    details: 'O Red Velvet é um clássico que nunca desilude. O equilíbrio perfeito entre o ligeiro travo a cacau da massa macia e o doce e denso creme de queijo.',
    customizable: false,
    occasions: ['Dia dos Namorados', 'Aniversário', 'Eventos'],
    flavors: ['Red Velvet', 'Tradicional'],
    sizes: ['10-12', '15-20']
  },
  {
    id: 9,
    category: 'sobremesas',
    name: 'Cheesecake de Frutos Vermelhos',
    price: '24,00€',
    basePrice: 24,
    image: 'https://images.unsplash.com/photo-1734987408480-c2916b5386bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZXJyeSUyMGNoZWVzZWNha2UlMjBmcmVzaHxlbnwxfHx8fDE3NzY4Nzc0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Cheesecake fresco com base de bolacha crocante e coulis de frutos vermelhos caseiro.',
    ingredients: [
      'Queijo creme',
      'Bolacha tipo Maria',
      'Manteiga',
      'Morangos e framboesas',
      'Açúcar',
      'Nata'
    ],
    details: 'Servido bem fresco, este cheesecake não vai ao forno, garantindo uma textura mousse que se desfaz na boca. A doçura é cortada pelo coulis ácido de frutos do bosque.',
    customizable: false,
    occasions: ['Eventos', 'Natal'],
    flavors: ['Frutado', 'Frutos vermelhos'],
    sizes: ['10-12']
  },
  {
    id: 10,
    category: 'cookies',
    name: 'Cookies de Chocolate Americanas',
    price: '2,50€/un',
    basePrice: 2.50,
    image: 'https://images.unsplash.com/photo-1609857570980-1b6eea7b3af3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjaGlwJTIwY29va2llcyUyMGhvbWVtYWRlfGVufDF8fHx8MTc3Njg3NzQyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Bolachas gigantes estilo NY, crocantes por fora e peganhentas por dentro com pepitas de chocolate belga.',
    ingredients: [
      'Açúcar mascavado',
      'Manteiga castanha',
      'Farinha de trigo',
      'Chocolate de leite 50%',
      'Chocolate negro 70%',
      'Sal marinho'
    ],
    details: 'As autênticas Chocolate Chip Cookies. Encomenda mínima de 4 unidades. Ótimas para acompanhar com leite ou café. Podem ser ligeiramente aquecidas antes de consumir.',
    customizable: false,
    occasions: ['Eventos', 'Aniversário'],
    flavors: ['Chocolate', 'Tradicional'],
    sizes: ['Serve 1']
  },
  {
    id: 11,
    category: 'cookies',
    name: 'Cookies Red Velvet',
    price: '2,80€/un',
    basePrice: 2.80,
    image: 'https://images.unsplash.com/photo-1673412810103-27c233f77da6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB2ZWx2ZXQlMjBjb29raWVzfGVufDF8fHx8MTc3Njg3NzQxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Cookies com massa red velvet suave e pepitas de chocolate branco derretidas.',
    ingredients: [
      'Cacau',
      'Manteiga',
      'Chocolate branco',
      'Açúcar',
      'Extrato de baunilha',
      'Farinha'
    ],
    details: 'Uma versão em bolacha do bolo mais famoso, com um centro macio e gotas de chocolate branco a contrastar com a cor vibrante.',
    customizable: false,
    occasions: ['Dia dos Namorados', 'Eventos'],
    flavors: ['Red Velvet', 'Chocolate'],
    sizes: ['Serve 1']
  },
  {
    id: 12,
    category: 'bolos',
    name: 'Bolo Floresta Negra',
    price: '32,00€',
    basePrice: 32,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGZvcmVzdCUyMGNha2V8ZW58MXx8fHwxNzc2ODc3NDE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Camadas de pão de ló de cacau molhadas com kirsch, natas batidas e cerejas.',
    ingredients: [
      'Cacau puro',
      'Natas frescas 35% gordura',
      'Cerejas em calda',
      'Licor de cereja (Kirsch)',
      'Raspas de chocolate negro'
    ],
    details: 'Um clássico alemão repleto de sabor e tradição. Ideal para quem adora a combinação de chocolate, fruta e natas suaves.',
    customizable: true,
    occasions: ['Aniversário', 'Natal'],
    flavors: ['Chocolate', 'Frutos vermelhos', 'Tradicional'],
    sizes: ['15-20', '20-30']
  },
  {
    id: 13,
    category: 'bolos',
    name: 'Bolo Chiffon de Limão',
    price: '18,00€',
    basePrice: 18,
    image: 'https://images.unsplash.com/photo-1658312452047-5bde0b1d8628?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW1vbiUyMGNoaWZmb24lMjBjYWtlfGVufDF8fHx8MTc3Njg3NzQxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'O bolo mais leve, fofo e alto que vai provar, com um toque cítrico de limão.',
    ingredients: [
      'Claras em castelo',
      'Sumo de limão fresco',
      'Raspas de limão bio',
      'Farinha leve',
      'Açúcar',
      'Óleo vegetal'
    ],
    details: 'Parece uma nuvem de limão! Não leva coberturas pesadas, apenas uma leve camada de açúcar em pó. Perfeito com uma chávena de chá.',
    customizable: false,
    occasions: ['Eventos'],
    flavors: ['Limão', 'Frutado'],
    sizes: ['10-12', '15-20']
  },
  {
    id: 14,
    category: 'sobremesas',
    name: 'Mil-Folhas Artesanal',
    price: '22,00€',
    basePrice: 22,
    image: 'https://images.unsplash.com/photo-1769655102909-e8dfef0835c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxsZWZldWlsbGUlMjBkZXNzZXJ0fGVufDF8fHx8MTc3Njg3NzgzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Massa folhada caramelizada, super estaladiça, recheada com creme diplomata de baunilha.',
    ingredients: [
      'Massa folhada artesanal',
      'Leite gordo',
      'Fava de baunilha de Madagáscar',
      'Gemas de ovo',
      'Nata fresca'
    ],
    details: 'Uma autêntica sobremesa francesa. A combinação de texturas estaladiças da massa com o creme suave e sedoso é divinal. Formato retangular que serve 8-10 generosas fatias.',
    customizable: false,
    occasions: ['Eventos', 'Aniversário'],
    flavors: ['Baunilha', 'Tradicional'],
    sizes: ['8-10']
  },
  {
    id: 15,
    category: 'bolos',
    name: 'Torta de Viana',
    price: '20,00€',
    basePrice: 20,
    image: 'https://images.unsplash.com/photo-1760136874870-701b323169ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMHJvbGwlMjBjYWtlJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzc2ODc3NDE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'A tradicional torta enrolada portuguesa, de massa fina recheada com doce de ovos cremoso.',
    ingredients: [
      'Ovos',
      'Açúcar',
      'Farinha',
      'Calda de açúcar',
      'Toque de limão'
    ],
    details: 'Pão de ló fininho cozido em tabuleiro, enrolado primorosamente com o nosso doce de ovos rico e aveludado. Decorado com açúcar em pó.',
    customizable: false,
    occasions: ['Eventos', 'Natal', 'Páscoa'],
    flavors: ['Tradicional', 'Baunilha'],
    sizes: ['10-12']
  },
  {
    id: 16,
    category: 'bolos',
    name: 'Bolo de Bolacha Tradicional',
    price: '24,00€',
    basePrice: 24,
    image: 'https://images.unsplash.com/photo-1593954615065-1ed1bbccb17a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXllciUyMGNvZmZlZSUyMGNha2UlMjBzbGljZXxlbnwxfHx8fDE3NzY4Nzc4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Camadas de bolacha maria embebidas em café alternadas com creme de manteiga clássico.',
    ingredients: [
      'Bolacha Maria tradicional',
      'Café forte caseiro',
      'Manteiga sem sal',
      'Açúcar em pó',
      'Gemas de ovo'
    ],
    details: 'Uma receita passada de geração em geração. É decorado com bolacha ralada por cima e serve-se bem fresco. Saboroso e inesquecível.',
    customizable: false,
    occasions: ['Aniversário', 'Eventos'],
    flavors: ['Tradicional', 'Café'],
    sizes: ['10-12', '15-20']
  },
  {
    id: 17,
    category: 'bolos',
    name: 'Pão de Ló Úmido',
    price: '18,00€',
    basePrice: 18,
    image: 'https://images.unsplash.com/photo-1743324654145-ea0bf8ded323?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbHVmZnklMjBzcG9uZ2UlMjBjYWtlJTIwcG9ydHVndWVzZXxlbnwxfHx8fDE3NzY4Nzc4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Pão de ló alto, fofo, com aquele centro cremoso e irresistível que derrete na boca.',
    ingredients: [
      'Muitas gemas',
      'Açúcar',
      'Farinha peneirada',
      'Flor de sal'
    ],
    details: 'Simples mas de confecção perfeita, o pão de ló húmido (estilo Ovar ou Margaride) é servido na sua folha de papel num prato rústico.',
    customizable: false,
    occasions: ['Páscoa', 'Natal', 'Eventos'],
    flavors: ['Tradicional'],
    sizes: ['8-10', '10-12']
  },
  {
    id: 18,
    category: 'bolos',
    name: 'Drip Cake Festivo',
    price: 'A partir de 45€',
    basePrice: 45,
    image: 'https://images.unsplash.com/photo-1760184347569-17aa88fcef94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmlwJTIwY2FrZSUyMGZlc3RpdmV8ZW58MXx8fHwxNzc2ODc3NDIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Bolo alto em camadas com cobertura de buttercream e drip de chocolate escorrendo, cheio de doces no topo.',
    ingredients: [
      'Pão de ló à escolha',
      'Buttercream de merengue suíço',
      'Ganache de chocolate',
      'Macarons e chocolates',
      'Decoração em creme'
    ],
    details: 'Moderno e visualmente apelativo! A técnica do drip cake faz com que o chocolate escorra artisticamente pelos lados do bolo. Totalmente personalizável nas cores e tipo de doces que o decoram no topo.',
    customizable: true,
    occasions: ['Aniversário', 'Eventos'],
    flavors: ['Chocolate', 'Baunilha', 'Frutado'],
    sizes: ['15-20', '20-30', '50+']
  }
];
