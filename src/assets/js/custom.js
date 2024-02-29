$(document).ready(function(){
	$('.more_data_item').click(function(){
		$('.extra_options').hide();
		$(this).next().show();
	});

	$('.close_extra_opt').click(function(){
		$(this).parents('.extra_options').hide();
	});

	$(".dropdown_item, .dropdown_item ~ i").click(function(){
		$('.custom_dropdown_wrapper').removeClass('active');
		$(this).parents('.custom_dropdown_wrapper').addClass("active");
	});

	$(".custom_dropdown li a").click(function(){
		var innerText = $(this).text();
		$(this).parent().parent().find('li').removeClass('active');
		$(this).parent().addClass('active');
		$(this).parents('.custom_dropdown_wrapper').find(".dropdown_item").val(innerText);
		$(this).parents('.custom_dropdown_wrapper').removeClass('active');
	});
});