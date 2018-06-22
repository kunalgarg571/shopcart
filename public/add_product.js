window.onload=function(){
    var add_Product= document.getElementById('add_Product')
    var add_Manufacturer= document.getElementById('add_Manufacturer')
    var add_Price= document.getElementById('add_Price')
    var add_Ram= document.getElementById('add_Ram')
    var add_Front= document.getElementById('add_Front')
    var add_Rear= document.getElementById('add_Rear')
    var add_Internal= document.getElementById('add_Internal')
    var add_button= document.getElementById('button_Add')
    var add_Product_id=this.document.getElementById('add_Product_id')
    var Quantity_Avialable=document.getElementById('Quantity_Avialable')
    
    add_button.onclick=function(){
        var arr=[];
        var x=localStorage.getItem('user');
        arr.push(add_Product_id.value,add_Product.value,add_Manufacturer.value,+add_Price.value,+add_Ram.value,+add_Front.value,+add_Rear.value,+add_Internal.value,+Quantity_Avialable.value,x)
        var x=JSON.stringify(arr)
        
        $.post('/tr',{'a':x,'b':1},function(data){
            if(data){
                alert('product already exists')
            }
            else{
                alert('product sucessfully added')
            }
            add_Front.value="";
            add_Internal.value="";
            add_Manufacturer.value="";
            add_Price.value="";
            add_Product.value="";
            add_Product_id.value="";
            add_Ram.value="";
            add_Rear.value="";
            Quantity_Avialable.value="";
        })
    }
}