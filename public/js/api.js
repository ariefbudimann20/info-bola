let base_url = "https://api.football-data.org/";
let headers = {
    'X-Auth-Token'  : '5eba0368ee554e21bea4e4ffa26d776c'
}

function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      return Promise.reject(new Error(response.statusText));
    } else {
      return Promise.resolve(response);
    }
}
  
function json(response) {
    return response.json();
}
  
function error(error) {
    console.log("Error : " + error);
}

// All Team
function getTeam() {
    if ("caches" in window) {
        spinner.removeAttribute('hidden');
        caches.match(base_url + "v2/competitions/2021/teams",{headers} )
        .then(response => {
            if(response){
                response.json().then(data => {
                    let teamsListAll = "";
                    data.teams.forEach(team => {
                        teamsListAll += `
                        <div class="col s12 m6 l4">
                            <div class="card">
                            <div class="card-image">
                                <img src="${team.crestUrl}" alt="img-${team.name}">
                            </div>
                            <div class="card-content center-align">
                                <span class="card-title">${team.name}</span>
                            </div>
                            <div class="card-action center-align">
                                <a href="detail-team.html?id=${team.id}" class="waves-effect btn blue">Details</a>
                            </div>
                            </div>
                        </div>
                        `;
                    });
                    document.getElementById("all-team").innerHTML = teamsListAll;
                    spinner.setAttribute('hidden', '');
                })
                .catch(error);
            }else{
                spinner.removeAttribute('hidden');
                fetch(`${base_url}v2/competitions/2021/teams`,{headers})
                .then(status)
                .then(json)
                .then(data => {
                    let teamsList = "";
                    data.teams.forEach(team => {
                        teamsList += `
                        <div class="col s12 m6 l4">
                            <div class="card">
                                <div class="card-image">
                                    <img src="${team.crestUrl}" alt="img-${team.name}">
                                </div>
                                <div class="card-content center-align">
                                    <span class="card-title">${team.name}</span>
                                </div>
                                <div class="card-action center-align">
                                    <a href="detail-team.html?id=${team.id}" class="waves-effect btn blue">Details</a>
                                </div>
                            </div>
                        </div>
                        `;
                    });
                    document.getElementById("all-team").innerHTML = teamsList;
                    spinner.setAttribute('hidden', '');
                })
                .catch(error);
            }
        })
    }
}

// GET Klasmen
function getKlasmen() {
    if ("caches" in window) {
        spinner.removeAttribute('hidden');
        caches.match(`${base_url}v2/competitions/2021/standings`,{headers} )
        .then(response => {
            if(response){
                response.json().then(data => {
                    let teamsListStandings = "";
                    data.standings[0].table.forEach(standings => {
                        teamsListStandings += `
                            <tr>
                                <td>${standings.position}</td>
                                <td style="text-align:left"><img src="${standings.team.crestUrl}" alt="img-team" width="40px" height="55px" style="float:left; margin-right:5px;"> <a href="detail-team.html?id=${standings.team.id}"><p>${standings.team.name}</p></a></td>
                                <td>${standings.playedGames}</td>
                                <td>${standings.won}</td>
                                <td>${standings.draw}</td>
                                <td>${standings.lost}</td>
                                <td>${standings.goalsFor}</td>
                                <td>${standings.goalsAgainst}</td>
                                <td>${standings.goalDifference}</td>
                                <td>${standings.points}</td>
                                <td>${standings.form}</td>
                            </tr>
                        `;
                    });
                    document.getElementById("klasmen").innerHTML = teamsListStandings;
                    spinner.setAttribute('hidden', '');
                })
                .catch(error);
            }else{
                spinner.removeAttribute('hidden');
                fetch(`${base_url}v2/competitions/2021/standings`,{headers})
                .then(status)
                .then(json)
                .then(data => {
                    let teamsListStandings = "";
                    data.standings[0].table.forEach(standings => {
                        teamsListStandings += `
                            <tr>
                                <td>${standings.position}</td>
                                <td style="text-align:left"><img src="${standings.team.crestUrl}" alt="img-team" width="40px" height="55px" style="float:left; margin-right:5px;"><a href="detail-team.html?id=${standings.team.id}"><p>${standings.team.name}</p></a></td>
                                <td>${standings.playedGames}</td>
                                <td>${standings.won}</td>
                                <td>${standings.draw}</td>
                                <td>${standings.lost}</td>
                                <td>${standings.goalsFor}</td>
                                <td>${standings.goalsAgainst}</td>
                                <td>${standings.goalDifference}</td>
                                <td>${standings.points}</td>
                                <td>${standings.form}</td>
                            </tr>
                        `;
                    });
                    document.getElementById("klasmen").innerHTML = teamsListStandings;
                    spinner.setAttribute('hidden', '');
                })
                .catch(error);
            }
        })
    }
}

