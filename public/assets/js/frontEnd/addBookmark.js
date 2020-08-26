// const { method } = require("lodash");

$(document).ready(function () {
  //creating new category - NOT USING
  $('.category-form').on('submit', function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault()

    let newCategory = {
      category: $('#category-input').val().trim()
    }

    // Send the POST request.
    $.ajax('/api/users', {
      type: 'POST',
      data: newCategory
    }).then(function () {
      console.log("congrats! you've added a new category")
      // Reload the page to get the updated list
      location.reload()
    })
  })

  //create new bookmark
  $('.bookmark-form').on('submit', function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault()

    let newBookmark = {
      // UserId: ,
      category: $('#bookmark-category').val().trim(),
      keyword: $('#bookmark-keyword').val().trim(),
      url: $('#bookmark-url').val().trim()
    }

    console.log(newBookmark)

    // Send the POST request.
    $.ajax('/api/bookmark', {
      type: 'POST',
      data: newBookmark
    }).then(function (response) {
      // console.log("congrats! you've added a new bookmark");
      // console.log("inside ajax:", response)
      // Reload the page to get the updated list
      location.reload()
    })
  })

  //delete bookmark
  $(document).on('click', '.delete-button', function () {
    // console.log("Inside delete function");
    let id = $(this).attr('data-id')
    // Send the DELETE request.
    $.ajax({
      url: '/api/bookmark/' + id,
      method: 'DELETE'
    }).then(function () {
      location.reload()
    })
  })

  // $(('.bookmarkCategory').on('click',  () => {
  $(document).on('click', '.bookmarkCategory', function (e) {
    //when we click the category, we want to view only that category.
    console.log(e)
    // Send the POST request.
    return $.ajax({
      url: `/api/bookmark/`,
      method: 'GET'
      // data: category
    }).then(function (data) {
      console.log(data)

      //   console.log('you are viewing', category);
      // Reload the page to get the updated list
      // return data.json
      const filtered = data.filter(item => item.category === e.target.outerText)
      console.log(filtered)
      return $.ajax({
        url: '/members',
        method: 'GET',
        data: { filtered }
      })
    })
  })
})
