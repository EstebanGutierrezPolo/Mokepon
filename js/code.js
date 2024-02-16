const sectionSelectAttack = document.getElementById('select-attack')
const buttonPetPlayer= document.getElementById('button-select-pet') 
const buttonFire= document.getElementById('button-select-fire') 
const buttonWater= document.getElementById('button-select-water') 
const buttonEarth= document.getElementById('button-select-earth') 
const buttonRestart= document.getElementById('button-select-restart')

const sectionSelectPet = document.getElementById('select-pet')

const spanPlayer = document.getElementById('pet-player')

const spanEnemy = document.getElementById('pet-enemy')

const petLifesSpan = document.getElementById('pet-lifes')
const enemyLifesSpan = document.getElementById('enemy-lifes')

const resultAdo = document.getElementById('result')
const enemyAttackMessage = document.getElementById('enemy-attack-message')
const playerAttackMessage = document.getElementById('player-attack-message')
const sectionRestart = document.getElementById('section-restart')

const mokeponCards = document.getElementById('mokepon-cards')

let mokepones = []
let mokeponesOption
let inputHipodoge 
let inputCapipepo 
let inputRatigueya
let petPlayer 
let attackPlayer 
let attackEnemy
let petLifes = 3
let enemyLifes = 3

class Mokepon {
    constructor(name, pic, life) {
        this.name = name
        this.pic = pic
        this.life = life
        this.attacks = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', '5')

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', '5')

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', '5')

hipodoge.attacks.push(
    {name: '🌊', id: 'button-select-water'},
    {name: '🌊', id: 'button-select-water'},
    {name: '🌊', id: 'button-select-water'},
    {name: '🔥', id: 'button-select-fire'},
    {name: '🏞️', id: 'button-select-earth'}
)
capipepo.attacks.push(
    {name: '🏞️', id: 'button-select-earth'},
    {name: '🏞️', id: 'button-select-earth'},
    {name: '🏞️', id: 'button-select-earth'},
    {name: '🌊', id: 'button-select-water'},
    {name: '🔥', id: 'button-select-fire'}
)
ratigueya.attacks.push(
    {name: '🔥', id: 'button-select-fire'},
    {name: '🔥', id: 'button-select-fire'},
    {name: '🔥', id: 'button-select-fire'},
    {name: '🌊', id: 'button-select-water'},
    {name: '🏞️', id: 'button-select-earth'}
)
mokepones.push(hipodoge,capipepo,ratigueya)


//Starting game
function startGame(){

    mokepones.forEach((mokepon) => {
        mokeponCards.innerHTML +=
        `
        <input type="radio" name="pets" id=${mokepon.name} />
            <label class= "label-class" for=${mokepon.name}>
                <p>${mokepon.name}</p>
                <img src=${mokepon.pic} alt="${mokepon.name} picture"/>
            </label>
        `
        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })
    //Calling to the RESTART section and hiding it
        sectionRestart.style.display = 'none'
    //Calling to the select-attack section and hiding it
        sectionSelectAttack.style.display = 'none'
    //Calling to the select-pet button and adding an EventListener
        buttonPetPlayer.addEventListener('click', selectPlayerPet)
    //Calling to the fire button and adding an EventListener
        buttonFire.addEventListener('click', attackFire)
    //Calling to the water button and adding an EventListener
        buttonWater.addEventListener('click', attackWater)
    //Calling to the earth button and adding an EventListener
        buttonEarth.addEventListener('click', attackEarth)
    //Calling to the select-restart button and adding an EventListener
        buttonRestart.addEventListener('click', restart)
}
//Selection section, here you choose your pet
function selectPlayerPet(){
    sectionSelectAttack.style.display = 'flex'

    sectionSelectPet.style.display = 'none'
   
    if(inputHipodoge.checked){
        spanPlayer.innerHTML=inputHipodoge.id
        petPlayer= inputHipodoge.id
    } else if (inputCapipepo.checked){
        spanPlayer.innerHTML=inputCapipepo.id
        petPlayer= inputCapipepo.id

    } else if (inputRatigueya.checked){
        spanPlayer.innerHTML=inputRatigueya.id
        petPlayer= inputRatigueya.id
    } else {
        alert("Select a pet")
        restart()
    }
    attackExtractor(petPlayer)
    selectEnemyPet()
}
function attackExtractor(petPlayer){
    let attacks
    for (let i = 0; i < mokepones.length; i++) {
        if(petPlayer === mokepones[i].name){
            attacks = mokepones[i].attacks
        }
    } 
    console.log(attacks)
} 
function selectEnemyPet(){
    let randomPet = random(0, mokepones.length - 1)
    spanEnemy.innerHTML= mokepones[randomPet].name
}
    function random(min, max){
    return Math.floor(Math.random()*(max - min + 1)+ min)
}
//attack functions
function attackFire(){
    attackPlayer = 'Fire'
    randomAttack()
}
function attackWater(){
    attackPlayer = 'Water'
    randomAttack()
}
function attackEarth(){
    attackPlayer = 'Earth'
    randomAttack()
}
//Enemy's attacks
function randomAttack(){
let attack = random(1, 3)
    if(attack == 1){
        attackEnemy = 'Fire'
    }else if(attack == 2){
        attackEnemy= 'Water'
    }else {
        attackEnemy= 'Earth'
    }
    combat()
    }
//Combat
function combat(){    
    if(attackPlayer == attackEnemy){
        messages("You tie")
    }    
    else if(attackPlayer== 'Fire' && attackEnemy== 'Earth' || attackPlayer== 'Water' && attackEnemy== 'Fire' || attackPlayer== 'Earth' && attackEnemy== 'Water'){
        messages("You won")
        enemyLifes--
        enemyLifesSpan.innerHTML=enemyLifes
        
    } else{
        messages("You lost")
        petLifes--
        petLifesSpan.innerHTML=petLifes
    } checkLifes()
    } 

    //Check lifes
function checkLifes(){
       
        if(enemyLifes == 0){
           finalMessages("are the winner!!!🥳🥳🥳")
           
        } else if (petLifes == 0){
            finalMessages("lost, try it again")
            
        } 
    }    

//Section of messages where appear the messages that says what you played
function messages(finalResult){
    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')
    result.innerHTML = finalResult
    newPlayerAttack.innerHTML = attackEnemy
    newEnemyAttack.innerHTML = attackPlayer
    // result.appendChild(notification)
    playerAttackMessage.appendChild(newPlayerAttack)
    enemyAttackMessage.appendChild(newEnemyAttack)
}
//Section of final message where appear the messages if you win/lost
function finalMessages(result){
    

    resultAdo.innerHTML = "You " + result
    
     
    buttonFire.disabled = true

    
    buttonWater.disabled = true

     
    buttonEarth.disabled = true

    
    sectionRestart.style.display= 'block'

}
function restart(){
    location.reload()
}

// NOTA: esta es otra manera de llamar al script despues de que se cargue todo el HTML. La funcion iniciarJuego se carga cuando ya todo el contenido esta cargado.

window.addEventListener('load', startGame)

