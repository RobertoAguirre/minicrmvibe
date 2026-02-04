export function renderEmpty() {
  return `
    <div class="rounded-xl border border-red-200 bg-white/80 backdrop-blur p-8 text-center text-red-600 shadow-sm">
      No hay contactos. Añade uno abajo.
    </div>
  `;
}

export function renderList(contacts, onEdit, onDelete) {
  if (!contacts?.length) return renderEmpty();
  return `
    <ul class="divide-y divide-red-100 rounded-xl border border-red-200 bg-white/80 backdrop-blur overflow-hidden shadow-sm">
      ${contacts
        .map(
          (c) => `
        <li class="flex items-center justify-between gap-4 px-4 py-3 hover:bg-red-50/80 transition-colors">
          <div class="min-w-0 flex-1">
            <p class="font-medium text-red-900 truncate">${escapeHtml(c.nombre)}</p>
            <p class="text-sm text-red-600 truncate">${escapeHtml(c.email)} ${c.empresa ? `· ${escapeHtml(c.empresa)}` : ''}</p>
          </div>
          <div class="flex gap-2 shrink-0">
            <button type="button" data-edit="${c._id}" class="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors">Editar</button>
            <button type="button" data-delete="${c._id}" class="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">Eliminar</button>
          </div>
        </li>
      `
        )
        .join('')}
    </ul>
    <div class="mt-2 flex justify-end">
      <p class="text-sm text-red-600">${contacts.length} contacto${contacts.length !== 1 ? 's' : ''}</p>
    </div>
  `;
}

export function renderDashboardModal(stats) {
  const { total, withCompany, recent } = stats;
  return `
    <div id="dashboard-backdrop" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Dashboard">
      <div id="dashboard-panel" class="rounded-xl border border-red-200 bg-white shadow-xl max-w-md w-full max-h-[90vh] overflow-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-red-800">Dashboard</h2>
            <button type="button" id="dashboard-close" class="rounded-lg p-1.5 text-red-600 hover:bg-red-100 transition-colors" aria-label="Cerrar">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="rounded-lg bg-red-50 border border-red-100 p-4">
              <p class="text-2xl font-semibold text-red-700">${total}</p>
              <p class="text-sm text-red-600">Total contactos</p>
            </div>
            <div class="rounded-lg bg-blue-50 border border-blue-100 p-4">
              <p class="text-2xl font-semibold text-blue-700">${withCompany}</p>
              <p class="text-sm text-blue-600">Con empresa</p>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-medium text-red-700 mb-2">Últimos contactos</h3>
            ${recent.length ? `
              <ul class="space-y-2">
                ${recent.map((c) => `
                  <li class="rounded-lg border border-red-100 bg-red-50/50 px-3 py-2 text-sm">
                    <p class="font-medium text-red-900 truncate">${escapeHtml(c.nombre)}</p>
                    <p class="text-red-600 truncate text-xs">${escapeHtml(c.email)}</p>
                  </li>
                `).join('')}
              </ul>
            ` : '<p class="text-sm text-red-500">Sin contactos recientes</p>'}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderForm(contact, onSubmit, onCancel) {
  const isEdit = !!contact;
  const html = `
    <div class="rounded-xl border border-red-200 bg-white/80 backdrop-blur p-6 shadow-sm">
      <h2 class="text-lg font-medium text-red-800 mb-4">${isEdit ? 'Editar contacto' : 'Nuevo contacto'}</h2>
      <form id="contact-form" class="space-y-4">
        <div>
          <label for="nombre" class="block text-sm font-medium text-red-700 mb-1">Nombre</label>
          <input type="text" id="nombre" name="nombre" required
            value="${contact ? escapeHtml(contact.nombre) : ''}"
            class="w-full rounded-lg border border-red-200 px-3 py-2 text-red-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30" />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-red-700 mb-1">Email</label>
          <input type="email" id="email" name="email" required
            value="${contact ? escapeHtml(contact.email) : ''}"
            class="w-full rounded-lg border border-red-200 px-3 py-2 text-red-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="telefono" class="block text-sm font-medium text-red-700 mb-1">Teléfono</label>
            <input type="text" id="telefono" name="telefono" value="${contact?.telefono ?? ''}"
              class="w-full rounded-lg border border-red-200 px-3 py-2 text-red-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30" />
          </div>
          <div>
            <label for="empresa" class="block text-sm font-medium text-red-700 mb-1">Empresa</label>
            <input type="text" id="empresa" name="empresa" value="${contact?.empresa ?? ''}"
              class="w-full rounded-lg border border-red-200 px-3 py-2 text-red-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30" />
          </div>
        </div>
        <div>
          <label for="domicilio" class="block text-sm font-medium text-red-700 mb-1">Domicilio</label>
          <input type="text" id="domicilio" name="domicilio" value="${contact?.domicilio ?? ''}"
            class="w-full rounded-lg border border-red-200 px-3 py-2 text-red-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30" />
        </div>
        <div>
          <label for="notas" class="block text-sm font-medium text-red-700 mb-1">Notas</label>
          <textarea id="notas" name="notas" rows="2" class="w-full rounded-lg border border-red-200 px-3 py-2 text-red-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30">${contact?.notas ?? ''}</textarea>
        </div>
        <div class="flex gap-2 pt-2">
          <button type="submit" class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors">
            ${isEdit ? 'Guardar' : 'Añadir'}
          </button>
          ${isEdit ? `<button type="button" id="cancel-btn" class="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 transition-colors">Cancelar</button>` : ''}
        </div>
      </form>
    </div>
  `;
  return html;
}

export function bindListEvents(root, onEdit, onDelete) {
  if (!root) return;
  root.querySelectorAll('[data-edit]').forEach((btn) => {
    btn.addEventListener('click', () => onEdit(btn.dataset.edit));
  });
  root.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', () => onDelete(btn.dataset.delete));
  });
}

export function bindFormEvents(root, onSubmit, onCancel) {
  if (!root) return;
  const form = root.querySelector('#contact-form');
  const cancelBtn = root.querySelector('#cancel-btn');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      onSubmit({
        nombre: fd.get('nombre'),
        email: fd.get('email'),
        telefono: fd.get('telefono') || undefined,
        empresa: fd.get('empresa') || undefined,
        notas: fd.get('notas') || undefined,
      });
    });
  }
  if (cancelBtn) cancelBtn.addEventListener('click', onCancel);
}

function escapeHtml(s) {
  if (s == null) return '';
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}
