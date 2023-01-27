import {getData} from "./index"

// City
export let cityName
// Search Bar
export const bannerContainer = document.querySelector(".banner-container")
export const inputBar = document.querySelector(".input-bar");
export const searchButton = document.querySelector(".search-button");
// Description
export const errorCity = document.querySelector(".error-city")
export const introductionSection = document.querySelector(".introduction");
// Results
export const resultSection = document.querySelector(".results");
// Results - summary and score
export const cityID = document.querySelector(".city-id");
export const citySummary = document.querySelector(".city-summary");
export const cityScore = document.querySelector(".city-score");
// Results - rates
export const scoreSection = document.querySelector(".score-section");


// Function
export function correctName(input){
    input = input.toLowerCase();
    input = input.trim();
    input = input.replaceAll(" ","-");
    return input;
};  

export function getError(message){
    errorCity.innerHTML = `<h3 class="error mt-2">${message}</h3>`; 
    return message;
}

// Event Listener
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    if(inputBar.value == ""){
        getError('This field is required and cannot be empty.');
    }else {
        cityName = correctName(inputBar.value);
        getData();
    }
});

inputBar.addEventListener('keypress', (e) => {                 
    if(e.key === 'Enter' || e.key === 'click') {
        e.preventDefault();
        cityName = correctName(inputBar.value);
        getData();
    }
});

inputBar.addEventListener('focus', () => {
    inputBar.value = "";
    errorCity.innerHTML = "";
})