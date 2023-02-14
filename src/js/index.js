import "../css/style.css";
import "bootstrap";
import {resultSection,bannerContainer, cityName, introductionSection, citySummary, cityScore, scoreSection, cityID} from "./dom-elemets";
import axios from "axios";
import "lodash";

// Api
export const API_URL = process.env.API_URL;
const API_SCORE = process.env.API_SCORE;
const API_SUMMARY = process.env.API_SUMMARY;
const API_CATEGORIES = process.env.API_CATEGORIES;
const API_IMAGE = process.env.API_IMAGE;

export async function getData(){
    await axios.get(API_URL + `slug:${cityName}/scores/`)
    .then((response) => {
        let data = response.data;
        // Section
        introductionSection.style.display = "none"
        resultSection.style.display = "block"
        // City name
        cityID.innerHTML = cityName;
        // Summary
        citySummary.innerHTML = `<div class="spinner-border text-primary" role="status"></div>`;
        citySummary.innerHTML = _.get(data, API_SUMMARY);
        // City score
        cityScore.innerHTML = _.get(data, API_SCORE).toFixed(2);
        // Rates 
        scoreSection.innerHTML = "";
        _.get(data, API_CATEGORIES).forEach((e) => {
        scoreSection.insertAdjacentHTML("afterbegin", `<div class="d-flex d-flex justify-content-center"><h3><b>${e.name}</b>: <span style="color: ${e.color};">${(e.score_out_of_10).toFixed(2)}/10</span></h3></div>`);
        });
    })
    await axios.get(API_URL + `slug:${cityName}/images/`)
    .then((response) => {
            let data = response.data;
            // Images
            bannerContainer.style.backgroundImage = `url(${_.get(data, API_IMAGE)})`;
    }); 
}