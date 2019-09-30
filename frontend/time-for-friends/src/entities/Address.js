import Rest from './Rest'

export default class Address extends Rest{
     constructor(obj){
        super();
        Object.assign(this,obj);
     }
 }