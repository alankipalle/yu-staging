/* eslint-disable dot-notation */
/* eslint-disable no-console */
/* eslint-disable vars-on-top */
import { LightningElement, track, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getAddresses from '@salesforce/apex/googleApiController.getSuggestions';
import getPlaceDetails from '@salesforce/apex/googleApiController.getPlaceDetails';
import getAreaDetails from '@salesforce/apex/googleApiController.getAreaDetails';
import MAILINGCITY_FIELD from '@salesforce/schema/Contact.MailingCity';
import MAILINGSTREET_FIELD from '@salesforce/schema/Contact.MailingStreet';
import MAILINGSTATE_FIELD from '@salesforce/schema/Contact.MailingState';
import MAILINGZIP_FIELD from '@salesforce/schema/Contact.MailingPostalCode';
import MAILINGCOUNTRY_FIELD from '@salesforce/schema/Contact.MailingCountry';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import OTHERCITY_FIELD from '@salesforce/schema/Contact.OtherCity';
import OTHERSTREET_FIELD from '@salesforce/schema/Contact.OtherStreet';
import OTHERSTATE_FIELD from '@salesforce/schema/Contact.OtherState';
import OTHERZIP_FIELD from '@salesforce/schema/Contact.OtherPostalCode';
import OTHERCOUNTRY_FIELD from '@salesforce/schema/Contact.OtherCountry';
import ID_FIELD from '@salesforce/schema/Contact.Id';
import { updateRecord } from 'lightning/uiRecordApi';

export default class AddressAutoComplete extends NavigationMixin(LightningElement) {
    
    // Design variables to set them in the lightning page/ Vf page
    @api objName;
    @api singleField = false;
    @api compundField;
    @api cityField;
    @api streetField;
    @api stateField;
    @api postalCodeField;
    @api countryField; 
    @api vfpage=false;
    @api recordId;  
    @api completed; 

    @track searchKey;    
    @track predictions;
    @track isLoading = false;
    @track error;
    @track skey=false;
    @track addressType;
    @track loaded = false;
    @track btnDisable=true;
    @track searchHolder ='type address...';
    @track finalStreet='';
    @track finalCity='';
    @track finalState='';
    @track finalCountry='';
    @track finalZip='';
    @track vfpageMessage='';
    @track value = 'inProgress';
    @track typevalue = 'address';

    // Check if object is Contact, then show the address types
    get conAddress(){
        return this.objName=== 'Contact' ? true : false;
    }
    
    // address types only for Contact
    get options() {
        return [            
            { label: 'Work Address', value: 'work' },
            { label: 'Home Address', value: 'home' },
        ];
    }

    // type of address search
    get tyopeOptions() {
        return [
            { label: 'Address', value: 'address' },
            { label: 'Company', value: 'company' }
        ];
    }

    get condition() {
        return this.skey;
    }

    // set the variables according to the type of search
    handleTypeChange(event) {
        this.skey = false;
        this.predictions =[];
        this.searchKey ='';        
        this.finalStreet = '';
        this.finalCity = '';
        this.finalState = '';
        this.finalCountry = '';
        this.finalZip = '';
        this.typevalue = event.detail.value;
        if(this.typevalue === 'address'){
            this.searchHolder = 'type address...';
        }else{
            this.searchHolder = 'type company...';
        }
    }

    // set the addresstype for contact
    handleChange(event){
        this.addressType = event.detail.value;
    }

    // Call apex method to get the predictions and assign them to the track variables.
    handleOnchange(event){
        event.preventDefault();
        this.isLoading = true;
        const searchKey = event.detail.value;       
        
        if(!searchKey || searchKey === "") {
            this.skey=false;
            this.searchKey='';
        }

        if(this.typevalue === 'address'){
            getAddresses({
                input : searchKey
            })
            .then(result => {    
                    
                var resp = JSON.parse(result);   
                this.predictions = resp.predictions;

                if(this.predictions.length>0) 
                    this.skey = true; 
                else
                    this.skey = false;                
              
                this.isLoading = false;
                this.btnDisable = false;
                this.error = undefined;            
            })
            .catch(error => {
                this.error = error;    
                this.btnDisable = false;        
                this.predictions = undefined;
            });
        }else if(this.typevalue === 'company'){
            getAreaDetails({
                establishmentName : searchKey
            })
            .then(result => {    
                
                var resp = JSON.parse(result);                
                this.skey = true;        
                this.predictions = resp.predictions;
              
                this.isLoading = false;
                this.btnDisable = false;
                this.error = undefined;            
            })
            .catch(error => {
                this.error = error;    
                this.btnDisable = false;        
                this.predictions = undefined;
            });
        }
        
    }
   

     // Call apex method to get the selected address/company address.
    getDetails(event){
        event.preventDefault();
        this.skey=false;
        this.predictions = [];
        const placeid = event.currentTarget.dataset.placeid;            
        
        /* Call the Salesforce Apex class method to find the Records */
        getPlaceDetails({
            placeId : placeid
        })
        .then(result => {            
            var resp = JSON.parse(result);                    
            this.searchKey = resp.result.formatted_address;
            const addressComponents = resp.result.address_components;
            var addrObj1 ={};
            var postalCode = '', state = '', country= '', city = '', street = '', street_number = '', route = '', subLocal1 = '', subLocal2 = '';

            for(let i=0;i<addressComponents.length;i++ ){
                var FieldLabel = resp.result.address_components[i].types[0];                
                
                if(FieldLabel === 'sublocality_level_2' || FieldLabel === 'sublocality_level_1' || FieldLabel === 'street_number' || FieldLabel === 'route' || FieldLabel === 'locality' || FieldLabel === 'country' || FieldLabel === 'postal_code' || FieldLabel === 'administrative_area_level_1'){
                    
                    if( FieldLabel === "street_number" ){                     
                        street_number= addressComponents[i].short_name;
                    }
                    if( FieldLabel === "route" ){                     
                        route= addressComponents[i].long_name;
                    }

                    if( FieldLabel === "sublocality_level_1" ){                     
                        subLocal1= addressComponents[i].long_name;
                    }

                    if( FieldLabel === "sublocality_level_2" ){                     
                        subLocal2= addressComponents[i].long_name;
                    }

                    if( FieldLabel === "route" ){                     
                        route= addressComponents[i].long_name;
                    }                    
                    
                    if( FieldLabel === "locality" ){
                        city= addressComponents[i].long_name;
                    }
                    if( FieldLabel === "administrative_area_level_1" ){
                        state= addressComponents[i].short_name;
                    }
                    if( FieldLabel === "postal_code" ){
                        postalCode= addressComponents[i].long_name ? addressComponents[i].long_name :'';
                    }
                    if( FieldLabel === "postal_code_suffix" ){
                        postalCode= postalCode+'-'+addressComponents[i].long_name;
                    }
                    if( FieldLabel === "country" ){
                        country= addressComponents[i].short_name;
                    } 
                }
                
            }

            street = street_number + ' ' + route;
            if(street == null){
                street = subLocal2 + ' ' + subLocal1;
            }
            
            this.finalStreet = street;
            this.finalCity = city;
            this.finalState = state;
            this.finalCountry = country;
            this.finalZip = postalCode;
            this.error = undefined;            
        })
        .catch(error => {
            this.error = error;  
            this.finalStreet = '';
            this.finalCity = '';
            this.finalState = '';
            this.finalCountry = '';
            this.finalZip = '';
        });
    } 

    // Update the record and refresh the page.
    updateRecord() {  
        this.loaded = true;
        this.btnDisable = true;         
        const obj = this.objName;

        if (this.finalStreet!== undefined || this.finalZip!== undefined  || this.finalCity!== undefined || this.finalState!== undefined || this.finalCountry!== undefined ) { 
            // Create the recordInput object
            const fields = {};
            fields[ID_FIELD.fieldApiName] = this.recordId;

            if(obj === 'Contact'){
                if ( this.addressType === undefined || this.addressType === null || this.addressType ===''){
                    this.showNotification('Address Type is missing','Please select Address Type.','error');  
                    this.loaded = false;
                    this.btnDisable = false;  
                    return;
                } 
                if(this.addressType === 'home'){
                    fields[MAILINGCITY_FIELD.fieldApiName] = this.finalCity!== undefined ? this.finalCity : '';
                    fields[MAILINGSTREET_FIELD.fieldApiName] = this.finalStreet!== undefined ? this.finalStreet : '';
                    fields[MAILINGSTATE_FIELD.fieldApiName] = this.finalState!== undefined ? this.finalState : '';
                    fields[MAILINGZIP_FIELD.fieldApiName] = this.finalZip!== undefined ? this.finalZip : '';
                    fields[MAILINGCOUNTRY_FIELD.fieldApiName] = this.finalCountry!== undefined ? this.finalCountry : '';               
                }else{
                    fields[OTHERCITY_FIELD.fieldApiName] = this.finalCity!== undefined ? this.finalCity : '';
                    fields[OTHERSTREET_FIELD.fieldApiName] = this.finalStreet!== undefined ? this.finalStreet : '';
                    fields[OTHERSTATE_FIELD.fieldApiName] = this.finalState!== undefined ? this.finalState : '';
                    fields[OTHERZIP_FIELD.fieldApiName] = this.finalZip!== undefined ? this.finalZip : '';
                    fields[OTHERCOUNTRY_FIELD.fieldApiName] = this.finalCountry!== undefined ? this.finalCountry : '';   
                }                
            }else if( this.singleField===false ) {

                if( this.cityField !== undefined ) fields[this.cityField] = this.finalCity!== undefined ? this.finalCity : '';
                if( this.streetField !== undefined ) fields[this.streetField] = this.finalStreet!== undefined ? this.finalStreet : '';
                if( this.stateField !== undefined ) fields[this.stateField] = this.finalState!== undefined ? this.finalState : '';
                if( this.postalCodeField !== undefined ) fields[this.postalCodeField] = this.finalZip!== undefined ? this.finalZip : '';
                if( this.countryField !== undefined ) fields[this.countryField] = this.finalCountry!== undefined ? this.finalCountry : '';

            }else if( this.singleField ){
                fields[this.compundField] = this.finalStreet+ '\n' +this.finalCity+ ', '+this.finalState+' '+this.finalZip+'\n'+this.finalCountry;
            }

            const recordInput = { fields };
            
            updateRecord(recordInput)
                .then(() => {
                    this.showNotification('Success','Record updated','success');
                    if(this.vfpage) {
                        this.vfpageMessage ='Record updated: Please reload the page to see the changes';
                    }
                    this.loaded = false;
                    this.btnDisable = false;                 
                })
                .catch(error => {
                    this.showNotification('Error updating record',error.body.message,'error');  
                    if(this.vfpage) {
                        this.vfpageMessage ='Record updated: Please reload the page to see the changes'; 
                    }
                    this.loaded = false;
                    this.btnDisable = false;
                });
            }
        else {
            this.showNotification('Something is wrong','Check your input and try again.','error');            
            this.loaded = false;
            this.btnDisable = false;
        }
    }  

    // Utility method to show notifications.
    showNotification(title, message, variant){
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }

}