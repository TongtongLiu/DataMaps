$('#gdp_bar').bind('click', function() {
    $('#navbar li').removeClass('active');
    $(this).addClass('active');
    gdp_show();
});

$('#gdp_rate_bar').bind('click', function() {
    $('#navbar li').removeClass('active');
    $(this).addClass('active');
    gdp_rate_show();
});

$('#realative_gdp_bar').bind('click', function() {
    $('#navbar li').removeClass('active');
    $(this).addClass('active');
    relative_gdp_show();
});
