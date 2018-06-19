$(function () {
    var columns = [
        {
            id: 123,
            name: "Overall",
            rights: [{
                id: 1,
                name: "Read",
                desc : 'Read'
            },{
                id: 2,
                name: "Create",
                desc: 'Create'
            },{
                id: 3,
                name: "Delete",
                desc: 'Delete'
            }
            ]
        },
        {
            id: 124,
            name: "Credentials",
            rights: [{
                id: 1,
                name: "ManageDomains"
            },{
                id: 2,
                name: "Update"
            },{
                id: 3,
                name: "Read"
            },
                {
                    id: 4,
                    name: "Create"
                }]
        }];
    $.each(columns, function(i, item) {
        $('#global-roles tr.group-row').append('<th colspan="' + item.rights.length + '">' + item.name + '</th>');
        $.each(item.rights, function(j, permission){
            $('#global-roles tr.caption-row').append(
                '<td>' + permission.name + '</td>');
        });
    });

    var dataJson = [{
        id : 1,
        name : 'tars-admin',
        desc : 'tars-admin-desc',
        server_groups: [{
            name:'TarsIM'
        },{
            name: 'DemoApp'
        }],
        right_groups: [123]
    }];

    var $box = $('#global-roles');
    $.each(dataJson, function(i, item) {
        var role_id = item.id;
        item.group_info = [];
        item.server_groups_names = [];
        $.each(item.server_groups, function(i, server_group) {
            item.server_groups_names.push(server_group.name);
        });
        $.each(columns, function(j, group) {
            var group_id = group.id;
            var key = role_id + "__" + group_id;
            var index = $.inArray(group_id, item.right_groups);
            var checked = false;
            if(index > -1) {
                checked = true;
            }
            var group_info = {
                key : key,
                length : group.rights.length,
                checked : checked === true ? 'checked' : ''
            };
            item.group_info.push(group_info);
        });
        item.server_groups_str =  item.server_groups_names.join(',');
        var htmlStr = template('row-tpl', item);
        $box.append(htmlStr);
    });

    /**
     [{
    "role_id": 1,
    "name": "角色名称"，
    "desc": "角色描述信息",
    "own_server_group":"角色所属服务组",
    "server_groups":["server_name01", "server_name02"],
    "right_group_ids":[1, 2]
    }]
     */
    $('#role-save-button').on('click', function () {
        var $msg = $('#dlg-ret');
        var formObject = {};
        var formArray =$("#FormID").serializeArray();
        $.each(formArray,function(i,item){
            var name_pairs = item.name.split('__');
            var role_id = name_pairs[0];
            if(!formObject["'" +  role_id + "'"]) {
                formObject["'" +  role_id + "'"] = { role_id : role_id};
            }
            var name2 = name_pairs[1];
            switch(name2) {
                case 'server_groups':
                    if(item.value) {
                        formObject["'" +  role_id + "'"]["server_groups"] = item.value.split(',');
                    }
                    break;
                case 'name':
                    formObject["'" +  role_id + "'"]["name"] = item.value;
                    break;
                case 'desc':
                    formObject["'" +  role_id + "'"]["desc"] = item.value;
                    break;
                default:
                    if(!formObject["'" +  role_id + "'"]["right_group_ids"]) {
                        formObject["'" +  role_id + "'"]["right_group_ids"] = [];
                    }
                    formObject["'" +  role_id + "'"]["right_group_ids"].push(parseInt(name2));
            }
        });

        var submitData = [];
        var errorMsg = null;
        $.each(formObject,function(name,value) {
            if(!value.server_groups){
                errorMsg = '<div class="alert alert-danger" role="alert">请为' + value.name + '选择服务组！</div>';
                return;
            }
            if(!value.right_group_ids){
                errorMsg = '<div class="alert alert-danger" role="alert">请为' + value.name + '选择权限范围！</div>';
                return;
            }
            submitData.push(value);
        });
        if(errorMsg) {
            $msg.html(errorMsg);
            showDialog($msg,'信息提示');
            return;
        }
        $.ajax({
            url:'http://localhost:8080/role-strategy/rolesSubmit',
            method : 'post',
            data:submitData,
            cache:false,//false是不缓存，true为缓存
            async:true,//true为异步，false为同步
            beforeSend:function(){
                //请求前
            },
            success:function(result){
                //请求成功时
            },
            complete:function(){
                //请求结束时
            },
            error:function(){
                //请求失败时
            }
        })
    });

    $('#add-role-button').on('click', function () {
        var $msg = $('#dlg-ret');
        var formObject = {
            //Tars系统所属服务组固定为/Tars
            own_server_group : '/Tars'
        };
        var formArray =$("#add-role-form").serializeArray();
        $.each(formArray,function(i,item){
            formObject[item.name] = item.value.trim();
        });
        var roleNameArray = [];
        $(".role_name").each(function(){
            roleNameArray.push($(this).text().trim());
        });
        if(!formObject.name) {
            $msg.html('<div class="alert alert-danger" role="alert">角色名不能为空！</div>');
            showDialog($msg,'信息提示');
            return;
        }
        var index = $.inArray(formObject.name, roleNameArray);
        //检查是否存在，如果存在要弹窗提示，否则才添加
        if(index > -1) {
            $msg.html('<div class="alert alert-danger" role="alert">角色名已存在，请换一个角色名！</div>');
            showDialog($msg,'信息提示');
            return;
        }
        //TODO:调用新增角色接口获取role_id，这里暂时mock一个role_id来进行效果验证。
        var $box = $('#global-roles');
        formObject.group_info = [];
        var role_id = 'PH' + new Date().getTime();
        formObject.id = role_id;
        $.each(columns, function(j, group) {
            var checkboxTdData;
            var group_id = group.id;
            var key = role_id + "__" + group_id;
            var checked = false;
            checkboxTdData = {
                key: key,
                checked: checked === true ? 'checked' : '',
                length: group.rights.length
            };
            formObject.group_info.push(checkboxTdData);
        });
        var htmlStr = template('row-tpl',formObject);
        $box.append(htmlStr);
        $('#add-role-form')[0].reset();
    });

    $('#global-roles').on('click', '.select_server_group_scope', function() {
        var $ret = $('#dlg-ret');
        var selectedGroups = [];
        if($(this).attr("value")) {
            selectedGroups = $(this).attr("value").split(',');
        }
        var self = $(this);
        var $tree = $('#tree');
        var data = {
            ret_code : 200,
            data : [ {
                name: 'DemoApp',
            },{
                name: 'ImApp',
            },{
                name: 'Parent1',
            }
            ]
        };
        //$.getJSON('/pages/tree',function (data) {
            if(data.ret_code==200 && data.data){
                //FIXME:当前只需要支持服务组，所以只有一层，以后如果精细到服务，添加nodes属性即可。
                var tree = [];
                $.each(data.data, function(i, item){
                    var child = {text: item.name};
                    var index = $.inArray(item.name, selectedGroups);
                    if(index > -1) {
                        child.state = {
                            checked : true
                        }
                    }
                    tree.push(child);
                });
                $.each(tree, function(index, item){
                    var index = $.inArray(item.text, selectedGroups);
                    if(index > -1) {
                        item.state = {
                            checked : true
                        }
                    }
                });

                $('#tree').treeview({
                    data: tree,         // 数据源
                    showCheckbox: true,   //是否显示复选框
                    emptyIcon: '',    //没有子节点的节点图标
                    highlightSelected: false,

                });

                showDialog($tree,'选择服务组', {
                    '取消': function () {
                        this.modal('hide');
                    },
                    '确定': function () {
                        var arr = $('#tree').treeview('getChecked');
                        if(arr.length == 0) {
                            $ret.html('<div class="alert alert-danger">请至少选择一个服务组</div>');
                            showDialog($ret,'选择权限范围');
                            return;
                        }
                        var server_groups = [];
                        for (var key in arr) {
                            server_groups.push(arr[key].text);
                        }
                        self.attr("value", server_groups.join(','));
                        self.find('input[type="hidden"]').attr('value',  server_groups.join(','));
                        // self.append('<input type="hidden" name="server_groups" value="' + server_groups.join(',') + '"/>');
                        this.modal('hide');
                    }
                });
            }else{
                showDialog($ret,'<div class="alert alert-danger" role="alert"><strong>业务树加载出错!</strong> '+data.err_msg+'</div>');
            }
       // });
    });
});


