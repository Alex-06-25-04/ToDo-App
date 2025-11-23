// Function per salvare l'array 'todos' in LocalStorage
export const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};