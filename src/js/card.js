class Card{
    constructor(){
        this.addMenu();
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
}

new Card();