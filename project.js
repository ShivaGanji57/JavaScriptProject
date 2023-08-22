var form=document.getElementById('addForm');
form.addEventListener('submit',storeLocal)

function storeLocal(e){
    e.preventDefault()
    let myObj={
        expenseAmount:document.getElementById('ExpenseAmount').value,
        description:document.getElementById('Description').value,
        category:document.getElementById('category').value
    }
    let key=document.getElementById('ExpenseAmount').value+document.getElementById('Description').value+document.getElementById('category').value
    localStorage.setItem(key,JSON.stringify(myObj))
    showOnScreen(myObj)
}
function showOnScreen(obj){
    const parentElement=document.getElementById('list-expense')
    var li=document.createElement('li')
    var key1=obj.expenseAmount+obj.description+obj.category
    li.textContent=localStorage.getItem(key1)
    var deleteBtn=document.createElement('input')
    deleteBtn.type='button'
    deleteBtn.value='delete'
    var editBtn=document.createElement('input')
    editBtn.type='button'
    editBtn.value='edit'
    deleteBtn.onclick=()=>{
        localStorage.removeItem(key1)
        parentElement.removeChild(li)
    }
    editBtn.onclick=()=>{
        localStorage.removeItem(key1)
        parentElement.removeChild(li)
        li.textContent=localStorage.getItem(key1)
    }
    li.appendChild(deleteBtn)
    li.appendChild(editBtn)
    parentElement.appendChild(li)
}