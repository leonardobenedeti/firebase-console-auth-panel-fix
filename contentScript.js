const css = `
@media only screen and (min-width: 1240px) {
    .c5e-nav-expanded mat-grid, .c5e-nav-expanded [mat-grid] {
        width: unset !important;
    }
}

[_nghost-ng-c4129349126] .users-page-content[_ngcontent-ng-c4129349126] mat-card[_ngcontent-ng-c4129349126] {
    max-width: none !important;
}
`;

function insertStyle() {
    if (document.head.querySelector('style[data-name="firebase-auth-panel-fix"]')) return;
    const style = document.createElement('style');
    style.setAttribute('data-name', 'firebase-auth-panel-fix');
    style.textContent = css;
    document.head.appendChild(style);
}

insertStyle();

const observer = new MutationObserver(() => insertStyle());
observer.observe(document.documentElement, { childList: true, subtree: true });

(function(history){
    const pushState = history.pushState;
    history.pushState = function(){
        const res = pushState.apply(this, arguments);
        setTimeout(insertStyle, 50);
        return res;
    };
    const replaceState = history.replaceState;
    history.replaceState = function(){
        const res = replaceState.apply(this, arguments);
        setTimeout(insertStyle, 50);
        return res;
    };
})(window.history);

window.addEventListener('popstate', () => setTimeout(insertStyle, 50));