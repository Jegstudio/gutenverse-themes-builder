export const PRESET_CSS = `html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
}
  
*,
*::before,
*::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
  
  /* Sections ========================================================================== */
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 15px;
    line-height: 1.7;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
body h1,
body h2,
body h3,
body h4,
body h5,
body h6 {
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
    line-height: 1.2;
}
body h1 {
    font-size: 2.5rem;
}
body h2 {
    font-size: 2rem;
}
body h3 {
    font-size: 1.75rem;
}
body h4 {
    font-size: 1.5rem;
}
body h5 {
    font-size: 1.25rem;
}
body h6 {
    font-size: 1rem;
}
body p {
    margin-top: 0;
    margin-bottom: 0;
}
  
img {
    height: auto;
}
  
/* Animation ========================================================================== */
:root {
--{{theme_slug}}-transition: cubic-bezier(0.165, 0.84, 0.44, 1)
}

body .{{theme_slug}}-animate-init,
body.editor-styles-wrapper .{{theme_slug}}-animate {
    opacity: 1;
    visibility: visible;
    transform: translateY(0) translateX(0) scale(1) rotate(0)
}

.{{theme_slug}}-animate {
    opacity: 0;
    visibility: hidden;
    transition-property: opacity, transform;
}

.{{theme_slug}}-move-up {
    transform: translateY(30px)
}

.{{theme_slug}}-move-down {
    transform: translateY(-30px)
}

.{{theme_slug}}-move-right {
    transform: translateX(-40px)
}

.{{theme_slug}}-move-left {
    transform: translateX(40px)
}

.{{theme_slug}}-flip {
    transform: perspective(500px) translateY(60px) scaleY(.75) rotateX(-40deg)
}

.{{theme_slug}}-scale {
    transform: scale(0.5)
}

.{{theme_slug}}-flip,
.{{theme_slug}}-move-down,
.{{theme_slug}}-move-up,
.{{theme_slug}}-move-right,
.{{theme_slug}}-move-left,
.{{theme_slug}}-scale {
    transition-duration: .7s;
    transition-timing-function: var(--{{theme_slug}}-transition)
}

.{{theme_slug}}-delay-1 {
    transition-delay: .1s
}

.{{theme_slug}}-delay-3 {
    transition-delay: .3s
}

.{{theme_slug}}-delay-5 {
    transition-delay: .5s
}

.{{theme_slug}}-delay-7 {
    transition-delay: .7s
}

.{{theme_slug}}-delay-10 {
    transition-delay: 1s
}

.{{theme_slug}}-delay-20 {
    transition-delay: 2s
}

/* Advanced ========================================================================== */
  .wp-block-columns {
    margin-bottom: 0;
}

.editor-styles-wrapper .wp-site-blocks > * + * {
    margin-block-start: 0!important;
}

.{{theme_slug}}-z-index-1 {
    position: relative;
    z-index: 1;
}

.{{theme_slug}}-z-index-10 {
    position: relative;
    z-index: 10;
}

.{{theme_slug}}-z-index-100 {
    position: relative;
    z-index: 100;
}

.{{theme_slug}}-z-index-1000 {
    position: relative;
    z-index: 1000;
}

.{{theme_slug}}-margin-top-n10 {
    position: relative;
    margin-top: -10px!important;
}

.{{theme_slug}}-margin-top-n20 {
    position: relative;
    margin-top: -20px!important;
}

.{{theme_slug}}-margin-top-n30 {
    position: relative;
    margin-top: -30px!important;
}

.{{theme_slug}}-margin-top-n40 {
    position: relative;
    margin-top: -40px!important;
}

.{{theme_slug}}-margin-top-n50 {
    position: relative;
    margin-top: -50px!important;
}

.{{theme_slug}}-margin-top-n60 {
    position: relative;
    margin-top: -60px!important;
}

.{{theme_slug}}-margin-top-n70 {
    position: relative;
    margin-top: -70px!important;
}

.{{theme_slug}}-margin-top-n80 {
    position: relative;
    margin-top: -80px!important;
}

.{{theme_slug}}-margin-top-n90 {
    position: relative;
    margin-top: -90px!important;
}

.{{theme_slug}}-margin-top-n100 {
    position: relative;
    margin-top: -100px!important;
}

.{{theme_slug}}-radius-5 {
    border-radius: 5px;
}

.{{theme_slug}}-radius-10 {
    border-radius: 10px;
}

.{{theme_slug}}-radius-25 {
    border-radius: 25px;
}

.{{theme_slug}}-radius-50 {
    border-radius: 50px;
}

.{{theme_slug}}-margin-left-n10 {
    position: relative;
    margin-left: -10px!important;
}

.{{theme_slug}}-margin-left-n20 {
    position: relative;
    margin-left: -20px!important;
}

.{{theme_slug}}-margin-left-n30 {
    position: relative;
    margin-left: -30px!important;
}

.{{theme_slug}}-margin-left-n40 {
    position: relative;
    margin-left: -40px!important;
}

.{{theme_slug}}-margin-left-n50 {
    position: relative;
    margin-left: -50px!important;
}

.{{theme_slug}}-margin-left-n60 {
    position: relative;
    margin-left: -60px!important;
}

.{{theme_slug}}-margin-left-n70 {
    position: relative;
    margin-left: -70px!important;
}

.{{theme_slug}}-margin-left-n80 {
    position: relative;
    margin-left: -80px!important;
}

.{{theme_slug}}-margin-left-n90 {
    position: relative;
    margin-left: -90px!important;
}

.{{theme_slug}}-margin-left-n100 {
    position: relative;
    margin-left: -100px!important;
}


.{{theme_slug}}-post-template-gap {
    margin-left: -17.5px!important;
    margin-right: -17.5px!important;    
}

.{{theme_slug}}-post-template-gap .wp-block-post-template {
    gap: 0!important;
}

.{{theme_slug}}-post-template-gap .wp-block-post-template > .wp-block-post {
    padding-left: 17.5px!important;
    padding-right: 17.5px!important;
    padding-bottom: 35px!important;
}

@media only screen and (min-width: 600px) {

    .{{theme_slug}}-post-template-gap .wp-block-post-template.column-2 > .wp-block-post,
    .{{theme_slug}}-post-template-gap .wp-block-post-template.columns-2 > .wp-block-post {
        width: calc(50% - 35px)!important;
    }

    .{{theme_slug}}-post-template-gap .wp-block-post-template.column-3 > .wp-block-post,
    .{{theme_slug}}-post-template-gap .wp-block-post-template.columns-3 > .wp-block-post {
        width: calc(33.33333% - 35px)!important;
    }

    .{{theme_slug}}-post-template-gap .wp-block-post-template.column-4 > .wp-block-post,
    .{{theme_slug}}-post-template-gap .wp-block-post-template.columns-4 > .wp-block-post {
        width: calc(25% - 35px)!important;
    }

    .{{theme_slug}}-post-template-gap .wp-block-post-template.column-5 > .wp-block-post,
    .{{theme_slug}}-post-template-gap .wp-block-post-template.columns-5 > .wp-block-post {
        width: calc(20% - 35px)!important;
    }

    .{{theme_slug}}-post-template-gap .wp-block-post-template.column-6 > .wp-block-post,
    .{{theme_slug}}-post-template-gap .wp-block-post-template.columns-6 > .wp-block-post {
        width: calc(16.66667% - 35px)!important;
    }

    body:not(.editor-styles-wrapper) .{{theme_slug}}-post-template-gap .wp-block-post-template.column-2 > .wp-block-post,
    body:not(.editor-styles-wrapper) .{{theme_slug}}-post-template-gap .wp-block-post-template.columns-2 > .wp-block-post {
        width: calc(50%)!important;
    }

    body:not(.editor-styles-wrapper) .{{theme_slug}}-post-template-gap .wp-block-post-template.column-3 > .wp-block-post,
    body:not(.editor-styles-wrapper) .{{theme_slug}}-post-template-gap .wp-block-post-template.columns-3 > .wp-block-post {
        width: calc(33.33333%)!important;
    }

    body:not(.editor-styles-wrapper) .{{theme_slug}}-post-template-gap .wp-block-post-template.column-4 > .wp-block-post,
    body:not(.editor-styles-wrapper) .{{theme_slug}}-post-template-gap .wp-block-post-template.columns-4 > .wp-block-post {
        width: calc(25%)!important;
    }

    body:not(.editor-styles-wrapper) .{{theme_slug}}-post-template-gap .wp-block-post-template.column-5 > .wp-block-post,
    body:not(.editor-styles-wrapper) .{{theme_slug}}-post-template-gap .wp-block-post-template.columns-5 > .wp-block-post {
        width: calc(20%)!important;
    }

    body:not(.editor-styles-wrapper) .{{theme_slug}}-post-template-gap .wp-block-post-template.column-6 > .wp-block-post,
    body:not(.editor-styles-wrapper) .{{theme_slug}}-post-template-gap .wp-block-post-template.columns-6 > .wp-block-post {
        width: calc(16.66667%)!important;
    }

}`;