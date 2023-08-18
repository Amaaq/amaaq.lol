let button = document.querySelector('#signup')
button.addEventListener('click',()=>{
    fetch('amaaq.lol/auth/signup',{
        method: 'POST',
        body: {
            "email":'adil@adil.com',
            "password":'123456789'
        }
    })
})