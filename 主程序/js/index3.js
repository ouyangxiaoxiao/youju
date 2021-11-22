window.onload = function (){
    console.log('点击生效了js')

    $('.a>li').click(function () {
        // console.log('a点击生效了')
        $(this).children().show()
        $(this).siblings().children('ul').hide()
        $(this).addClass('ok').siblings().removeClass('ok')


    });

    $('.b>li').click(function () {
        // console.log('b点击生效了')
        $(this).children().show()
        $(this).siblings().children('ul').hide()
        $(this).addClass('ok').siblings().removeClass('ok')
    });
    $('.c>li').click(function () {
        // console.log('c点击生效了')
        $(this).children().show()
        $(this).siblings().children('ul').hide()
        $(this).addClass('ok').siblings().removeClass('ok')
    });
    $('.d>li').click(function () {
        // console.log('d点击生效了')
        $(this).children().show()
        $(this).siblings().children('ul').hide()
        $(this).addClass('ok').siblings().removeClass('ok')
    });
    $('.e>li').click(function () {
        // console.log('e点击生效了')
        $(this).children().show()
        $(this).siblings().children('ul').hide()
        $(this).addClass('ok').siblings().removeClass('ok')
    });

    $('.f>li').click(function () {
        console.log('f点击生效了')
        $(this).children().show()
        $(this).siblings().children('ul').hide()
        $(this).addClass('ok').siblings().removeClass('ok')

        console.log('-----------以下是路径-----------')
        console.log($(this))
        name0 = ( $(this).parents('li').children('a')[0].innerHTML)
        name1 =( $(this).parents('li').children('a')[1].innerHTML)
        name2 =( $(this).parents('li').children('a')[2].innerHTML)
        name3 =( $(this).parents('li').children('a')[3].innerHTML)
        name4 =( $(this).parents('li').children('a')[4].innerHTML)
        namethis =($(this).children('a')[0].innerHTML)
        url = ("../"+name4+"/"+name3+"/"+name2+"/"+name1+"/"+name0+"/"+namethis)
        // self.location.href=url
        window.open (url,'newwindow','height=400,width=400,top=100,left=45%,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
        // window.open (url,'newwindow','height=400,width=400,top=100,left=45%,toolbar=yes,menubar=no,scrollbars=no, resizable=yes,location=yes, status=yes')


    });


    // $('.f>li').click(function (event) {
    //     console.log('f点击生效了')
    //     $(this).children().show()
    //     $(this).siblings().children('ul').hide()
    //     $(this).addClass('ok').siblings().removeClass('ok')
    //     // console.log(this.parentNode)
    //     // console.log(this.parentElement)
    //     name0 = ($('.ok').children('a'))[0].innerHTML
    //     name1 = ($('.ok').children('a'))[1].innerHTML
    //     name2 = ($('.ok').children('a'))[2].innerHTML
    //     name3 = ($('.ok').children('a'))[3].innerHTML
    //     name4 = ($('.ok').children('a'))[4].innerHTML
    //     name5 = ($('.ok').children('a'))[5].innerHTML
    //     // list2 = list2
    //     console.log(name0,name1,name2,name3,name3,name5)
    //     // console.log(this.parent.closest('ul'));
    // });

}