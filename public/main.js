'use strict';

$(document).ready(init);

function init() {
  $('body').on('click', '#submit', makePost)
  $('body').on('click', '.edit', editRow)
  $('body').on('click', '#editSubmit', submitEdit)
  $('body').on('click', '.edit.editing-row-currently', editRowDisappear)
  $('body').on('click', '.delete', deleteRow)
}

function editRowDisappear(e){
  console.log('hello');
  $('.editing').toggleClass('hidden');
  $(e.target).closest('tr').children('td').toggleClass('editing-row-currently')
  $('#editName').val('');
  $('#editMessage').val('');
}


function deleteRow(e){

  $('.editing').addClass('hidden');
  $(e.target).closest('tr').children('td').toggleClass('editing-row-currently')

  var obj = {};
  var timestamp = $(e.target).closest('tr').children('.time').text();
  var thisRow = (e.target).closest('tr').rowIndex;

  $.ajax({
      method: 'DELETE',
      url: '/messages',
      data: {date: timestamp},
      success: function(data,status){
          $(e.target).closest('tr').remove();
      }
    });
};



function editRow(e){
    if ($('.hidden').length){
    $('.editing').toggleClass('hidden');
    var thisRow = (e.target).closest('tr').rowIndex;
    var $name = $(e.target).closest('tr').children('.name').text();
    var $message = $(e.target).closest('tr').children('.message').text();
    $('#editName').val($name);
    $('#editMessage').val($message);
    $(e.target).closest('tr').children('td').toggleClass('editing-row-currently');
    var timestamp = $(e.target).closest('tr').children('.time').text();
   };
}




function submitEdit(event){
  event.preventDefault();
   var timestamp = $('.editing-row-currently').closest('tr').children('.time').text();
   var obj = {};


   var editMessage = {};
   editMessage.name = $('input#editName').val();
   editMessage.message = $('input#editMessage').val();
   editMessage.date = Date();
   obj.timeStamp =  {date: timestamp};
   obj.editMessage = editMessage;
   $('.editing').toggleClass('hidden');

 $('input#editName').val('');
 $('input#editEmail').val('');
 $('input#editPhone').val('');
 $('input#editAddress').val('');

 var editingRowIndex = $('.editing-row-currently').closest('tr').index()+1;

 $.ajax({
   method: 'PUT',
   url: '/messages',
   data: obj,
   success: function(data,status){
     var $name = $('<td>').text(editMessage.name);
      var $message = $('<td>').text(editMessage.message);
      var $date = $('<td>').text(editMessage.date).addClass('time');
      var $edit = $('<td>').addClass('edit');
      var $del = $('<td>').addClass('delete');
      var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg');
      var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg delete');
      $edit.append($editIcon);
      $del.append($deleteIcon);
      var $newTr = $('<tr>');
      $newTr.append($name, $message, $date, $edit, $del);
      $('.editing-row-currently').closest('tr').replaceWith($newTr);
   }
 })
}


function makePost(e){
  var timeStamp = Date();
  var name = $('#name').val();
  var message = $('#message').val();
  var obj = {}
  obj.name = name;
  obj.message = message;
  obj.date = timeStamp;
  $.ajax({
    method: 'POST',
    url: '/messages',
    data: obj,
    success: function(data, status){
      var $tr = $('<tr>');
      var $name = $('<td>').addClass('name').text(obj.name);
      var $message = $('<td>').addClass('message').text(obj.message);
      var $date = $('<td>').addClass('time').text(obj.date);
      var $edit = $('<td>').addClass('edit');
      var $del = $('<td>').addClass('delete');
      var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg');
      var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg delete');
      $edit.append($editIcon);
      $del.append($deleteIcon);
      $tr.append($name, $message, $date, $edit, $del);
      $('.table').append($tr);
      $('#name').val('');
      $('#message').val('');
    }
  })
}
