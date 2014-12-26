var nameError,emailError = true;
$(document).ready(function(){

    if(location.href.match('signup-error')) {
        $("div#signup-error").fadeIn();
    }

    if(location.href.match('action=unsubscribe')) {
        id = location.href.split('id=')[1];
        $("input[name=unsubscribe]").attr('rel',id);
        popup("popUpDiv");
    }

    $('.jcarousel').jcarousel({
        wrap: 'circular',
        animation: {
            duration: 500,
            easing:   'linear'
        }
    });

    $('.jcarousel-mobile').jcarousel({
        wrap: 'circular',
        animation: {
            duration: 500,
            easing:   'linear'
        }
    });

    $('.jcarousel').jcarouselAutoscroll({
        interval: 3000
    });

    $('.arrow_left').click(function() {
        $('.jcarousel').jcarousel('scroll', '-=1');
    });

    $('.arrow_right').click(function() {
        $('.jcarousel').jcarousel('scroll', '+=1');
    });

    $("input[name=cancel-popup]").click(function(){
        popup("popUpDiv");
        return false;
    });

    $("input[name=unsubscribe]").click(function(){
        id = $("input[name=unsubscribe]").attr('rel');
        $.ajax({
            type: "POST",
            async: false,
            url: 'http://ofunnelservice.cloudapp.net/OFunnelService/AlertService.svc/setEmailFrequencyPreferences',
            data: {userId : id, emailType : "ALERT", emailFrequency : "UNSUBSCRIBE" },
            success: function(result) {
                console.log(error);
            },
            error: function(error) {
                console.log(error);
            }
       });
       popup("popUpDiv");
       return false;
    });

    $("#close-error").click(function(){
        $("#signup-error").fadeOut();
    });

    $("#close").click(function(){
        $("#thankyou").fadeOut();
    });

    $("div.mobile-top-menu").click(function() {
        $('ul.menu-list-box').show();
        $('div.mobile-top-menu').removeClass('mobile-top-normal');
        $('div.mobile-top-menu').addClass('mobile-top-hover');
    });

    $(document).mouseup(function (e)
    {
        var container = $("div.mobile-top-menu");

        if (container.has(e.target).length === 0)
        {
            $('ul.menu-list-box').hide();
            $('div.mobile-top-menu').removeClass('mobile-top-hover');
            $('div.mobile-top-menu').addClass('mobile-top-normal');
        }
    });

    $('form.signup-submit').click(function(event) {
        var userName = $('form.signup-submit').find('input[name=userName]').val();
        var email = $('form.signup-submit').find('input[name=email]').val();
        if (userName.match(/\S/)) {
            $('span#web-name-error').hide();
            nameError = true;
        }
        else {
            $('span#web-name-error').show();
            nameError = false;
        }
        if(email.match(/\S/) && email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
            $('span#web-email-error').hide();
            emailError = true;
        }
        else {
            $('span#web-email-error').show();
            emailError = false;
        }
        if(nameError && emailError) {
            $.ajax({
                type: "POST",
                async: false,
                url: 'http://ofunnelservice.cloudapp.net/OFunnelService/UserService.svc/addSignUpUser',
                data: $(this).serialize(),
                success: function(result) {
                    console.log(result);
                },
                error: function(error) {
                    console.log(error);
                }
            });
            $('input.input').val("");
            $("#thankyou").fadeIn();
        }
        return false;
    });

    $('form.signup-submit-mobile').click(function(event) {
        var userName = $('form.signup-submit-mobile').find('input[name=userName]').val();
        var email = $('form.signup-submit-mobile').find('input[name=email]').val();
        if (userName.match(/\S/)) {
            $('span#mobile-name-error').hide();
            nameError = true;
        }
        else {
            $('span#mobile-name-error').show();
            nameError = false;
        }
        if(email.match(/\S/) && email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
            $('span#mobile-email-error').hide();
            emailError = true;
        }
        else {
            $('span#mobile-email-error').show();
            emailError = false;
        }
        if(nameError && emailError) {
            $.ajax({
                type: "POST",
                async: false,
                url: 'http://ofunnelservice.cloudapp.net/OFunnelService/UserService.svc/addSignUpUser',
                data: $(this).serialize(),
                success: function(result) {
                    console.log(result);
                },
                error: function(error) {
                    console.log(error);
                }
            });
            $('input.input').val("");
            $("#thankyou").fadeIn();
        }
        return false;
    });
});

// JavaScript Document

function toggle(div_id) {
	var el = document.getElementById(div_id);
	if ( el.style.display == 'none' ) {	el.style.display = 'block';}
	else {el.style.display = 'none';}
}
function blanket_size(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportheight = window.innerHeight;
	} else {
		viewportheight = document.documentElement.clientHeight;
	}
	if ((viewportheight > document.body.parentNode.scrollHeight) && (viewportheight > document.body.parentNode.clientHeight)) {
		blanket_height = viewportheight;
	} else {
		if (document.body.parentNode.clientHeight > document.body.parentNode.scrollHeight) {
			blanket_height = document.body.parentNode.clientHeight;
		} else {
			blanket_height = document.body.parentNode.scrollHeight;
		}
	}
	var blanket = document.getElementById('blanket');
	blanket.style.height = blanket_height + 'px';
	var popUpDiv = document.getElementById(popUpDivVar);
	popUpDiv_height=blanket_height/2-200;//100 is half popup's height
	popUpDiv.style.top = popUpDiv_height + 'px';
}
function window_pos(popUpDivVar) {
	if (typeof window.innerWidth != 'undefined') {
		viewportwidth = window.innerHeight;
	} else {
		viewportwidth = document.documentElement.clientHeight;
	}
	if ((viewportwidth > document.body.parentNode.scrollWidth) && (viewportwidth > document.body.parentNode.clientWidth)) {
		window_width = viewportwidth;
	} else {
		if (document.body.parentNode.clientWidth > document.body.parentNode.scrollWidth) {
			window_width = document.body.parentNode.clientWidth;
		} else {
			window_width = document.body.parentNode.scrollWidth;
		}
	}
	var popUpDiv = document.getElementById(popUpDivVar);
	window_width=window_width/2-250;//250 is half popup's width
	popUpDiv.style.left = window_width + 'px';
}
function popup(windowname) {
	blanket_size(windowname);
	window_pos(windowname);
	toggle('blanket');
	toggle(windowname);		
}
