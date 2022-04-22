let body = document.body;
let url = window.location.href;
let getName = (url) =>  {
	let g = url.split('=');
	let name = g[1];
	if (name == undefined) {
    name = 'Serg-Shevcov'
	}
	return name;
}

window.onload = async function () {

  await Promise.all([
  
    new Promise((resolve, reject) => 
	  
	  setTimeout(() => {
		let now = document.createElement('p');
		now.innerHTML= new Date();
		body.append(now);
        resolve(1);		
		}, 5000)),

    fetch(`https://api.github.com/users/${getName(url)}`)
      .then(res => res.json())
      .then(json => {
        console.log(json.avatar_url);
        console.log(json.name);
        console.log(json.bio);
        console.log(json.html_url);

        let photo = new Image();
        photo.src = json.avatar_url;
        body.append(photo);

        let name = document.createElement('p');
        if (json.name != null) {
            name.innerHTML = json.name;
        } else {
            name.innerHTML = 'Информация о пользователе недоступна';
        }
        body.append(name);		
        name.addEventListener("click", () => window.location = json.html_url);

        let bio = document.createElement('p');
        if (json.bio != null) {
            bio.innerHTML = json.bio;
        } else {
            bio.innerHTML = 'Информация о пользователе недоступна';
        }
        body.append(bio);	
    })    
    .catch(err => alert('Информация о пользователе недоступна!'))
  ])
  
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 1000);
};