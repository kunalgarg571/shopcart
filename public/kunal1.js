window.onload=function(){
    var fss=[];
    var adm_login=document.getElementById('adm_login');
    var cart=document.getElementById('cart');


    var butt=document.getElementById('kkk');
    
    var x=document.createElement('button');
    x.innerText=localStorage.getItem('user');
    x.value=localStorage.getItem('user');
    butt.appendChild(x);
    
    var y=document.createElement('button');
    y.innerText='LogOut';
    butt.appendChild(y);
    
    
    var outer=document.getElementById('final')

    $.get('/al',function(data){
        fss=data;
        for(var i of data){
            var main=document.createElement('div');
            main.setAttribute('class','card');
            outer.appendChild(main)
        
            var pro_name=document.createElement('h5');
            pro_name.innerText=i.product
            pro_name.setAttribute('class','card-header');
            main.appendChild(pro_name)

            var main2=document.createElement('div');
            main2.setAttribute('class','card-body');
            main.appendChild(main2)

            var product_id=document.createElement('h5');
            product_id.setAttribute('class','card-text')
            product_id.innerText=i.product_id
            main2.appendChild(product_id)

            var manufacturer=document.createElement('h5');
            manufacturer.setAttribute('class','card-text')
            manufacturer.innerText='Manufacturer      :  '+i.manufacturer
            main2.appendChild(manufacturer)

            var price=document.createElement('h5');
            price.setAttribute('class','card-text')
            price.innerText='Price      : Rs '+i.price
            main2.appendChild(price)

            var ram=document.createElement('h5');
            ram.setAttribute('class','card-text')
            ram.innerText='ram      :  '+i.ram+' GB'
            main2.appendChild(ram)

            var internal=document.createElement('h5');
            internal.setAttribute('class','card-text')
            internal.innerText='internal Storage      :  '+i.internal+' GB'
            main2.appendChild(internal)

            var rear=document.createElement('h5');
            rear.setAttribute('class','card-text')
            rear.innerText='rear camera      :  '+i.rear+' MP'
            main2.appendChild(rear)

            var front=document.createElement('h5');
            front.setAttribute('class','card-text')
            front.innerText='front camera      :  '+i.front+' MP'
            main2.appendChild(front)

            var quantity=document.createElement('h5');
            quantity.setAttribute('class','card-text')
            quantity.innerText='quantity Available      :  '+i.quantity
            main2.appendChild(quantity)


            var add=document.createElement('input')
            add.type='button';
            add.setAttribute('class','btn btn-primary')
            add.value='Add'

            add.onclick=function(event){
                var user=localStorage.getItem('user')
                console.log(user);
                var p_id=+event.target.parentElement.firstChild.innerText
                $.post('/gt',{'a':p_id},function(data){    
                    var arr=[];
                    console.log(data[0]);
                    arr.push(p_id,user,data[0].price,1);
                    var x=JSON.stringify(arr);
                    console.log(x);
                    
                    $.post('/fry',{'a':x},function(res){
                        console.log(res)
                        window.location='cart.html';
                    })
                    alert('added to cart ')
                })
            }
            main2.appendChild(add)
        }
    })
    
    //x.value=localStorage.getItem('user');
    
    y.onclick=function() {
        localStorage.clear();
        window.location='index.html';
    }

    adm_login.onclick=function(){
        var x=localStorage.getItem('user')
        $.post('/chl',{'a':x},function(data){
            if(data[0].admin==1){
                window.location='adm_login.html'
            }
            else{
                alert('you are not an Admin user')
            }
        })
        
    }
    cart.onclick=function(){
        window.location='cart.html'
    }
}