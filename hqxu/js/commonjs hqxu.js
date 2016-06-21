/*
* Elib 4.0 JavaScript v0.0.1
* Copyright 2014, TonyQ[HqXu]
* http://e.library.sh.cn/elib4
* 
* Date: 2014/10/10
*/
(function() {
    //定义shlib全局变量
    shlib = function() {
        return this;
    };
    //扩展
    shlib.extend = function() {
        var arg = arguments,
        len = arg.length;
        if (this === shlib) { //作为方法扩展，如果只有一个参数扩展本身
            if (len === 1) dest = shlib,
            i = 0; //扩展shlib类
            else dest = arg[0],
            i = 1;
        } else { //扩展引用对象本身
            dest = this,
            i = 0;
        }
        for (i; i < len; i++) {
            for (var p in arg[i]) {
                dest[p] = arg[i][p]; //dest属性最低
            }
        }
        return dest;
    };
    //默认值，修改调用
    var defaults = {
        shlibaskno: '0',
        password: '0',
        shlibuid: '0',
        username: '0',
    }
    //定义shlib.doCall跨域获取json模块
    shlib.doCall = function(url) {
        var script = document.getElementById('ScriptId');
        if (script) {
            document.getElementsByTagName("head")[0].removeChild(script);
            script = null;
        }
        script = document.createElement("script");
        script.type = "text/javascript";
        script.id = "ScriptId";
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    //执行url分析结果
    shlib.GetQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return r[2];
    }
    //字符串截取
    shlib.subString = function(str, len, hasDot) {
        var newLength = 0;
        var newStr = "";
        var chineseRegex = /[^\x00-\xff]/g;
        var singleChar = "";
        var strLength = str.replace(chineseRegex, "**").length;
        for (var i = 0; i < strLength; i++) {
            singleChar = str.charAt(i).toString();
            if (singleChar.match(chineseRegex) != null) {
                newLength += 2;
            } else {
                newLength++;
            }
            if (newLength > len) {
                break;
            }
            newStr += singleChar;
        }

        if (hasDot && strLength > len) {
            newStr += "...";
        }
        return newStr;
    }
    //随机函数
    shlib.randomnum = function(numMin, numMax) {
        return Math.floor(Math.random() * numMax) + numMin;
    };
    //日期比较(yyyy-mm-dd)
    shlib.difftime = function(a) {
        var arr = a.split("-");
        var lktime = new Date(arr[0], arr[1], arr[2]);
        var lktimes = lktime.getTime();

        var myDate = new Date();
        var nowdate = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
        var arrs = nowdate.split("-");
        var starttime = new Date(arrs[0], arrs[1], arrs[2]);
        var starttimes = starttime.getTime();

        //alert((lktimes-starttimes)/1000/3600/24);
        if ((lktimes - starttimes) / 1000 / 3600 / 24 <= 0) {
            return "red";
        } else if ((lktimes - starttimes) / 1000 / 3600 / 24 <= 9) {
            return "yellow";
        } else return "green";
    }

    //定义cookie模块
    //会话结束过期cookie
    shlib.setcookie = function(name, value) {
        tempexp = ""; //会话结束过期
        document.cookie = name + "_find=" + escape(value) + ";path=/;expires=" + tempexp;
    }
    //30天后过期cookie
    shlib.setcookie_30days = function(name, value) {
        var Days = 30; //此 cookie 将被保存 30 天
        var exp = new Date(); //new Date("December 31, 9998");
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        exp.setTime(exp.getTime() + Days * 10 * 1000);
        tempexp = exp.toGMTString();
        document.cookie = name + "_find=" + escape(value) + ";path=/;expires=" + tempexp;
    }
    //14天后过期cookie
    shlib.setcookie_14days = function(name, value) {
        var Days = 14; //此 cookie 将被保存 14 天
        var exp = new Date(); //new Date("December 31, 9998");
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        exp.setTime(exp.getTime() + Days * 10 * 1000);
        tempexp = exp.toGMTString();
        document.cookie = name + "_find=" + escape(value) + ";path=/;expires=" + tempexp;
    }
    //删除cookie
    shlib.delcookie = function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = shlib.getcookie(name);
        if (cval != null) document.cookie = name + "_find=" + cval + ";path=/;expires=" + exp.toGMTString();
    }
    //调取cookie
    shlib.getcookie = function(objName) { //获取指定名称的cookie的值
        var arrStr = document.cookie.split("; ");
        for (var i = 0; i < arrStr.length; i++) {
            var temp = arrStr[i].split("=");
            if (temp[0] == (objName + "_find")) return unescape(temp[1]);
        }
    }
    //检测cookie判断是否登录
    shlib.checkcookie = function() {
        defaults.shlibaskno = shlib.getcookie("shlibaskno");
        defaults.password = shlib.getcookie("password");
        defaults.shlibuid = shlib.getcookie("shlibuid");
        defaults.username = decodeURIComponent(shlib.getcookie("username"));
        if (defaults.shlibaskno && defaults.password && defaults.shlibuid && defaults.username) {

		} else {

		}
    }

})();