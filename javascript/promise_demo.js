'use strict';

var job1 = new Promise(function (resolve, reject) {
    console.log('[0] start new Promise...');
    var timeOut = Math.random();
    setTimeout(function () {
        if (timeOut < 1) {   
            resolve('[0] 200 OK');
        }
        else {
            reject('[0] timeout in ' + timeOut + ' seconds.');
        }
    }, timeOut * 1000);
});


var job2 = new Promise(function (resolve, reject) {
    console.log('[1] start new Promise...');
    var timeOut = Math.random() * 2;
    setTimeout(function () {
        if (timeOut < 1) {   
            resolve('[1] 200 OK');
        }
        else {
            reject('[1] timeout in ' + timeOut + ' seconds.');
        }
    }, timeOut * 1000);
});

var job3 = new Promise(function (resolve, reject) {
    console.log('[2] start new Promise...');
    var timeOut = Math.random() * 2;
    setTimeout(function () {
        if (timeOut < 1) {   
            resolve('[2] 200 OK');
        }
        else {
            reject('[2] timeout in ' + timeOut + ' seconds.');
        }
    }, timeOut * 1000);
});

/*3个任务串行执行*/
job1.then(job2).then(job3).catch(function(err_msg){
    console.error(err_msg);
});