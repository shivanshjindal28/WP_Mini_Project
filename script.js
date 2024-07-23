document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalAmount = document.getElementById('total-amount');

    let expenses = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const expenseName = expenseNameInput.value;
        const expenseAmount = parseFloat(expenseAmountInput.value);

        if (expenseName && !isNaN(expenseAmount)) {
            const expense = { id: Date.now(), name: expenseName, amount: expenseAmount };
            expenses.push(expense);
            addExpenseToList(expense);
            updateTotalAmount();
            expenseNameInput.value = '';
            expenseAmountInput.value = '';
        }
    });

    function addExpenseToList(expense) {
        const li = document.createElement('li');
        li.innerHTML = `${expense.name} - $${expense.amount.toFixed(2)} <span data-id="${expense.id}">&times;</span>`;
        expenseList.appendChild(li);
    }

    function updateTotalAmount() {
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            const id = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== id);
            e.target.parentElement.remove();
            updateTotalAmount();
        }
    });
});
