const dbPromise = idb.open("football", 1, function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("team")) {
    const peopleOS = upgradeDb.createObjectStore("team", { keyPath: "id" });
  }
});

const addFav = (team) => {

	getTim(team).then((r) => {
		 dbPromise
	    .then((db) => {
	      const tx = db.transaction("team", "readwrite");
	      const store = tx.objectStore("team");
	      store.put(r);
	      return tx.complete;
	    })
	    .then(() => {
	      M.toast({html: 'Team was added successfully'})
	      window.location.href = ''
	    });
	})
}

const delFav = (id) => {
	dbPromise.then(function(db) {
	  const tx = db.transaction('team', 'readwrite');
	  const store = tx.objectStore('team');
	  store.delete(id);
	  return tx.complete;
	}).then(function() {
	  M.toast({html: 'Team was removed successfully'})
	      window.location.href = ''
	});
}

const getSaved = () => {
	return new Promise((resolve, reject) => {
    dbPromise
      .then((db) => {
        const tx = db.transaction("team", "readonly");
        const store = tx.objectStore("team");
        return store.getAll();
      })
      .then((favs) => {
        resolve(favs);
      });
  });
}

const getOne = (id) => {
	return new Promise((resolve, reject) => {
    dbPromise
      .then((db) => {
        const tx = db.transaction("team", "readonly");
        const store = tx.objectStore("team");
        return store.get(id)
      })
      .then((favs) => {
      	if(favs)
        	resolve(favs);
        else
        	reject(null)
      })
  });
}

const showSaved = (favs) => {
	let favBox = ""
	const random = Math.floor(Math.random() * 13)
	const color = getColor(random)
	document.querySelector("#body-content").classList.add("container")
	const titleData = 
					`<div class="row title-league title-league-favorite ${color} accent-3 z-depth-2">
						<div class="col m12 s12">
							<h4 class="white-text">My Favorite Team</h4>
							<span class="white-text">${favs.length} team</span>
						</div>
					</div>
					`
	document.querySelector("#homeData").innerHTML = titleData
	
	favs.forEach((fav) => {
		favBox += 
		`
		    <div class="col s12 m6">
		      <div class="card">
		        <div class="card-image">
		          <center><img src="${fav.crestUrl}" style="width: 130px; height: 130px; padding-top: 15px" alt="${fav.name}"></center>
		          <a class="btn-floating halfway-fab waves-effect waves-light red" onclick="delFav(${fav.id})"><i class="material-icons">delete</i></a>
		        </div>
		        <div class="card-content">
		          <p class="card-title">${fav.name}</p>
		          	<table class="responsive-table">
				        <tr>
				            <td width="30%">Address</td>
				            <th>${fav.address}</th>
				        </tr>
				        <tr>
				            <td>Venue</td>
				            <th>${fav.venue}</th>
				        </tr>
				        <tr>
				            <td width="30%">Phone</td>
				            <th>${fav.phone}</th>
				        </tr>
				        <tr>
				            <td width="30%">Website</td>
				            <th><a href="${fav.website}" rel="nofollow">${fav.website}</a></th>
				        </tr>
				        <tr>
				            <td width="30%">Email</td>
				            <th>${fav.email}</th>
				        </tr>
				      </table>
		        </div>
		      </div>
		    </div>
		  `
	})
	document.querySelector("#homeData").innerHTML += favBox
}