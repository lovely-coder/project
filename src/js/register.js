class Register{
    constructor(){
        this.uname = document.querySelector('#uname');
        this.upwd = document.querySelector('#upwd');
        this.btn = document.querySelector('#btn');
        this.o_div = document.querySelectorAll('.error');
        this.sub = document.querySelector('#sub');
        this.arr = [false,false];
        this.addEvent();
    }
    addEvent(){
        let that = this;
        this.uname.onblur = function(){
            let re = /^1\d{10}$/;
            let str = this.value;
            if(re.test(str)){
                that.arr[0] = true;
                that.o_div[0].innerHTML = '';
            }else{
                that.arr[0] = false;
                that.o_div[0].innerHTML = '手机号好像不对哦';
            }
            if(str == ''){
                that.o_div[0].innerHTML = '这里还没有填呢';
            }
        }
        this.upwd.onblur = function(){
            let re = /^\w{6,16}$/;
            let str = this.value;
            if(re.test(str)){
                that.arr[1] = true;
                that.o_div[1].innerHTML = '';
            }else{
                that.arr[1] = false;
                that.o_div[1].innerHTML = '密码太短了,还不到6位呢';
            }
            if(str == ''){
                that.o_div[1].innerHTML = '这里还没有填呢';
            }
        }
        this.btn.onclick = function(){
            if(that.arr.indexOf(false) !== -1){
                alert('请完善注册信息');
            }else{
               let uname = that.uname.value;
               let upwd = that.upwd.value;
               let $ = new Tool();
               let cookie_str = $.getCookie('users') ? $.getCookie('users') : '';
                //转对象
                let cookie_obj = $.convertStrToObj(cookie_str);
                console.log(cookie_obj);
                //判断当前用户是否存在
                if(uname in cookie_obj){
                    alert('用户已存在');
                    return;
                }else{
                    cookie_obj[uname] = upwd;
                    //存入cookie
                    $.cookie('users',JSON.stringify(cookie_obj)
                    ,{expires : 9,path : '/'});
                    alert('注册成功');
                }
            }
        }
        this.sub.onclick = function(){
            location.href = 'login.html';
        }
    } 
    convertStrToObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }
}

   
new Register();