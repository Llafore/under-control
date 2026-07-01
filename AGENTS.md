# Under Control - Agent Notes

## Produto

Under Control e um app mobile para registrar e visualizar habitos diarios do usuario.
O objetivo principal e ajudar o usuario a perceber padroes de comportamento ao longo do tempo, especialmente habitos como academia, consumo de alcool, fumo, agua, sono e outros marcadores pessoais.

O app deve priorizar registro rapido, leitura mensal clara e feedback visual simples. Evite telas explicativas ou fluxo de onboarding ate que exista necessidade real.

## Stack e ambiente

- Projeto atual: Expo / React Native com `expo-router`.
- Manter Expo por padrao.
- Qualquer troca relevante de ambiente, framework, arquitetura de navegacao ou runtime deve ser debatida antes de ser implementada.
- Prefira componentes simples em React Native antes de adicionar bibliotecas.

## Direcao da UI

O primeiro fluxo importante e a visao mensal de habitos.

### Calendario mensal

- O calendario deve representar um mes real, respeitando o dia da semana em que o mes comeca e termina.
- O grid deve ter 7 colunas, uma por dia da semana.
- Usar domingo como primeiro dia da semana inicialmente, por ser comum em calendarios brasileiros. Se isso incomodar na pratica, mudar para segunda-feira como decisao explicita.
- Dias vazios antes do primeiro dia e depois do ultimo dia do mes devem ocupar espaco visual, mas nao devem ser interativos.
- A troca de mes deve acontecer por botoes laterais ao nome do mes, no padrao:
  - `< junho >`
  - `< julho >`
- Tocar no mes/ano deve abrir um seletor no topo da tela para escolher mes e ano diretamente.
- O usuario deve conseguir tocar em um dia para ver e editar os habitos daquele dia.
- Selecionar ou remover um habito concluido naquele dia deve alterar o estado visual do quadrado no calendario.

### Representacao dos dias

Evitar colocar o numero do dia como texto central dominante dentro do quadrado, porque isso transforma o calendario em uma matriz numerica e compete com o sinal visual do progresso.

Preferir uma destas alternativas:

- Numero pequeno no canto superior esquerdo, com baixa hierarquia visual.
- Ponto discreto ou mini etiqueta no canto para indicar "hoje".
- Borda ou anel para dia selecionado.
- Preenchimento do quadrado para indicar progresso do dia.
- Pequenos segmentos internos apenas se for necessario mostrar tipos de habito diferentes.

Direcao recomendada inicial:

- Numero do dia pequeno no canto superior esquerdo.
- Cor de fundo do quadrado representa progresso:
  - vazio/neutro: nenhum habito marcado;
- cada quantidade de habitos completos preenche um nivel discreto de um degrade verde;
  - verde forte: todos os habitos do dia marcados.
- Dia selecionado usa anel branco.
- Dia atual usa uma faixa branca diagonal, saindo da metade inferior ate a metade direita do quadrado.

### Checklist do dia

- Ao tocar em um dia, a checklist deve mostrar os habitos daquele dia, nao apenas os de hoje.
- O titulo da checklist deve usar a data selecionada de forma legivel, por exemplo `11 de junho`.
- Cada item deve ser acionavel por linha inteira, com checkbox visivel.
- Ao marcar um checkbox, o calendario deve refletir imediatamente o novo progresso daquele dia.
- A tela principal deve respeitar safe area e permitir rolagem. Evite centralizar verticalmente calendario e checklist quando o conteudo crescer.

## Cores

A paleta atual escura com verde funciona bem para reforco positivo, mas deve ganhar mais contraste e menos dependencia de um unico verde.

Direcao recomendada:

- Fundo principal: grafite quase preto.
- Superficies: cinza escuro levemente mais claro.
- Texto principal: quase branco.
- Texto secundario: cinza frio.
- Acao positiva/progresso: verde.
- Seletor/foco: `#FC6C85`, para separar "selecionado" de "concluido".

Evite uma interface dominada por apenas um tom de verde. Use verde para feedback de progresso, `#FC6C85` para foco e neutros para estrutura.

## Modelo mental de dados

Separar tres conceitos:

- `habit`: definicao do habito, nome, categoria e tipo.
- `dayLog`: registros de um dia especifico.
- `habitEntry`: estado de um habito em um dia.

Usar `YYYY-MM-DD` com zero-padding como chave estavel de data, por exemplo `2026-06-25`.

Por enquanto, todos os habitos devem ser tratados como habitos positivos com checkbox binario. Nao modelar `limit` ou `neutral` nesta fase.

Persistencia local usa SQLite via `expo-sqlite`.

Regras de ciclo de vida de habitos:

- Ao criar um habito, ele recebe `created_at` com a data atual e aparece apenas no dia atual e nos proximos.
- Soft delete preenche `deleted_at` com a data atual. O habito continua aparecendo nos dias anteriores, mas some da data de remocao em diante.
- Hard delete remove o habito e todos os registros diarios associados.
- A checklist e o degradê do calendario devem considerar apenas os habitos visiveis para cada data.

## Colaboracao com agentes

Use subagentes quando houver trabalho paralelo real ou quando uma segunda leitura reduzir risco.

Padrao recomendado:

- Agente principal: mantem decisao de produto, integra mudancas e conversa com o usuario.
- Subagente explorador: le codigo existente e aponta restricoes, riscos ou arquivos relevantes.
- Subagente trabalhador: implementa uma fatia bem delimitada, com arquivos de responsabilidade claros.
- Subagente verificador: roda validacoes ou revisa uma mudanca ja feita quando isso puder acontecer em paralelo.

Evite usar subagentes para decisoes pequenas. Para mudancas simples, o agente principal deve resolver direto.

## Proximas entregas sugeridas

1. Transformar o calendario fixo de 31 quadrados em um calendario mensal real.
2. Adicionar navegacao de mes com controles laterais.
3. Introduzir estado de `selectedDate`.
4. Fazer a checklist ler e alterar os habitos da data selecionada.
5. Calcular a cor de cada dia pelo progresso dos habitos daquele dia.
6. Ajustar paleta para separar progresso, foco e estados neutros.
