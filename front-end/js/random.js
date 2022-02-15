class randomImg {

    constructor()
    {
        
        this.img_container = document.querySelector("#img_container");
        let randomButton = document.querySelector("#random");
        randomButton.style.color = "rgb(73, 227, 238)";
        randomButton.style.backgroundColor ="white";
        let historyButton = document.querySelector("#history");
        let self = this;
        let subreddit = document.querySelector("#subreddit");
        const auth = localStorage.getItem("auth");
        if(!auth){
            return;
        }
        let auth1 = auth.split(",");

        let searchButton = document.querySelector("#searchButton");

        searchButton.onclick = (e) =>{
            e.preventDefault();
            fetch("https://localhost:5001/random", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(subreddit.value+","+auth1[0])
              }).then(res => {
                res.text().then(function(text){
                    self.img_container.innerHTML="";
                    self.addImg(text)
                });
              });
            };

        randomButton.onclick = (e) =>{
            e.preventDefault();
            document.querySelector("#randomForm").style.display ="block";
            self.img_container.innerHTML="";
            randomButton.style.color = "rgb(73, 227, 238)";
            randomButton.style.backgroundColor ="white";
            historyButton.style.color = "white";
            historyButton.style.backgroundColor ="rgb(73, 227, 238)";
        };
        historyButton.onclick = (e) =>{
            e.preventDefault();
            document.querySelector("#randomForm").style.display ="none";
            self.img_container.innerHTML="";
            historyButton.style.color = "rgb(73, 227, 238)";
            historyButton.style.backgroundColor ="white";
            randomButton.style.color = "white";
            randomButton.style.backgroundColor ="rgb(73, 227, 238)";
            fetch("https://localhost:5001/history", {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(auth1[0])
              }).then(res => {
                res.text().then(function(text){
                    if(text){let urls = text.split(",");
                        urls.forEach(url => self.addImg(url))
                    }
                });
              });
        };
        
    }

    addImg(src){
        let elem = document.createElement("img");
        elem.width = 200;
        elem.style.border ="solid 1px"
        elem.style.margin = "10px";
        elem.src = src;
        elem.referrerPolicy = "no-referrer";
        img_container.appendChild(elem);
    }
    
}

var rn = new randomImg();