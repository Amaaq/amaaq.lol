





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
                    fname:signUpForm[0].value,
                    lname:signUpForm[1].value,
                    email:signUpForm[2].value,
                    password:signUpForm[3].value
                })
            })
                .then(res => {
                    if(res.status==200){
                        signUpSuccess.style.display = 'block'
                        signUpForm.style.display = 'none'
                    }else {
                        return res.json()
                    }
                })
                .then(data=>{signUpError.textContent= data.message})
                .catch((error) => {
                    signUpError.textContent =  error
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
                .then((res)=>{
                    if(res.status == 200){
                        window.open('http://amaaq.lol/todo',"_self")
                    }else {
                        return res.json()
                    }

                }).then(data=> {signInError.textContent = data.message})
                .catch((error) => {console.log(error)});
        }) 
        
        signUpCancel.addEventListener('click',(e)=>{
            e.preventDefault()
            signUpForm.style.display = 'none'
            signInForm.style.display = 'flex'
        })
        loginSuccess.addEventListener('click',(e)=>{
            e.preventDefault()
            signUpSuccess.style.display = 'none'
            signInForm.style.display = 'flex'
        })
        signUpDiv.addEventListener('click',(e)=>{
            e.preventDefault()
            signUpForm.style.display = 'flex'
            signInForm.style.display = 'none'
        })
