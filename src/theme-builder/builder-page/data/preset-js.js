export const PRESET_JS = `"use strict";

document.addEventListener("DOMContentLoaded", function () {
    function playAnimation(element, frame = false) {
        if (element.getBoundingClientRect().top > 0 && element.getBoundingClientRect().top <= (window.innerHeight * 0.75)) {
            element.classList.add('{{theme_slug}}-animate-init');
        }
    }

    function prepareAnimation(doc, frame = false) {
        var elements = doc.getElementsByClassName('{{theme_slug}}-animate');
    
        for (let element of elements) {
            if ( frame ) {
                playAnimation(element, true);
            } else {
                window.addEventListener('load', function () {
                    playAnimation(element);
                });
                window.addEventListener('scroll', function () {
                    playAnimation(element);
                });
            }
        }
    }

    prepareAnimation(document);
});`;
