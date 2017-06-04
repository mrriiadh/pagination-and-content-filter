// Add the search bar to the header
var studentSearch = '<div class="student-search"><input id="search" placeholder="Search for students..."><button id="search-button">Search</button></div>';
$('.page-header').append(studentSearch);

// Search bar event handlers
$('#search-button').on('click', searchList);

// pagination HTML
var pagination = '<div class="pagination"><ul></ul></div>';

// Select all student items and store in $allStudents
var $allStudents = $('.student-item');

// a variable that contains a function
// the variable will be given as an argument later on 
// to showPage() and appendPageLinks() functions
var listsOf10 = pagesOf10($allStudents);



// function definitions

// pagesOf10() is a function that creates an array of pages that 
// contain a max of 10 students each
function pagesOf10 (studentList){
	var duplicateList = studentList.slice(0);
	var pagesArray = [];

	while (duplicateList.length){
		pagesArray.push(duplicateList.splice(0, 10));
	}
	return pagesArray;
} // end pagesOf10() function


// showPage displays lists of 10 students depending on page number
function showPage(pageNumber, studentList){
	//Hide all students on the page
	$allStudents.hide();

	// Then loop through all students in our student list argument
	$.each(studentList, function(index, page){
		// if student should be on this page number
		if (pageNumber === index) {
			// show the student
			$.each(page, function(i, listItem){
                $(listItem).fadeIn('slow');
            });
		}
	});
} // end showPage() function

// appendPageLinks() takes listsOf10 as argument to create and append 
// pagination
function appendPageLinks(studentList){
	// Append pagination to the page
	$('.page').append(pagination);

	// determine how many pages for this student list 
	//studentList is pagesOf10() *array*
	//numberOfPages = studentList.length = pagesArray.length
	var numberOfPages = studentList.length; 

	// “for” every page
	for (var i = 1; i <= numberOfPages; i++) {
		// add a page link to the page link section
		var paginationLink = '<li><a class="pagination-link" href="#">' + i + '</a></li>';
		$('.pagination ul').append(paginationLink);
	}

	$('.pagination-link').first().addClass('active');
    
    // define what happens when you click a link
    $('.pagination-link').on('click', function(e){
    	var pageNumber = parseInt($(this)[0].text) - 1;
        // Use the showPage function to display the page for the link clicked
    	showPage(pageNumber, studentList);
    	$(".pagination-link").removeClass('active');
        // mark that link as “active”
    	$(this).addClass('active');
    	e.preventDefault();
    });
} // end appendPageLinks() function

/*
The searchList() function takes a value from the input field, and compares it to each student in the list. If that value is found inside the name or email of a student, that student is added to a new "matched" list. If the "matched" list is empty, then display a message that no matching students were found. Otherwise, call the appendPageLinks function to create new pagination for the search results. Then call the showPage function to display the first page of matched results.
*/ 

// Search function  
function searchList() {
    
    // Obtain the value of the search input
    var searchInputVal = $('#search').val().toLowerCase();
    
    // remove the previous page link section    
    $('.pagination').remove();
    

    var filteredSet = $allStudents.filter(function(index){
    	// ...obtain the students' names…
    	var studentNames = $(this).find('h3').text();
		// ...and the students' emails…
    	var studentEmails = $(this).find('.email').text();

    	if (studentNames.indexOf(searchInputVal) > -1 || studentEmails.indexOf(searchInputVal) > -1) {
    		return true;
    	} else {
    		return false;
    	}
    }); // end filter(function())

    if (filteredSet.length === 0) {
    	$('.page-header h2').text('No Results');
    } else {
    	$('.page-header h2').text('STUDENTS');
    }

    var paginatedSearchResults = pagesOf10(filteredSet);
    if (filteredSet.length >= 10){
    	appendPageLinks(paginatedSearchResults);
    }
    showPage(0, paginatedSearchResults);
}

// Call functions
appendPageLinks(listsOf10);
showPage(0, listsOf10);
