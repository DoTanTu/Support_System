$( document ).ready(function() {
    $('#formInsert').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/insert',
            data: $(this).serialize(),
            success: (data) => {
                console.log(data);
            },
            error : (error) => {
                console.log(error);
            } 
        });
    }); 
    $('#deleteData').submit (function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/delete',
            data: $(this).serialize(),
            success: (data) => {
                console.log(data);
            },
            error : (error) => {
                console.log(error);
            } 
        });
    });
});