import { celebrateCompletion } from './celebrateCompletion.js';

export const updateCounter = (todos) => {
    const counter = document.getElementById('todoCounter');
    if (!counter) return;

    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const remaining = total - completed;

    let message = '';
    let emoji = '';

    if (total === 0) {
        counter.style.display = 'none';
        
        return;
    }

    counter.style.display = 'block';

    if (remaining === 0) {
        emoji = '🎉';
        message = `Complimenti! Hai completato tutte le ${total} attività!`;
        counter.className = 'mb-4 p-3 bg-green-50 rounded-lg border border-green-200';
        counter.innerHTML = `<p class="text-sm text-green-700 font-medium text-center">${emoji} ${message}</p>`;

        // CELEBRAZIONE! 🎊
        celebrateCompletion();
    } else {
        emoji = '📊';
        message = `${remaining} da completare su ${total} totali`;
        counter.className = 'mb-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200';
        counter.innerHTML = `<p class="text-sm text-indigo-700 font-medium text-center">${emoji} ${message}</p>`;
    }
};