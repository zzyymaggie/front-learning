$(function () {
    var columns = [
     {
          group_id: 123,
          group_name: "Overall",
          permissions: [{
              permission_id: 1,
              permission_name: "Read"
          },
              {
                  permission_id: 2,
                  permission_name: "Create"
              },
              {
                  permission_id: 3,
                  permission_name: "Delete"
              }
          ]
    },
    {
      group_id: 124,
      group_name: "Credentials",
      permissions: [{
          permission_id: 1,
          permission_name: "ManageDomains"
      },
          {
              permission_id: 2,
              permission_name: "Update"
          },
          {
              permission_id: 3,
              permission_name: "Read"
          },
         {
             permission_id: 4,
             permission_name: "Create"
         }
      ]
    }];
    $.each(columns, function(i, item) {
      $('#globalRoles tr.group-row').append('<th colspan="' + item.permissions.length + '">' + item.group_name + '</th>');
        $.each(item.permissions, function(j, permission){
           $('#globalRoles tr.caption-row').append(
            '<td>' + permission.permission_name + '</td>');
        });
    });

    var dataJson = [{
      role_id : 1,
      name : 'tars-admin',
      desc : 'tars-admin-desc',
      server_groups: ['TarsIM','DemoApp'],
      right_groups: [123]
    }];

    var $box = $('#globalRoles');
    $.each(dataJson, function(i, item) {
        var role_id = item.role_id;
        item.group_info = [];
        $.each(columns, function(j, group) {
            var group_id = group.group_id;
            var key = role_id + "__" + group_id;
            var index = $.inArray(group_id, item.right_groups);
            var checked = false;
            if(index > -1) {
                checked = true;
            }
            var group_info = {
                key : key,
                length : group.permissions.length,
                checked : checked === true ? 'checked' : ''
            };
            item.group_info.push(group_info);
        });
        item.server_groups_str =  item.server_groups.join(',');
        var htmlStr = template('row-tpl', item);
        $box.append(htmlStr);
    });

    $('#role_save_button').on('click', function () {
        var formObject = {};
        var formArray =$("#FormID").serializeArray();
        $.each(formArray,function(i,item){
            formObject[item.name] = item.value;
        });

        $.ajax({
            url:'http://localhost:8080/role-strategy/rolesSubmit',
            method : 'post',
            data:formObject,
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

    $('#addRoleBtn').on('click', function () {
        var $msg = $('#dlg-ret');
        var formObject = {
            //Tars系统所属服务组固定为/Tars
            own_server_group : '/Tars'
        };
        var formArray =$("#addRoleForm").serializeArray();
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
        var $box = $('#globalRoles');
        formObject.group_info = [];
        var role_id = 'PH' + new Date().getTime();
        $.each(columns, function(j, group) {
            var checkboxTdData;
            var group_id = group.group_id;
            var key = role_id + "__" + group_id;
            var checked = false;
            checkboxTdData = {
                key: key,
                checked: checked === true ? 'checked' : '',
                length: group.permissions.length
            };
            formObject.group_info.push(checkboxTdData);
        });
        var htmlStr = template('row-tpl',formObject);
        $box.append(htmlStr);
    });

   $('#globalRoles').on('click', '.select_server_group_scope', function() {

       var selectedGroups = [];
       if($(this).attr("value")) {
           selectedGroups = $(this).attr("value").split(',');
       }
       var self = $(this);

       var $tree = $('#tree');
       //当前只需要支持服务组，所以只有一层，以后如果精细到服务，添加nodes属性即可。
       var tree = [
           {
               text: "TarsIM",
           },
           {
               text: "DemoApp"
           },
           {
               text: "Parent 3"
           },
           {
               text: "Parent 4"
           },
           {
               text: "Parent 5"
           }
       ];
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

       var $ret = $('#dlg-ret');
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
               self.append('<input type="hidden" name="server_groups" value="' + server_groups.join(',') + '"/>');
               this.modal('hide');
           }
       });
   });
});


