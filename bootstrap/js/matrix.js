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
      role_name : 'tars-admin',
      role_desc : 'tars-admin-desc',
      server_groups: '/TarsIM/*',
      groups: [123]
    }];

    var $box = $('#globalRoles');
    $.each(dataJson, function(i, item) {
        var role_id = item.role_id;
        item.group_info = [];
        $.each(columns, function(j, group) {
            var group_id = group.group_id;
            var key = role_id + "__" + group_id;
            var index = $.inArray(group_id, item.groups);
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
        var htmlStr = template('row-tpl', item);
        $rowHtmlStr = $(htmlStr);
        $box.append(htmlStr);
    });

    $('#yui-gen4-button').click(function () {
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

    $('#addRoleBtn').click(function () {
        var formObject = {};
        var formArray =$("#addRoleForm").serializeArray();
        $.each(formArray,function(i,item){
            formObject[item.name] = item.value.trim();
        });
        var roleNameArray = [];
        $(".role_name").each(function(){
            roleNameArray.push($(this).text().trim());
        });
        var index = $.inArray(formObject.name, roleNameArray);
        if(index > -1) {
            alert(formObject.name + ' exists, please add another role!');
            return;
        }
        //检查是否存在，如果存在要弹窗提示，否则才添加
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

    
});


