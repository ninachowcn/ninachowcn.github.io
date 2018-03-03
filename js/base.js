function Loading(){
    document.onreadystatechange = function(){
        if(document.readyState == "complete"){
            document.getElementsByClassName("loading")[0].style.display="none";
        }
    }
}