$(function() {
  console.log("look at me duuuude");

  let modal = $("#modal");
  let apiLink = "https://rickandmortyapi.com/api/character/";
  let list = [];
  let info = null;
  // let description = $("#description");
  // let avatar = $("#avatar");
  // let personName = $("#personName");
  loadData(apiLink);

  $(document).on("click", ".list-item", function(e) {
    renderModal($(e.currentTarget).data("id"));
  });
  $(".hide-modal").on("click", function() {
    modal.hide();
  });
  $(".load-more").on("click", function() {
    loadData(info.next);
  });

  function loadData(apiLink) {
    $.get(apiLink, function(data) {
      list = [...list, ...data.results];
      info = data.info;

      fillStack();
      rederList();
    });
  }
  function fillStack() {
    $(".loaded-chars").text(list.length);
    $(".total").text(info.count);
  }

  function rederList() {
    $("#list").html("");
    $.each(list, function(index, item) {
      let row = `
      <div class="list-item" data-id = '${index}'>
        <div>${index + 1}. ${item.name}</div>
        <div>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 511.995 511.995" style="enable-background:new 0 0 511.995 511.995;" xml:space="preserve">
            <path d="M381.039,248.62L146.373,3.287c-4.083-4.229-10.833-4.417-15.083-0.333c-4.25,4.073-4.396,10.823-0.333,15.083
              L358.56,255.995L130.956,493.954c-4.063,4.26-3.917,11.01,0.333,15.083c2.063,1.979,4.729,2.958,7.375,2.958
              c2.813,0,5.604-1.104,7.708-3.292L381.039,263.37C384.977,259.245,384.977,252.745,381.039,248.62z"/>
          </svg>
        </div>
      </div>`;
      $("#list").append(row);
    });
  }
  function renderModal(id) {
  
    $('.windows-title').text(`${list[id].name}`)
    $('.avatar').attr('src',list[id].image)
    $('.status').text(`${list[id].status}`)
    $('.species').text(`${list[id].species}`)
    $('.gender').text(`${list[id].gender}`)
    $('.origin').text(`${list[id].origin.name}`)
    $('.last-location').text(`${list[id].location.name}`)
        modal.show();
  }
});