// Detail Team
function getTeamById() {
    return new Promise(function(resolve, reject) {
      // Ambil nilai query parameter (?id=)
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");
        if ("caches" in window) {
            spinner.removeAttribute('hidden');
            caches.match(base_url + "v2/teams/" + idParam, {headers})
            .then(response => {
                if(response){
                    response.json().then(data => {
                        let detailContent = `
                            <div class="row center-align background-team">
                                <div class="col s12 m12 l4">
                                    <img src="${data.crestUrl}" alt="img-team" style="height:300px">
                                </div>
                                <div class="col s12 m12 l8">
                                    <h1 class="title-team">${data.name}</h1>
                                </div>
                            </div>
                    
                            <!-- Team -->
                            <div class="section">
                                <div class="row">
                                    <div class="col s12 l3">
                                        <div class="card">
                                            <div class="card-content">
                                                <h5>Team</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12 m12 l6">
                                        <table>
                                            <tr style="border: none;">
                                                <td width="120px">Name</td>
                                                <td>: ${data.name}</td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Short Name</td>
                                                <td>: ${data.shortName}</td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Address</td>
                                                <td>: ${data.address}</td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Phone</td>
                                                <td>: <a href="tel:${data.phone}">${data.phone == null ? '-' : data.phone}</a></td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Website</td>
                                                <td>: <a href="${data.website}" target="_blank">${data.website == null ? '-' : data.website}</a> </td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Email</td>
                                                <td>: <a href="mailto:${data.email}">${data.email == null ? '-' : data.email}</a></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col s12 m12 l6">
                                        <table>
                                            <tr style="border: none;">
                                                <td width="120px">Founded</td>
                                                <td>: ${data.founded}</td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Club Color</td>
                                                <td>: ${data.clubColors}</td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Venue</td>
                                                <td>: ${data.venue}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <!-- Squad -->
                            <div class="section">
                                <div class="row">
                                    <div class="col s12 l3 grey lighten-3">
                                    <h5>Squad</h5>
                                    </div>
                                </div>

                                <div class="row">
                                    <table class="table-responsive centered striped" width="100%">
                                        <thead>
                                            <tr class="blue lighten-4">
                                                <th width="120px">Name</th>
                                                <th width="120px">Position</th>
                                                <th width="120px">Role</th>
                                            </tr>
                                        </thead>
                                        <tbody> `;
                                    let tableEnd = `
                                        </body>
                                    </table>
                                </div>
                            </div>
                        `;

                        function squadPlayer(item) {
                            return `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.position == null ? '-' : item.position}</td>
                                    <td>${item.role == null ? '-' : item.role}</td>
                                </tr> 
                            `;  
                        }

                        document.getElementById("body-content").innerHTML = `${detailContent}${data.squad.map(squadPlayer).join("")}${tableEnd}`;
                        resolve(data);
                        spinner.setAttribute('hidden', '');
                    })
                }else{
                    spinner.removeAttribute('hidden');
                    fetch(`${base_url}v2/teams/${idParam}`, {headers})
                    .then(status)
                    .then(json)
                    .then(data => {
                        let detailContent = `
                            <div class="row center-align background-team">
                                <div class="col s12 m12 l4">
                                    <img src="${data.crestUrl}" alt="img-team" style="height:300px">
                                </div>
                                <div class="col s12 m12 l8">
                                    <h1 class="title-team">${data.name}</h1>
                                </div>
                            </div>
                            
                            <!-- Team -->
                            <div class="section">
                                <div class="row">
                                    <div class="col s12 l3">
                                        <div class="card">
                                            <div class="card-action">
                                            <span class="material-icons" style="padding-top: 5px">chrome_reader_mode</span>
                                            <span class="card-title">Team</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12 m12 l6">
                                        <table>
                                            <tr style="border: none;">
                                                <td width="120px">Name</td>
                                                <td>: ${data.name}</td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Short Name</td>
                                                <td>: ${data.shortName}</td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Address</td>
                                                <td>: ${data.address}</td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Phone</td>
                                                <td>: <a href="tel:${data.phone}">${data.phone == null ? '-' : data.phone}</a></td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Website</td>
                                                <td>: <a href="${data.website}" target="_blank">${data.website == null ? '-' : data.website}</a> </td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Email</td>
                                                <td>: <a href="mailto:${data.email}">${data.email == null ? '-' : data.email}</a></td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col s12 m12 l6">
                                        <table>
                                            <tr style="border: none;">
                                                <td width="120px">Founded</td>
                                                <td>: ${data.founded}</td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Club Color</td>
                                                <td>: ${data.clubColors}</td>
                                            </tr>
                                            <tr style="border: none;">
                                                <td width="120px">Venue</td>
                                                <td>: ${data.venue}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
            
                            <!-- Squad -->
                            <div class="section">
                                <div class="row">
                                    <div class="col s12 l3">
                                        <div class="card">
                                            <div class="card-action">
                                                <span class="material-icons" style="padding-top: 5px">groups</span>
                                                <span class="card-title">Squad</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
            
                                <div class="row">
                                    <table class="table-responsive centered striped" width="100%">
                                        <thead>
                                            <tr class="blue lighten-4">
                                                <th width="120px">Name</th>
                                                <th width="120px">Position</th>
                                                <th width="120px">Role</th>
                                            </tr>
                                        </thead>
                                        <tbody> `;
                                    let tableEnd = `
                                        </body>
                                    </table>
                                </div>
                            </div>
                        `;
            
                        function squadPlayer(item) {
                            return `
                                <tr>
                                    <td>${item.name}</td>
                                    <td>${item.position == null ? '-' : item.position}</td>
                                    <td>${item.role == null ? '-' : item.role}</td>
                                </tr> 
                            `;  
                        }
            
                        document.getElementById("body-content").innerHTML = `${detailContent}${data.squad.map(squadPlayer).join("")}${tableEnd}`;
                        resolve(data);
                        spinner.setAttribute('hidden', '');
                    });
                }
            });
        }
    });
}

