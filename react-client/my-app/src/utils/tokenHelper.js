
let tokenHelper = {

    getTokenCookie(){
        if(document.cookie){
            let cookiesArr = document.cookie.split(";");
            for(let i=0;i<cookiesArr.length;i++){
                let cookie = cookiesArr[i].trim().split("=");
                let key = cookie[0];
                let value = cookie[1];
                if(key==="token"){
                    return value;
                }
            }
        }else{
            return "";
        }
    }
}

export default tokenHelper;