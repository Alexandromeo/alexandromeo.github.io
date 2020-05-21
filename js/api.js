let urlKlasemen;
let urlTim;
const token = 'd350b2c0fc044c93ae300dd56f15062a'


const fetchApi = (url) => {
	return fetch(url, {
		headers: {
			'X-Auth-Token': token
		}
	})
}

const getColor = (index) => {
	const color = ['red', 'pink', 'indigo', 'purple', 'deep-purple', 
					'blue', 'teal', 'light-blue', 'cyan', 'green', 
					'amber', 'orange', 'deep-orange']
	return color[index]
}

const getRankColor = (rank) => {
	const color = ['black-text', 'amber-text', 'blue-grey-text', 'brown-text']
	return rank > 3 ? color[0] : color[rank]
}

const getDataBola = (id) => {
	urlKlasemen = `https://api.football-data.org/v2/competitions/${id}/standings`
	if('caches' in window)
	{
		caches.match(`${urlKlasemen}`).then((response) => {
			if (response) 
      		{
        		response.json().then((data) => {
        			let random = Math.floor(Math.random() * 13)
					let color = getColor(random)
					document.querySelector("#body-content").classList.add("container")
					const titleData = 
					`<div class="row title-league ${color} accent-3 z-depth-2">
						<div class="col m12 s12">
						<h4 class="white-text">${data.competition.name}</h4>
							<span class="white-text">Start date : ${data.season.startDate}</span><br/>
							<span class="white-text">End date : ${data.season.endDate}</span>
							<span class="country-league white-text">Country : ${data.competition.area.name}
						</div>
					</div>
					`
					document.querySelector("#homeData").innerHTML = titleData
					
					let clubsData = "";
					data.standings[0].table.forEach((club) => {
						club.team.crestUrl = club.team.crestUrl.replace(/^http:\/\//i, 'https://');
						let colorRank = getRankColor(club.position)
						getOne(club.team.id).then((res) => {
							clubsData += 
							`
							    <div class="col s12 m12">
							      <div class="card football-card">
							      	<div class="row">
								      	<div class="col s12 m2">
								        	<img src="${club.team.crestUrl}" class="football-logo" alt="${club.team.name}">
								        </div>
								        <div class="col s12 m10">
								        	<span class="football-team">${club.team.name} - <b>${club.points} pts</b></span>
								        	<span class="right football-rank ${colorRank}">#${club.position}</span><br/>
								        	<span class="football-status green accent-4 white-text"><b>Won :</b> ${club.won}</span>
								        	<span class="football-status amber white-text"><b>Draw :</b> ${club.draw}</span>
								        	<span class="football-status red white-text"><b>Lost :</b> ${club.lost}</span><br/>

								        	<span class="football-favorites red darken-1 white-text" onclick="delFav(${club.team.id})">
								        		<i class="tiny material-icons">delete</i>
								        		Remove from Favorites
								        	</span>
								        </div>
								    </div>
							      </div>
							    </div>
							`
							document.querySelector("#content-ball").innerHTML = clubsData
						}).catch((res) => {
							clubsData += 
							`
							    <div class="col s12 m12">
							      <div class="card football-card">
							      	<div class="row">
								      	<div class="col s12 m2">
								        	<img src="${club.team.crestUrl}" class="football-logo" alt="${club.team.name}">
								        </div>
								        <div class="col s12 m10">
								        	<span class="football-team">${club.team.name} - <b>${club.points} pts</b></span>
								        	<span class="right football-rank ${colorRank}">#${club.position}</span><br/>
								        	<span class="football-status green accent-4 white-text"><b>Won :</b> ${club.won}</span>
								        	<span class="football-status amber white-text"><b>Draw :</b> ${club.draw}</span>
								        	<span class="football-status red white-text"><b>Lost :</b> ${club.lost}</span><br/>

								        	<span class="football-favorites light-blue darken-1 white-text" onclick="addFav(${club.team.id})">
								        		<i class="tiny material-icons">favorite</i>
								        		Add to Favorites
								        	</span>
								        </div>
								    </div>
							      </div>
							    </div>
							`
						document.querySelector("#content-ball").innerHTML = clubsData
						})
					})

        		})
        	}
		})
	}

	else 
  	{
    	event.respondWith(
        	caches.match(event.request, { ignoreSearch: true }).then((response) => {
          	  return response || fetch (event.request) 
        	})
    	)
  	}

  	fetchApi(urlKlasemen).then((res) => {
			return res.json()
		}).then((data) => {
			let random = Math.floor(Math.random() * 13)
			let color = getColor(random)
			document.querySelector("#body-content").classList.add("container")
			const titleData = 
			`<div class="row title-league ${color} accent-3 z-depth-2">
				<div class="col m12 s12">
				<h4 class="white-text">${data.competition.name}</h4>
					<span class="white-text">Start date : ${data.season.startDate}</span><br/>
					<span class="white-text">End date : ${data.season.endDate}</span>
					<span class="country-league white-text">Country : ${data.competition.area.name}
				</div>
			</div>
			`
			document.querySelector("#homeData").innerHTML = titleData
			
			let clubsData = "";
			data.standings[0].table.forEach((club) => {
						club.team.crestUrl = club.team.crestUrl.replace(/^http:\/\//i, 'https://');
						let colorRank = getRankColor(club.position)
						getOne(club.team.id).then((res) => {
							clubsData += 
							`
							    <div class="col s12 m12">
							      <div class="card football-card">
							      	<div class="row">
								      	<div class="col s12 m2">
								        	<img src="${club.team.crestUrl}" class="football-logo" alt="${club.team.name}">
								        </div>
								        <div class="col s12 m10">
								        	<span class="football-team">${club.team.name} - <b>${club.points} pts</b></span>
								        	<span class="right football-rank ${colorRank}">#${club.position}</span><br/>
								        	<span class="football-status green accent-4 white-text"><b>Won :</b> ${club.won}</span>
								        	<span class="football-status amber white-text"><b>Draw :</b> ${club.draw}</span>
								        	<span class="football-status red white-text"><b>Lost :</b> ${club.lost}</span><br/>

								        	<span class="football-favorites red darken-1 white-text" onclick="delFav(${club.team.id})">
								        		<i class="tiny material-icons">delete</i>
								        		Remove from Favorites
								        	</span>
								        </div>
								    </div>
							      </div>
							    </div>
							`
							document.querySelector("#content-ball").innerHTML = clubsData
						}).catch((res) => {
							clubsData += 
							`
							    <div class="col s12 m12">
							      <div class="card football-card">
							      	<div class="row">
								      	<div class="col s12 m2">
								        	<img src="${club.team.crestUrl}" class="football-logo" alt="${club.team.name}">
								        </div>
								        <div class="col s12 m10">
								        	<span class="football-team">${club.team.name} - <b>${club.points} pts</b></span>
								        	<span class="right football-rank ${colorRank}">#${club.position}</span><br/>
								        	<span class="football-status green accent-4 white-text"><b>Won :</b> ${club.won}</span>
								        	<span class="football-status amber white-text"><b>Draw :</b> ${club.draw}</span>
								        	<span class="football-status red white-text"><b>Lost :</b> ${club.lost}</span><br/>

								        	<span class="football-favorites light-blue darken-1 white-text" onclick="addFav(${club.team.id})">
								        		<i class="tiny material-icons">favorite</i>
								        		Add to Favorites
								        	</span>
								        </div>
								    </div>
							      </div>
							    </div>
							`
						document.querySelector("#content-ball").innerHTML = clubsData
						})
					})
		})
}

const getTim = (id) => {
	urlTim = `https://api.football-data.org/v2/teams/${id}`
	return new Promise((resolve, reject) => {
		if('caches' in window)
		{
			caches.match(`${urlTim}`).then((response) => {
          		if (response) 
          		{
            		response.json().then((data) => {
            			resolve(data)
            		})
        		}
        	})
		}

		fetchApi(urlTim).then((res) => {
				return res.json()
			}).then((data) => {
				resolve(data)
			})
	})
}
