document.addEventListener('DOMContentLoaded', () => {
    const test = document.querySelector('.test');
  
    function featuredFarms(row, index) {
      return `
      <div class="row">
            <div class="col-lg-4">
              <img src="./home/images/farm1.jpg" class="img-thumbnail">
              <h2>${row[index]['farm_name']}</h2>
              <p>${row[index]['additional_info']}</p>
              <p><a class="btn btn-secondary readmore" href="#" onclick="window.open('../Data Tool/details_page.html','_blank')" id="${row[index]['farm_name']}">Learn More &raquo;</a></p>
            </div><!-- /.col-lg-4 -->
            <div class="col-lg-4">
              <img src="./home/images/farm2.jpg" class="img-thumbnail">
              <h2>${row[index+1]['farm_name']}</h2>
              <p>${row[index+1]['additional_info']}</p>
              <p><a class="btn btn-secondary readmore" href="#" onclick="window.open('../Data Tool/details_page.html','_blank')" id="${row[index+1]['farm_name']}">Learn More &raquo;</a></p>
            </div><!-- /.col-lg-4 -->
            <div class="col-lg-4">
              <img src="./home/images/farm1.jpg" class="img-thumbnail">
              <h2>${row[index+2]['farm_name']}</h2>
              <p>${row[index+2]['additional_info']}</p>
              <p><a class="btn btn-secondary readmore" href="#" onclick="window.open('../Data Tool/details_page.html','_blank')" id="${row[index+2]['farm_name']}">Learn More &raquo;</a></p>
            </div><!-- /.col-lg-4 -->
          </div><!-- /.row -->`;

    }


    async function displayFeaturedUrbanFarms() {
        const response = await fetch('../api/urban_farms');
        const urbanFarms = await response.json();

        test.innerHTML += (featuredFarms(urbanFarms, 0));
    }

    displayFeaturedUrbanFarms();
    
});

document.addEventListener("mousemove", () =>{
  function getButtonClicked(){
    const buttonElements = document.querySelectorAll('.readmore');
    for (let i = 0;i < buttonElements.length;i++){
        buttonElements[i].addEventListener('click',function(){
            buttonClicked = (this.getAttribute('id'));
            localStorage.setItem('buttonClickedGlobal', buttonClicked);
        });
    }
  }
  getButtonClicked();

})

