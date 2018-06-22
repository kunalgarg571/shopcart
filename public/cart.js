window.onload=function(){
    var outer=document.getElementById('outer1')
    var kk=document.getElementById('sira')
    
    var x=document.createElement('span')
    var user=localStorage.getItem('user');
    kk.appendChild(x);
    x.innerText=user;
    
    console.log('xxxxxx')
    $.post('/cc',{'a':user},function(data){
        var grand=0;
        console.log(data);
        for(var i of data){
            
            grand=grand+(i.quantity_Available*i.price);
                
            var main=document.createElement('div');
                    main.setAttribute('class','card');
                    outer.appendChild(main)

                    var pro_name=document.createElement('h5');
                    pro_name.innerText=i.p_id
                    pro_name.setAttribute('class','card-header');
                    main.appendChild(pro_name)
        
                    var main2=document.createElement('div');
                    main2.setAttribute('class','card-body');
                    main.appendChild(main2)
 
                    var quantity=document.createElement('h5');
                    quantity.setAttribute('class','card-text')
                    quantity.innerText='quantity      :  '+i.quantity_Available
                    main2.appendChild(quantity)

                    var price=document.createElement('h5');
                    price.setAttribute('class','card-text')
                    price.innerText='Price      : Rs '+i.price
                    main2.appendChild(price)

                    var remove=document.createElement('input')
                    remove.type='button';
                    remove.setAttribute('class','btn btn-primary')
                    remove.value='remove'
                    main2.appendChild(remove)

                    remove.onclick=function(event){
                        var arr=[];
                        arr.push(+event.target.parentElement.parentElement.firstChild.innerText,localStorage.getItem('user'))
                        
                        var think=JSON.stringify(arr)
                        
                        $.post('/new',{'a':think},function(data){
                            console.log('hi');
                            window.location='cart.html'
                        })
                        
                    }


        }
        console.log(grand)
        var ano=document.createElement('div');
                    ano.setAttribute('class','card');
                    outer.appendChild(ano)

                    var total=document.createElement('h5');
                    total.innerText='GRAND TOTAL        :   '+grand
                    total.setAttribute('class','card-header');
                    ano.appendChild(total)

                    var add=document.createElement('input')
                    add.type='button';
                    add.setAttribute('class','btn btn-primary')
                    add.value='PAY NOW'
                    outer.appendChild(add)
                    
                    var user=localStorage.getItem('user')

                    add.onclick=function(){
                        console.log('you are here')
                        $.post('/lst',{'a':user},function(data){
                            
                            
                        })
                        alert('Your Product Will Be Dilevered soon.')
                        window.location='main.html'

                    }
    })
}