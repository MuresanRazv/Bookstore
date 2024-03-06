$(document).ready(function() {
    // Show the modal when the image is clicked
    $('#book-image').click(function() {
        $('#imageModal').css('display', 'block');
        $('.modal-content').attr('src', $(this).attr('src'));
    });

    // Close the modal when the close button is clicked
    $('.close').click(function() {
        $('#imageModal').css('display', 'none');
    });
});