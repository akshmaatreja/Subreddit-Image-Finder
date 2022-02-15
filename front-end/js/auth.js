class Auth
{
    constructor()
    {
        document.querySelector("body").style.display ="none";
        const auth = localStorage.getItem("auth");
        this.validateAuth(auth);
    }

    validateAuth(auth)
    {
        //sent auth[0] and auth[1] to back-end as username and password
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
                document.querySelector("body").style.display ="block";
            }
            else{
                localStorage.removeItem("auth");
                window.location.replace("/");
            }
          });
        }else{
            localStorage.removeItem("auth");
            window.location.replace("/");
        }
        
    }

    logOut()
    {
        
        localStorage.removeItem("auth");
        window.location.replace("/");
    }
}