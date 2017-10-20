/**
 * Created by HOOPER on 2016/10/19.
 */
(function (){
    Announcements = function () {
    };
    Announcements.prototype={
        pageSize:10,//请勿变更
        pageIndex:1,
        currentPage:1,
        itemTotal:0,
        collapse:undefined,
        advanceLoaded:false,
        init:function()
        {
            var id = GetQueryString('announcementId');
            if(id){
                if(id.match("^[1-9][0-9]*$")){
                    Announcements.advancedPageLoad(id);
                }else{
                    this.loadList(this.pageIndex,this.pageSize);
                }
            }else{
                this.loadList(this.pageIndex,this.pageSize);
            }
        },
        advancedPageLoad:function (id) {
            $.ajax({
                url: '/v2/report/media_report_location.jso',
                type: 'GET',
                data: {id:id,type:1},
                dataType: 'json',
                success: function (result) {
                    if(result.state == 0){
                        var page = Math.ceil(result.data / Announcements.pageSize);
                        Announcements.loadList(page,Announcements.pageSize);
                    }else{
                        Announcements.loadList(Announcements.pageIndex,Announcements.pageSize);
                    }
                },
                error:function () {
                    Announcements.loadList(Announcements.pageIndex,Announcements.pageSize);
                }
            })
        },
        bindCollapse:function () {
            Announcements.collapse = new Collapse("collapseDiv");
            //mSwitch.setDefault(0);
            Announcements.collapse.setPrevious(false);
            Announcements.collapse.init();
            Announcements.collapse.closeAll();

            $(".collapseDiv dt").on("click",function () {
                var dt = $(this);
                var parent = $(this).parent(".collapseDiv");
                if(!dt.hasClass("active")){
                    $(".collapseDiv dt").removeClass("active");
                    dt.addClass("active");
                    var id = $(parent).attr("id").replace("collapse","");
                    var url = "/2.0/views/about/xr_announcement.shtml?announcementId="+id;
                    history.replaceState("","信融财富平台公告",url);
                }else{
                    dt.removeClass("active");
                    var url = "/2.0/views/about/xr_announcement.shtml";
                    history.replaceState("","信融财富平台公告",url);
                }
            })
        },
        loadList:function(pIndex,pageNum,callback)
        {
            $.ajax({
                url:'/v2/report/announcement.jso',
                type:'GET',
                data:{pageSize:pageNum,pageIndex:pIndex,type:1},
                dataType:'json',
                success:function(result){
                    $('#announce_list').html("");
                    var ajaxCounter = 0;
                    $.each(result.data,function(i,v){
                        var time = v.ctime.substring(0,10);
                        var title = v.title;
                        var html = '<dl class="collapseDiv" id="collapse'+v.id+'" style="display: none"><dt sorter="'+(i+1)+'">'+title+'<span>'+time+'</span><i></i></dt><dd class="collapsing"></dd></dl>';
                        $('#announce_list').append(html);
                        var content = (v.content);
                        var div = '<div class="wrapper">'+content+'</div>';
                        $('#collapse'+v.id+" .collapsing").html(div);
                        $('#announce_list .collapseDiv').fadeIn('300');
                    });
                    Announcements.bindCollapse();
                    var announcementId = GetQueryString('announcementId');
                    if(announcementId != null && !Announcements.advanceLoaded){
                        var marker = $('#collapse'+announcementId).get(0);
                        if(marker){
                            Announcements.collapse.open(marker);
                            var headerHeight =$("#hmenu_nav")[0].offsetHeight;
                            var yIndex = $(marker)[0].offsetTop-headerHeight-20;
                            $('html, body').animate({scrollTop: yIndex}, 300);
                        }
                        Announcements.advanceLoaded = true;
                    }
                    Announcements.currentPage = pIndex;
                    Announcements.itemTotal = result.total;
                    if(result.total>1){
                        $('#wgt-pagination1').pagination({
                            'container':'#wgt-pagination1',
                            'pageSize':pageNum ,
                            'total':result.total ,
                            'curCls':'pageCur',
                            'pageIndex':pIndex ,
                            'callback':'Announcements.loadList'
                        });
                    }
                    callback && callback();
                }
            });
        }
    };
})();

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return (r[2]); return null;
}

