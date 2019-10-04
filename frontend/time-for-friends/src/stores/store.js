import {observable,action} from 'mobx';
import Person from '../entities/Person';
import Timezone from '../entities/Timezone';

export default class Store{

    //Variables
    @observable timezones = {
        data: null,
        status: 'noData'
    }
    @observable persons = {
        data:null,
        status:'noData'
    };
    
    //----------::----------//
    
    //Actions
    @action
    async getPersons(query,sort){
        this.persons = {data:null,status:'loading'}
        sort = !sort ? {firstName:1} : sort;
        let person = new Person();
        let result = await person.find(query, sort,3);
        if (result) {
            this.persons = {data:result,status:'done'}
        }else{
            this.persons = {data:null,status:'noData'}
        }
    }

    @action
    async getTimezones(){
        if (!this.timezones.data) {
            this.timezones = {data:null,status:'loading'};
            let timezone = new Timezone();
            let result = await timezone.find({},{},3);
            if (result) {
                this.timezones = {data:result,status:'done'};
            }else{
                this.timezones = {data:null,status:'noData'};
            }
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
