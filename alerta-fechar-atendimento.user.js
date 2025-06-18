// ==UserScript==
// @name         A1 Alerta - Fechar Atendimento - Luiz Toledo
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Alerta ao fechar atendimento com motivo "Dúvidas/Informações" no INT6.
// @author       Luiz Toledo
// @match        *://integrator6.gegnet.com.br/*
// @updateURL    https://raw.githubusercontent.com/devluiztoledo/alerta-fechar-atendimento/main/alerta-fechar-atendimento.user.js
// @downloadURL  https://raw.githubusercontent.com/devluiztoledo/alerta-fechar-atendimento/main/alerta-fechar-atendimento.user.js
// @icon         https://raw.githubusercontent.com/devluiztoledo/copiar-dados-onu-autoisp/main/icon.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let ultimoMotivo = '';


    function observarMotivo() {
        const dropdown = document.querySelector('p-dropdown[formcontrolname="codmvis"]');
        if (!dropdown) return;

        new MutationObserver(() => {
            const label = dropdown.querySelector('.ui-dropdown-label');
            if (label) {
                ultimoMotivo = label.textContent.trim().toLowerCase();
            }
        }).observe(dropdown, { childList: true, subtree: true });
    }


    const mo = new MutationObserver((_, obs) => {
        if (document.querySelector('p-dropdown[formcontrolname="codmvis"]')) {
            observarMotivo();
            obs.disconnect();
        }
    });
    mo.observe(document.body, { childList: true, subtree: true });


    document.addEventListener('click', function(e) {
        const menuItem = e.target.closest('a.ui-menuitem-link');
        if (!menuItem) return;
        const textoMenu = menuItem.querySelector('span.ui-menuitem-text')?.innerText.trim();
        if (textoMenu === 'Fechar Atendimento') {

            if (ultimoMotivo === 'dúvidas ou informações' || ultimoMotivo === 'duvidas ou informacoes') {
                alert('Atenção: motivo “Dúvidas ou Informações”. Confirme antes de fechar!');
            }
        }
    }, true);

})();
