class List{
    constructor(){
        this.addEvent();
        this.init();
        this.add();
        this.addMenu();
        this.addClick();
    }
    addEvent(){
        var $product = $('#product');
        var $titBox = $('#titBox');
        var $span = $('.i_ice span');
        var $list = $('.list_ice');
        $.get('../json/index.json',(data) =>{
            console.log(data.list);
            var list = data.list;
            var list1 = list.list1;
            $(list1).each(function(index,value){
                $(`<a herf="#">${list1[index]}</a>`).appendTo('.list_ice');
            })
            $span.mouseenter(function(){
                $(this).css('color','#005aaa')
                $list.css('display','block');
                $product.css('background','#a3a3a3');
                $titBox.css('background','#a0a0a0');
                
            })
            $span.mouseout(function(){
                $(this).css('color','#111')
                $list.css('display','none')
                ;
                $product.css('background','#fff');
                $titBox.css('background','#fff');
            })
        })
    }
    init(){
        $.get('../json/index.json',(data) =>{
            console.log(data.pic);
            var pic1 = data.pic;
            $(pic1).each((index,value)=>{
                $(`<img src=${value.src}>
                <a href="" class="pro_tit">${value.tit}</a>
                <p class="code">${value.code}</p>
                <i class="price">参考价:<span>${value.price}</span></i>
                <p class="yi">
                    <a href="">${value.num}</a>
                    <i>家电商在售</i>
                    <span class="iconfont icon-xx"></span>
                    <a href="">${value.icon}</a>
                </p>
                <div class="laber">
                    <div class="laber_item">${value.label}</div>
                    <div class="laber_item">${value.label2}</div>`).appendTo(`.pro_box${index}`);
            })       
        });
    }
    add(){
        var $box = $('.pro_box');
        
        $box.each(function(index,value){
            //console.log(value);
            $(this).mouseenter(function(){
                $(this).css('border','1px solid #fafafa');
                $(this).css('box-shadow', '0 8px 10px rgba(0,0,0,.1)');
            });
            $(this).mousemove(function(){
                $(this).css('border','1px solid #fafafa');
                $(this).css('box-shadow', '0 8px 10px rgba(0,0,0,.1)');
            });
            $(this).mouseout(function(){
                $(this).css('border','none');
                $(this).css('box-shadow', 'none');
            });
        })
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
    addClick(){
        var $ice = $('.pro_box0');
        $ice.click(function(){
            window.open('http://localhost/haier2101/src/pages/detail.html');
        })
    }
}
new List();



$(function() {
    $("#pagination1").pagination({
        currentPage: 1,
        totalPage: 12,
        callback: function(current) {
            $("#current1").text(current)
        }
    });
});