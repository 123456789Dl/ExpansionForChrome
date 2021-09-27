//import { response } from "express";
async function takeData() {
    const url = 'http://localhost:3000/';
    const response = await fetch(url);

    const commits = await response.json()
    const lengthCommits = commits.length;
    let innerHistory = '';

    for (let i = (lengthCommits - 1); i >= 0; i--) {
        innerHistory += `
            <div class="historyItem list-group-item">
                <div class="historyItemUrl">${commits[i].date}</div>
                <div class="historyItemUrl">${commits[i].url}</div>
                <div class="historyItemTime">${commits[i].time}</div>
            </div>
        `;
    }
    document.querySelector('.box').innerHTML = '<div class="list-group">'+innerHistory+'<div/>'
}
takeData();