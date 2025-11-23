import { saveTodos } from './saveTodos.js';
import { updateCounter } from './updateCounter.js';

// Function per ricreare la lista nel DOM basandosi sull'array 'todos'
export const renderTodos = (todos, ulElement) => {
    ulElement.className = "space-y-3"
    // Pulisci ul
    ulElement.innerHTML = "";

    // MESSAGGIO SE LISTA VUOTA
    if (todos.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = `
        text-center py-12 px-4
        bg-gradient-to-r from-purple-50 to-pink-50
        rounded-xl border-2 border-dashed border-purple-200
        `;

        emptyMessage.innerHTML = `
        <div class="text-6xl mb-4">🎉</div>
        <p class="text-xl font-semibold text-gray-700 mb-2">
            Nessuna attività!
        </p>
        <p class="text-gray-500">
            Inizia ad aggiungerne una qui sopra ☝️
        </p>
        `;

        ulElement.appendChild(emptyMessage);

        return; // Esce dalla funzione
    }

    // forEach per creare li e i vari buttons con i loro eventListener
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        const buttonDelete = document.createElement('button');
        const buttonComplete = document.createElement('button');

        // STILE DEL LI (item della lista)
        li.className = `
        todo-item
        flex items-center justify-between gap-3 
        p-4 bg-gray-50 rounded-lg border-2 border-gray-200
        hover:shadow-md transition-all
        ${todo.completed ? 'opacity-60 bg-green-50 border-green-200' : ''}
        `;

        // Testo del todo
        const span = document.createElement('span');
        span.textContent = todo.text;

        span.className = `
        flex-1 text-gray-800
        ${todo.completed ? 'line-through text-gray-500' : ''};
        `;

        // Aggiungiamo dentro all'elemento il testo dell'oggetto todo (todos)
        li.appendChild(span);

        // BUTTON COMPLETA (checkbox)
        buttonComplete.textContent = todo.completed ? "✅" : "⭕";
        buttonComplete.className = `
        px-3 py-2 text-xl
        bg-green-100 hover:bg-green-200
        rounded-lg transition-all
        hover:scale-110 active:scale-95
        `;

        // BUTTON CANCELLA (trash)
        buttonDelete.textContent = "🗑️";
        buttonDelete.className = `
        px-3 py-2 text-xl
        bg-red-100 hover:bg-red-200
        rounded-lg transition-all
        hover:scale-110 active:scale-95
        `;

        li.appendChild(buttonComplete);
        li.appendChild(buttonDelete);

        ulElement.appendChild(li);

        // --- Listener CANCELLA ---
        buttonDelete.addEventListener('click', () => {
            // Rimuove l'elemento dall'array centrale 'todos' usando l'indice
            todos.splice(index, 1);

            saveTodos(todos);
            renderTodos(todos, ulElement);
        });

        // --- Listener COMPLETA ---
        buttonComplete.addEventListener('click', () => {
            todo.completed = !todo.completed;

            saveTodos(todos);
            renderTodos(todos, ulElement);
            updateCounter(todos);
        });
    });
};