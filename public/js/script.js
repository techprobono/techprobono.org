$(document).ready(function() {

    var documentHeight = $(document).height();

    var toggleForm = function(box) {
        if(box.is(":visible")) {
            box.slideUp();
        } else {
            box.slideDown();
        }
        return false;
    };

    $("#techformdiv").slideUp();
    $("#goodcauseformdiv").slideUp();

    $("#revealTechform").click(function(){
        toggleForm($("#techformdiv"));
    });

    $("#revealCausesform").click(function(){
        toggleForm($("#goodcauseformdiv"))
    });

    $('#good_cause_button').click(function(){
            var top = $('#forgood').offset().top;
            $('html,body').animate({scrollTop: documentHeight}, 800);
    });

    $('#tech_button').click(function(){
            var top = $('#fortech').offset().top;
            $('html,body').animate({scrollTop: top}, 800);
    });

    $('#closetech').click(function(){
        toggleForm($("#techformdiv"));
    });

    var createTechListItem = function (e) {
        var span;
        if(e.keyCode && (e.keyCode === 13) && (e.target.value.length > 1)){
            span = document.createElement("SPAN");
            span.innerHTML = e.target.value;
            span.id = "tech_" + e.target.value.replace(/ /g, "_#_");
            span.className = "editable";
            e.target.parentNode.insertBefore(span, e.target);
            e.target.placeholder = "add more skills";
            e.target.value = "";
        }
    };
    $('#skillslist').click(function(e) {
        var elementID = "";
        if(e.target.tagName.toUpperCase() === "SPAN"){
            elementID = "tech_" + e.target.innerHTML.replace(/ /g, "_#_");
            $("[id="+ elementID +"]").remove();
        }
    });

    $('#skillslist input').keyup(function(e){
        e.preventDefault();
        createTechListItem(e);
    });
    $('#skillslist input').blur(function(e){
        e.preventDefault();
        createTechListItem(e);
    });

    $('#techform').submit(function(e){
        e.preventDefault();
    });

    $("#submitgoodcause").click(function(event) {
        event.preventDefault();
        var inputs = $('#goodcauseform input');
        var serialised = [];
        inputs.each(function(i){
            serialised.push("" + inputs[i].name + "=" + encodeURIComponent(inputs[i].value));
        });
        var query = serialised.join("&");

        $.ajax({
            type: "POST",
            url: "goodcause/create",
            data: query,
            success: function(json){
                $('#progress').slideDown();
                var response = json;
                if(response.error) {
                    switch(response.error) {
                        case "already_registered":
                            $('#reportGoodCause').html("<h3>Oops</h3><p>It looks like you've already signed up with that email address! Please be patient, we'll be in touch soon!</p>").slideDown();
                        break;
                        case "noemail":
                            $('#reportGoodCause').html("<h3>Oops</h3><p>Please try again with a valid email address so we can keep you posted</p>").slideDown();
                        break;
                    }
                } else {
                    $('#reportGoodCause').html("<h3>Thank you!</h3><p>We'll be in touch soon!</p>").slideDown();
                    $('#progress').slideUp();
                }
            }
        });
    });


/* andrei! Please don't multiline comment like this. Just do a /* at the start and an * / at the very end
    putting each line on a / /  is specific to your Text editor / IDE. Makes it a pain in the butt for
    people on a different one!
    Thank you! */

/*    $("#submitech").click(function(event) {*/
        //event.preventDefault();
        //var skills = [];
        //var inputs = $('#techform input');
        //$('#skillslist span').each(function(i, obj){
            //skills.push(obj.innerHTML);
        //})
        //$('#skills').val(skills.join(","));
        //var serialised = [];

        //if ($("#github")[0].value && $("#github")[0].value.indexOf("//") !== -1){
            //$("#github")[0].value = $("#github")[0].value.split("//")[1];
        //}
        //inputs.each(function(i){
            //serialised.push("" + inputs[i].name + "=" + encodeURIComponent(inputs[i].value));
        //});

        //var query = serialised.join("&");
    /*});*/
});
