$(document).ready(function() {
  const apiRoot = 'https://arcane-journey-53568.herokuapp.com/v1/';
  const trelloApiRoot = 'https://afternoon-falls-74366.herokuapp.com/v1/trello/';
  const datatableRowTemplate3 = $('[data-datatable-row-template3]').children()[0];
  const datatableRowTemplate2 = $('[data-datatable-row-template2]').children()[0];
  const datatableRowTemplate = $('[data-datatable-row-template]').children()[0];
  const $tasksContainer = $('[data-tasks-container]');
  const $tasksContainer2 = $('[data-tasks-container2]');
  const $tasksContainer3 = $('[data-tasks-container3]');

  var availableReaders = {};
  var availableBooks = {};
  var availableBoards = {};
  var availableTasks = {};

  // init

  getAllReaders();
  getAllBooks();
  getAllTasks();
  
  function getAllAvailableBoards(callback, callbackArgs) {
    var requestUrl = apiRoot + 'readers';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      contentType: 'application/json',
      success: function(boards) { callback(callbackArgs, boards); }
    });
  }
  
    function getAllAvailableBooks(callback, callbackArgs) {
    var requestUrl = apiRoot + 'booksAvialable';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      contentType: 'application/json',
      success: function(boards3) { callback(callbackArgs, boards3); }
    });
  }

  function createElement(data) {
    const element = $(datatableRowTemplate).clone();

    element.attr('data-task-id', data.id);
    element.find('[data-task-name-section] [data-task-name-paragraph]').text(data.title);
    element.find('[data-task-name-section] [data-task-name-input]').val(data.title);

    element.find('[data-task-content-section] [data-task-content-paragraph]').text(data.name);
    element.find('[data-task-content-section] [data-task-content-input]').val(data.name);

	element.find('[data-task-reader-section] [data-task-reader-paragraph]').text(data.reader);
    element.find('[data-task-reader-section] [data-task-reader-input]').val(data.reader);
	
	element.find('[data-task-bookCopy-section] [data-task-bookCopy-paragraph]').text(data.book_copy);
    element.find('[data-task-bookCopy-section] [data-task-bookCopy-input]').val(data.book_copy);
	
    element.find('[data-task-book-section] [data-task-book-paragraph]').text(data.book);
    element.find('[data-task-book-section] [data-task-book-input]').val(data.book);
	
	element.find('[data-task-created-section] [data-task-created-paragraph]').text(data.created_date);
    element.find('[data-task-created-section] [data-task-created-input]').val(data.created_date);
	
	element.find('[data-task-return-section] [data-task-return-paragraph]').text(data.return_date);
    element.find('[data-task-return-section] [data-task-return-input]').val(data.return_date);
	
    return element;
  }
  
    function createElement2(data) {
    const element2 = $(datatableRowTemplate2).clone();

    element2.attr('data-task-id2', data.id);

    return element2;
  }
      function createElement3(data) {
    const element2 = $(datatableRowTemplate3).clone();

    element2.attr('data-task-id3', data.id);

    return element2;
  }
  

  function prepareBoardOrListSelectOptions(availableChoices) {
    return availableChoices.map(function(choice) {
      return $('<option>')
                .addClass('crud-select__option')
                .val(choice.id)
                .text(choice.firstName.concat(" ").concat(choice.lastName) || 'Unknown name')
    });
  }
  
    function prepareBoardOrListSelectOptions3(availableChoices) {
    return availableChoices.map(function(choice) {
      return $('<option>')
                .addClass('crud-select__option')
				.val(choice.copy_id)
				.text(choice.author.concat(" ").concat(choice.title).concat(" ").concat(choice.publication_date).concat(" ")|| 'Unknown name')
    });
  }

  function handleDatatableRender(taskData, boards) {
    $tasksContainer.empty();
    boards.forEach(board => {
      availableBoards[board.id] = board;
    });

    taskData.forEach(function(task) {
      var $datatableRowEl = createElement(task);
      var $availableBoardsOptionElements = prepareBoardOrListSelectOptions(boards);

      $datatableRowEl.find('[data-board-name-select]')
        .append($availableBoardsOptionElements);

      $datatableRowEl
        .appendTo($tasksContainer);
    });
  }
  
    function handleDatatableRender2(taskData, boards) {
    $tasksContainer2.empty();
		boards.forEach(board => {
      availableBoards[board.id] = board;
    });


    //taskData.forEach(function(task) {
      var $datatableRowEl = createElement2(taskData);
      var $availableBoardsOptionElements = prepareBoardOrListSelectOptions(boards);
		
      $datatableRowEl.find('[data-board-name-select2]')
        .append($availableBoardsOptionElements);	

      $datatableRowEl
        .appendTo($tasksContainer2);
		
    //})
	;
  }
  
      function handleDatatableRender3(taskData, boards) {
    $tasksContainer3.empty();
		boards.forEach(board => {
      availableBooks[board.id] = board;
    });

    //taskData.forEach(function(task) {
      var $datatableRowEl = createElement3(taskData);
      var $availableBoardsOptionElements = prepareBoardOrListSelectOptions3(boards);

      $datatableRowEl.find('[data-board-name-select3]')
        .append($availableBoardsOptionElements);

      $datatableRowEl
        .appendTo($tasksContainer3);
    //})
	;
  }

  function getAllReaders() {
    const requestUrl = apiRoot + 'readers';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      contentType: "application/json",
      success: function(tasks) {
        tasks.forEach(task => {
          availableReaders[task.id] = task;
        });

        getAllAvailableBoards(handleDatatableRender2, tasks);
      }
    });
  }
  
    function getAllBooks() {
    const requestUrl = apiRoot + 'booksAvialable';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      contentType: "application/json",
      success: function(tasks) {
        tasks.forEach(task => {
          availableBooks[task.id] = task;
        });

        getAllAvailableBooks(handleDatatableRender3, tasks);
      }
    });
  }
  
  function getAllTasks() {
    const requestUrl = apiRoot + 'booksBorrowed';

    $.ajax({
      url: requestUrl,
      method: 'GET',
      contentType: "application/json",
      success: function(tasks) {
        tasks.forEach(task => {
          availableTasks[task.id] = task;
        });

        getAllAvailableBoards(handleDatatableRender, tasks);
      }
    });
  }

  function handleTaskUpdateRequest() {
    var parentEl = $(this).parents('[data-task-id]');
    var taskId = parentEl.attr('data-task-id');
    var taskTitle = parentEl.find('[data-task-name-input]').val();
    var taskContent = parentEl.find('[data-task-content-input]').val();
	var taskReader = parentEl.find('[data-task-reader-input]').val();
    var taskBookCopy = parentEl.find('[data-task-bookCopy-input]').val();
	var taskBook = parentEl.find('[data-task-book-input]').val();
	var taskCreated = parentEl.find('[data-task-created-input]').val();
	//var taskCreatedDate = taskCreated.substring(0, 10);
	var taskReturn = parentEl.find('[data-task-return-input]').val();
	var requestUrl = apiRoot + 'returnBookCopy';
	
    if (!taskReturn) {
      alert('Return Date cannot be empty or ivalid Date!');
      return;
    }
	
    $.ajax({
      url: requestUrl,
      method: "PUT",
      processData: false,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
		id:taskId,
		reader: {
		id: taskReader
	},
	bookCopy: {
		"id": taskBookCopy,
		"bookTitle": {
			"id": taskBook
		},
		status: "free"
	},
	 createdDate: taskCreated,
	 returndDate: taskReturn
      }),
	        //success: function(data) {
        //parentEl.attr('data-task-id', data.id).toggleClass('datatable__row--editing');
        //parentEl.find('[data-task-name-paragraph]').text(taskTitle);
        //parentEl.find('[data-task-content-paragraph]').text(taskContent);
		//parentEl.find('[data-task-content-paragraph]').text(taskCreated);
		//parentEl.find('[data-task-return-paragraph]').text(taskReturn);
		//parentEl.find('[data-task-reader-paragraph]').text(taskReader);
		//parentEl.find('[data-task-bookCopy-paragraph]').text(taskBookCopy);
        // }	
      //}
	  complete: function(data) {
         if(data.status === 200) {
		   window.location.reload(true);
		   getAllTasks();
         }
       }
    });
  }

  function handleTaskDeleteRequest() {
    var parentEl = $(this).parents('[data-task-id]');
    var taskId = parentEl.attr('data-task-id');
    var requestUrl = apiRoot + 'tasks';

    $.ajax({
      url: requestUrl + '/' + taskId,
      method: 'DELETE',
      success: function() {
        parentEl.slideUp(400, function() { parentEl.remove(); });
      }
    })
  }

  function handleTaskSubmitRequest(event) {
    event.preventDefault();

    var taskTitle = $(this).find('[name="title"]').val();
    var taskContent = $(this).find('[name="content"]').val();

    var requestUrl = apiRoot + 'tasks';

    $.ajax({
      url: requestUrl,
      method: 'POST',
      processData: false,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
        title: taskTitle,
        content: taskContent
      }),
      complete: function(data) {
         if(data.status === 200) {
           getAllTasks();
         }
       }
    });
  }
  
    function handleTaskSubmitRequest2(event) {
    event.preventDefault();
	
    var taskReader = $tasksContainer2.find('[name="board-name2"]').val();
	var taskBook = $tasksContainer3.find('[name="board-name3"]').val();
    var requestUrl = apiRoot + 'bookBorrow';	
	
	if (!taskBook) {
      alert('You have to select a Book first!');
      return;
    }
	
	if (!taskReader) {
      alert('You have to select a Reader!');
      return;
    }
	
    $.ajax({
      url: requestUrl,
      method: 'POST',
      processData: false,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
        reader: {
			id: taskReader,
			},
bookCopy: {
    "id": taskBook,
    "bookTitle": {
        "id": taskBook
    }
}
      }),
      complete: function(data) {
         if(data.status === 200) {
           getAllTasks();
		   window.location.reload(true);
         }
       }
    });
  }

  function toggleEditingState() {
    var parentEl = $(this).parents('[data-task-id]');
    parentEl.toggleClass('datatable__row--editing');

    //var taskTitle = parentEl.find('[data-task-name-paragraph]').text();
    //var taskContent = parentEl.find('[data-task-content-paragraph]').text();
	//var taskReader = parentEl.find('[data-task-reader-paragraph]').text();
	//var taskBookCopy = parentEl.find('[data-task-bookCopy-paragraph]').text();
	var taskReturn = parentEl.find('[data-task-return-paragraph]').text();

    //parentEl.find('[data-task-name-input]').val(taskTitle);
    //parentEl.find('[data-task-content-input]').val(taskContent);
	//parentEl.find('[data-task-reader-input]').val(taskReader);
	//parentEl.find('[data-task-bookCopy-input]').val(taskBookCopy);
	parentEl.find('[data-task-return-input]').val(taskReturn);
	
  }

  function handleBoardNameSelect(event) {
    var $changedSelectEl = $(event.target);
    //var selectedBoardId = $changedSelectEl.val();
    //var $listNameSelectEl = $changedSelectEl.siblings('[data-list-name-select]');
    //var preparedListOptions = prepareBoardOrListSelectOptions(availableBoards[selectedBoardId].lists);

    //$listNameSelectEl.empty().append(preparedListOptions);
  }

    function handleBoardNameSelect2(event) {
    var $changedSelectEl = $(event.target);
  }
  
      function handleBoardNameSelect3(event) {
    var $changedSelectEl = $(event.target);
  }
  
  function handleCardCreationRequest(event) {
    var requestUrl = trelloApiRoot + 'cards';
    var $relatedTaskRow = $(event.target).parents('[data-task-id]');
    var relatedTaskId = $relatedTaskRow.attr('data-task-id');
    var relatedTask = availableTasks[relatedTaskId];
    var selectedListId = $relatedTaskRow.find('[data-list-name-select]').val();

    if (!selectedListId) {
      alert('You have to select a board and a list first!');
      return;
    }

    $.ajax({
      url: requestUrl,
      method: 'POST',
      processData: false,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({
        name: relatedTask.title,
        description: relatedTask.content,
        listId: selectedListId
      }),
      success: function(data) {
        console.log('Card created - ' + data.shortUrl);
        alert('Card created - ' + data.shortUrl);
      }
    });
  }

  $('[data-task-add-form]').on('submit', handleTaskSubmitRequest);
  $('[data-task-add-form2]').on('submit', handleTaskSubmitRequest2);
  $('[data-task-add-form3]').on('submit', handleTaskSubmitRequest2);

  $tasksContainer.on('change','[data-board-name-select]', handleBoardNameSelect);
  $tasksContainer2.on('change','[data-board-name-select2]', handleBoardNameSelect2);
  $tasksContainer3.on('change','[data-board-name-select3]', handleBoardNameSelect3);
  $tasksContainer.on('click','[data-trello-card-creation-trigger]', handleCardCreationRequest);
  $tasksContainer.on('click','[data-task-edit-button]', toggleEditingState);
  $tasksContainer.on('click','[data-task-edit-abort-button]', toggleEditingState);
  $tasksContainer.on('click','[data-task-submit-update-button]', handleTaskUpdateRequest);
  $tasksContainer.on('click','[data-task-delete-button]', handleTaskDeleteRequest);
});