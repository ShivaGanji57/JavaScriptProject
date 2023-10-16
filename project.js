var form=document.getElementById('addForm');
form.addEventListener('submit',storeLocal)

function storeLocal(e){
    e.preventDefault()
    let myObj={
        expenseAmount:document.getElementById('ExpenseAmount').value,
        description:document.getElementById('Description').value,
        category:document.getElementById('category').value,
        expenseId:document.getElementById('expenseId').value
    }
    // let key=document.getElementById('ExpenseAmount').value+document.getElementById('Description').value+document.getElementById('category').value
    // localStorage.setItem(key,JSON.stringify(myObj))
    axios.
        post("http://localhost:3000/expense",myObj).
        then(res=>showOnScreen(res.data)).
        catch(err=>console.log(err));
}
window.addEventListener("DOMContentLoaded",()=>{
    axios.
    get("http://localhost:3000/expense").
    then(res=>{
        for(var i=0;i<res.data.length;i++){
            showOnScreen(res.data[i])
        }
    }).
    catch(err=>console.log(err))
})
function showOnScreen(obj){
    const parentElement=document.getElementById('list-expense')
    var li=document.createElement('li')
    li.textContent=obj.id+' - '+obj.expenseAmount+' - '+obj.expenseDescription+' - '+obj.category
    var deleteBtn=document.createElement('input')
    deleteBtn.type='button'
    deleteBtn.value='delete'
    var editBtn=document.createElement('input')
    editBtn.type='button'
    editBtn.value='edit'
    deleteBtn.onclick=()=>{
        axios.
            delete(`http://localhost:3000/expense/${obj.id}`).
            then(result=>console.log(result)).
            catch(err=>console.log(err))
        parentElement.removeChild(li)
    }
    editBtn.onclick=()=>{
        parentElement.removeChild(li)
        document.getElementById('expenseId').value=obj.id
        document.getElementById('ExpenseAmount').value=obj.expenseAmount
            document.getElementById('Description').value=obj.expenseDescription
            document.getElementById('category').value=obj.category
            axios.
            delete(`http://localhost:3000/expense/${obj.id}`).
            then(result=>console.log(result)).
            catch(err=>console.log(err))
    }
    li.appendChild(deleteBtn)
    li.appendChild(editBtn)
    parentElement.appendChild(li)
}