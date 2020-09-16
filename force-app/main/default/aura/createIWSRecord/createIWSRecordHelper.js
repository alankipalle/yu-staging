({
    /**
    * Yearup.
    *
    * @category  Yearup
    * @author    Yearup
    * @copyright Yearup
    * @description This component is for to create IWS record from Opportunity.
    */
    createRecord : function(component,event) {
        var opp = component.get("v.parentOpp");
        console.log('opp Cohort_Sem__r.End_date__c '+ opp.Cohort_Sem__r.End_date__c);
        var device = $A.get("$Browser.formFactor");
        // Construct the today's date
        var today = new Date();
        var monthDigit = today.getMonth() + 1;
        if (monthDigit <= 9) {
            monthDigit = '0' + monthDigit;
        }
        
        var todayDate = today.getFullYear() + "-" + monthDigit + "-" + today.getDate();
        console.log('v.today'+ today.getFullYear() + "-" + monthDigit + "-" + today.getDate());
        
        // Check if the today's date is greater than Opportunity's Cohort End Date
        if(todayDate > opp.Cohort_Sem__r.End_date__c ){
            if( device == 'PHONE'){
                var cmpMsg = component.find("msg");
                $A.util.toggleClass(cmpMsg, "slds-hide");
                var btn = component.find("createBtn");
                $A.util.toggleClass(btn, "slds-hide");
            }else{
                console.log('You cannot create IWS'); 
                var resultsToast = $A.get("e.force:showToast");
                
                resultsToast.setParams({                
                    title : 'IWS Cannot be created',
                    message: 'Cant create new Internship Work Sites for past cohorts. \
Cohort End Date: '+ opp.Cohort_Sem__r.End_date__c,
                    messageTemplate: 'Cant create new Internship Work Sites for past cohorts {1}',               
                    duration:' 5000',
                    key: 'info_alt',
                    type: 'error' 
                    
                });
                
                resultsToast.fire();
            }
            
        }else{          
            
            var createRecordEvent = $A.get("e.force:createRecord"); 
            createRecordEvent.setParams({
                "entityApiName": 'Internship_Work_Site__c',
                "recordTypeId": null,
                'defaultFieldValues': {                
                    'Name': opp.Name,  
                    'Stage__c':'Qualified Prospect', 
                    'Probability__c': 45,                             
                    'Opportunity__c' : opp.Id,
                    'LeadReferralSource__c':opp.LeadSource,             
                    'Account__c' : opp.AccountId,
                    'Staff_Referral_Detail__c' :  opp.Staff_Referral_Detail__c,
                    'LeadSourceDetail__c' : opp.lead_source_detail__c                
                }            	
            });
            createRecordEvent.fire();
        }
    }
})