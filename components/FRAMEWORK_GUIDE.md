# Mini Framework Vanilla JS: Guia de Organização

Este projeto segue uma arquitetura modular baseada em **ES Modules**, focada em separação de responsabilidades e escalabilidade.

## Estrutura de Pastas

*   **`core/`**: Contém a lógica fundamental.
    *   `createButton.js`: O motor que gerencia estados e eventos de botões.
    *   `events.js`: Utilitário para registro limpo de listeners.
    *   `utils.js`: Funções auxiliares para manipulação de DOM e objetos.
*   **`buttons/`**: Implementações específicas de botões de redes sociais ou tipos genéricos.
*   **`cards/`, `modals/`, `navbar/`**: Pastas prontas para novos tipos de componentes.
*   **`index.js`**: Ponto de entrada que centraliza todas as exportações.

## Como Escalar

Para adicionar um novo componente (ex: um Modal):
1.  Crie `components/modals/modal.js`.
2.  Implemente uma função `Modal(selector, config)`.
3.  Use os utilitários de `core/` para gerenciar eventos e estados.
4.  Exporte o novo componente no `index.js` raiz.

## Princípios de Design

1.  **HTML Passivo**: O JavaScript não cria elementos, ele "aninha" comportamento em elementos existentes.
2.  **CSS-Driven**: A aparência deve ser definida no seu arquivo CSS global. O JS apenas alterna classes (`hoverClass`, `activeClass`).
3.  **Configuração por Injeção**: Cada componente aceita um objeto `config` que sobrescreve os valores padrão, permitindo flexibilidade total sem alterar o código do componente.
4.  **Acessibilidade**: O sistema `core` adiciona automaticamente `tabindex` e `role="button"` para garantir que os componentes funcionem via teclado.
