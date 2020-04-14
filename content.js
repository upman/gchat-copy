function addStyle() {
    var styleElement = document.createElement('style', { type: 'text/css'});
    styleElement.appendChild(document.createTextNode(`
        .gchat-xtra-copy {
            margin-left: 4px;
            border: 1px solid #dadce0;
            background-color: transparent;
            border-radius: 12px;
            box-sizing: border-box;
            font-family: 'Google Sans',Arial,sans-serif;
            font-size: .875rem;
            font-weight: 500;
            line-height: 1.25rem;
            color: #1967d2;
            padding: 0 12px;
            height: 24px;
            display: inline-flex;
            align-items: center;
            cursor: pointer;
        }

        .gchat-xtra-copy:hover {
            border-color: transparent;
            box-shadow: 0 1px 2px 0 rgba(60,64,67,0.30), 0 1px 3px 1px rgba(60,64,67,0.15);
        }

        .gchat-xtra-copy:active {
            background-color: rgba(26,115,232,0.122)
        }

        .gchat-xtra-copy[data-tooltip] {
            position: relative;
        }

        /* Base styles for the entire tooltip */
        .gchat-xtra-copy[data-tooltip]:before,
        .gchat-xtra-copy[data-tooltip]:after {
            position: absolute;
            visibility: hidden;
            opacity: 0;
            transition:
                opacity 0.2s ease-in-out,
                visibility 0.2s ease-in-out,
                transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
            transform:         translate3d(0, 0, 0);
            pointer-events: none;
        }

        /* Show the entire tooltip on hover and focus */
        .gchat-xtra-copy[data-tooltip]:hover:before,
        .gchat-xtra-copy[data-tooltip]:hover:after,
        .gchat-xtra-copy[data-tooltip]:focus:before,
        .gchat-xtra-copy[data-tooltip]:focus:after {
            visibility: visible;
            opacity: 1;
        }

        /* Base styles for the tooltip's directional arrow */
        .gchat-xtra-copy[data-tooltip]:before {
            z-index: 1001;
            border: 6px solid transparent;
            background: transparent;
            content: "";
        }

        /* Base styles for the tooltip's content area */
        .gchat-xtra-copy[data-tooltip]:after {
            z-index: 1000;
            padding: 8px;
            background-color: #000;
            background-color: hsla(0, 0%, 20%, 0.9);
            color: #fff;
            content: attr(data-tooltip);
            font-size: 14px;
            line-height: 1.2;
        }

        /* Directions */

        /* Top (default) */
        .gchat-xtra-copy[data-tooltip]:before,
        .gchat-xtra-copy[data-tooltip]:after {
            bottom: 100%;
            left: 50%;
        }

        .gchat-xtra-copy[data-tooltip]:before {
            margin-left: -6px;
            margin-bottom: -12px;
            border-top-color: #000;
            border-top-color: hsla(0, 0%, 20%, 0.9);
        }

        /* Horizontally align top/bottom tooltips */
        .gchat-xtra-copy[data-tooltip]:after {
            margin-left: -30px;
        }

        .gchat-xtra-copy[data-tooltip]:hover:before,
        .gchat-xtra-copy[data-tooltip]:hover:after,
        .gchat-xtra-copy[data-tooltip]:focus:before,
        .gchat-xtra-copy[data-tooltip]:focus:after {
            -webkit-transform: translateY(-12px);
            -moz-transform:    translateY(-12px);
            transform:         translateY(-12px);
        }
    `));

    document.head.appendChild(styleElement);
}

function main() {
    var scrollContainer = document.querySelector('c-wiz[data-group-id][data-is-client-side] > div:nth-child(1)');
    document.querySelectorAll("c-wiz[data-topic-id]")
        .forEach(
            function(e,t,i){
                var copy = e.querySelector('.gchat-xtra-copy');
                if(e.getAttribute("data-topic-id") && !copy){
                    var copyButton = document.createElement("div");
                    copyButton.className="gchat-xtra-copy";
                    copyButton.innerHTML = `
                        Copy thread link
                    `;
                    copyButton.addEventListener('click', function() {
                        const el = document.createElement('textarea');
                        el.value = window.location.href+"/"+e.getAttribute("data-topic-id");
                        document.body.appendChild(el);
                        el.select();
                        document.execCommand('copy');
                        document.body.removeChild(el);

                        copyButton.setAttribute('data-tooltip', 'Copied');
                        setTimeout(function() {
                            copyButton.removeAttribute('data-tooltip');
                        }, 1000);
                    });

                    var buttonContainer = e.querySelector('div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > span:nth-of-type(1)');
                    if (
                        buttonContainer &&
                        buttonContainer.children.length === 2 &&
                        buttonContainer.children[0].tagName === 'SPAN' &&
                        buttonContainer.children[1].tagName === 'SPAN'
                    ) {
                        buttonContainer.style = 'display: inline-block;';

                        buttonContainer.parentElement.style = 'display: inline-block; width: unset; opacity: 1;';
                        buttonContainer.parentElement.parentElement.appendChild(copyButton);
                        scrollContainer.scrollTop += 72;
                        buttonContainer.parentElement.parentElement.parentElement.parentElement.style = 'padding: 56px 0;';
                    }
                }
            }
        );
}

function debounce(fn, delay) {
    var timeout = null;
    return function() {
        if(timeout) {
            return;
        } else {
            timeout = setTimeout(function() {
                fn();
                timeout = null;
            }, delay);
        }
    }
}

addStyle();
main();
var el = document.documentElement;
el.addEventListener('DOMSubtreeModified', debounce(main, 1000));
