/**
 * Gerenciador de eventos para componentes.
 */

export const registerEvents = (el, events) => {
    Object.entries(events).forEach(([event, handler]) => {
        el.addEventListener(event, handler);
    });
};

export const removeEvents = (el, events) => {
    Object.entries(events).forEach(([event, handler]) => {
        el.removeEventListener(event, handler);
    });
};
