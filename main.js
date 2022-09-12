const card = document.getElementById("card")
const anterior = document.getElementById("anterior")
const siguiente = document.getElementById("sig")
let next = ""
let previous = ""
let url = "https://pokeapi.co/api/v2/pokemon"

siguiente.addEventListener('click', ()=>{
    card.innerHTML = ""
    getAllPokemon(next)
})

anterior.addEventListener('click', () =>{
    card.innerHTML = ""
    getAllPokemon(previous)
})

const getAllPokemon = async (url) => {

    var data = []
    var habilidades = ""
    data = await fetch(url)
    var json = await data.json()
    next = json.next
    previous = json.previous

    
    if(previous == undefined){
        anterior.hidden = true
    }else{
        anterior.hidden = false
    }

    for (var pokemon of json.results) {

        var res = await fetch(pokemon.url)
        var info = await res.json()

       for(var hab of info.abilities){
        habilidades += `<p class="card-text text-uppercase" >${hab.ability.name}</p>`
       }

       card.innerHTML += `
       <div class="card col" style="margin: 5%;"  height: 40%; width: 40% >
       <img src="${info.sprites.front_default}" alt=${pokemon.name}" class="card-img-top rounded" height="5%" width="5%" >
       <div class="card-body">
         <h3 class="card-title text-primary text-center text-uppercase">${pokemon.name}</h3>
         <h5 class="card-title text-success">Habilidades :</h5>
         <p class="card-text">${habilidades}</p>
       </div>
     </div>`

   habilidades = ""

    }

}

getAllPokemon(url)