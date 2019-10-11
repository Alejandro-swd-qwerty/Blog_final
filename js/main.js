//Obtener los datos del objeto JSON

const getPosts = () => {
    $.ajax({ //se llama a Jquery y se usa el método ajax
        method:"GET", // el método para jalar los objetos es get
        url: "https://blog-general.firebaseio.com/post/.json",
        //hay que poner la url, que puede ser  "https://blog-5g.firebaseio.com/blogGeneral/posts/.json" 
        success: (response) => {
            fillWithPosts(response)
 //           console.log(response)
         }
    });
}

getPosts() //aqui podria esta la funcion de loadingview pero si no hay màs que una pagina, pos mejor solo asì

const fillWithPosts = (postsData) => {
//    $(".container").empty(); //creo que es este el div que sì va a cambiar
    console.log(postsData);
    $.each(postsData, (index,value) => {
        $("#interactive-cards").append(`
        <div class="section-jquery">
        <div class="article-jquery col-lg-9">
            <p class="tag-topic">Hola    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><i>Popular Topic</i></span> </p>
            <p class="title-jquery">${value.title}</p>
            <p class="summary-jquery">${value.preview}</p>
            <p class="autor-jquery">${value.name}</p>
            <div class="buttom-jquery">
            <p class="createdate-jquery">
                <span class="create-jquery">${value.createDate}</span>
<!--                <span class="svgIcon svgIcon--bookmark svgIcon--25px"><svg class="svgIcon-use" width="22" height="22"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path></svg></span>
                </span>
                <span class="menu-jquery"></span>-->
            </p>
            </div>
        </div>
        <div class="img-jquery col-lg-3">
            <img class="img-url" src="${value.imgUrl}" alt="">
        </div> 
    </div>

        `)
    }) 
}

/*
<!-- START Modal -->
<div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
<div class="modal-dialog modal-dialog-scrollable" role="document">
<div class="modal-content">
  <div class="modal-header">
  <h5 class="modal-title font-weight-bold" id="exampleModalScrollableTitle">${value.title}</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
      <span aria-hidden="true">&times;</span>
  </button>
  </div>
  <div class="modal-body">
      <img src="${value.img}" class="card-img" alt="...">
      <p id="card-sample-date" class="card-text"><small class="text-muted card-date">${value.createDate}</small></p>
      <p id="card-sample-content" class="modal-text card-content">${value.content}</p>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
  </div>
</div>
</div>
</div>


*/





/*
const loadingView = (viewUrl, funcionALlamar) => {
    $(".container").load(viewUrl,funcionALlamar); // se llama a la parte del wrapper o contenedor que va a estar cambiando, se llama a la función para obtener los posts o publicarlos, o eliminarlos, yo qé sé
}

*/

const getDataFromButton = () => {

    $("#submit-post").on("click",getDataFromModal())
}

const getDataFromModal = () => {
    //en el index.html estan estas entradas.
    let title = $("#title").val();
    let preview = $("#preview").val();
    let content = $("#content").val();
    let imgUrl = $("#url-img").val();
    let createDate = new Date();

    let postObject = {title, preview, content, imgUrl, createDate}
    console.log(postObject);
    putsData(postObject);
};

const putsData = (response) => {
    $.ajax({
        method:"POST",
        url: 'https://blog-general.firebaseio.com/post/.json',
        data: JSON.stringify(response),
        success: (response) => {
            console.log(response)
        }
    });
}



