({
    createRecord : function(component,event) {
        var iws = component.get("v.parentIWS");
        console.log('IWS details Specialty__c: '+ iws.Specialty__c);
        // Check if the today's date is greater than Opportunity's Cohort End Date
        if( iws.Stage__c != 'Seats Confirmed' ){
            console.log('You cannot create IWS'); 
            var resultsToast = $A.get("e.force:showToast");
            
            resultsToast.setParams({                
                title : 'Internship Cannot be created',
                message: 'Please move IWS Stage to Seats Confirmed and then create Internship records.',
                messageTemplate: 'Please move IWS Stage to Seats Confirmed and then create Internship records. {1}',               
                duration:' 5000',
                key: 'info_alt',
                type: 'error' 
                
            });
            
            resultsToast.fire();
            
        }else{ 
            var createRecordEvent = $A.get("e.force:createRecord"); 
            createRecordEvent.setParams({
                "entityApiName": 'Apprenticeship__c',
                "recordTypeId": null,
                'defaultFieldValues': { 
                    'Opportunity__c': iws.Opportunity__c,  
                    'InternshipWorkSite__c': iws.Id,              
                    'Track__c': iws.TrackFamily__c,
                    'Job_Category__c': iws.Specialty__c,
                    'Employer__c' : iws.Account__c,
                    'Cohort_Sem__c' :  iws.Opportunity__r.Cohort_Sem__c,
                    'Start_Date__c' : iws.InternshipStartDate__c,
                    'Site_Location__c' : iws.Site_Located__c,
                    'Internship_Cluster__c': 'Other'
                }            	
            });
            createRecordEvent.fire();
        }
    }
})