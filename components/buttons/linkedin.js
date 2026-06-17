import { createButton } from "../core/createButton.js";

/**
 * Componente LinkedinButton
 * @param {string} selector 
 * @param {Object} customConfig 
 */
export function LinkedinButton(selector, customConfig = {}) {
    const config = {
        hoverClass: "linkedin-hover",
        activeClass: "linkedin-active",
        hoverScale: 1.08,
        clickScale: 0.92,
        ...customConfig
    };

    createButton(selector, config);
}
