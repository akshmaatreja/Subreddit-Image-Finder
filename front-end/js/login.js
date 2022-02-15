class Login
{
    constructor(form,fields, register)
    {
        document.querySelector("body").style.display ="none";
        const auth = localStorage.getItem("auth");
        this.register = register;
        let isAuth = false;
        if(auth){
            let auth1 = auth.split(",");
            let user = {
            username: auth1[0],
            password: auth1[1],
            imageUrls:[]};
            fetch("https://localhost:5001/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(user)
          }).then(res => {
            if(res.ok){
                window.location.replace("/dashboard.html");
            }
            else{
                isAuth =true;
            }
          });
        }
        if(!isAuth){
            document.querySelector("body").style.display ="block";
            let loginButton = document.querySelector("#loginButton");
            let registerButton = document.querySelector("#registerButton");
            loginButton.style.color = "rgb(73, 227, 238)";
            loginButton.style.backgroundColor ="white";
            loginButton.onclick = (e) =>{
                e.preventDefault();
                document.querySelector(".loginForm").style.display ="block";
                document.querySelector(".registerForm").style.display ="none";
                loginButton.style.color = "rgb(73, 227, 238)";
                loginButton.style.backgroundColor ="white";
                registerButton.style.color = "white";
                registerButton.style.backgroundColor ="rgb(73, 227, 238)";
            };
            registerButton.onclick = (e) =>{
                e.preventDefault();
                document.querySelector(".registerForm").style.display ="block";
                document.querySelector(".loginForm").style.display ="none";
                registerButton.style.color = "rgb(73, 227, 238)";
                registerButton.style.backgroundColor ="white";
                loginButton.style.color = "white";
                loginButton.style.backgroundColor ="rgb(73, 227, 238)";
            };
            
            this.form = form;
            this.fields = fields;
            this.validateOnSubmit();
        }
        
    }

    validateOnSubmit()
    {
        let self = this;

        this.form.addEventListener("submit", (e) =>{
            e.preventDefault();
            var error = 0;
            self.fields.forEach(field => {
                const input = document.querySelector(`#${field}`);
                if (self.validateField(input) == false) 
                {
                    error++;
                }
            });
            if(error == 0) {
                const userna = document.querySelector(`#${self.fields[0]}`).value;
                const pass = document.querySelector(`#${self.fields[1]}`).value;
                const list = [userna,pass];
                if(this.register){
                    let user = {
                        username: userna,
                        password: pass,
                        imageUrls:[]};
                    fetch("https://localhost:5001/register", {
                        method: "POST",
                        headers: {'Content-Type': 'application/json'}, 
                        body: JSON.stringify(user)
                    }).then(res => {
                        console.log(res);
                    if(res.ok){
                        this.setStatus(document.querySelector(`#${self.fields[0]}`), null, "success");
                        localStorage.setItem("auth", list);
                        this.form.submit();
                    }else{
                        this.setStatus(
                            document.querySelector(`#${self.fields[0]}`),
                            `Username exists`,
                            "error"
                        );
                    }
                });
                    
                }
                else{
                    localStorage.setItem("auth", list);
                    this.form.submit();
                }
                
            }
        });
    }

    validateField(field)
    {
        if(field.value.trim() == "")
        {
            this.setStatus(
                field,
                `${field.previousElementSibling.innerText} cannot be blank`,
                "error"
            );
            return false;
        }
        else
        {
            this.setStatus(field, null, "success");
            return true;
        }
    }
    
    setStatus(field, message, status)
    {
        const errorMessage = field.parentElement.querySelector(".error-message");
        if(status == "error")
        {
            errorMessage.innerText = message;
            field.classList.add("input-error");
        }
        else if (status == "success")
        {
            if(errorMessage)
            {
                errorMessage.innerText = "";

            }
            field.classList.remove("input-error");
        }
            // this.setStatus(field, null, "success"); 

    }
}

const form = document.querySelector(".loginForm");
if(form){
    const fields = ["username", "password"];
    const validator = new Login(form, fields, false);
}
const form1 = document.querySelector(".registerForm");
if(form1){
    const fields = ["usernameRegister", "passwordRegister"];
    const validator = new Login(form1, fields, true);
}