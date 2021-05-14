// Web Components: Extending Native Elements, A working example

import CustomVideoElement from 'custom-video-element';
import THEOplayer from 'theoplayer';

class THEOplayerVideoElement extends CustomVideoElement {
    constructor() {
        super();
    }

    get src() {
        // Use the attribute value as the source of truth.
        // No need to store it in two places.
        // This avoids needing a to read the attribute initially and update the src.
        return this.getAttribute('src');
    }

    set src(val) {
        // If being set by attributeChangedCallback,
        // dont' cause an infinite loop
        if (val !== this.src) {
            this.setAttribute('src', val);
        }
    }

    load() {
        const container = document.createElement('div');
        this.nativeEl.replaceWith(container);
        this.player = new THEOplayer.ChromelessPlayer(container, {
            libraryLocation: '/node_modules/theoplayer/'
        })
        this.player.src = this.src;
    }

    play() {
        return this.player.play();
    }

    pause() {
        return this.player.pause();
    }

    connectedCallback() {
        this.load();
    }
}

if (!window.customElements.get('theoplayer-video')) {
    window.customElements.define('theoplayer-video', THEOplayerVideoElement);
    window.THEOplayerVideoElement = THEOplayerVideoElement;
}

export default THEOplayerVideoElement;