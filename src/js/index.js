import "../css/style.css"
import "bootstrap";
import {resultSection,bannerContainer, cityName, errorCity, introductionSection, citySummary, cityScore, scoreSection, cityID} from "./dom-elemets";
import axios from "axios";

// Api
export async function getData(){
    await axios.get(`https://api.teleport.org/api/urban_areas/slug:${cityName}/scores/`).then(
        (response) => {
            let data = response.data;
            // Section
            introductionSection.style.display = "none"
            resultSection.style.display = "block"
            // City name
            cityID.innerHTML = cityName;
            // Summary
            citySummary.innerHTML = data.summary;
            // City score
            cityScore.innerHTML = data.teleport_city_score.toFixed(2)
            // Rates 
            scoreSection.innerHTML = "";
            data.categories.forEach((e) => {
            scoreSection.insertAdjacentHTML("afterbegin", `<div class="d-flex d-flex justify-content-center"><h3><b>${e.name}</b>: <span style="color: ${e.color};">${(e.score_out_of_10).toFixed(2)}/10</span></h3></div>`);
            });
        },
        (error) => {
            errorCity.innerHTML = `<h3 class="error mt-2">This city is not available, try again.</h3>`; 
            console.log(error); 
        }
    );
    await axios.get(`https://api.teleport.org/api/urban_areas/slug:${cityName}/images/`).then(
        (response) => {
            var data = response.data;
            // Images
            bannerContainer.style.backgroundImage = `url(${data.photos[0].image.web})`;
        },
        (error) => {
            console.log(error);
        }
    ); 
}