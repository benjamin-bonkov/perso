// adapté de :
// https://tutorialzine.com/2013/05/mini-ajax-file-upload-form (suppression de la dépendance de knop)
// utilise la version basique de : https://github.com/blueimp/jQuery-File-Upload
window.uploadFiles = function(){
    $('body').on("dragover",function(){
        $('.js-dropZone').addClass("dropReady");
    });
    $('body').on("dragleave",function(){
        $('.js-dropZone').removeClass("dragover");
        $('.js-dropZone').removeClass("dropReady");
    });
    $('.js-dropZone').on("dragover",function(){
        $(this).addClass("dragover");
    });
    $('.js-dropZone').on("dragleave",function(){
        $(this).removeClass("dragover");
    });
    $('.js-dropZone').on("drop",function(){
        console.log("drop");
        $('.js-dropZone').removeClass("dragover");
        $('.js-dropZone').removeClass("dropReady");
    });
    
    $('.js-fileUpload').each(function(){
        console.log("fileUploadInit");
        var $fileupload = $(this)
        ,   $dropzone = $fileupload.find('.js-dropZone')
        ,   $filesList = $fileupload.find('.js-filesList');
        console.log({$fileupload});
        console.log({$dropzone});
        $fileupload.fileupload({

            // This element will accept file drag/drop uploading
            dropZone: $dropzone,
        
            // This function is called when a file is added to the queue;
            // either via the browse button, or via drag/drop:
            add: function (e, data) {
                console.log("fileupload add");
                var $tpl = $('.js-template-filesList__item').clone().removeClass("js-template-filesList__item");

                // Append the file name and file size
                $tpl.find('.js-fileName').text(data.files[0].name);
                $tpl.find('.js-fileSize').text(formatFileSize(data.files[0].size));

                // Add the HTML to the UL element
                data.context = $tpl.appendTo($filesList).fadeIn();


                // Listen for clicks on the cancel icon
                $tpl.find('.js-cancelFileUpload').click(function(){

                    if($tpl.hasClass('working')){
                        jqXHR.abort();
                    }
                    console.log("must add AJAX to remove file");
                    $tpl.fadeOut(function(){
                        $tpl.remove();
                    });

                });

                // Automatically upload the file once it is added to the queue
                var jqXHR = data.submit();
            },
            progress: function(e, data){
                console.log("fileupload progress");
                // Calculate the completion percentage of the upload
                var progress = parseInt(data.loaded / data.total * 100, 10);

                if(progress == 100){
                    data.context.removeClass('working');
                }
            },


            fail:function(e, data){
                console.log("fileupload fail");
                // Something has gone wrong!
                data.context.addClass('error');
            },

            done: function (e, data) {
                console.log("fileupload done");
            }
        });
    });
    
    // Prevent the default action when a file is dropped on the window
    $(document).on('drop dragover', function (e) {
        e.preventDefault();
    });


    // Helper function that formats the file sizes
    function formatFileSize(bytes) {
        if (typeof bytes !== 'number') {
            return '';
        }

        if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }

        if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }

        return (bytes / 1000).toFixed(2) + ' KB';
    }
};