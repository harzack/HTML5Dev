// functions for editing Virtual Folders (using Browse View)

// Set the behaviour for the "Return to Save Changes" link
$(document).ready(function(){
	$("#saveVFChanges").click(function(){
		$("form[name=BrowseViewSaveVFForm]")[0].submit();
	});
});

