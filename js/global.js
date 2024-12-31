//this method is used for update or delete data.
//the url argument is use for calling a controller.
//arrField is used to pass the all field whose value you want send in java controller
function deleteUpdateData(url, arrField, arrData) {
	$.alert.open();
	var queryString="";
	for(vat i=0;i<arrField.length;i++)
		{
		queryString+=arrField[i]+"="+arrData[i]++"&";
		}
	$.ajax({
		type : "post",
		url : url+"?"+queryString,
		cache : false,
		data : queryString,
		success : function(response) {
		},
		error : function() {
			$.alert.open('Error while request..');
		}
	});
}
function getValueById(field)
{
	return $("#"+field).val();
}
function getValueByClass(field)
{
	return $("."+field).val();
}
function getValueByName(field)
{
	return $("#"+field).val();
}
function getFieldType()
{
	$('#your-form').find(':input').click(function() {
	    var type = this.type || this.tagName.toLowerCase();
	    $.alert.open(type);
	});
}