class Matrix{

	constructor(rows,cols){
		this.rows = rows;
		this.cols = cols;
		this.data = [];

		for(let i=0;i < this.rows;i++){
			this.data[i] = [];
			for(let j=0;j < this.cols;j++){
				this.data[i][j] = 0;
			}	
		}
	}

	copy() {
	    let m = new Matrix(this.rows, this.cols);
	    for (let i = 0; i < this.rows; i++) {
	      for (let j = 0; j < this.cols; j++) {
	        m.data[i][j] = this.data[i][j];
	      }
	    }
	    return m;
	}

	randomize(){
		for(let i=0;i < this.rows;i++){
			for(let j=0;j < this.cols;j++){
				this.data[i][j] = Math.floor(Math.random()*3 - 1 );
			}	
		}
	}

	add(n){
		if(n instanceof Matrix){
			for(let i=0;i < this.rows;i++){
				for(let j=0;j < this.cols;j++){
					this.data[i][j] += n.data[i][j];
				}	
			}
		}else{
			for(let i=0;i < this.rows;i++){
				for(let j=0;j < this.cols;j++){
					this.data[i][j] += n;
				}	
			}
		}
	}

	static transpose(matrix){
		let result = new Matrix(matrix.cols,matrix.rows);
		for(let i=0;i < matrix.rows;i++){
			for(let j=0;j < matrix.cols;j++){
				result.data[j][i] = matrix.data[i][j] ;
			}	
		}
		return result; 
	}

	static multiply(m1,m2){
		
			//data product
			if(m1.cols !== m2.rows){
				console.log("Columns of A don't match Rows of B")
				return undefined;
			}else{
				let result = new Matrix(m1.rows,m2.cols);
				for(let i=0;i < result.rows;i++){
					for(let j=0;j < result.cols;j++){
						let sum = 0;
						for(let k=0;k < m1.cols;k++){
							sum += m1.data[i][k] * m2.data[k][j];
						}
						result.data[i][j] = sum;
					}		
				}	
				return result;
			}
			
		
	}

	static fromArray(arr){
		let m = new Matrix(arr.length,1)
		for (let i = arr.length - 1; i >= 0; i--) {
			m.data[i][0] = arr[i];
		}
		return m;
	}

	static subtract(a,b){
		//return new matrix a-b
		let res = new Matrix(a.rows,a.cols)
		for(let i=0;i < res.rows;i++){
			for(let j=0;j < res.cols;j++){
				res.data[i][j] = a.data[i][j] - b.data[i][j];
			}	
		}
		return res;
	}

	toArray(){
		let arr = [];
		for(let i=0;i < this.rows;i++){
				for(let j=0;j < this.cols;j++){
					arr.push(this.data[i][j]);
				}	
			}
		return arr;
	}

	multiply(n){
		if(n instanceof Matrix){
			for(let i=0;i < this.rows;i++){
				for(let j=0;j < this.cols;j++){
					this.data[i][j] *= n.data[i][j];
				}	
			}
		}else
		//scalar product
			for(let i=0;i < this.rows;i++){
				for(let j=0;j < this.cols;j++){
					this.data[i][j] *= n;
				}	
			}
	}

	map(fn){
		// apply a function to every element of matrix
			for(let i=0;i < this.rows;i++){
				for(let j=0;j < this.cols;j++){
					let val =  this.data[i][j];
					this.data[i][j] = fn(val);
				}	
			}
	}

	static map(matrix,func){
		let res = new Matrix(matrix.rows,matrix.cols);
		// apply a function to every element of matrix
			for(let i=0;i < matrix.rows;i++){
				for(let j=0;j < matrix.cols;j++){
					let val =  matrix.data[i][j];
					res.data[i][j] = func(val);
				}	
			}
			return res;
	}

	static deserialize(data) {
	    if (typeof data == 'string') {
	      data = JSON.parse(data);
	    }
	    
	    let matrix = new Matrix(data.rows, data.cols);
	    matrix.data = data.data;
	    return matrix;
	  }

	serialize() {
	    return JSON.stringify(this);
	}

	print(){
		console.table(this.data);
	}


}