// JavaScript Document
var totalMB = 0;
var t1 = 0;
var t2 = 0;
var t3 = 0;
var t4 = 0;
var t5 = 0;
var t6 = 0;
var t7 = 0;
var t8 = 0;


function changeGauge(valor) {
	$("#gauge-0").attr("value",valor);
	$('#gauge-0').gauge('refresh');
};


function updateValues() {
   totalMB = t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8;
   changeGauge(totalMB);	
};


$("#b-email").live("change" , function() {
	t1 = ((($( "#b-email" ).val() * 20 * 30)/1024)/1024)
	updateValues();
});

$("#b-web").live("change" , function() {
	t2 = ((($( "#b-web" ).val() * 180 * 30)/1024)/1024)
	updateValues();
});

$("#b-social").live("change" , function() {
	t3 = ((($( "#b-social" ).val() * 500 * 30)/1024)/1024)
	updateValues();
});

$("#b-photo").live("change" , function() {
	t4 = ((($( "#b-photo" ).val() * 350 * 30)/1024)/1024)
	updateValues();
});

$("#b-attach").live("change" , function() {
	t5 = ((($( "#b-attach" ).val() * 300 * 30)/1024)/1024)
	updateValues();
});

$("#b-music").live("change" , function() {
	t6 = ((($( "#b-music" ).val() * 500 * 30)/1024)/1024)
	updateValues();
});

$("#b-video").live("change" , function() {
	t7 = ((($( "#b-video" ).val() * 2000 * 30)/1024)/1024)
	updateValues();
});

$("#b-apps").live("change" , function() {
	t8 = ((($( "#b-apps" ).val() * 4000 * 30)/1024)/1024)
	updateValues();
});