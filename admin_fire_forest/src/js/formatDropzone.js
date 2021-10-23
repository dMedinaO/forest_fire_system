
// Form-File-Upload.js
// ====================================================================
// This file should not be included in your project.
// This is just a sample how to initialize plugins or components.
//
// - ThemeOn.net -


$(document).ready(function() {

    // DROPZONE.JS
    // =================================================================
    // Require Dropzone
    // http://www.dropzonejs.com/
    // =================================================================
    Dropzone.options.demoDropzone = { // The camelized version of the ID of the form element
        // The configuration we've talked about above
        autoProcessQueue: false,
        uploadMultiple: false,
        //parallelUploads: 25,
        maxFiles: 1,
        maxFilesize: 100,        
        timeout:1000000,
        
        // The setting up of the dropzone
        init: function() {
          var myDropzone = this;
        }
    }
});
