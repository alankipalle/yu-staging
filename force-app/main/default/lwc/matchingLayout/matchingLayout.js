import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';  
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

import { registerListener, unregisterAllListeners } from 'c/pubsub';
export default class MatchingLayout extends LightningElement {
    @api studentrecordId ='';
    @api objectname='MATCH_Matching_Student__c';
    @api openmodel = false;
   
    @wire(CurrentPageReference) pageRef;

    closeModal() {
        this.openmodel = false;
        
        if(!this.pageRef)
                {
                    this.pageRef = {};
                    this.pageRef.attributes = {};
                    this.pageRef.attributes.LightningApp = "LightningApp";
                }
                fireEvent(this.pageRef,
                    'modelStatus',
                    this.openmodel); 
        this.studentrecordId ='';
        console.log('this.openModel=: '+this.openModel);
    } 
    saveMethod(event) {        
        //this.createDeployment();
        const toastEvent = new ShowToastEvent({  
            title: 'Student Updated',  
            message: 'Student Updated Successfully!!!',  
            variant: 'success'  
        });
        //this.openmodel = false;
    } 



    handleSuccess(event) {
        console.log('onsubmit: '+ event.detail.fields);
        const toastEvent = new ShowToastEvent({  
            title: 'Student Updated',  
            message: 'Student Updated Successfully!!!',  
            variant: 'success'  
        });
    }

    connectedCallback() {
        if(!this.pageRef)
        {
            this.pageRef = {};
            this.pageRef.attributes = {};
            this.pageRef.attributes.LightningApp = "LightningApp";
        }  
		// subscribe to bearListUpdate event
		registerListener('studentRecordId', this.handleStudentRecord, this);
	}
	disconnectedCallback() {
		// unsubscribe from bearListUpdate event
		unregisterAllListeners(this);
	}
	handleStudentRecord(studentrecordId) {
        console.log('studentrecordId=====&&&&=====> '+JSON.stringify(studentrecordId));
        this.studentrecordId = studentrecordId;              
        
    }
}