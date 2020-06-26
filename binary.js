console.log("Javascript actif.")
console.log("Git Actif");

let arr = [];
startApp();



//Role: Lance l'application
function startApp() {
    createBoard(8,8);
    displayBoard();
    createGrideDom("content");
    //launchNewGamePlay();
    //remplirNew();
    //verifAll();
}

document.getElementById("headerTitle").onclick=function(){
    verifAll();
}


///////////////////////////////////////////////////////////////////////////////////////////////////////
//2 param : nbr line - nbr colomn
//Role    : creation d'un tableau 2D vide
function createBoard(lines,columns) {
    for (let i = 0; i < lines; i++) {
        arr[i] = new Array(columns);
    	}
};

//Role: affichage en console du tableau
function displayBoard() {
let row;
    for (let i = 0; i < arr.length; i++) {
        row = "";
        for (let j = 0; j < arr[i].length; j++) {
            if(j == 0){
                row+=arr[i][j];
            }
            else{
                row+=" "+arr[i][j];
            }
        }
        console.log(row);
    }
};

//Role: remplissage aléatoire 0/1
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//Role: remplissage case précise
function setCaseArray(x,y,val){
    arr[x][y]=val;
	displayDom();
}

//Role: Lancement Full aléatoire
function launchNewGamePlay(){
    for(var i =0;i<arr.length;i++){
        for (let j = 0; j < arr[i].length; j++) {
        setCaseArray(i,j,getRandomInt(2)); 
        }
    }
    displayBoard();
    displayDom();
}

//1 Param: string du nom de class
//Role   : Création du DOM
function createGrideDom(divId) {
    let newSectionC = document.createElement("SECTION"); 
    for (let i = 0; i < arr[0].length; i++) {
        let newSpanCol= document.createElement("span");           
        newSpanCol.id="sumC"+ i;
        newSpanCol.classList.add("sumC");
        newSpanCol.innerHTML="&nbsp;";   
        document.getElementById(divId).appendChild(newSectionC); 
        newSectionC.appendChild(newSpanCol);             
    }  
    for(var i =0;i<arr.length;i++){
        let newSection = document.createElement("SECTION"); 
        let newSpanLin= document.createElement("span");
        newSection.id = "s"; 
        for (let j = 0; j < arr[i].length; j++) {
            let newDiv = document.createElement("div");
            newDiv.id = "cel"+i+j; 
            newDiv.classList.add("cel");
            newDiv.innerHTML= "~";
            newDiv.setAttribute('title', i+","+j);
            let x=i;
            let y=j;
            newDiv.onclick = function(){ 
                let val= newDiv.innerHTML;
                console.log(verifCase(x,y,val));
            }
            newSpanLin.id="sumL"+ i;
            newSpanLin.classList.add("sumL");
            newSpanLin.innerHTML="&nbsp;&nbsp;";
            document.getElementById(divId).appendChild(newSection);
            newSection.appendChild(newDiv); 
            newSection.appendChild(newSpanLin);  
        } 
    } 
}

// Remplissage HTML
function displayDom(){
	for(var i =0;i<arr.length;i++){
        for (let j = 0; j < arr[i].length; j++) {
			document.getElementById("cel"+i+j).innerHTML = arr[i][j];
		}
	}
}

//Role : verification globale du tableau
function verifAll(){
    for(var i =0;i<arr.length;i++){
        for (let j = 0; j < arr[i].length; j++) {
            let val = arr[i][j];
            verifCase(i,j,val);
        }
    }
}

