/**
 * 
 */

(function ($) {
    $.fn.datagridX = function (options) {

        //defaults
        $.fn.datagridX.defaults = {
            'caption':'',
            'headerSelecter':'.wgt-datagrid-header', //表头选择器
            'bodySelecter':'.wgt-datagrid-container', //表格主体选择器
            'tplName':'', //模版名称
            'displays':['投资项目', '投资金额', '投资期限', '年化收益率', '状态', '操作'], //表头显示名称
            'fields':['title', 'money g-money', 'deadline', 'rate', 'state', 'do'], //字段名
            'data':{}, //json数据
            'render':function () { //数据渲染
            },
            'error':function () { //数据为空或者异常处理
            }
        };

        //options
        var options = $.extend({}, $.fn.datagridX.defaults, options);

        //logics
        return this.each(function () {
            var _header = $(options.headerSelecter),
                _body = $(options.bodySelecter),
                _header_html = '',
                _body_html = '',
                _displays = options.displays,
                _fields = options.fields,
                _fields_count = _displays.length,
                _result = options.data,
                _render = options.render,
                _error = options.error,
                _len = _displays.length - 1;

            //渲染表头
            $.each(_displays,function (index,displayName) {
               // var _thCls = index == 0 ? ' first' : (index == _len ? ' last' : ''),
                    _field = _fields ? '' : _fields[index];
                _header_html += '<th class="' + _field  + '">' + displayName + '</th>';
            });

            _header.html('<tr>' + _header_html + '</tr>');
            //渲染主体
            if (_result.state == 0) {
                _render && _render(_result.data.rows, _body);
               // _body.find('tr:odd').addClass('odd');
            } else {
                if (_result.error == 1009) {
                    AA.RapidLogin.popup();
                } else {
                    var _caption = options.caption.indexOf('敬请期待') != -1 ? options.caption : '暂无' + options.caption,
                        _msg = _result.state == -2 ? _caption : AA.Lang.Error[_result.error + ''];
                    _body_html = '<tr><td colspan=' + _fields_count + ' class="wgt-datagrid-empty-row">暂无投资记录</td></tr>';
                    _body.html(_body_html);
                    //清理分页信息等
                    _error && _error();
                }
            }
        });
    };
})(jQuery);