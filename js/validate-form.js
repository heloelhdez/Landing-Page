$(function(){
	$("#refreshCpt").click(function(){
        var tmp = new Date();
        var suffix = tmp.getTime();
  
        $("#siimage").attr('src', "formlib/captcha/captcha.php?r="+suffix);
        $('input#captcha').val('');
    });
    
    $("#contact-us").validate({
            rules: {
				captcha: {
                    required: true,
                    remote: "formlib/captcha/captcha.php"
                }
            },
            messages: {
				captcha: "Security code is required!"
            },
            //submitHandler: function() {
               /* alert("Correct captcha!");*/
            //},
            success: function(label) {
//            label.addClass("valid").text("Valid captcha!")
            },
			errorPlacement: function(error, element) {
				if (element.attr("name") == "inf_option_MonthlyMarketingBudget"){
					error.insertAfter(element.parents("div.infusion-radio"));
				}else {
            		error.insertAfter(element.parents(".item div")); // default function
				}
        	},
            onkeyup: false
    });
	
	$("#contact-us2").validate({
            rules: {
            },
            messages: {
            },
            //submitHandler: function() {
               /* alert("Correct captcha!");*/
            //},
            success: function(label) {
//            label.addClass("valid").text("Valid captcha!")
            },
			errorPlacement: function(error, element) {
				if (element.attr("name") == "inf_option_MonthlyMarketingBudget"){
					error.insertAfter(element.parents("div.infusion-radio"));
				}else {
            		error.insertAfter(element.parents(".input-form div")); // default function
				}
        	},
            onkeyup: false
    });
	
	$("#infusionformcareers").validate({
            rules: {
            },
            messages: {
            },
            //submitHandler: function() {
               /* alert("Correct captcha!");*/
            //},
            success: function(label) {
//            label.addClass("valid").text("Valid captcha!")
            },
			errorPlacement: function(error, element) {
				if (element.attr("name") == "inf_option_MonthlyMarketingBudget"){
					error.insertAfter(element.parents("div.infusion-radio"));
				}else if(element.attr("name") == "inf_custom_WhydoyouwanttojointheWebProfitsteam") {
            		error.insertAfter(element.parents("div.input-message-big")); // default function
				}
				
				else if(element.is("textarea")) {
            		error.insertAfter(element.parents("div.input-message")); // default function
				}
				
				else {
            		error.insertAfter(element.parents("div.input-small")); // default function
				}
        	},
            onkeyup: false
    });
	
});