//2 Params : chiffre nbr de colonnes et de lignes
//Role     : verifications nbrs max et cases adj
//Retour   : True ou False
function verifCase(x, y,val) {
    // suite de numéro safe possibles avec 3 fois la meme valeur: 01101
	let safeCombinaison = ["03","13","14"];
    let caseOk =true;
	if(!val)
		val = arr[x][y];
        //console.log(val);
    let sumLigne = 0,
        sumCol = 0,
        sameValLigne = 0,
        sameValCol = 0;

    //sumLignes
    for (var i = 0; i < arr[y].length; i++) {
        if (arr[x][i] == val)
            sumLigne++;
    }
    document.getElementById("sumL"+x).innerHTML=sumLigne;// en fonction de la case de référence ou cliquée
    if(sumLigne > arr[x].length/2)
        caseOk = false;

    //sumColonnes
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][y] == val)
            sumCol++;
    }
    document.getElementById("sumC"+y).innerHTML=sumCol;// en fonction de la case de référence ou cliquée
    if(sumCol > arr.length/2)
        caseOk = false;

    //
    let listOtherVal="";                // liste des index de la case (si elle n'a pas la meme valeur que val) sur le referentiel 01234
    for (var i = -2; i <= 2; i++) {
        if ((x + i) >= 0 && (x + i) < arr.length) {
            if (arr[x + i][y] == val) {
                sameValCol++;
            } else {
				if(arr[x + i][y] != null)
				listOtherVal += (i+2); // ?
            }
        } else {
			listOtherVal+= (i+2);
		}
    }
    if (sameValCol >= 3) {
		if(!safeCombinaison.includes(listOtherVal))
		{
        sameValCol = "Error suite Col " + val;
        caseOk = false;
		}
		else
		{
			sameValCol = "ok";
		}
		
    } else {
        sameValCol = "ok";
    }
    listOtherVal = "";
    for (var i = -2; i <= 2; i++) {
        if ((y + i) >= 0 && (y + i) < arr[x].length) {
            if (arr[x][y + i] == val) {
                sameValLigne++;
            } else {
				if(arr[x][y + i] != null)
				listOtherVal += (i+2);
            }
        } else {
			listOtherVal+= (i+2);
		}
    }
	if (sameValLigne >= 3) {
		if(!safeCombinaison.includes(listOtherVal))
		{
        sameValLigne = "Error suite ligne " + val;
        caseOk = false;
		}
				else
		{
			sameValLigne = "ok";
		}
    } else {
        sameValLigne = "ok";
    }
    if(!caseOk){
        //console.log("\nOccurence en ligne: " + sumLigne + "\nOccurence en colonne:" + sumCol + "\n" + sameValLigne + "\n" + sameValCol+ "\n");
        document.getElementById("cel"+x+y).style.backgroundColor = "red"; //red  
    }else{
        document.getElementById("cel"+x+y).style.backgroundColor = "#08f814"; //vert
        }
    return caseOk;
}

function verifLine(x,y,val){
	let safe = "";
	let sameValLigne="";
	    for (var i = -2; i <= 2; i++) {
        if ((y + i) >= 0 && (y + i) < arr[x].length) {
            if (arr[x][y + i] == val) {
                sameValLigne++;
            } else {
				safe += (i+2);
            }
        }
    }
	console.log(sameValLigne);
	return safe;
}

function remplirNew(stop) {
    stop++;
	console.log(stop);
    let count = 0;
    for (var i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let val = getRandomInt(2);
            if (arr[i][j]!=0 && arr[i][j]!=1) {
                if (verifCase(i, j, val)) {
                    console.log("case at ["+i+"]["+j+"] set to "+val);
                    arr[i][j] = val;
					count++;
                } else if (val == 1) {
                    console.log("case at ["+i+"]["+j+"] set to "+0);
                    arr[i][j] = 0;
					count++;
                }
                
            }
        }
    }
	emptyWrongCase();
    if (stop <= 20 && count > 0)
	{
        remplirNew(stop);
	}
	else
	{
		if(emptyWrongCase()){
			clean();
			remplirNew(0);
		}
		displayDom();
		displayBoard();
	}
}


function emptyWrongCase(){
	let caseWrong = false;
	for (var i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
			verifCase(i,j,arr[i][j]);
			if(document.getElementById("cel"+i+j).style.backgroundColor == "red"){
				caseWrong = true;
				document.getElementById("cel"+i+j).style.backgroundColor="";
				arr[i][j]=null;
			}
			else
			{
				if(arr[i][j]!=0 && arr[i][j]!=1)
				{	
					document.getElementById("cel"+i+j).style.backgroundColor="";
					caseWrong = true;
				}
			}
				
		}
	}
	return caseWrong;
}


function clean(){
	for (var i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
				document.getElementById("cel"+i+j).style.backgroundColor="";
				arr[i][j]=null;				
		}
	}
	displayDom();
}


function makeItPlayable(caseToDelete,size){
	let caseList = new Array(size*size);
	for (var i =0; i<caseList.length;i++){
		caseList[i] = i;
	}
	let number = "";

	while(caseToDelete>0){
		number = getRandomInt(caseList.length);
		if(caseList[number]!=0)
		{
			caseList[number] = 0;
			arr[number%size][(number - number%size)/size]=null;
			caseToDelete--;
		}
	}
	emptyWrongCase();
	displayDom();
}

// ???????????????

/*
//Exemple
function AdditionRecursive(val){
    console.log(val);
    val++;
    if(val >10)
    {
        console.log("done");
    }else{
        AdditionRecursive(val);
    }
}*/

/*
///Possibles autour :
        00000
        00001
        00010
        00011
00100
00101         
00110      
                00111
        01000
        01001      
        01010      
        01011       
01100
    01101       
                01110
            01111
        10000
        10001
        10010       
        10011
10100
    10101
    10110
            10111
        11000
        11001
        11010
        11011
                11100
            11101
            11110
            11111

            ambigue : 01101 10101 10110
            avec:     01234
            on a :    03    13    14
*/