/**********************************
Purpose : Filter magic box choices
How : The magic boxes are created using a certain format. Get the input from the user, loop on the divs we have and fetch those that match and hide the others
***********************************/

/********** Settings *************/
var itemsPerPage = 5; //how many divs to display per page



/******** DO NOT EDIT ANYTHING BELOW THIS LINE .. plz? ***********/

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

var page=1;
var filter_page = 1;
var filter_smart_array = new Array();
var globalSizeOfFilteredChildren;
var globalNumPagesNormal;
var globalNumPagesFilter;

function filter_me(el){
	//get id from parent container
	var id = $(el).closest('.filter').attr('id').split("_")[0];
	//get the text in the text box
	var input = $(el).val();
	if(input.trim().length == 0){
		//loop on all divs located inside the id_content and show them.
		smart_pagination(id,page);
		hideFilterLinks(id);
	}
	else
	{	
		hideNormalLinks(id);
		//showFilterLinks(id);
		//loop on all divs that are located inside the div : id_content and hide them if does not contain the input ..
		$("#"+id+"_content > div").filter(function(index) {
			var inputCased = input.toLowerCase();
			var test = $(this).text().toLowerCase().split(inputCased);
			//to show the result even if not in the current page after applying the pagination
			if(test.length != 1) $(this).show();
			return test.length == 1;
		}).hide();
		filter_smart_pagination(id,filter_page,false);
	}
}

function smart_pagination(el, view_page){
	var id = el;
	if($(el).closest('.filter').attr('id')!=null)
		id = $(el).closest('.filter').attr('id').split('_')[0];
	/**************************
	 * id : the id of the parent div to be paginated
	 * view_page : pages 1 2 3 ..etc.
	 ***************************/
	/********** Do not edit anything below this line ******/
	//CHECKS
	var sizeOfChildren = $("#"+id+"_content > div").size();
	var numPages = Math.floor(sizeOfChildren/ itemsPerPage);
	var extraItems = !((sizeOfChildren % itemsPerPage) == 0); //whether there are items to be added in an extra page
	if(extraItems)
		numPages++;
	globalNumPagesNormal = numPages;
	if(view_page<1)
	{
		page++;
	}
	else if(view_page>numPages){
		page--;
	}
	else
	{
		//First of all get all "shown" divs and store them in the smart_array
		var smart_array = new Array();
		var i = 0;
			$("#"+id+"_content > div").show();
			$("#"+id+"_content > div").each(function(index){
				smart_array[i] = this;
				$(this).hide();
				i++;
			});
		
		//Now display only those in the current page
		view_page--;//if page 1, the starting index should be zero (array ba2a)
		var starting_index = view_page * itemsPerPage;
		var j = 1;//counter
		while(j<= itemsPerPage){
			$(smart_array[starting_index]).show();
			starting_index++;
			j++;
		}
		view_page++;
		if(view_page == numPages){
			$("#"+id+" .normalLinkn").hide();
		}
		else{
			if($("#"+id+" .normalLinkn").is(":hidden"))
				$("#"+id+" .normalLinkn").show();
		}
		if(view_page == 1){
			$("#"+id+" .normalLinkp").hide();
		}
		else{
			if($("#"+id+" .normalLinkp").is(":hidden"))
				$("#"+id+" .normalLinkp").show();
		}
	}
	updatePageNumbers(id);
}

function filter_smart_pagination(el,view_page, nextPrevious){
	var id = el;
	if($(el).closest('.filter').attr('id')!=null)
		id = $(el).closest('.filter').attr('id').split('_')[0];
	if(!nextPrevious)
	{
		var sizeOfFilteredChildren = $("#"+id+"_content > div").filter(":visible").size();
		globalSizeOfFilteredChildren = sizeOfFilteredChildren;
	}
	var numPages = Math.floor(globalSizeOfFilteredChildren/ itemsPerPage);
	var extraItems = !((globalSizeOfFilteredChildren % itemsPerPage) == 0); //whether there are items to be added in an extra page
	if(extraItems)
		numPages++;
	globalNumPagesFilter = numPages;
	if(view_page<1)
	{
		filter_page++;
	}
	else if(view_page>numPages){
		filter_page--;
	}
	else
	{
		if(!nextPrevious)
		{
			var i = 0;
			filter_page=1;
			filter_smart_array = new Array();
			$("#"+id+"_content > div").filter(":visible").each(function(index){
				filter_smart_array[i] = this;
				$(this).hide();
				i++;
			});
		}
		
		//Now display only those in the current page
		view_page--;//if page 1, the starting index should be zero (array ba2a)
		var starting_index = view_page * itemsPerPage;
		var j = 1;//counter
		$(filter_smart_array).each(function(index){ $(this).hide(); });
		while(j<= itemsPerPage){
			$(filter_smart_array[starting_index]).show();
			starting_index++;
			j++;
		}
		view_page++;
		if(view_page == numPages){
			$("#"+id+" .filterLinkn").hide();
		}
		else{
			if($("#"+id+" .filterLinkn").is(":hidden"))
				$("#"+id+" .filterLinkn").show();
		}
		if(view_page == 1){
			$("#"+id+" .filterLinkp").hide();
		}
		else{
			if($("#"+id+" .filterLinkp").is(":hidden"))
				$("#"+id+" .filterLinkp").show();
		}
	}
	updatePageNumbersFilter(id);
}

function nextPage(id,page){
	smart_pagination(id,page);
}

function previousPage(id,page){
	smart_pagination(id,page);
}

function nextFilterPage(id){
	filter_smart_pagination(id,filter_page,true);
}
function previousFilterPage(id){
	filter_smart_pagination(id,filter_page, true);
}

function hideNormalLinks(id){
	$("#"+id+" .normalLinkn").hide();
	$("#"+id+" .normalLinkp").hide();
}

function showNormalLinks(id){
	$("#"+id+" .normalLinkn").show();
	$("#"+id+" .normalLinkp").show();
}

function hideFilterLinks(id){
	$("#"+id+" .filterLinkn").hide();
	$("#"+id+" .filterLinkp").hide();
}

function showFilterLinks(id){
	$("#"+id+" .filterLinkn").show();
	$("#"+id+" .filterLinkp").show();
}

function updatePageNumbers(id){
	$("#"+id+" .numPages").text(page+"/"+globalNumPagesNormal);
}

function updatePageNumbersFilter(id){
	$("#"+id+" .numPages").text(filter_page+"/"+globalNumPagesFilter);
}