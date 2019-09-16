import Rest from './Rest'

export default class Country extends Rest{
     constructor(obj){
        super();
        Object.assign(this,obj);
     }
 }