var $ = $ // jQuery
function getUrl () {
  return $.trim($('.input-group-addon').text()) + $('#url-field').val()
}
$('.btn-shorten').on('click', function () {
  $('#input-url').hide()
  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {url: getUrl()},
    success: function (data) {
      var url = data.shortUrl
      var resultHTML = '<a class="result" href="' + url + '">' + url + '</a>'
      var resultTxt = '<pan>' + getUrl() + '</pan>'
      $('#link').html(resultHTML)
      $('#link').hide().fadeIn('slow')
      $('#texte').html(resultTxt)
    }
  })
})
$('.input-group-addon').on('click', function () {
  var txt = $.trim($('.input-group-addon').text())
  txt = txt === 'http://' ? 'https://' : 'http://'
  $('.input-group-addon').text(txt)
})
