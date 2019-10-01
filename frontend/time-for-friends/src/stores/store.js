import {observable,action} from 'mobx';
import Person from '../entities/Person';
import Timezone from '../entities/Timezone';

export default class Store{

    //Variables
    @observable timezones = null;
    @observable persons = null;
    
    //----------::----------//
    
    //Actions
    @action
    async getPersons(query,sort){
        sort = !sort ? {firstName:1} : sort;
        let person = new Person();
        this.persons = await person.find(query, sort);
    }

    @action
    async getTimezones(){
        if (!this.timezones) {
            let timezone = new Timezone();
            this.timezones = await timezone.find();
        }
    }

    @action
    firstUpper(text){
        if(/^[a-z A-z åäö ÅÄÖ]/.test(text)){
            return text.replace(/^[a-z A-z åäö ÅÄÖ]/,text.charAt(0).toUpperCase());
        }else{
            return text;
        }
    }

    //----------::----------//

    //Others

    componentDidMount(){
        
    }

    //----------::----------//
}
