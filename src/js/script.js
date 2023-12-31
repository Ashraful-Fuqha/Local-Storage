const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const input = document.querySelector('input[type=text]')
const clearButton = document.querySelector('.clearButton');
const selectAllButton = document.querySelector('#selectAllButton')

const items = JSON.parse(localStorage.getItem('items')) || [];

console.log(items)

function addBiriyani(e){
    e.preventDefault();
    // console.log(e)
    const text = (this.querySelector('[name=item]')).value;
    const biryani = {
        text,
        done : false
    }

    items.push(biryani)
    populateList(items, itemsList)
    localStorage.setItem('items', JSON.stringify(items))
    this.reset()
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join('');
}

function clearList(e){
    // localStorage.removeItem('items') // Removes a target key but available after reload
    localStorage.clear() // Remove every key value pair if any and not available afer reload
    if(input.value.trim() == ''){
        return itemsList.innerHTML = 
        `
        <ul class="plates">
        <li>Please Enter a Dish...</li>
        </ul>
        ` 
    }
}

function selectAll() {
    const checkboxs = document.querySelectorAll('input[type=checkbox]:not(#selectAllButton)')
    let listBoolean = [];
    checkboxs.forEach(checkbox => checkbox.addEventListener('change', () => {
        checkboxs.forEach(cbx => {
            listBoolean.push(cbx.checked);
        })
        if(listBoolean.includes(false)){
            selectAllButton.checked = false
            // console.log(listBoolean)
        } else {
            selectAllButton.checked = true
        }
        listBoolean = [];
    }))
}
function checkbox(e){
    const checkboxs = document.querySelectorAll('input[type=checkbox]:not(#selectAllButton)')
    if(this.checked){
        checkboxs.forEach((checkbox, index) => {
            checkbox.checked = true;
            items[index].done = true; // set done property to true
        })
    } else {
        checkboxs.forEach((checkbox, index) => {
            checkbox.checked = false;
            items[index].done = false; // set done property to false
        })
    }
    localStorage.setItem('items', JSON.stringify(items)); // update local storage
    populateList(items, itemsList); // update the list
}

function toggleDone(e){
    if(!e.target.matches('input')) return; //Nothing happened when clicked on  label and Other things, this is called event delegation i.e, targeting the child element by adding eventlistener on parent element

    console.log(e.target)
    const child = e.target;
    const index = child.dataset.index;

    items[index].done = !items[index].done // If Checked it'll be unchecked and vice-versa

    localStorage.setItem('items', JSON.stringify(items))
    populateList(items,itemsList);
}


addItems.addEventListener('submit', addBiriyani);
itemsList.addEventListener('click',toggleDone)
selectAllButton.addEventListener('change', checkbox)//Used to check all if selectALl is clicked i.e, checked and vice-versa and also to set the state in localstorage
clearButton.addEventListener('click',clearList)
window.addEventListener('click', selectAll)//Used to check or uncheck if anyone of checkboxes are checked or unchecked(EventListener is added to window to listen for any click on the checkboxes i.e, Event Delegation)
populateList(items,itemsList)