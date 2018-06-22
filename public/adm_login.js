window.onload=function(){
    
    var add_product=document.getElementById('add_product')
    var add_quantity=document.getElementById('add_quantity')
    var hi=document.getElementById('hi')
    
    add_quantity.onclick=function(){
        hi.style.visibility='visible'
    }

    var Product_id=document.getElementById('Product_id');
    var quantity=document.getElementById('quantity');
    var add=document.getElementById('add');

    add.onclick=function(){
        $.post('/ad',{'a':Product_id.value,'b':quantity.value},function(data){
        })
    }
}