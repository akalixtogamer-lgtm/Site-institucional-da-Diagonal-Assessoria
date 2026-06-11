/**
 * Utilitários compartilhados para a biblioteca de componentes.
 */

/**
 * Verifica se um elemento está no DOM.
 * @param {string|HTMLElement} selector 
 * @returns {HTMLElement|null}
 */
export const getElement = (selector) => {
    if (selector instanceof HTMLElement) return selector;
    return document.querySelector(selector);
};

/**
 * Seleciona múltiplos elementos.
 * @param {string} selector 
 * @returns {NodeList}
 */
export const getAllElements = (selector) => {
    return document.querySelectorAll(selector);
};

/**
 * Aplica múltiplos estilos inline a um elemento.
 * @param {HTMLElement} el 
 * @param {Object} styles 
 */
export const applyStyles = (el, styles) => {
    Object.assign(el.style, styles);
};

/**
 * Merge profundo de objetos de configuração.
 * @param {Object} target 
 * @param {Object} source 
 * @returns {Object}
 */
export const mergeConfig = (target, source) => {
    return { ...target, ...source };
};
