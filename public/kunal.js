window.onload=function(){
    var login=document.getElementById('login');
    
    login.onclick=function(){
        let user=document.getElementById('username');
        let pass=document.getElementById('pass');
        
        $.post('/chk',{'a':user.value},function(data){
           var arr=data
           console.log(arr[0].user_name)
            if(user.value===arr[0].user_name && pass.value==arr[0].password){
                localStorage.setItem('user',user.value);
                window.location='main.html'
            }
            else{
                alert('login credentials does not match')
            }
        })
    }

    var sign_up=document.getElementById('sign_up');

    sign_up.onclick=function(){
        window.location='sign_up.html'
    }
}