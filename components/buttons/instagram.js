import { createButton } from "../core/createButton.js";

/**
 * Componente InstagramButton
 * @param {string} selector 
 * @param {Object} customConfig 
 */
export function InstagramButton(selector, customConfig = {}) {
    const config = {
        hoverClass: "instagram-hover",
        activeClass: "instagram-active",
        hoverScale: 1.1,
        clickScale: 0.9,
        ...customConfig
    };

    createButton(selector, config);
}
