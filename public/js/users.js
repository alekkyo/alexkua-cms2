jQuery(document).ready(function($) {
    // Add user
    $('#formAddUser').submit(function(e) {
        e.preventDefault();
        if ($("#password").val() !== $("#confirmPassword").val()) {
            $("#password").addClass('error');
            $("#passwordConfirm").addClass('error');
            toastr.error('Error, both passwords must match!');
            return;
        }
        $('#submitUserBtn').prop('disabled', true);
        $('#submitUserBtn').addClass('disabled');
        $.post($(this).attr('action'), $(this).serialize(), function(response) {
            toastr.success('Successfully added user!');
            setTimeout(function() {
                window.location.href = '/users';
            }, 3000)
        }).fail(function(response) {
            toastr.error(response.responseJSON.message);
            $('#submitUserBtn').prop('disabled', false);
            $('#submitUserBtn').removeClass('disabled');
        });
        return false;
    });

    // Search
    $("#search").keyup(function() {
        var searchValue = $(this).val().toUpperCase();
        $('#usersTable tbody tr').show();
        $('#usersTable tbody tr').each(function() {
            var foundValue = false;
            $(this).find('td.searchable').each(function() {
                if (foundValue) return;
                if ($(this).html().toUpperCase().indexOf(searchValue) >= 0) {
                    foundValue = true;
                }
            });
            if (foundValue) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Delete
    var btnClicked = false;
    $('#usersTable .deleteBtn').click(function() {
        var dataId = $(this).closest('tr').attr('data-id');
        var dataName = $(this).closest('tr').attr('data-name');
        window.confirm('Are you sure you want to delete <b>' + dataName + '</b>?', function() {
            if (btnClicked) {
                return;
            }
            btnClicked = true;
            $.ajax({
                type: "DELETE",
                url: '/api/users/' + dataId
            }).done(function() {
                window.location.reload();
                btnClicked = false;
            }).fail(function(response) {
                toastr.error(response.responseText);
                btnClicked = false;
            });
        });
    });
});