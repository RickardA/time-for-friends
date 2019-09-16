export default class Rest {

    async find(findQuery,extrasQuery){
        findQuery = findQuery ? encodeURIComponent(JSON.stringify(findQuery)) : encodeURIComponent(JSON.stringify({}));
        extrasQuery = extrasQuery ? encodeURIComponent(JSON.stringify(extrasQuery)) : encodeURIComponent(JSON.stringify({}));
        const url = `${window.location.origin}/api/${this.constructor.name}?find=${findQuery}&extras=${extrasQuery}`;
        let result = await fetch(url,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        if(result.status === 200){
            result = await result.json();
            return await result.map( obj => obj = new this.constructor(obj)); 
        }else{
            return null;
        }
    }

    async save(){
        const url = `${window.location.origin}/api/${this.constructor.name}`;
        let result = await fetch(url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this)
        })
        if (result.status === 201) {
            Object.assign(this,await result.json())
            return true;
        }else{
            console.log(result)
            return false;
        }
    }
}