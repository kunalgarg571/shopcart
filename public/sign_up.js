window.onload=function(){
    var sign_User=document.getElementById('sign_User')
     var sign_First=document.getElementById('sign_First')
    // var sign_Last=document.getElementById('sign_Last')
    var sign_Password=document.getElementById('sign_Password')
     var sign_RePassword=document.getElementById('sign_RePassword')
    var sign_Email=document.getElementById('sign_Email')
    var sign_Mobile=document.getElementById('sign_Mobile')
    // var sign_DOB=document.getElementById('sign_DOB')
    var sign_Button=document.getElementById('sign_Button')

    sign_Button.onclick=function(){

        if(sign_Password.value===sign_RePassword.value){
        
            var arr=[];
            arr.push(sign_User.value,sign_Password.value,sign_Email.value,+sign_Mobile.value,0)
            var x=JSON.stringify(arr)
            
            $.post('/kuna',{'a':x,'b':1},function(data){
                window.location='index.html'
            })
        }
        else{
            sign_First.innerText='Password Doesnot Match'
        }
    }
}