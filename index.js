import { saveTodos } from './utils/saveTodos.js';
import { renderTodos } from './utils/renderTodos.js';
import { updateCounter } from './utils/updateCounter.js';

document.addEventListener('DOMContentLoaded', (e) => {
    const container = document.getElementById('container');

    const input = document.getElementById("inputTodo");

    const ul = document.createElement('ul');
    container.appendChild(ul);

    const button = document.getElementById('button');

    // Variabile todos salvata in localStorage
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');


    // Function per aggiornare tutto
    const updateApp = () => {
        saveTodos(todos); // Salva l'array aggiornato
        renderTodos(todos, ul); // Aggiorna il DOM
        updateCounter(todos);
    };

    // ===================================
    // LISTENER AGGIUNGI
    // ===================================
    button.addEventListener('click', () => {
        const text = input.value.trim();

        if (!text) return;

        // Aggiunge un nuovo oggetto {text, completed: false} all'array
        todos.push({ text: text, completed: false });

        input.value = "";

        updateApp();
    });

    // LISTENER AGGIUNGI con ENTER -- per simulare il click con il button -- 
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') button.click();
    })

    // Render iniziale
    renderTodos(todos, ul);
    updateCounter(todos);
});