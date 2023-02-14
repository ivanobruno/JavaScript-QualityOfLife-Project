import {getData} from "./index"
import axios from "axios";
import {API_URL} from "./index";

// City
export let cityName = ``;
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
export let loading = document.onreadystatechange = async function () {
    var state = document.readyState
    if (state == 'interactive') {
        document.getElementById('contents').style.visibility="hidden";
    } else if (state == 'complete') {
        setTimeout(function(){
            document.getElementById('interactive');
            document.getElementById('load').style.visibility="hidden";
            document.getElementById('contents').style.visibility="visible";
        },1000);
    }
}
// Event Listener
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    if(inputBar.value == ""){
        getError('This field is required and cannot be empty.');
    }else {
        cityName = correctName(inputBar.value);
        axios.get(API_URL + `slug:${cityName}/scores/`)
            .then(() =>
                axios.head(API_URL + `slug:${cityName}/scores/`)
                .then(({ data }) =>
                    getData(data)
                )
            )
            .catch(() => {
                getError('This city is not available, try again.');
            })
            inputBar.value = "";
    }
});
inputBar.addEventListener('keypress', (e) => {                 
    if(e.key === 'Enter') {
        e.preventDefault();
        if(inputBar.value == ""){
            getError('This field is required and cannot be empty.');
        }else {
            cityName = correctName(inputBar.value);
            axios.get(API_URL + `slug:${cityName}/scores/`)
            .then(() =>
                axios.head(API_URL + `slug:${cityName}/scores/`)
                    .then(({ data }) =>
                        getData(data)
                    )
            )
            .catch(() => {
                getError('This city is not available, try again.');
            })
            inputBar.value = "";
        }
    }
});
inputBar.addEventListener('focus', () => {
    inputBar.value = "";
    errorCity.innerHTML = "";
})