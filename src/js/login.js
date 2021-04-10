function Login(){
    //获取用户名
    this.uname = this.$get('#uname');
    this.upwd = this.$get('#upwd');
    this.sub = this.$get('#sub');
    this.arr = [false,false];
    this.o_p = document.querySelectorAll('.form p');
    this.addEvent();
    this.span = this.$get('.iconfont');
}
Login.prototype = {
    constructor : Login,
    $get(selector){
        return document.querySelector(selector);
    },
    addEvent(){
        let that = this;
        this.uname.onblur = function(){
            let re = /^1\d{10}$/;
            let uname = this.value;
            if(re.test(uname)){
                that.arr[0] = true;
                that.o_p[0].innerHTML = '';
            }else{
                that.arr[0] = false;
                that.o_p[0].innerHTML = '你的用户名不对哦';
            }
        }
        this.upwd.onblur = function(){
            let re = /^\w{6,16}$/;
            let pwd = this.value;
            if(re.test(pwd)){
                that.arr[1] = true;
                that.o_p[1].innerHTML ='';
            }else{
                that.arr[1] = false;
                that.o_p[1].innerHTML = '你的密码不对哦';
            }
        }
        this.sub.onclick = function(){
            if(that.arr.indexOf(false) !== -1){
                alert('请完善登录信息');
            }else{
                //后端
                let uname = that.uname.value;
                let upwd = that.upwd.value;
                let $ = new Tool();
                let cookie_str = $.getCookie('users') ? $.getCookie('users') : '';
                let cookie_obj = $.convertStrToObj(cookie_str);
                //判断当前用户是否存在
                if(uname in cookie_obj){
                    if(cookie_obj[uname] === upwd){
                        alert('登录成功');
                        window.open('http://localhost/haier2101/src/index.html');
                    }else{
                        alert('密码错误');
                    }
                   
                }else{
                    alert('用户名不存在');
                }
            }
        }
    }
}

new Login();