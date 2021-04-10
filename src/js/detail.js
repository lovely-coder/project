class Detail{
    constructor(){
        //获取加入购物车按钮
        this.add_btn = document.querySelectorAll('button');
        //添加事件
        this.addEvent();
        this.init();
        this.addMenu();
        this.getPic();
    }
    addMenu(){
        let $a = $('.nav a');
        let $menu = $('#menu');
        $.get('../json/index.json',(data) =>{
            console.log(data.menu1);
            var menu = data.menu1;
            var menu1 = menu.sp1;
            var menus = data.sp2;
            var menu2 = menus.one;
            console.log(menu2);
            //console.log(menu1);
            $(menu1).each(function(index,value){
                $("<li>" + menu1[index] + "</li>").appendTo('.one');
            })
            $(menu2).each(function(index,vlaue){
                $('<a herf="">' + menu2[index] + "</a>").appendTo('.two');
            })
            $a.each(function(index,value){
                $(this).mouseenter(function(){
                    $(this).eq(index).css('border-bottom','5px solid blue');
                    $menu.css('display','block');
                })
            })
            $menu.mouseout(function(){
                $(this).css('display','none')
            })
        })
        
    }
    addEvent(){
        let that = this;
        this.cart_btn.onclick = function(){
            window.open('http://localhost/haier2101/dist/pages/card.html');
        }
    }
    // getPic(){
    //     $.get('../json/index.json',(data) =>{
    //         console.log(data.big);
    //         var src1 = data.big;
    //         $(src1).each(function(index,value){
    //             $(`<li><img src=${value}></li>`).appendTo('.big_pic');
    //         })

    //     })
    //     $.get('../json/index.json',(data) =>{
    //         console.log(data.small);
    //         var src2 = data.small;
    //         $(src2).each(function(index,value){
    //             $(`<li><img src=${value}></li>`).appendTo('.small_pic');
    //         })
            
    //     })
    // }
}

new Detail();

