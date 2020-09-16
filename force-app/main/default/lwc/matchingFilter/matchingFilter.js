import { LightningElement, wire, track } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { CurrentPageReference } from 'lightning/navigation';
import { getObjectInfo } from 'lightning/uiObjectInfoApi'
import SITE_OBJECT from '@salesforce/schema/Site__c';
import MARKET_FIELD from '@salesforce/schema/Site__c.Market__c';
import RULE_OBJECT from '@salesforce/schema/MATCH_Matching_Rule__c';
import ENG_OBJECT from '@salesforce/schema/Engagement__c';
import { fireEvent } from 'c/pubsub';
import getSites from '@salesforce/apex/MATCH_lwcController.getSiteList';
import getLcs from '@salesforce/apex/MATCH_lwcController.getLCList';
import getFilterList from '@salesforce/apex/MATCH_lwcController.getFilterList';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
export default class MatchingFilter extends LightningElement {
    @track marketvalue ='';
    @track sitevalue ='';
    @track lcvalue ='';
    @track sites =[];
    @track lcs =[];
    @track tracks =[];
    @track specialties =[];
    @track students =[];
    @track error;
    studentRecords=[];
    @track engstatusvalue = 'All';
    @track lcname='';
    @track trackname='';
    @track specialtyname='';
    @track status='';
    @track rating='';
    @track section=true;
    @track label='Hide';
    
    get statusoptions() {
        return [
            { label: 'Enrolled', value: 'Enrolled' },
            { label: 'Fired', value: 'Fired' }
        ];
    }

    get ratingoptions() {
        return [
            { label: 'On Track', value: 'On Track' },
            { label: 'Off Track', value: 'Off Track' },
            { label: 'Exceeding Expectations', value: 'Exceeding Expectations' }
        ];
    }

 
    handleHide() {       
        this.section= !this.section; 
        this.label = this.section===true ? 'Hide' : 'Show';      
    }
   
    @wire(CurrentPageReference) pageRef;

    @wire(getObjectInfo, { objectApiName: SITE_OBJECT })
    objectInfo;

    @wire(getObjectInfo, { objectApiName: RULE_OBJECT })
    ruleobjectInfo;

    @wire(getObjectInfo, { objectApiName: ENG_OBJECT })
    engobjectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: MARKET_FIELD})
    MarketPicklistValues;

    @wire(getSites,{ marketName: '$marketvalue'})
    wiredSites(value) {
       
        const { data, error } = value;
        if (data) {
            this.dataArray = data;
            let tempArray = [];
            this.dataArray.forEach(function (element) {
                var option=
                {
                    label:element.Name,
                    value:element.Name
                };
                tempArray.push(option);
            });
            this.sites=tempArray;
        } else if (error) {
            this.error = error;           
        }
    } 

    connectedCallback() {
        if(!this.pageRef)
        {
            this.pageRef = {};
            this.pageRef.attributes = {};
            this.pageRef.attributes.LightningApp = "LightningApp";
        }  
		// subscribe to event
        registerListener('studentTrack', this.handleStudentTrack, this);   
        registerListener('studentSpecialty', this.handleStudentSpecialty, this);     
    }

    disconnectedCallback() {
		// unsubscribe from event
		unregisterAllListeners(this);
	}
    
    handleStudentTrack(track) {      
        this.trackname = track;
        this.handleSiteChange(this.marketvalue,this.sitevalue,this.lcname,this.trackname,this.specialtyname,this.status,this.rating);  
    }

    handleStudentSpecialty(specialty) {      
        this.specialtyname = specialty;  
        this.handleSiteChange(this.marketvalue,this.sitevalue,this.lcname,this.trackname,this.specialtyname,this.status,this.rating);
    }

    handleChange(event){
        let value = event.detail.value;
        let name = event.target.name;
       
        switch(name) {
            case 'market':
                this.marketvalue=value;
                this.handleFilterChange(this.marketvalue,this.sitevalue);
                this.handleSiteChange(this.marketvalue,this.sitevalue,this.lcname,this.trackname,this.specialtyname,this.status,this.rating);
                break;
            case 'site':
                this.sitevalue=value;
                this.handleFilterChange(this.marketvalue,this.sitevalue)
                this.handleSiteChange(this.marketvalue,this.sitevalue,this.lcname,this.trackname,this.specialtyname,this.status,this.rating);
                break;
            case 'lc':
                this.lcname=value;
                this.handleSiteChange(this.marketvalue,this.sitevalue,this.lcname,this.trackname,this.specialtyname,this.status,this.rating);
                break;           
            case 'engagementStatus':
                this.status=value;
                this.handleSiteChange(this.marketvalue,this.sitevalue,this.lcname,this.trackname,this.specialtyname,this.status,this.rating);
                break;
            case 'rating':
                this.rating=value;
                this.handleSiteChange(this.marketvalue,this.sitevalue,this.lcname,this.trackname,this.specialtyname,this.status,this.rating);
                break;
            default:
              // code block
          }
    }

    handleSiteChange(marketName,siteName,lcName,track,specialty,status,rating) {
        getLcs({ marketName: marketName, siteName: siteName, lcName: lcName, track: track, specialty: specialty, status: status, rating: rating })
            .then(result => {
                this.dataArray = result;
                this.studentRecords = result;             
                let students = [];              
               if(this.dataArray!=null){
                   this.dataArray.forEach(function (element) { 
                    var std=
                    {
                        label:element.Name,
                        value:element.Id
                    };
                    students.push(std);
                });              
                this.students= students;    
               
                // firing Event
                if(!this.pageRef)
                {
                    this.pageRef = {};
                    this.pageRef.attributes = {};
                    this.pageRef.attributes.LightningApp = "LightningApp";
                }
                fireEvent(this.pageRef,
                    'studentRecords',
                    this.students);  
               }        
            })
            .catch(error => {
                this.error = error;               
            });

    }

    handleFilterChange(marketName,siteName) {       
        getFilterList({ marketName: marketName, siteName: siteName})
            .then(result => {
               this.dataArray = result;
               let lcs =[];           
               if(this.dataArray!=null){
                   this.dataArray.forEach(function (element) { 
                        var lc=
                        {
                            label:element.Learning_Community_Name__c,
                            value:element.Learning_Community_Name__c
                        };
                        lcs.push(lc);                      
                    });  
               }             
               this.lcs =lcs;    
            })
            .catch(error => {
                this.error = error;           
            });

    }
}