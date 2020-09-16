import { LightningElement, wire, track } from 'lwc';
import { getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import IWS_OBJECT from '@salesforce/schema/Internship_Work_Site__c';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class DependentPicklist extends LightningElement {
    // Reactive variables
    @track controllingValues = [];
    @track dependentValues = [];
    @track selectedTrack;
    @track selectedSpecialty;
    @track isEmpty = false;
    @track error;
    controlValues;
    totalDependentValues = [];
    @wire(CurrentPageReference) pageRef;

    // IWS object info
    @wire(getObjectInfo, { objectApiName: IWS_OBJECT })
    objectInfo;

    // Picklist values based on record type
    @wire(getPicklistValuesByRecordType, { objectApiName: IWS_OBJECT, recordTypeId: '$objectInfo.data.defaultRecordTypeId'})
    countryPicklistValues({error, data}) {
        if(data) {
            this.error = null;

            let trackOptions = [{label:'All', value:'All'}];

            // Account Country Control Field Picklist values
            data.picklistFieldValues.TrackFamily__c.values.forEach(key => {
                trackOptions.push({
                    label : key.label,
                    value: key.value
                })
            });

            this.controllingValues = trackOptions;

            let specialtyOptions = [{label:'All', value:'All'}];

             // Account State Control Field Picklist values
            this.controlValues = data.picklistFieldValues.Specialty__c.controllerValues;
            // Account State dependent Field Picklist values
            this.totalDependentValues = data.picklistFieldValues.Specialty__c.values;

            this.totalDependentValues.forEach(key => {
                specialtyOptions.push({
                    label : key.label,
                    value: key.value
                })
            });

            this.dependentValues = specialtyOptions;
        }
        else if(error) {
            this.error = JSON.stringify(error);
        }
    }

    handleTrackChange(event) {
        // Selected Track Value
        this.selectedTrack = event.target.value;
        this.isEmpty = false;
        let dependValues = [];

        fireEvent(this.pageRef,
            'studentTrack',
            this.selectedTrack);  
            
        if(this.selectedTrack) {
            // if Selected track is none returns nothing
            if(this.selectedTrack === 'All') {
                this.isEmpty = true;
                dependValues = [{label:'All', value:'All'}];
                this.selectedTrack = null;
                this.selectedSpecialty= null;
                return;
            }

            // filter the total dependent values based on selected track value 
            this.totalDependentValues.forEach(conValues => {
                if(conValues.validFor[0] === this.controlValues[this.selectedTrack]) {
                    dependValues.push({
                        label: conValues.label,
                        value: conValues.value
                    })
                }
            })

            this.dependentValues = dependValues;
        }

        
    }

    handleSpecialtyChange(event) {
        this.selectedSpecialty = event.target.value;
        fireEvent(this.pageRef,
            'studentSpecialty',
            this.selectedSpecialty); 
    }
}