import Rest from './Rest'

export default class City extends Rest{
     constructor(obj){
        super();
        Object.assign(this,obj);
     }
 }