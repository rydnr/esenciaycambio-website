(() => {
  const button = document.querySelector('[data-copy-email]');
  if (!button) return;

  const status = document.querySelector('.copy-status');
  const emailLink = document.querySelector('.contact-email');
  button.hidden = false;

  const copyFallback = (text) => {
    const field = document.createElement('textarea');
    const activeElement = document.activeElement;
    field.value = text;
    field.setAttribute('readonly', '');
    field.setAttribute('aria-label', 'Dirección de correo');
    field.style.position = 'fixed';
    field.style.inset = '0 auto auto -9999px';
    document.body.append(field);
    let copied = false;
    try {
      field.select();
      copied = document.execCommand('copy');
    } finally {
      field.remove();
      activeElement?.focus({ preventScroll: true });
    }
    return copied;
  };

  button.addEventListener('click', async () => {
    if (button.disabled) return;
    button.disabled = true;
    status.textContent = '';
    try {
      const text = button.dataset.copyEmail;
      let copied = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          copied = true;
        }
      } catch {
        // Local files and some browsers restrict the Clipboard API.
      }
      if (!copied) copied = copyFallback(text);
      if (!copied) throw new Error('Clipboard unavailable');
      status.textContent = 'Dirección copiada.';
    } catch {
      const selection = window.getSelection();
      if (emailLink && selection) {
        const range = document.createRange();
        range.selectNodeContents(emailLink);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      status.textContent = 'Puedes copiar la dirección seleccionada.';
    } finally {
      button.disabled = false;
    }
  });
})();
