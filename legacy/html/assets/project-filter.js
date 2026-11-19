const projectButtons = document.querySelectorAll('[data-project-filter]');
const projectCards = document.querySelectorAll('[data-project-group]');

projectButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selected = button.dataset.projectFilter;
        projectButtons.forEach((item) => {
            item.setAttribute('aria-pressed', String(item === button));
        });
        projectCards.forEach((card) => {
            card.hidden = card.dataset.projectGroup !== selected;
        });
    });
});

if (new URLSearchParams(window.location.search).get('view') === 'beyond') {
    document.querySelector('[data-project-filter="beyond"]')?.click();
}
