import { getAllElements, mergeConfig } from "./utils.js";
import { registerEvents } from "./events.js";

/**
 * Função core para criação e configuração de botões.
 * @param {string} selector - Seletor CSS.
 * @param {Object} config - Configurações de classes e animações.
 */
export function createButton(selector, config = {}) {
    const elements = getAllElements(selector);

    const defaultConfig = {
        hoverClass: "is-hovered",
        activeClass: "is-active",
        disabledClass: "is-disabled",
        hoverScale: 1.05,
        clickScale: 0.95,
        animationDuration: 200
    };

    const finalConfig = mergeConfig(defaultConfig, config);

    elements.forEach(el => {
        // Estado inicial de transição (apenas se necessário para dinâmica)
        el.style.transition = `transform ${finalConfig.animationDuration}ms ease`;

        const events = {
            mouseenter: () => {
                if (el.classList.contains(finalConfig.disabledClass)) return;
                el.classList.add(finalConfig.hoverClass);
                el.style.transform = `scale(${finalConfig.hoverScale})`;
            },
            mouseleave: () => {
                el.classList.remove(finalConfig.hoverClass);
                el.style.transform = "scale(1)";
            },
            mousedown: () => {
                if (el.classList.contains(finalConfig.disabledClass)) return;
                el.classList.add(finalConfig.activeClass);
                el.style.transform = `scale(${finalConfig.clickScale})`;
            },
            mouseup: () => {
                el.classList.remove(finalConfig.activeClass);
                el.style.transform = `scale(${finalConfig.hoverScale})`;
            },
            focus: () => {
                el.classList.add("is-focused");
            },
            blur: () => {
                el.classList.remove("is-focused");
            },
            keydown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    el.classList.add(finalConfig.activeClass);
                    el.style.transform = `scale(${finalConfig.clickScale})`;
                }
            },
            keyup: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    el.classList.remove(finalConfig.activeClass);
                    el.style.transform = `scale(${finalConfig.hoverScale})`;
                }
            }
        };

        registerEvents(el, events);

        // Acessibilidade por teclado
        if (!el.getAttribute("tabindex")) {
            el.setAttribute("tabindex", "0");
        }
        if (!el.getAttribute("role")) {
            el.setAttribute("role", "button");
        }
    });
}
