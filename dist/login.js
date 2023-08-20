





let signInSubmit = document.querySelector('#sign-in-button')
let signUpSubmit = document.querySelector('#sign-up-button')
let signInForm = document.querySelector('#sign-in-form')
let signUpForm = document.querySelector('#sign-up-form')
let signUpCancel = document.querySelector('#sign-up-cancel')
let signUpDiv = document.querySelector('#signup-div')
let signUpError = document.querySelector('#sign-up-error')
let signInError = document.querySelector('#sign-in-error')
let signUpSuccess = document.querySelector('#sign-up-success')
let loginSuccess = document.querySelector('#login-success')




document.addEventListener('DOMContentLoaded',()=>{
    if(signInForm != null){
        signUpSubmit.addEventListener('click',(e)=>{
            e.preventDefault()
            fetch('http://amaaq.lol/auth/signup',{
                method: 'POST',
                headers :{
                    'Cache-Control':'no-cache',
                    'Content-Type': 'application/json',
                    'Accept':'application/json'
                },
                body: JSON.stringify({
                    email:signUpForm[0].value,
                    password:signUpForm[1].value
                })
            })
                .then(res => {
                    signUpSuccess.style.display = 'block'
                    signUpForm.style.display = 'none'
                    return res.json()
                })
                .then((data)=>{
                    console.log(data)
                })
                .catch((error) => {
                    console.log(error)
                    signUpError.textContent =  error.code
                })
        })
        
        signInSubmit.addEventListener('click',(e)=>{
            e.preventDefault()
            fetch('http://amaaq.lol/auth/signin',{
            method: 'POST',
            headers :{
                'Cache-Control':'no-cache',
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({
                email:signInForm[0].value,
                password:signInForm[1].value
            })
        })
                .then((res) => res.json())
                .catch((error) => {console.log(error)});
            
        }) 
        signUpCancel.addEventListener('click',(e)=>{
            e.preventDefault()
            signUpForm.style.display = 'none'
        })
        loginSuccess.addEventListener('click',(e)=>{
            e.preventDefault()
            signUpSuccess.style.display = 'none'
        })
        signUpDiv.addEventListener('click',(e)=>{
            e.preventDefault()
            signUpForm.style.display = 'flex'
        })
    }
})