$(function(){
  $("#add_user").submit(function(event){
    alert("submitted!");
  });
  $("#update_user").submit(function(event){
    event.preventDefault();

    let unindex_array = $(this).serializeArray();
    let data = {}
    $.map(unindex_array, function(n,){
      data[n["name"]] = n['value']
    })
    let request = {
      "url": `http://localhost:3000/api/users/${data.id}`,
      "method": "PUT",
      "data": data
    }
    $.ajax(request).done(function(response){
      alert("data updated");
    });
  });

   if (window.location.pathname == '/'){
     $ondelete = $(".table tbody td a.delete");
     $ondelete.click(function(){
       let id = $(this).attr('data-id');

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
        });
      };
  });
};
});
