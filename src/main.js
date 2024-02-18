/* GLOBLE VALUE */
var budget;

/* MODEL  JSON*/
const object_data = {
  budget_amount: 0,
  total_expenses: 0,
  balance: 0,
  expenses: []
};
/* INPUTS */
const input_budget = document.querySelector("#budget-input");
const input_expense = document.querySelector("#expense-input");
const input_expense_desc = document.querySelector("#expense-description");

/* BUTTONS */
const btn_calcultate = document.querySelector("#calculate");
const btn_add_expense = document.querySelector("#add-expense");

/* CALCULATE VALUES */
const budget_amount = document.querySelector("#budget-amount");
const expenses_amount = document.querySelector("#expenses-amount");
const balance_amount = document.querySelector("#balance-amount");

/* INITIALIZE LOCAL-STORAGE */
if (localStorage.getItem("budget")) {
    budget = JSON.parse(localStorage.getItem("budget"));
    setValues();
  } else {
    localStorage.setItem("budget", JSON.stringify(object_data));
    budget = object_data;
  }
  
 // btn_calcultate.addEventListener("click", addBudget, false);
  btn_add_expense.addEventListener("click", addExpense, false);
  
/* VALIDATIONS FOR BUTTON TO ADD A BUDGET VALUE */
function addBudget() {
  //  const input_budget = document.getElementById("budget-input");
    console.log(input_budget.value);
    if (input_budget.value === "") {
        alert("Please set a budget value");
    } else {
        calculate(false);
      }
  }

/* VALIDATIONS FOR BUTTON TO ADD AN EXPENSE VALUE */
function addExpense() {
    if (input_expense.value === "" || input_expense_desc.value === "") {
        alert("Please set a description and value");
    } else {
      budget.expenses.push({
        title: input_expense_desc.value,
        value: input_expense.value
      });

      console.log(budget.expenses);

      calculate(true);
    }
  }

  function calculate(val) {
    if (!val) {
      budget.budget_amount = input_budget.value;
    }
    budget.total_expenses = calculateExpenses();
    console.log(budget.total_expenses);

    budget.balance = budget.budget_amount - budget.total_expenses;

    localStorage.setItem("budget", JSON.stringify(budget));
    setValues();
  }

  /* SETTING THE VALUES FOR LOCAL-STORAGE */
function setValues() {
    budget_amount.innerHTML = `$ ${budget.budget_amount}`; // 1
    expenses_amount.innerHTML = `$ ${budget.total_expenses}`; // 2
    balance_amount.innerHTML = `$ ${budget.balance}`;
   
    input_budget.value = ""; // 1
    input_expense_desc.value = "";
    input_expense.value = "";
    
    showListExpenses();

  }

  function calculateExpenses() {
    let total = 0;
    if (budget.expenses) {
      for (let item of budget.expenses) {
        total += parseInt(item.value);
      }
    }
    return total;
  }


  /* FUNCTION TO CREATE A LIST OF ALL EXPENSES */
function showListExpenses() {
	let content = 
		`<tr>
        <th>Expense Title</th>
		<th>Expense Value</th>
		<th>Actions</th>
		</tr>`;

	// Loop to access all rows 
	for (let i= 0; i < budget.expenses.length; i++ ) {
		content += `<tr> 
	  <td>${budget.expenses[i].title} </td>
	  <td>${budget.expenses[i].value}</td>
	  <td>
      <button class="edit-button" id="${i}">Edit</button>
      <button class="delete-button" id="${i}">Delete</button>
      </td> 
     </tr>`;
	}
    let el = document.querySelector("#expenses-list");
    el.innerHTML = content;
  
    setEvents();
  }
  
  function setEvents() {
    const editButtons = document.querySelectorAll(".edit-button");
    const deleteButtons = document.querySelectorAll(".delete-button");
  
    editButtons.forEach(item => {
      item.addEventListener("click", editExpense, false);
    });
    deleteButtons.forEach(item => {
      item.addEventListener("click", deleteExpense, false);
    });
  }
  
  function editExpense(e) {
    let id = e.target.id;
    let title = budget.expenses[id].title;
    let value = budget.expenses[id].value;
    budget.expenses.splice(id, 1);
    console.log(id);
   // calculate(true);
    input_expense_desc.value = title;
    input_expense.value = value;
  }
  
  function deleteExpense(e) {
    let id = e.target.id;
    budget.expenses.splice(id, 1);
    calculate(true);
  }
  