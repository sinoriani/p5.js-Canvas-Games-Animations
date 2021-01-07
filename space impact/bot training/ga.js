let generationCounter = 0;
let mutationRate = 0.01;

function bestFitness(array){
	let bestFitness = 0;
	for(let bot of array){
		if(bot.fitness > bestFitness)
		{
			bestFitness = bot.fitness;
		}
	}
	return bestFitness;
}

function nextGeneration(){
	generationCounter++;
	console.log("next generation");
	//obstacles = [];
	
	

	calculateFitness();

	let sortedBots = selectionSort(savedBots);
	let _bestFitness = bestFitness(sortedBots);

	for (var i =0; i < 5; i++) {
		games[i] = new Game( sortedBots[sortedBots.length - i - 1].brain) ; 
	}

	for (var i = 5; i < TOTAL; i++) {
		let partnerA = acceptReject(_bestFitness,sortedBots);
		let partnerB = acceptReject(_bestFitness,sortedBots);

		games[i] = new Game( crossover(partnerA, partnerB) ) ;
		games[i].bot.mutate();
	}

	savedBots = [];
	
}

function chooseRandomCrossover(_matrix,_partnerAMatrix, _partnerBMatrix,_partnerAfitness,_partnerBfitness){
	let goodPartner ;

	if( _partnerAfitness > _partnerBfitness){
		goodPartner = _partnerAMatrix;
		otherPartner = _partnerBMatrix;
	}else{
  		goodPartner = _partnerBMatrix;
		otherPartner = _partnerAMatrix;
	}

	let m = new Matrix(_matrix.rows, _matrix.cols);
	    for (let i = 0; i < m.rows; i++) {
	      for (let j = 0; j < m.cols; j++) {
	        m.data[i][j] = random(1) > 0.3? goodPartner.data[i][j] : otherPartner.data[i][j];
	      }
	    }
	return m;
}

function crossover(_partnerA, _partnerB){
	let newBrain = new NeuralNetwork(inputNodesNb , hiddenNodesNb , outputNodesNb);
	newBrain.weights_ih = chooseRandomCrossover(newBrain.weights_ih ,_partnerA.brain.weights_ih, _partnerB.brain.weights_ih,_partnerA.fitness,_partnerB.fitness)
    newBrain.weights_ho = chooseRandomCrossover(newBrain.weights_ho ,_partnerA.brain.weights_ho, _partnerB.brain.weights_ho,_partnerA.fitness,_partnerB.fitness)
    newBrain.bias_h = chooseRandomCrossover(newBrain.bias_h ,_partnerA.brain.bias_h, _partnerB.brain.bias_h,_partnerA.fitness,_partnerB.fitness)
    newBrain.bias_o = chooseRandomCrossover(newBrain.bias_o ,_partnerA.brain.bias_o, _partnerB.brain.bias_o,_partnerA.fitness,_partnerB.fitness)
    return newBrain;
}

function acceptReject(_bestFitness,array){
		
		let beSafe = 0;
		while(true){
			let index = floor(random(array.length));
			let partner = array[index];
			let r = random(_bestFitness);
			if(r < partner.fitness)
				return partner;
			beSafe++;
			if(beSafe > 10000)
				return partner;
		}
	}




function calculateFitness(){
	let sum = 0;
	for(let bot of savedBots){
		sum += dino.score;
	}

	for(let bot of savedBots){
		bot.fitness = bot.score / (sum) + 0.01;
		bot.fitness = pow(bot.fitness , -4) // better than 0 better than 4
	}
}


function findBestBot(){
	let best = -1;
	for(let game of games){
		if (game.bot.score > best ){
			best = game.botbot.score;
			bestCurrentBot = game.bot;
		}
	}
}


function saveBestBot(){
	let sum = 0;
	for(let game of games){
		sum += game.bot.score;
	}

	for(let dino of dinos){
		game.bot.fitness = game.bot.score / (sum);
	}


	let bestFitness = 0;
	let bestBot = null;
	for(let game of games){
		if(game.bot.fitness > bestFitness)
		{
			bestFitness = game.bot.fitness;
			bestBot = game.bot;
		}
	}

	let json = saveJSON(bestBot.brain,"bestBot.json");
	//let json = bestDino.brain.serialize();
	//save(json,"bestDinoEver.json")
}

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function selectionSort(items){


    var len = items.length,
        min;

    for (i=0; i < len; i++){

        //set minimum to this position
        min = i;

        //check the rest of the array to see if anything is smaller
        for (j=i+1; j < len; j++){
            if (items[j].fitness < items[min].fitness){
                min = j;
            }
        }

        //if the minimum isn't in the position, swap it
        if (i != min){
        	var temp = items[i];
    		items[i] = items[min];
    		items[min] = temp;
           // swap(items, i, min);
        }
    }

    return items;
}