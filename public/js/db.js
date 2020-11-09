let dbPromised = idb.open("info-Bola", 1, function(upgradeDb) {
  let teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", { unique: false });
});

// Insert DB
function saveForLater(team) {
  dbPromised
    .then(function(db) {
      spinner.removeAttribute('hidden');
      let tx = db.transaction("teams", "readwrite");
      let store = tx.objectStore("teams");
      // console.log(team);
      store.add(team);
      return tx.complete;
    })
    .then(function() {
      Swal.fire({
        title: "Berhasil",
        html: '<span class="text-center">Team <strong>'+ team.name +'</strong> Berhasil Menjadi Favorite</span>',
        icon: "success",
        timer: 4000,
        showConfirmButton: false
      })
      spinner.setAttribute('hidden', '');
    })
    .catch(() => {
      Swal.fire({
        // title: "Berhasil",
        html: '<span class="text-center">Team <strong>'+ team.name +'</strong> Sudah Ada di Favorite</span>',
        icon: "warning",
        timer: 4000,
        showConfirmButton: false
      })
      spinner.setAttribute('hidden', '');
    })
}

// Delete DB
function deleteFavorite(id) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction('teams', 'readwrite');
      let store = tx.objectStore('teams');
      store.delete(id);
      return tx.complete;
    }).then(function() {
      Swal.fire({
        title:"Berhasil",
        text: "Team Favorite Berhasil Di Hapus",
        icon: "success",
        timer: 4000,
        showConfirmButton: false
      })
      location.reload();
      spinner.setAttribute('hidden', '');
    });
}

// Read All DB
function getAll() {
return new Promise(function(resolve, reject) {
  dbPromised
    .then(function(db) {
      let tx = db.transaction("teams", "readonly");
      let store = tx.objectStore("teams");
      return store.getAll();
    })
    .then(function(teams) {
      resolve(teams);
    });
});
}
