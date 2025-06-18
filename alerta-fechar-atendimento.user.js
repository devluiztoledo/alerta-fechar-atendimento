// ==UserScript==
// @name         A1 Alerta - Fechar Atendimento - Luiz Toledo
// @namespace    http://tampermonkey.net/
// @version      1.0
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


    function motivoEhDuvidasOuInfo() {
        const campo = document.querySelector('input[formcontrolname="descri_mvis"]');
        if (!campo) return false;
        const texto = campo.value.toLowerCase();
        return texto.includes('dúvidas') || texto.includes('informações');
    }

    document.addEventListener('click', function(e) {
        const link = e.target.closest('a.ui-menuitem-link');
        if (link && link.querySelector('span.ui-menuitem-text')?.innerText.trim() === 'Fechar Atendimento') {
            if (motivoEhDuvidasOuInfo()) {
                alert('Atenção: motivo Dúvidas/Informações. Confirme antes de fechar!');
            }
        }
    }, true);
})();
