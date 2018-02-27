function moveSpeed(obj,json,speed,callback){
    obj.timer = setInterval(function(){  
        var onoff = true;
        for(var key in json){
            var nowVal;
            key == "opacity"? nowVal = getStyle(obj,key)*100 : nowVal = parseInt(getStyle(obj,key));
            var newSpeed = nowVal > json[key]? -speed:speed;

            if(key == "opacity"){ 
                if(nowVal != json[key]){                   
                    obj.style[key] = (nowVal + newSpeed )/100;
                    onoff = false;
                }
            }else{                                  
                if(nowVal != json[key]){
                    obj.style[key] = nowVal + newSpeed + "px";
                    
                    onoff = false;  
                }
           }   
            if(Math.abs(nowVal + newSpeed - json[key]) < speed){
                nowVal = json[key];
                if(key == "opacity"){               
                    obj.style[key] = nowVal/100;
                }else{
                    obj.style[key] = nowVal + "px";
                }               
            } 
        }
        //  console.log(onoff)
        if(onoff){         
            clearInterval(obj.timer)
            // 回调函数 存在就执行
            callback && callback();
        }
        
    },1000/60)        
}

function getStyle(obj,attr){
        return window.getComputedStyle?window.getComputedStyle(obj)[attr]:obj.currentStyle[arrt];
   }