//Obtener los datos del objeto JSON

const getPosts = () => {
  $.ajax({ //se llama a Jquery y se usa el método ajax
    method: "GET", // el método para jalar los objetos es get
    url: "https://blog-general.firebaseio.com/post/.json",
    //hay que poner la url, que puede ser  "https://blog-5g.firebaseio.com/blogGeneral/posts/.json" 
    success: (response) => {
      fillWithPosts(response)
      console.log(response)

    }
  });
}

getPosts() //aqui podria esta la funcion de loadingview pero si no hay màs que una pagina, pos mejor solo asì

const addListeners = () => {

  $(".delete-button").click(event => {

    let dbKey = $(event.target).data("del-btn")
    delPost(dbKey)

  });
}

const fillWithPosts = (postsData) => {

  $.each(postsData, (index, value) => {

    $(".container-article-dynamic").append(
      `<div  class="section-jquery col-lg-12 my-5 data-toggle="modal" data-target="#postCard"">
        <div class="article-jquery pt-2 col-8"> 
          <p class="title-jquery">${value.title}</p>
          <p class="summary-jquery">${value.summary}</p>
          <p class="autor-jquery">${value.name}</p>
          <div class="buttom-jquery">
            <p class="createdate-jquery">
              <span><img class = "delete-button" data-del-btn = "${index}" src="images/trash-icon.jpg" title="Eliminar Post"></span>
              <span class="create-jquery">${value.createDate}</span>              
            </p>
          </div>
        </div>
        <div class="img-jquery p-0 col-4">
          <img class="img-url" src="${value.imgUrl}" alt="">
        </div>
      </div>
      <!-- START Modal Post -->
      
      <div class="modal fade" id="postCard" tabindex="-1" role="dialog"
        aria-labelledby="postCardTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title font-weight-bold" id="postCardTitle">${value.title}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img src="${value.imgUrl}" class="card-img" alt="...">
                <p id="card-sample-date" class="card-text"><small
                  class="text-muted card-date">${value.createDate}</small></p>
                <p id="card-sample-content" class="modal-text card-content">${value.content}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary"
                  data-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- END Modal Post -->`
    )
  })

  addListeners()
}

const getDataFromButton = () => {

  $("#submit-post").on("click", getDataFromModal())
}

const getDataFromModal = () => {
  //en el index.html estan estas entradas.
  let title = $("#title").val();
  let name = $("#name").val();
  let preview = $("#preview").val();
  let content = $("#content").val();
  let imgUrl = $("#img-url").val();
  let createDate = new Date();

  let postObject = { title, name, preview, content, imgUrl, createDate }
  console.log(postObject);

  if (title === "" || name === "" || preview === "" || content === "" || imgUrl === "" || createDate === "") {
    console.log("Falta contenido");
  } else {
    putsData(postObject);
  }


};


const delPost = (dbKey) => {
  $.ajax({
    method: "DELETE",
    url: `https://blog-general.firebaseio.com/post/${dbKey}/.json`, 
    success: () => {
      getPosts()

    }
  });
}



const putsData = (response) => {
  $.ajax({
    method: "POST",
    url: 'https://blog-general.firebaseio.com/post/.json',
    data: JSON.stringify(response),
    success: (response) => {
      console.log(response.name)
      getPosts()
    }
  });
}

function getSelecter(){
  let propiedadAOrdenar = "";

           if ($("#inlineRadio1").is( ":checked" )){
              //alert("propiedad nombre")
              return propiedadAOrdenar = "name";
          }else if ($("#inlineRadio2").is( ":checked" )){
              //alert("propiedad fecha")
              return propiedadAOrdenar = "createDate";
          }else if ($("#inlineRadio3").is( ":checked" )){
              //alert("propiedad titulo")
              return propiedadAOrdenar = "title";
          }

}

var sortThisPls = (response, propiedadAOrdenar) => {
  let sinCorchetes = "";
  let algo = response.sort(function (a, b) {
      var x = a[propiedadAOrdenar];
      var y = b[propiedadAOrdenar];

      if (true) {
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }
  });
  //console.log(algo)
  sinCorchetes = algo.slice(1,-1) 
  //console.log(typeof(sinCorchetes))
  return sinCorchetes
}


function ORDER_PLS() {
  $.ajax({
      method:"GET",
      url: 'https://blog-general.firebaseio.com/post/.json',
      success: (response) => {
          //alert("sacando y ordenado")
          //console.log(response)
          let array = []
          for (cosas in response){
              //console.log(response[cosas])
              array.push(response[cosas])
          }
          fillWithPosts(sortThisPls(array, getSelecter()));

          let fecha = new Date().toLocaleString('en-GB', { timeZone: 'UTC' }) //////ASI PONGAN LA FECHA
          console.log(fecha)

      }

  });

}