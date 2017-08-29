var $ = document.querySelector.bind(document);
var formData = new FormData();
var input = $('#file');

input.addEventListener('change', handleFileInput);
$('button[type=submit]').addEventListener('click', handleFileUpload);

function handleFileInput (evt) {
  var file = evt.target.value;
  // Chrome returns a path instead of the filename. We grab the filename out of it.
  var fileName = (~file.indexOf('\\')) ? file.match(/\\([^\\]+)$/)[1] : file;

  $('input[name=file-name]').value = fileName;

  formData.set('file', input.files[0]);
}

function handleFileUpload (evt) {
  if (formData.get('file')) {
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(data => data.json())
    .then(data => {
      $('.result').style.display = 'block';
      $('.response').innerHTML = JSON.stringify(data);
    }).catch(() => {
      console.log('An error occured.');
    });
  }
}
