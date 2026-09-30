function requireElement<T extends Element>(scope: ParentNode, selector: string): T {
  const element = scope.querySelector<T>(selector);
  if (element === null) throw new Error(`SiteHeader: missing element "${selector}"`);
  return element;
}

/** Menú mobile: burger, cierre con Escape, con click afuera y al elegir un link. */
function initMenu(header: HTMLElement): void {
  const burger = requireElement<HTMLButtonElement>(header, '.burger');
  const menu = requireElement<HTMLElement>(header, '.site-nav');

  function setOpen(open: boolean): void {
    header.dataset['open'] = String(open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }

  setOpen(false);
  burger.addEventListener('click', (event) => {
    event.stopPropagation();
    setOpen(header.dataset['open'] !== 'true');
  });
  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !menu.contains(event.target) && !burger.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.dataset['open'] === 'true') {
      setOpen(false);
      burger.focus();
    }
  });
  menu.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a') !== null) setOpen(false);
  });
}

document.querySelectorAll<HTMLElement>('[data-site-header]').forEach(initMenu);
