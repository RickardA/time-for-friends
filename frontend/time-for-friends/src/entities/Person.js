import Rest from './Rest'

export default class Person extends Rest{
     constructor(obj){
        super();
        Object.assign(this,obj);
     }
 }