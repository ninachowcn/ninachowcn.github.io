function moveTime(obj,json,time,callback){
    var startTime = new Date();
    var timer = null;
    var targe = {},
        nowval = {};

    for(key in json){
        targe[key] = parseFloat(json[key]);
        nowval[key] = parseFloat(getStyle(obj,key));
    }
    (function rQAF(){
        var time_dif = new Date() - startTime;
        if(time_dif >= time){
            time_dif = time
        }else{
            timer = window.requestAnimationFrame(rQAF); 
        }
        key == "opacity"?nowval[key] = nowval[key]*100:nowval[key] = nowval[key];

        for(key in json){  
            var a = 2 * (targe[key]-nowval[key]) / Math.pow(time,2);
            var s_Ontime = a * Math.pow(time_dif,2) / 2;
     
            if(key == "opacity"){
                obj.style[key] = (s_Ontime + nowval[key]) /100;  
            }else{
                obj.style[key] = s_Ontime + nowval[key] + "px";      
            }   
            if(parseFloat(getStyle(obj,key)) == targe[key]){
                cancelAnimationFrame(timer);
                callback && callback();  
            }
        } 
       
    })()  
       
}
function getStyle(obj,attr){
        return window.getComputedStyle?window.getComputedStyle(obj)[attr]:obj.currentStyle[arrt];
   }