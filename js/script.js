	$(document).ready(function () {
    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // scroll-up button show/hide script
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });
    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });
    $('.navbar .menu li a').click(function () {
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });
    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
    $('#btnSendMessage').on("click",function () {
        var cust_name = $('#cust_name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();
		console.log(email+' CUST_NAME: '+name+' SUBJECT :'+subject+' MESSAGE:'+message);
		if(cust_name != null && cust_name !=''&& email != null && email != '' && subject != null && subject !='' && message != null && message != ''){

        var JSONObject = {
            cust_name: cust_name,
            email: email,
            subject: subject,
            message: message
        };

        $.ajax({
            type: 'POST',
            url: '/sendMessage',
            data: JSON.stringify(JSONObject),
            success:function(customer){
            alert('data saved');
            },
            error:function(){
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
        }
         
    });
    $('#btnDownload').on("click",function () {
    		 $.ajax({
    type: "POST",
    url: "/pdf/Fardeen_Mirza",
    xhrFields: {
        responseType: 'blob' // to avoid binary data being mangled on charset conversion
    },
    success: function(blob, status, xhr) {
        // check for a filename
        var filename = "";
        var disposition = xhr.getResponseHeader('Content-Disposition');
        if (disposition && disposition.indexOf('attachment') !== -1) {
            var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            var matches = filenameRegex.exec(disposition);
            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
        }

        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
            window.navigator.msSaveBlob(blob, filename);
        } else {
            var URL = window.URL || window.webkitURL;
            var downloadUrl = URL.createObjectURL(blob);

            if (filename) {
                // use HTML5 a[download] attribute to specify filename
                var a = document.createElement("a");
                // safari doesn't support this yet
                if (typeof a.download === 'undefined') {
                    window.location.href = downloadUrl;
                } else {
                    a.href = downloadUrl;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                }
            } else {
                window.location.href = downloadUrl;
            }

            setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
        }
    }
});
        
    
    });


});