// Favorite All Team
function getSavedTeam() {
    getAll().then(function(team) {
        spinner.removeAttribute('hidden');
        let teamsFavoriteList = "";
        team.forEach(team => {
            teamsFavoriteList += `
            <div class="col s12 m6 l4">
                <div class="card">
                    <div class="card-image">
                        <img src="${team.crestUrl}" alt="img-${team.name}">
                        <a class="btn-floating halfway-fab waves-effect waves-light red" onclick="btnDelete(${team.id})"><i class="material-icons">delete</i></a>
                    </div>
                    <div class="card-content center-align">
                        <span class="card-title">${team.name}</span>
                    </div>
                    <div class="card-action center-align">
                        <a href="detail-team.html?id=${team.id}&favorite=true" class="waves-effect btn blue">Details</a>
                    </div>
                </div>
            </div>
            `;
        });
        document.getElementById("favorite").innerHTML = teamsFavoriteList;
        spinner.setAttribute('hidden', '');
    });
}

// GET Favorite Team by Id
function getSavedTeamById() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    getById(idParam).then(function(data) {
        spinner.removeAttribute('hidden');
        let detailContent = `
                <div class="row center-align background-team">
                    <div class="col s12 m12 l4">
                        <img src="${data.crestUrl}" alt="img-team" style="height:300px">
                    </div>
                    <div class="col s12 m12 l8">
                        <h1 class="title-team">${data.name}</h1>
                    </div>
                </div>
                
                <!-- Team -->
                <div class="section">
                    <div class="row">
                        <div class="col s12 l3">
                            <div class="card">
                                <div class="card-action">
                                    <span class="material-icons" style="padding-top: 5px">chrome_reader_mode</span>
                                    <span class="card-title">Team</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 m12 l6">
                            <table>
                                <tr style="border: none;">
                                    <td width="120px">Name</td>
                                    <td>: ${data.name}</td>
                                </tr>
                                <tr style="border: none;">
                                    <td width="120px">Short Name</td>
                                    <td>: ${data.shortName}</td>
                                </tr>
                                <tr style="border: none;">
                                    <td width="120px">Address</td>
                                    <td>: ${data.address}</td>
                                </tr>
                                <tr style="border: none;">
                                    <td width="120px">Phone</td>
                                    <td>: <a href="tel:${data.phone}">${data.phone == null ? '-' : data.phone}</a></td>
                                </tr>
                                <tr style="border: none;">
                                    <td width="120px">Website</td>
                                    <td>: <a href="${data.website}" target="_blank">${data.website == null ? '-' : data.website}</a> </td>
                                </tr>
                                <tr style="border: none;">
                                    <td width="120px">Email</td>
                                    <td>: <a href="mailto:${data.email}">${data.email == null ? '-' : data.email}</a></td>
                                </tr>
                            </table>
                        </div>
                        <div class="col s12 m12 l6">
                            <table>
                                <tr style="border: none;">
                                    <td width="120px">Founded</td>
                                    <td>: ${data.founded}</td>
                                </tr>
                                <tr style="border: none;">
                                    <td width="120px">Club Color</td>
                                    <td>: ${data.clubColors}</td>
                                </tr>
                                <tr style="border: none;">
                                    <td width="120px">Venue</td>
                                    <td>: ${data.venue}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Squad -->
                <div class="section">
                    <div class="row">
                        <div class="col s12 l3">
                            <div class="card">
                                <div class="card-action">
                                    <span class="material-icons" style="padding-top: 5px">groups</span>
                                    <span class="card-title">Squad</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <table class="table-responsive centered striped" width="100%">
                            <thead>
                                <tr class="blue lighten-4">
                                    <th width="120px">Name</th>
                                    <th width="120px">Position</th>
                                    <th width="120px">Role</th>
                                </tr>
                            </thead>
                            <tbody> `;
                        let tableEnd = `
                            </body>
                        </table>
                    </div>
                </div>
            `;

        function squadPlayer(item) {
            return `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.position == null ? '-' : item.position}</td>
                    <td>${item.role == null ? '-' : item.role}</td>
                </tr> 
            `;  
        }
        document.getElementById("body-content").innerHTML = `${detailContent}${data.squad.map(squadPlayer).join("")}${tableEnd}`;
        spinner.setAttribute('hidden', '');
    });
}

// GET Detail DB
function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("teams", "readonly");
          let store = tx.objectStore("teams");
          return store.get(id);
        })
        .then(function(team) {
          resolve(team);
        });
    });
}