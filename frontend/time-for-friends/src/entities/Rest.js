export default class Rest {

    async find(){
        const url = `${window.location.origin}/api/${this.constructor.name}`;
        let result = await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(result.status === 200){
            result = await result.json();
            return await result.map( obj => obj = new this.constructor(obj)); 
        }else{
            return null;
        }
    }
}