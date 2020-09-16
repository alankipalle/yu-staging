import { LightningElement, api } from 'lwc';
import getRecords from '@salesforce/apex/massPermissionsetAssignerCtrl.retrieveRecords'
export default class SearchCmp extends LightningElement {
    queryTerm;
    items = [];
    @api objectName;
    @api fieldAPINames;
    @api filterFieldAPIName;
    strInput="";
    error;
    condition = false;
    predictions =[];
    @api selectedItems = [];
    handleKeyUp(evt) {   
        this.strInput = evt.target.value;         
        this.retrtriveRecords();
    }

    onLeave(event) {  
        setTimeout(() => {  
         this.strInput = ""; 
         this.condition = false;  
        }, 300);  
       } 

    retrtriveRecords(){
        getRecords({ objectName: this.objectName, fieldAPINames: this.fieldAPINames, filterFieldAPIName: this.filterFieldAPIName, strInput: this.strInput })
            .then(result => {   
                this.predictions = []; 
                this.value = [];
                this.previousSelectedItems = [];

                if(result.length>0){
                    result.map(element=>{                     
                        this.predictions = [...this.predictions,{value:element.recordId, 
                                                    label:element.recordName, type: 'icon', iconName: 'standard:job_profile'}];                       
                    });
                    this.condition=true;                    
                }
                else{
                   console.log('No Records');               
                }
            })
            .catch(error => { 
                console.log(error);                           
                this.error = error;
            }); 
    }

    get itemsLenght(){
        return this.selectedItems.length >0 ? true : false;       
    }

    handleItemRemove (event) {
        setTimeout(() => {
            this.selectedItems = this.selectedItems.filter((item) => item.label !== event.detail.item.label);
        });
    }
   
    handleDoneClick(){
        this.condition=false;
        const selectedEvent = new CustomEvent("progressvaluechange", {
            detail: this.selectedItems
          });
      
          // Dispatches the event.
          this.dispatchEvent(selectedEvent);
    }
   
    handleCheckboxChange(event){
        let selectItemValue = event.detail.value;
        this.selectedItems = []; 
     
        selectItemValue.map(item=>{            
            let selectedItem = this.predictions.find(element => element.value == item);
          
            if(selectedItem != undefined){
                this.selectedItems.push(selectedItem);
            }  
        });     
    }
}