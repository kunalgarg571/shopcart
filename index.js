var mysql = require('mysql')
var app=require('express')
ser=app();

ser.use(app.json())
ser.use(app.urlencoded({extended: true}))

ser.listen(5000,function(){
    console.log('server Started!!')
})

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'k',
   database: 'cust_sal'
})

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
  //create table in database and add admin user in it
  connection.query('create table IF NOT EXISTS usr(user_name varchar(255) PRIMARY KEY,password varchar(255),email varchar(255),mobile Varchar(12),admin Integer(1))',function(err,data){
      if(err){
        console.log(err)
      }
      var arr=['kunal','123','Kunal@gmail.com','12341234',1]
      connection.query("insert into usr(user_name,password,email,mobile,admin) values (?)",[arr],function(err,data){
        if(err){
          console.log('already exists')
        }
    })
  })
})


// ser.get('/kuna',(req,res)=>{
//       var sql1="select user_name from usr"
//       connection.query(sql1,function(err,result){
//         if(err){
//           throw err;
//         }
//         res.send(result)
//     })
// })


// ser.get('/tr',(req,res)=>{
//   connection.query("select product from products",function(err,result){
//     res.send(result);
//   })
// })

//..........................................sign_up.js...............................................

//create table usr if does not exists
//insert new user into table usr..here user_name is primary key and needs to be unique..
ser.post('/kuna',(req,res)=>{
  var sql='create table IF NOT EXISTS usr(user_name varchar(255) PRIMARY KEY,password varchar(255),email varchar(255),mobile Varchar(12),admin Integer(1))'
  connection.query(sql,function(err,result){
    if(err){
      throw err
    }
  })
  var sql1="insert into usr(user_name,password,email,mobile,admin) values (?)";
  var arr=JSON.parse(req.body['a']);  
  connection.query(sql1,[arr],function(err,result){
    if(err){
      res.send(err);
    }
    else{
      res.send(result)
    }
  })
})

//.............................adm_login.js.............................................................

//add more quantity of particular product to product table
ser.post('/ad',(req,res)=>{
  var x=req.body['a']           //product_id
  var y=+req.body['b']          //Quantity to add

  connection.query('select quantity from products where product_id=(?)',x,function(err,result){
    if(err){
      res.send(err)
    }
    else{
      var sql1 = "UPDATE products SET quantity =(?) WHERE product_id= '"+x+"'"
      connection.query(sql1,+result[0].quantity+y,function(err,result){
        if(err){
          console.log( err);
        }
        res.send(result)
      })
    }
  })
})

//.............................add_products.js...........................................................

//add new product into product data base
ser.post('/tr',(req,res)=>{
  var sql='create table IF NOT EXISTS products(product_id Integer PRIMARY KEY,product VARCHAR(255),manufacturer VARCHAR(255),price Integer(10),ram INTEGER(10),rear INTEGER(10),front INTEGER(10),internal INTEGER(10),quantity INTEGER(10),admin varchar(255))'
  var sql1="INSERT INTO products (product_id,product,manufacturer,price,ram,rear,front,internal,quantity,admin) VALUES (?)";

  connection.query(sql,function(err,result){
    if(err){
      throw err;
    }
  })
  var arr=JSON.parse(req.body['a'])
  
  connection.query(sql1,[arr],function(err,result){
    if(err){
      res.send(err)
    }
  })
})

//...................................kunal.js......................................................


//on login button click send data of user to client side for verification
ser.post('/chk',(req,res)=>{
  x=req.body['a']
  console.log(x)
  var sql1="select user_name,password from usr where user_name=(?)"
      connection.query(sql1,x,function(err,result){
        if(err){
          throw err;
        }
        res.send(result)
    })
})

//...........................kunal1.js..................................


//retrive values to add in shop
ser.get('/al',(req,res)=>{
  var sql1="select * from products"
  connection.query(sql1,function(err,result){
    if(err){
      throw err;
    }
    res.send(result)
  })
})

//get attributes of product so that it can be add to cart
ser.post('/gt',(req,res)=>{
  x=req.body['a']
  //console.log(x)
  var sql1="select price,quantity from products where product_id=(?)"
      connection.query(sql1,x,function(err,result){
        if(err){
          throw err;
        }
        console.log(result)
        res.send(result)
    })
})


//checks if table cart already exists or not
//then it checks if product_id and user is present in table ===>here product_id i.e. p_id + user is 'acting' as primary key.but this table has no primary key
//if p_id and user is in table then update the value of quantity and if not insert a new entry for them
//data.length will be zero if no new row is inserted and any any value if row is inserted
ser.post('/fry',(req,res)=>{
  var quant;
  x=JSON.parse(req.body['a'])

  var sql1="create table IF NOT EXISTS cart(p_id integer(10),user varchar(255),price integer(10),quantity_Available integer(10))"
  
  connection.query(sql1,function(err,result){
    if(err){
      throw err;
    }
  
    connection.query("select * from cart where p_id='"+x[0]+"'and user='"+x[1]+"'",function(err1,data){
      if(data.length===0){
        var sql="insert into cart(p_id,user,price,quantity_Available) values(?)"
  
        connection.query(sql,[x],function(err,res1){
          if(err){
            throw err;
          }
        })
      }
      else{
  
        connection.query("select quantity_Available from cart where p_id='"+x[0]+"'and user='"+x[1]+"'",function(err,data){
          if(err)
            console.log(err)
        })
        var sql="UPDATE cart SET quantity_Available ='"+(data[0].quantity_Available+1)+"' WHERE p_id= '"+x[0]+"'and user='"+x[1]+"'"
  
        connection.query(sql,function(err,res1){
          if(err){
            console.log(err)
          }     
        })
      }
    })
  })
})


//it used to check whether user is admin or not
ser.post('/chl',(req,res)=>{
  x=req.body['a']
  console.log(x)
  var sql1="select admin from usr where user_name=(?)"
      connection.query(sql1,x,function(err,result){
        if(err){
          throw err;
        }
        console.log(result)
        res.send(result)
    })
})




//............................Cart.js...................................


//display product for user in cart
ser.post('/cc',(req,res)=>{
  x=req.body['a']
  var sql="select * from cart where user=(?)"
  connection.query(sql,[x],function(err,res1){
    if(err){
      throw err;
    }
    res.send(res1);
  })
})


//on sucessful pay from from cart.remove items from cart
ser.post('/lst',(req,res)=>{
  x=req.body['a']     //username
  var sql2="DELETE FROM cart WHERE user ='"+x+"'"
  connection.query(sql2,function(err,data){
    if(err)
      throw err;
    //console.log('done')
      res.send=data;
  })
})


//remove from cart
ser.post('/new',(req,res)=>{
    var arr=JSON.parse(req.body['a'])
    connection.query("DELETE FROM cart WHERE user='"+arr[1]+"' and p_id='"+arr[0]+"'",function(err,data){
      res.send(data);
    })
})

//........................................................................
ser.use('/home',app.static(__dirname+'/public'))

ser.get('/',(req,res)=>{
  res.send('hi');
})