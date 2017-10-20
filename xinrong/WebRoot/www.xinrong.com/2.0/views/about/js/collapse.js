/**
 * Created by HOOPER on 2016/10/18.
 */
function Collapse(className){
    this._elements = [];
    this._default = -1;
    this._className = className;
    this._previous = false;
    this._callback = null;
    this._isInit = false;
}
Collapse.prototype.setDefault = function(id){
    this._default = Number(id);
}
Collapse.prototype.setPrevious = function(flag){
    this._previous = Boolean(flag);
}
Collapse.prototype.setCallback = function(callback){
    this._callback = callback;
}
Collapse.prototype.collectElementbyClass = function(){
    this._elements = [];
    var allelements = document.getElementsByTagName("dl");
    for(var i=0;i<allelements.length;i++){
        var mItem = allelements[i];
        if (typeof mItem.className == "string" && mItem.className == this._className){
            var h3s = mItem.getElementsByTagName("dt");
            var uls = mItem.getElementsByTagName("dd");
            if(h3s.length == 1 && uls.length == 1){
                h3s[0].style.cursor = "hand";
                if(this._default == this._elements.length){
                    uls[0].style.visibility = "visible";
                }else{
                    uls[0].style.visibility= "hidden";
                }
                this._elements[this._elements.length] = mItem;
            }
        }
    }
}
Collapse.prototype.open = function(mElement){
    var uls = mElement.getElementsByTagName("dd");
    uls[0].style.visibility = "visible";
    uls[0].style.height = uls[0].scrollHeight+"px";
    //  $(uls[0]).animate({height: uls[0].scrollHeight+"px"},"1000",this._callback);

    var imgs = mElement.getElementsByTagName('img');
    if( imgs != null && imgs != undefined){
        $(imgs).each(function(i,$img){
            $img = $($img);
            var wait = setInterval(function() {
                var w = $img[0].naturalWidth,
                    h = $img[0].naturalHeight;
                if (w && h) {
                    clearInterval(wait);
                    uls[0].style.height = uls[0].scrollHeight+"px";
                }
            }, 30);
        })
    }

    //如果 公告内容含图片 在图片完全加载后 再刷新窗体高度 本不想用jq入侵 尝试Js complete load无果之后不得已为之
    // if( imgs != undefined && imgs != null){
    //     var imgdefereds=[];
    //     $(imgs).each(function(){
    //         var dfd=$.Deferred();
    //         $(this).bind('load',function(){
    //             dfd.resolve();
    //         }).bind('error',function(){
    //             //图片加载错误，加入错误处理
    //             // dfd.resolve();
    //         })
    //         if(this.complete) setTimeout(function(){
    //             dfd.resolve();
    //         },1000);
    //         imgdefereds.push(dfd);
    //     })
    //     $.when.apply(null,imgdefereds).done(function(){
    //         if(uls[0].style.visibility == "visible"){
    //             uls[0].style.height = uls[0].scrollHeight+"px";
    //         }
    //     });
    // }
}
Collapse.prototype.close = function(mElement){
    var uls = mElement.getElementsByTagName("dd");
    uls[0].style.height = "0px";
    // $(uls[0]).animate({height: "0px"},"1000",this._callback);
    uls[0].style.visibility = "hidden";

}
Collapse.prototype.closeAll = function(){
    for(var i=0;i<this._elements.length;i++){
        var uls = this._elements[i].getElementsByTagName("dd");
        uls[0].style.height = "0px";
        uls[0].style.visibility = "hidden";
    }
}
Collapse.prototype.isOpen = function(mElement){
    var uls = mElement.getElementsByTagName("dd");
    return uls[0].style.visibility == "visible";
}
Collapse.prototype.toggledisplay = function(header){
    var mItem;
    if(window.addEventListener){
        mItem = header.parentNode;
    }else{
        mItem = header.parentElement;
    }
    if(this.isOpen(mItem)){
        this.close(mItem);
    }else{
        this.open(mItem);
    }
    if(!this._previous){
        for(var i=0;i<this._elements.length;i++){
            if(this._elements[i] != mItem){
                var uls = this._elements[i].getElementsByTagName("dd");
                uls[0].style.height = "0px";
                uls[0].style.visibility = "hidden";
            }
        }
    }
}
Collapse.prototype.init = function(){
    var instance = this;
    this.collectElementbyClass();
    if(this._elements.length==0){
        return;
    }
    for(var i=0;i<this._elements.length;i++){
        var h3s = this._elements[i].getElementsByTagName("dt");
        if(window.addEventListener){
            h3s[0].addEventListener("click",function(){ instance.toggledisplay(this);},false);
        }else{
            h3s[0].onclick = function(){instance.toggledisplay(this);}
        }
    }
    this._isInit=true;
}
Collapse.prototype._isInit = function () {
    return this._isInit;
}