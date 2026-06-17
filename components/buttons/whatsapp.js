import { createButton } from "../core/createButton.js";

/**
 * Componente WhatsappButton
 * @param {string} selector 
 * @param {Object} customConfig 
 */
export function WhatsappButton(selector, customConfig = {}) {
    const config = {
        hoverClass: "whatsapp-hover",
        activeClass: "whatsapp-active",
        hoverScale: 1.15,
        clickScale: 0.85,
        ...customConfig
    };

    createButton(selector, config);
}
