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
});


$('#yui-gen4-button').click(function () {
    var sumbitData = {};
    var formArray =$("#addRoleForm").serializeArray();
    $.each(formArray,function(i,item){
        formObject[item.name] = item.value;
    });

    $.ajax({
        url:'http://localhost:8080/role-strategy/rolesSubmit',
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
    htmlStr = template('tpl',formObject);
    $box.append(htmlStr);
});

