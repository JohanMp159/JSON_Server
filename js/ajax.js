const d = document;

(()=>{
	//4 PASOS IMPORTANTES PARA UNA PETION AJAX CON XMLHttpRequest()
	
	const xhr = new XMLHttpRequest(), // PRIMERO Instaciar un Objeto  XMLHttp
		  $xhr = d.getElementById("xhr"),
		  $fragment = document.createDocumentFragment();
	
	xhr.addEventListener("readystatechange",(e)=>{
		if(xhr.readyState!==4) return;//Indicamos mostara cunado se complete el ultimo proceso
		if(xhr.status>=200 && xhr.status <300){ //Validacion de respuesta SATISFACTORIA
			console.log(xhr);
			//console.log("éxito");
			//console.log(xhr.responseText);//mostramos la respuesta atraves de la propiedad responseText
			
			let json = JSON.parse(xhr.responseText); // Convertimos cadena de texto a formato JSON, lo cual nos devuelve un ARRAY
			//console.log(json);
			json.forEach((el)=>{ //Recorremos cada posicion del arreglo
				const $li = d.createElement("li");
				$li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
				$fragment.appendChild($li);
				
				$xhr.appendChild($fragment);
			})
		} else {
			//console.log("error");
			let message = xhr.statusText || "Ocurrió un error";
			$xhr.innerHTML = `Error ${xhr.status}: ${message}`;
		}
		//console.log("Esto se mostrara de cualquier manera");
	});//SEGUNDO Asignar los eventos que se manipulan de la petición
	xhr.open("GET","https://jsonplaceholder.typicode.com/users")//TERCERO instruccion que va abrir la petición,("Método por el cual nos vamos a comunicar","Recurso o URL al cual vamos a hacer la petición")
	//xhr.open("GET","assets/users.json")//Llamamos la APi de manera local
	xhr.send(); //CUARTO Enviar la petición del mecanismo AJAX
	
})();
(()=>{
	const $fetch = d.getElementById("fetch"),
		  $fragment = d.createDocumentFragment();
	
	fetch("https://jsonplaceholder.typicode.com/users")
		.then((res)=>{
			//console.log(res);
			return res.ok?res.json():Promise.reject(res); //Convertimos el TEXTO a formato JSON y validamos atraves de un operador ternario
			//return res.text() //Convertimos el TEXTO a texto plano
			//return res.blob() //Convertimos lo que no sea texto a formato JSON
		})
		.then((json)=>{
		//console.log(json);
		//$fetch.innerHTML = json;
		json.forEach((el)=>{ //Recorremos cada posicion del arreglo
			const $li = d.createElement("li");
			$li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
			$fragment.appendChild($li);

			$fetch.appendChild($fragment);
		})
		
	}).catch((err)=>{
		//console.log("Estamos en el Catch", err);
		let message = err.statusText || "Ocurrió un error";
		$fetch.innerHTML = `Error ${err.status}: ${message}`;
	}).finally(()=>{
		//console.log("Esto se ejecutará independientemente del resultado de la promesa Fetch");
	});
	
})();
(()=>{
	const $fetchAsync = d.getElementById("fetch-async"),
		  $fragment = d.createDocumentFragment();
	
	async function getData(){
		try{
			let res = await fetch("https://jsonplaceholder.typicode.com/users"),
				json = await res.json();
			
			//console.log(res,json);
			//if(!res.ok)throw new Error("Ocurrio un Error al solicitar los datos!..");
			if(!res.ok) throw {status:res.status, statusText:res.statusText}
			
			json.forEach((el)=>{ //Recorremos cada posicion del arreglo
				const $li = d.createElement("li");
				$li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
				$fragment.appendChild($li);

				$fetchAsync.appendChild($fragment);
			})
		}
		catch(err){
			//console.log("Estoy en el catch", err);
			let message = err.statusText || "Ocurrió un error";
			$fetchAsync.innerHTML = `Error ${err.status}: ${message}`;
		} finally {
			//console.log("Esto se ejecutará independientemente del try...catch")
		}
	}
	
	getData();
	
})();
(()=>{
	const $axios = d.getElementById("axios"),
		  $fragment = d.createDocumentFragment();
	
//	axios.get("assets/user.json")
	axios.get("https://jsonplaceholder.typicode.com/users")
		.then((res)=>{
			//console.log(res);
			let json = res.data;
		
			json.forEach((el)=>{ //Recorremos cada posicion del arreglo
				const $li = d.createElement("li");
				$li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
				$fragment.appendChild($li);

				$axios.appendChild($fragment);
			})
		})
		.catch((err)=>{
			//console.log("Estamos en el catch", err.response);
			let message = err.response.statusText || "Ocurrió un error";
			$axios.innerHTML = `Error ${err.response.status}: ${message}`;
		})
		.finally(()=>{
			//console.log("Esto se ejecutara independientemente del resultado de Axios")
		});
})();
(()=>{
	const $axiosAsync = d.getElementById("axios-async"),
		  $fragment = d.createDocumentFragment();
	
	async function getData(){
		try{
			let res = await axios.get("https://jsonplaceholder.typicode.com/users"),
				json = await res.data;
				console.log(json); 
			
			json.forEach((el)=>{ //Recorremos cada posicion del arreglo
				const $li = d.createElement("li");
				$li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
				$fragment.appendChild($li);

				$axiosAsync.appendChild($fragment);
			})
	
		}catch(err){
			let message = err.response.statusText || "Ocurrió un error";
			$axiosAsync.innerHTML = `Error ${err.response.status}: ${message}`;
			
		}finally{
			console.log("Esto se ejecutara independientemente del Try...Catch")
		}
	}
	getData();

})();