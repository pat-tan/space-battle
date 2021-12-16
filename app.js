// DOM Queries
const startContainer = document.querySelector('#start-container');


class ship{
    constructor(name, hull, firepower, accuracy, status){
        this.name = name;
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.status = status;
    }
    attack(enemy) {
        //Math.random() - range 0 to 1 (0 - inclusive, 1 - exclusive)
        let rand = Math.random();
        //if the randomness is less than ship's accuracy, enemy is hit
        if(rand < this.accuracy){
            //damage to enemy's hull
            if(this.hull > 0) {
                // alert(this.name+' dealt '+this.firepower+' damage to '+enemy.name)
                    alert(this.name+' dealt '+this.firepower+' damage to '+enemy.name)
                    enemy.hull -= this.firepower;
                    
            }
            // alert(enemy.name+' has '+enemy.hull+' hull pts remaining')
                alert(enemy.name+' has '+enemy.hull+' hull pts remaining')

                // document.getElementById("startH").innerHTML = enemy.name+' has '+enemy.hull+' hull pts remaining';

                // location.reload();
            if(enemy.hull <= 0){
                // alert(this.name+' destroyed '+enemy.name)
                    alert(this.name+' destroyed '+enemy.name)

                    // document.getElementById("startH").innerHTML = this.name+' destroyed '+enemy.name;
                // console.log('inside line 37')
                // location.reload();
                enemy.status = false;
                // enemy.firepower = 0;
            }
        }
        else{
            if(enemy.hull > 0 && this.hull > 0){
                setTimeout( () => {
                    // document.getElementById("startH").innerHTML = enemy.name+' dodged the shot!';
                    alert(enemy.name+' dodged the shot!');

                },2000);

                // console.log('inside line 46')
                // location.reload();

            }
        }
    }
}

function randNumber(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

function randDec(min, max) { 
    return (Math.floor(Math.random() * (max*100 - min*100 +1)) + min*100)/100;
} 

function updateStats(player, enemy) {
    console.log("inside updateStats")
    document.getElementById("ph").innerHTML = `Hull : ${player.hull}`;
    document.getElementById("pf").innerHTML = `Firepower : ${player.firepower}`;
    document.getElementById("pa").innerHTML = `Accuracy : ${player.accuracy}`;
    document.getElementById("eh").innerHTML = `Hull : ${enemy.hull}`;
    document.getElementById("ef").innerHTML = `Firepower : ${enemy.firepower}`;
    document.getElementById("ea").innerHTML = `Accuracy : ${enemy.accuracy}`;
}

// constructor(name, hull, firepower, accuracy, status)
let uss = new ship('USS-Schwarzenegger', 20, 5, 0.7, true);
let numAliens = 6;
let aliens = [];
for(let i=0;i<numAliens;i++){
    aliens.push(new ship('Alien '+(i+1), randNumber(3, 6), randNumber(2, 4), randDec(0.6, 0.8), true));
    console.log(`${aliens[i].name}, ${aliens[i].hull}, ${aliens[i].firepower}, ${aliens[i].accuracy}`);
}

const game = {
    start: () => {
        setTimeout( () => {
            startContainer.classList.add('hide');
        },2000);
            let answer = prompt("Do you want to attack the alien fleet?",'Retreat/Yes');
            answer=answer.toLowerCase();
            if(answer === 'yes') {
                let rem = numAliens;
                for(let i=0; i < numAliens; i++) {
                    while (uss.status && aliens[i].status){
                            updateStats(uss, aliens[i]);
                            location.reload();
                            uss.attack(aliens[i]);
                            updateStats(uss, aliens[i]);
                            location.reload();
                            aliens[i].attack(uss);
                            updateStats(uss, aliens[i]);
                            location.reload();
                        
                    }
                    if(!uss.status) {
                        alert(`The ${uss.name} has been destroyed. Game Over`);
                        break;
                    }
                    rem--;
                    if(rem > 0) {
                        let answer = prompt(`[Current Health: ${uss.hull}], [Next Enemy's Health: ${aliens[i+1].hull}], [Enemies Remaining: ${rem}]`+"\nDo you want to attack the alien fleet? "+rem+" alien(s) remaining.",'Retreat/Yes');
                        answer=answer.toLowerCase();
                        if(answer === 'yes') {
                            continue;
                        }
                        else {
                            alert("Tactical retreat! Fight another day!");
                            break;
                        }
                    }
                }
                if(uss.status && rem <= 0){
                    alert("Victory! The entire alien fleet has been destroyed.")
                    // break;
                }
            }
            else{
                alert("Tactical retreat! Fight another day!");
            }
        // },2000);
        
    }
    
};

