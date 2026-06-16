# Diagonal Assessoria

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellowgreen)
![Tecnologias](https://img.shields.io/badge/Tecnologias-HTML5%20%7C%20CSS3%20%7C%20JavaScript-blue)
![Licença](https://img.shields.io/badge/Licen%C3%A7a-MIT-green)

## 🚀 Visão Geral do Projeto

Este repositório hospeda o projeto de reconstrução completa da presença digital da **Diagonal Assessoria**. O foco é a criação de uma plataforma web robusta, escalável e de alta performance, fundamentada em tecnologias web puras (HTML5, CSS3, JavaScript Vanilla). O projeto visa estabelecer uma base digital sólida, integrando uma landing page institucional, um blog e uma arquitetura preparada para futuras expansões e manutenções de longo prazo.

## 🎯 Objetivos Estratégicos

Os principais objetivos que guiam o desenvolvimento deste projeto incluem:

*   **Presença Digital Otimizada:** Desenvolver uma landing page institucional moderna e um blog integrado, garantindo uma experiência de usuário fluida e informativa.
*   **Arquitetura Escalável:** Implementar uma estrutura modular que facilite a adição de novas funcionalidades e páginas, minimizando o impacto em componentes existentes.
*   **Reutilização de Componentes:** Promover a criação e o uso de componentes reutilizáveis para otimizar o ciclo de desenvolvimento e simplificar a manutenção do código.
*   **Performance Superior:** Assegurar tempos de carregamento rápidos e uma interação responsiva, otimizando recursos e a experiência do usuário.
*   **Acessibilidade Universal:** Construir a aplicação com foco em padrões de acessibilidade (WCAG), garantindo que o conteúdo seja acessível a todos os usuários, independentemente de suas capacidades.

## 🛠️ Tecnologias Fundamentais

O projeto é construído sobre as seguintes tecnologias web padrão, sem a dependência de frameworks JavaScript complexos, priorizando o controle e a otimização do código-fonte:

*   **HTML5:** Utilizado para a estruturação semântica e acessível do conteúdo web.
*   **CSS3:** Responsável pela estilização, layout responsivo e apresentação visual da interface do usuário.
*   **JavaScript Vanilla (ES Modules):** Empregado para a lógica interativa, manipulação do DOM e funcionalidades dinâmicas, seguindo o padrão de módulos para melhor organização e desempenho.

Não utilizamos frameworks como Vue.js, React ou Angular. Porém, a organização do projeto foi inspirada em arquiteturas modernas de componentização semelhantes ao Vue.js para facilitar:

*   Escalabilidade
*   Reutilização de código
*   Separação de responsabilidades
*   Manutenção de longo prazo

Todo o sistema é desenvolvido manualmente.

### Distribuição de Código

A composição atual do código-fonte reflete a priorização de estilos e estrutura, com uma camada de interatividade JavaScript concisa:

| Tecnologia   | Percentual |
| :----------- | :--------- |
| CSS          | 47.9%      |
| HTML         | 31.8%      |
| JavaScript   | 20.3%      |

## 📂 Estrutura de Diretórios

A organização do projeto visa a modularidade e a clareza, embora esteja em constante evolução. A estrutura atual é a seguinte, com planos para uma reorganização futura que agrupará os assets de cada componente em diretórios dedicados.

```
/
├── componentes-img/    # [TEMPORÁRIO] Imagens associadas a componentes
├── componentes-js/     # Módulos JavaScript reutilizáveis
├── core/               # Módulos JavaScript essenciais da arquitetura
├── img/                # Imagens estáticas gerais do site
├── cola.md             # Documento de referência rápida para design tokens e guias
├── index.html          # Página principal da aplicação
├── script.js           # Script JavaScript principal
├── style.css           # Folha de estilos global (Design System)
```

**📌 Importante:** A estrutura ainda está em evolução. As pastas de componentes serão reorganizadas futuramente para uma arquitetura mais modular.

### Detalhamento dos Diretórios

*   **`componentes-img/`**: Diretório provisório para imagens de componentes. Será refatorado para integrar os assets diretamente nas pastas dos respectivos componentes. Objetivo: Melhorar organização, manutenção e escalabilidade.
*   **`componentes-js/`**: Contém módulos JavaScript projetados para serem reutilizáveis, formando uma biblioteca interna de componentes.
*   **`core/`**: Abriga os módulos JavaScript fundamentais da arquitetura, como `createButton.js` (gerenciamento de estados e eventos de botões), `events.js` (registro padronizado de eventos) e `utils.js` (funções auxiliares e helpers de DOM).
*   **`img/`**: Destinado exclusivamente às imagens estáticas utilizadas nas páginas do site.
*   **`cola.md`**: Um arquivo Markdown de consulta rápida que consolida a paleta de cores, tipografia, referências visuais e guias de identidade visual. Não é parte da aplicação final, servindo apenas como apoio ao desenvolvimento.

## 🏛️ Arquitetura do Sistema

O projeto emprega uma arquitetura modular baseada em **ES Modules**, inspirada em princípios de design de frameworks modernos (como a componentização do Vue.js), mas implementada com JavaScript Vanilla. Esta abordagem visa maximizar a escalabilidade, a reutilização de código e a separação de responsabilidades, garantindo uma manutenção eficiente a longo prazo.

### Módulos Core

Os módulos localizados em `core/` são a espinha dorsal da interatividade do projeto:

*   **`createButton.js`**: Abstrai a lógica de botões interativos, gerenciando seus estados, eventos e comportamentos reutilizáveis.
*   **`events.js`**: Fornece um mecanismo padronizado para registro e organização de listeners de eventos em toda a aplicação.
*   **`utils.js`**: Contém uma coleção de funções utilitárias para manipulação do DOM, validações e outros helpers de uso geral.

### Ponto de Entrada Centralizado

Um futuro arquivo `index.js` será o ponto de entrada centralizado da arquitetura, orquestrando as exportações de módulos core, componentes e futuras funcionalidades, consolidando a inicialização da aplicação.

### Componentes Atuais e Expansão

Atualmente, o projeto inclui componentes para integração e comunicação:

*   `Instagram`
*   `GitHub`
*   `LinkedIn`
*   `WhatsApp`

A arquitetura é extensível e já está preparada para a integração de novos componentes, como:

*   `Cards`
*   `Navbar`
*   `Modais`
*   `Formulários`
*   Componentes personalizados diversos

## 💡 Filosofia de Desenvolvimento

Nossa abordagem de desenvolvimento é guiada por princípios que promovem a clareza, a manutenibilidade e a performance:

*   **HTML Passivo:** O JavaScript é utilizado para aprimorar a experiência do usuário, não para construir a estrutura visual primária. Os elementos HTML devem ser semanticamente completos antes da intervenção do JavaScript, que apenas adiciona comportamento e interatividade.
*   **CSS Driven:** A totalidade da apresentação visual e do layout é controlada pelo CSS. O JavaScript limita-se a alternar classes CSS para gerenciar estados visuais, mantendo uma clara separação de preocupações.
*   **Configuração por Injeção:** Componentes são projetados para aceitar configurações externas via injeção de dependências, aumentando sua flexibilidade e reutilização, e minimizando a necessidade de modificações internas.
*   **Acessibilidade (A11y) First:** Todos os componentes são desenvolvidos com foco rigoroso em acessibilidade, incluindo navegação por teclado, uso de roles ARIA apropriadas, semântica HTML robusta e conformidade com as diretrizes WCAG.

## 🎨 Design System Integrado

O projeto incorpora um Design System proprietário, centralizado no arquivo `style.css`. Este arquivo atua como a fonte única da verdade para a identidade visual da Diagonal Assessoria, encapsulando:

*   **Design Tokens:** Variáveis CSS para cores, tipografia, espaçamentos e outros elementos visuais.
*   **Sistema de Cores:** Uma paleta definida para garantir consistência visual.
*   **Sistema Tipográfico:** Definições de fontes, tamanhos e pesos para uma hierarquia textual clara.
*   **Componentes Visuais:** Estilos para elementos de UI reutilizáveis.
*   **Responsividade:** Regras de mídia para adaptação a diferentes tamanhos de tela.

### Paleta Visual

A identidade visual da Diagonal Assessoria é expressa através de uma paleta de cores que evoca profissionalismo e confiança:

*   **Dourado:** Simboliza autoridade, confiança, crescimento e prosperidade.
*   **Preto:** Representa estrutura, elegância e contraste.
*   **Bege e Creme:** Transmitem tradição, estabilidade e leveza visual.
*   **Azul Técnico:** Evoca precisão, organização e remete à expertise na área contábil.

### Tipografia

As famílias tipográficas selecionadas para o projeto garantem legibilidade e consistência em toda a interface:

*   `Montserrat`
*   `Roboto`
*   `Inter`

## 🔗 Integrações Planejadas

As seguintes integrações estão no roadmap para expandir a funcionalidade do site. É crucial notar que estas são **integrações futuras** e ainda não estão implementadas, salvo indicação em contrário.

### 📧 Integração de E-mail

*   **Objetivo:** Habilitar o envio direto de mensagens através de formulários de contato no site.
*   **Função:** Facilitar a comunicação para solicitações de orçamento e contato comercial.
*   **Possíveis Soluções:** EmailJS, Resend, Nodemailer, ou uma API backend própria.

### 💬 Integração WhatsApp

*   **Objetivo:** Permitir que visitantes iniciem conversas diretas com a equipe da Diagonal Assessoria.
*   **Função:** Otimizar o atendimento ao cliente e a conversão de leads.
*   **Possibilidades:** Implementação via link direto `wa.me`, API oficial do WhatsApp Business, ou futuras integrações com a plataforma Meta.

### 🗺️ Integração Google Maps

*   **Objetivo:** Exibir a localização física da empresa de forma interativa no site.
*   **Função:** Aumentar a credibilidade institucional e facilitar a localização para os clientes.
*   **Possibilidades:** Utilização de embeds do Google Maps ou integração via API JavaScript do Google Maps para maior personalização.

## 🛣️ Roadmap do Projeto

O roadmap detalha as próximas fases de desenvolvimento, organizadas em checklists para acompanhamento do progresso:

### Estrutura

*   [ ] Reorganização completa dos componentes para uma arquitetura mais modular.
*   [ ] Separação de funcionalidades por módulos bem definidos.
*   [ ] Padronização de nomenclatura para arquivos e diretórios.

### Componentes

*   [ ] Desenvolvimento de Cards reutilizáveis.
*   [ ] Criação de Navbar modular e configurável.
*   [ ] Implementação de Modais reutilizáveis e acessíveis.
*   [ ] Desenvolvimento de Formulários reutilizáveis com validação.

### Performance

*   [ ] Implementação de Lazy Loading para imagens e outros assets.
*   [ ] Otimização e compressão de imagens para carregamento mais rápido.
*   [ ] Melhorias contínuas de SEO (Search Engine Optimization).

### Integrações

*   [ ] Conclusão da integração de E-mail.
*   [ ] Implementação da integração WhatsApp.
*   [ ] Integração com Google Maps.

### Conteúdo

*   [ ] Finalização e lançamento da Landing Page completa.
*   [ ] Integração e publicação do Blog.
*   [ ] Criação de novas páginas institucionais conforme a necessidade.

## ✅ Boas Práticas e Padrões

O projeto adere a um conjunto rigoroso de boas práticas para garantir a qualidade, manutenibilidade e escalabilidade do código-fonte:

*   **Semântica HTML:** Priorização do uso correto e significativo das tags HTML para estruturar o conteúdo, promovendo acessibilidade e otimização para motores de busca.
*   **CSS Modular e BEM:** Organização do CSS em módulos ou componentes, utilizando metodologias como BEM (Block, Element, Modifier) para evitar conflitos e promover a reutilização de estilos.
*   **JavaScript Limpo e Moderno:** Escrita de código JavaScript claro, conciso e bem documentado, aderindo aos padrões ES Modules e princípios de programação funcional quando aplicável.
*   **Versionamento de Código com Git:** Utilização de Git para controle de versão, com um fluxo de trabalho baseado em branches (Git Flow ou GitHub Flow) e mensagens de commit descritivas.
*   **Testes Automatizados (Futuro):** Planejamento para a implementação de testes unitários e de integração para garantir a robustez e a confiabilidade das funcionalidades desenvolvidas.
*   **Documentação Abrangente:** Manutenção de documentação clara, atualizada e acessível, incluindo este README, para facilitar a compreensão e a colaboração no projeto.

## 🤝 Como Contribuir

Detalhes sobre o processo de contribuição, incluindo diretrizes para pull requests, padrões de código e configuração do ambiente de desenvolvimento, serão formalizados e adicionados a esta seção em uma fase futura do projeto.

## ⚠️ Observações Importantes

> É fundamental que os colaboradores e interessados no projeto compreendam os seguintes pontos:
>
> *   O projeto **Diagonal Assessoria** encontra-se em **desenvolvimento ativo e contínuo**.
> *   A estrutura de diretórios e a organização atual são **dinâmicas e não representam necessariamente a configuração final** do projeto.
> *   Certos diretórios, como `componentes-img/`, são de **natureza temporária** e estão sujeitos a refatorações significativas para otimizar a modularidade.
> *   A arquitetura do sistema, embora **inspirada em conceitos de frameworks modernos**, é construída **exclusivamente com HTML, CSS e JavaScript Vanilla**, sem dependências de bibliotecas ou frameworks externos.
> *   O objetivo primordial é estabelecer uma **base tecnológica escalável e independente**, conferindo total controle sobre o código e minimizando a dívida técnica associada a dependências externas.

---

**Autor:** Marino Teixeira Dos Santos Oliveira
**Data da Última Atualização:** Jun 16, 2026
