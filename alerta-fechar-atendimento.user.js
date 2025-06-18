// ==UserScript==
// @name         A1 Alerta - Fechar Atendimento - Luiz Toledo
// @namespace    http://tampermonkey.net/
// @version      1.1
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


    function descricaoContemDuvidasOuInfo() {
        const campo = document.querySelector('input[formcontrolname="descri_mvis"]');
        if (!campo) return false;
        const valor = campo.value?.toLowerCase() || '';
        return valor.includes('dúvidas') || valor.includes('informações');
    }


    document.addEventListener('click', function(e) {
        const menuItem = e.target.closest('a.ui-menuitem-link');
        if (!menuItem) return;
        const texto = menuItem.querySelector('span.ui-menuitem-text')?.innerText.trim();
        if (texto === 'Fechar Atendimento' && descricaoContemDuvidasOuInfo()) {
            alert('Atenção: o motivo contém Dúvidas/Informações. Confirme antes de fechar!');
        }
    }, true);

})();
