import { createButton } from "../core/createButton.js";

/**
 * Componente GithubButton
 * @param {string} selector 
 * @param {Object} customConfig 
 */
export function GithubButton(selector, customConfig = {}) {
    const config = {
        hoverClass: "github-hover",
        activeClass: "github-active",
        hoverScale: 1.05,
        clickScale: 0.95,
        ...customConfig
    };

    createButton(selector, config);
}
