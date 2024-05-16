var animals = [
    { 'name': 'cat1', 'price': 200, 'category': 'cat', 'img': 'cat1.jpg', 'comment':'cool!'},
    { 'name': 'cat2', 'price': 320, 'category': 'cat', 'img': 'cat2.jpg', 'comment':'small!' },
    { 'name': 'cat3', 'price': 400, 'category': 'cat', 'img': 'cat3.jpg', 'comment':'bad!' },
    { 'name': 'animal1', 'price': 510, 'category': 'animal', 'img': 'animal1.jpg', 'comment':'danger!' },
    { 'name': 'animal2', 'price': 652, 'category': 'animal', 'img': 'animal2.jpg', 'comment':'good!' },
];
var LatestPostIndex;
var randomNumber

function takeRandomPost(){
    do{
        randomNumber = Math.floor(Math.random()* animals.length)
    }while(randomNumber == LatestPostIndex);
    LatestPostIndex = randomNumber
    post = animals[randomNumber];
    return post;
}
console.log(Math.floor(Math.random()* animals.length));

var allProducts = [];
var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productImg = document.getElementById('productImg');
var productComment = document.getElementById('productComment');

function proccessImg(img){
    return (img.files[0] == undefined) ? randomPost.img : img.files[0]?.name;
}

var randomPost;

function addProduct(){

    randomPost = takeRandomPost();

    product = {
        'name' : productName.value ? productName.value: randomPost.name,
        'price' : Number(productPrice.value)? Number(productPrice.value): randomPost.price,
        'category' : productCategory.value? productCategory.value : randomPost.category,
        'img' : proccessImg(productImg),
        'comment' : productComment.value? productComment.value : randomPost.comment,
    };
    

    allProducts.push(product);
    
    showProduct();
    clearForm();
    console.log(allProducts);
}

function showProduct(){
    html = ''
    for(var i = 0 ; i < allProducts.length ;i++){
        html+=`
            <div class="col-md-6 col-lg-4">
            <div class="position-relative">
                <img src="./img/${allProducts[i].img}" class="w-100" alt="">
                <div class="text-center">
                    <h3>${allProducts[i].name}</h3>
                    <h4>${allProducts[i].price}</h4>
                    <h4>${allProducts[i].category}</h4>
                    <p>${allProducts[i].comment}</p>
                </div>
                <div class="layer position-absolute d-flex justify-content-between align-items-start">
                    <button onclick="deleteItem(${i})" class="btn btn-danger m-2">delete</button>
                    <button onclick="editItem(${i})" class="btn btn-info m-2">edit</button>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById('content').innerHTML = html;
}

function clearForm(){
    productName.value = '';
    productPrice.value = '';
    productCategory.value = '';
    productComment.value = '';
    productImg.value = '';
}

function deleteItem(itemIndex){
    allProducts.splice(itemIndex,1);
    showProduct();
}

function editItem(itemIndex){
    console.log(allProducts.at(itemIndex).name); 
    productName.value = allProducts.at(itemIndex).name;
    productPrice.value = allProducts.at(itemIndex).price;
    productCategory.value = allProducts.at(itemIndex).category;
    productComment.value = allProducts.at(itemIndex).comment;
    document.getElementById('button').innerHTML  = `
    <button class="btn btn-warning w-25 mt-3" onclick="updateProduct(${itemIndex})">update</button>
    `;   
}

function updateProduct($itemIndex) {
    allProducts[$itemIndex].name = productName.value;
    allProducts[$itemIndex].price = productPrice.value;
    allProducts[$itemIndex].category = productCategory.value;
    allProducts[$itemIndex].comment = productComment.value;
    allProducts[$itemIndex].img = proccessImg(productImg);
    document.getElementById('button').innerHTML  = `
        <button class="btn btn-info w-25 mt-3" onclick="addProduct()">add</button>
    `;   
    clearForm();
    showProduct();
}


