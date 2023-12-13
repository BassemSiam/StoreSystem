//get total
//create prodecut
//save on localstorge
//clear input data
//read
//count
//delete 
//update
//search
//validation clean data


let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let sumbit = document.getElementById('sumbit');
let categorySelect = document.getElementById('categorySelect');
let addCategory = document.getElementById('addCategory');
let Search = document.getElementById('Search');
let input = document.getElementById('input');

let mood = 'create';
let tempI;
let searchMood = 'title';


//when reload the page go throw the top page
// window.onload =window.location.href='#firstPage'

function deleteData(i) {
    var result = confirm(`Are you sure you want to delete Product ${dataPro[i].title.toUpperCase()} ?`);
    if (result) {
        // Perform the delete operation
        dataPro.splice(i, 1);
        localStorage.product = JSON.stringify(dataPro);
        showData();
    } else {
        // Cancel the delete operation
    }
}

function showData() {
    getTotal();
    let table = '';

    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick= "updateData(${i})" id='update'>Update</button></td>
        <td><button onclick= "deleteData(${i})" id="Delete">Delete</td>
        </tr> `

    }
    document.getElementById('tbody').innerHTML = table;

    let deletBtn = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        deletBtn.innerHTML = `<button onclick = "deleteAll()">Delete All (${dataPro.length})</button>`
    } else {
        deletBtn.innerHTML = ''
    }

}

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    categorySelect.value = document.getElementById('defult').value
}

function selectCategory() {
    document.getElementById('category').value = categorySelect.value;
    ;

}

function getTotal() {
    if (price.value != '') {
        let reuslt = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = reuslt;
        total.style.background = 'green'
    } else {
        total.innerHTML = '0';
        total.style.background = '#991818'


    }
    if ((price.value || taxes.value || ads.value || discount.value) < 0) {

        alert('please enter postive numebr')
    }

}

function deleteAll() {
    var result = confirm("Are you sure you want to delete all product?");
    if (result) {
        localStorage.clear()
        dataPro.splice(0)
        showData();
    } else {

    }

}

function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    categorySelect.value = dataPro[i].category;
    category.value = categorySelect.value
    count.style.display = 'none'
    sumbit.innerText = 'Update'
    sumbit.style.background = '#e56814'
    mood = 'update'
    tempI = i;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    getTotal()


}

function getSearchMood(id) {
    if (id == 'searchTitle') {
        searchMood = 'title'
    } else {
        searchMood = 'Category'
    }


    if (searchMood == 'title') {
        document.getElementById('searchTitle').style.transform = 'scale(1.1)';
        document.getElementById('searchTitle').style.background = '#042414';

        document.getElementById('searchCategory').style.transform = 'none';
        document.getElementById('searchCategory').style.background = '#11492f';
        
    } else {
        document.getElementById('searchCategory').style.transform = 'scale(1.1)';
        document.getElementById('searchCategory').style.background = '#042414';

        document.getElementById('searchTitle').style.transform = 'none';
        document.getElementById('searchTitle').style.background = '#11492f';
        
    }
    
    Search.focus();
    Search.placeholder = `Search by ${searchMood} `;
    Search.value=''
    showData()
}

function searchData(value) {
    let table ='';
    if (searchMood == 'title') {

        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {

        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick= "updateData(${i})" id='update'>Update</button></td>
        <td><button onclick= "deleteData(${i})" id="Delete">Delete</td>
        </tr> `
            }
            

        }
    }
    else {
        
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {

        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick= "updateData(${i})" id='update'>Update</button></td>
        <td><button onclick= "deleteData(${i})" id="Delete">Delete</td>
        </tr> `
            }
            

        }
    }
    document.getElementById('tbody').innerHTML = table;

}

let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}


sumbit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(title.value != '' &&
     price.value !='' &&
      category.value !='' ){
        if (mood === 'create') {
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {

                dataPro.push(newPro);

            }
        } else {

            dataPro.push(newPro);
        }
        clearData()

    } else {
        dataPro[tempI] = newPro;
        mood = 'create'
        // window.location.href='#tbody'
        // window.scrollTo({top:30 ,left:0,behavior:'smooth'});
        sumbit.innerText = 'Create'
        count.style.display = 'flex'
        sumbit.style.background = '#11492f'
        title.ariaRequired;



    }

    }
    


    localStorage.setItem('product', JSON.stringify(dataPro));
   
    showData()

}

showData()
