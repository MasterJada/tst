
const parent = document.querySelector("#map");
const article = document.querySelector("#article");
const title = document.querySelector("#name");
const photosElement = document.querySelector("#photos");
const backlight = document.querySelector("#backlight");
const slider = document.querySelector("#image_slider");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");

window.onload = ()=>{
    displayPlaces(data);
}

function displayPlaces(data){
    data.places.forEach(place => {
        var element = document.createElement("img");
        element.src = "src/" + place.type + ".png";
        element.style.left = place.pos_x + "px";
        element.style.top = place.pos_y + "px";
        element.className = "site";
        element.id = "elem_" + place.id;
        
        element.onclick = function(_ev){ 
            var elem = document.getElementsByClassName("selected")[0];
            if(elem){
                elem.classList.remove("selected");
            }
            onElementClick(place)
            element.classList.add("selected");
        };
        parent.appendChild(element);
    });
}

function onElementClick(site){
    console.log(site);
    title.innerHTML = site.title;
    article.innerHTML = site.describption;
    fillPhotos(site.photos);
}

function fillPhotos(photos) {
    photosElement.innerHTML = "";
    backlight.style.backgroundImage = `url('src/${photos[0].src}')`;
    photos.forEach( photo => {
        var element = document.createElement("img");
        element.src = "src/" + photo.src;
        element.className = "photo_preview";
        photosElement.appendChild(element);
        element.onclick = () =>{
            showSlider(photo, photos);
        }
    });
}

function showSlider(photo, photos){
    
    slider.style.display = "flex";
    const img = document.querySelector("#big_image");
    img.src = "src/" + photo.src;
    let index = photos.indexOf(photo);
    if(index > -1) {
        console.log(index);
    }
    if(index >= photos.length -1){
      nextBtn.style.display = "none";
    } else{
        nextBtn.style.display = "block";
        nextBtn.onclick = function()  {
            showSlider(photos[index +1], photos)
        }
    }
    if(photos.length > 1 && index > 0){
        prevBtn.style.display = "block";
        prevBtn.onclick = function(){
            showSlider(photos[index -1], photos)
        }
    }else{
        prevBtn.style.display = "none";
    }

}

function closeSlider() {
    slider.style.display = "none";
}
