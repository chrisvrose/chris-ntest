//const $ = require('jquery')

$(document).ready(()=>{
    $("#impform").submit(e=>{
        e.preventDefault();
        $.ajax({
            url: '/users',
            method: 'put',
            dataType:'json',
            data: {"user": $("#USN").val(),pass: $("#PASS").val()},
            success: (data)=>{console.log(`${JSON.stringify(data)}`)}
        })
    })
})