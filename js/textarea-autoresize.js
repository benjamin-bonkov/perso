
    $('textarea').keyup(function(){
        $(this).css({
            overflow  'hidden',
            height  0,
        });
        $(this).css({
            height  $(this)[0].scrollHeight + 'px',
        });
    });