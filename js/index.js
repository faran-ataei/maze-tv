const mazetvData = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://api.tvmaze.com/shows",
    });
    const data = response.data;
    console.log(data);

    // parent div for all cards
    const divContainer = document.getElementById("divContainer");
    data.forEach((element) => {
      // build the card
      const card = document.createElement("div");
      card.classList.add(`card-${element.id}`, "card");
      card.style.padding = "10px";
      card.style.backgroundColor = "#141e30";
      card.style.boxShadow = "0 0 10px 15px black";
      card.style.margin = "20px";
      card.style.width = "230px";

      // set link
      const aTag = document.createElement("a");
      aTag.href = `./seassion.html?id=${element.id}`;
      aTag.setAttribute("class", "image");
      aTag.setAttribute("id", `${element.name}`);

      // set images
      const img = document.createElement("img");
      img.src = element.image.medium;
      img.style.cssText =
        "max-width: 210px; height: 295px; border-radius: 10px; width: 100%;";

      // set title
      const title = document.createElement("h3");
      title.innerText = element.name;
      title.style.textAlign = "center";
      title.style.color = "#fff";
      title.style.fontWeight = "600";
      title.style.margin = "10px";

      // set rating
      const rating = document.createElement("p");
      rating.innerText = `Rating: ${element.rating.average}`;
      rating.style.color = "#fff";

      // set genre
      const genre = document.createElement("p");
      genre.innerText = `Genre: ${element.genres.join(", ")}`;
      genre.style.color = "#fff";

      // append
      divContainer.appendChild(card);
      card.appendChild(aTag);
      aTag.appendChild(img);
      card.appendChild(title);
      card.appendChild(genre);
      card.appendChild(rating);
    });

    // Pass movie name to other web page when we clice on image
    const images = document.querySelectorAll(".image");
    images.forEach((image) => {
      image.addEventListener("click", (event) => {
        const movieName = event.target.parentElement.id
        console.log(movieName);
      });
    });

    // Convert NodeList to Array for filter method
    const cardBox = Array.from(document.querySelectorAll(".card"));

    // Assuming formBox is already defined in your scope
    const formBox = document.getElementById("searchBox"); // Make sure to have an input with this ID in your HTML
    formBox.addEventListener("keyup", (e) => {
      e.preventDefault();

      console.log(e);

      const searchValue = e.target.value.toLowerCase();
      const filteredMovies = cardBox.filter((card) => {
        const movieName = card.querySelector("h3").innerText.toLowerCase();
        return movieName.includes(searchValue);
      });

      // Clear the container before appending filtered results
      divContainer.innerHTML = "";

      // Append filtered movies to the container
      filteredMovies.forEach((element) => {
        // ... rest of your code to append the cards
        divContainer.appendChild(element);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

mazetvData();