/*

<header class="header">
<div class="row p-3">
  <div class="col-8 col-sm-8 col-lg-9">
    <svg height="22" width="112" viewBox="0 0 111.5 22" class="ai" onclick="loadingView(index.html,getPosts()) ">
      <path
        d="M56.3 19.5c0 .4 0 .5.3.7l1.5 1.4v.1h-6.5V19c-.7 1.8-2.4 3-4.3 3-3.3 0-5.8-2.6-5.8-7.5 0-4.5 2.6-7.6 6.3-7.6 1.6-.1 3.1.8 3.8 2.4V3.2c0-.3-.1-.6-.3-.7l-1.4-1.4V1l6.5-.8v19.3zm-4.8-.8V9.5c-.5-.6-1.2-.9-1.9-.9-1.6 0-3.1 1.4-3.1 5.7 0 4 1.3 5.4 3 5.4.8.1 1.6-.3 2-1zm9.1 3.1V9.4c0-.3-.1-.6-.3-.7l-1.4-1.5v-.1h6.5v12.5c0 .4 0 .5.3.7l1.4 1.4v.1h-6.5zm-.2-19.2C60.4 1.2 61.5 0 63 0c1.4 0 2.6 1.2 2.6 2.6S64.4 5.3 63 5.3a2.6 2.6 0 0 1-2.6-2.7zm22.5 16.9c0 .4 0 .5.3.7l1.5 1.4v.1h-6.5v-3.2c-.6 2-2.4 3.4-4.5 3.4-2.9 0-4.4-2.1-4.4-6.2 0-1.9 0-4.1.1-6.5 0-.3-.1-.5-.3-.7L67.7 7v.1H74v8c0 2.6.4 4.4 2 4.4.9-.1 1.7-.6 2.1-1.3V9.5c0-.3-.1-.6-.3-.7l-1.4-1.5v-.2h6.5v12.4zm22 2.3c0-.5.1-6.5.1-7.9 0-2.6-.4-4.5-2.2-4.5-.9 0-1.8.5-2.3 1.3.2.8.3 1.7.3 2.5 0 1.8-.1 4.2-.1 6.5 0 .3.1.5.3.7l1.5 1.4v.1H96c0-.4.1-6.5.1-7.9 0-2.7-.4-4.5-2.2-4.5-.9 0-1.7.5-2.2 1.3v9c0 .4 0 .5.3.7l1.4 1.4v.1h-6.5V9.5c0-.3-.1-.6-.3-.7l-1.4-1.5v-.2h6.5v3.1a4.6 4.6 0 0 1 4.6-3.4c2.2 0 3.6 1.2 4.2 3.5.7-2.1 2.7-3.6 4.9-3.5 2.9 0 4.5 2.2 4.5 6.2 0 1.9-.1 4.2-.1 6.5-.1.3.1.6.3.7l1.4 1.4v.1h-6.6zm-81.4-2l1.9 1.9v.1h-9.8v-.1l2-1.9c.2-.2.3-.4.3-.7V7.3c0-.5 0-1.2.1-1.8L11.4 22h-.1L4.5 6.8c-.1-.4-.2-.4-.3-.6v10c-.1.7 0 1.3.3 1.9l2.7 3.6v.1H0v-.1L2.7 18c.3-.6.4-1.3.3-1.9v-11c0-.5-.1-1.1-.5-1.5L.7 1.1V1h7l5.8 12.9L18.6 1h6.8v.1l-1.9 2.2c-.2.2-.3.5-.3.7v15.2c0 .2.1.5.3.6zm7.6-5.9c0 3.8 1.9 5.3 4.2 5.3 1.9.1 3.6-1 4.4-2.7h.1c-.8 3.7-3.1 5.5-6.5 5.5-3.7 0-7.2-2.2-7.2-7.4 0-5.5 3.5-7.6 7.3-7.6 3.1 0 6.4 1.5 6.4 6.2v.8h-8.7zm0-.8h4.3v-.8c0-3.9-.8-4.9-2-4.9-1.4.1-2.3 1.6-2.3 5.7z">
      </path>
    </svg>
  </div>
  <div class="col-4 col-sm-4 col-lg-3 p-0 px-sm-5 d-flex justify-content-around ">
    <!-- Button trigger modal -->
    <button type="button" id="callNewPostFormBtn" class="btn btn-primary py-0" data-toggle="modal"
      data-target="#newPost">
      Nuevo Post
    </button>

    <!-- Modal -->
    <div class="modal fade" id="newPost" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row">
                <div class="col-12 mt-3">
                  <h2>Crea tu post</h2>
                  <form class="border rounded bg-light p-1" id="dataForm">
                    <div class="form-group">
                      <label>Título</label>
                      <input id="title" name="title" type="text" class="form-control txtGuide"
                        placeholder="Titulo de tu post" />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Descripción</label>
                      <textarea class="form-control" id="preview" rows="3"
                        placeholder="Describe en breve tu post"></textarea>
                    </div>
                    <div class="form-group" rows="5">
                      <label for="exampleInputPassword1">Contenido del post</label>
                      <textarea class="form-control" id="content" rows="3" placeholder="Ingresa tu post"></textarea>
                    </div>
                    <div class="form-group">
                      <label>URL de la imagen</label>
                      <input id="url-img" name="imgUrl" type="text" class="form-control txtGuide"
                        placeholder="URL de tu imagen" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" id="submit-post" onclick="getDataFromButton()" class="btn btn-success" data-dismiss="modal">
              Enviar Post
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</header>
*/
/*
<span class="svgIcon svgIcon--logoMonogram svgIcon--45px"><svg class="svgIcon-use" width="45" height="45"><path d="M5 40V5h35v35H5zm8.56-12.627c0 .555-.027.687-.318 1.03l-2.457 2.985v.396h6.974v-.396l-2.456-2.985c-.291-.343-.344-.502-.344-1.03V18.42l6.127 13.364h.714l5.256-13.364v10.644c0 .29 0 .342-.185.528l-1.848 1.796v.396h9.19v-.396l-1.822-1.796c-.184-.186-.21-.238-.21-.528V15.937c0-.291.026-.344.21-.528l1.823-1.797v-.396h-6.471l-4.622 11.542-5.203-11.542h-6.79v.396l2.14 2.64c.239.292.291.37.291.768v10.353z"></path></svg></span>
*/