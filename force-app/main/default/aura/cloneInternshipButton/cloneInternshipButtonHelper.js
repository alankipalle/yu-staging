({
     
    /**
    * Yearup.org.
    *
    * @category  CE
    * @author    Yearup.org    
    * @Description   This component helper is used for cloning of internship using cone internship button on Internship record.
    */
    
	saveNewRecord : function(component) {		
        	var spinner = component.find('spinner');
			$A.util.toggleClass(spinner, 'slds-show');
        
        	var parentTargetFields = component.get("v.simpleRecord");
        	//var int = component.get("v.record"), param;
            //param = { sobjectType: 'Apprenticeship__c', Employer__c: int.fields.Employer__c.value, Start_Date__c: int.fields.Start_Date__c.value, Site_Location__c: int.fields.Site_Location__c.value, InternshipWorkSite__c: int.fields.InternshipWorkSite__c.value, Track__c: int.fields.Track__c.value, Job_Category__c: int.fields.Job_Category__c.value, Cohort_Sem__c: int.fields.Cohort_Sem__c.value, Opportunity__c: int.fields.Opportunity__r.Id };       
        	        	
            component.set("v.simpleNewinternship.Track__c", parentTargetFields.Track__c);
            component.set("v.simpleNewinternship.Job_Category__c", parentTargetFields.Job_Category__c);
        	component.set("v.simpleNewinternship.InternshipWorkSite__c", parentTargetFields.InternshipWorkSite__c);
        	component.set("v.simpleNewinternship.Site_Location__c", parentTargetFields.Site_Location__c);
        	component.set("v.simpleNewinternship.Start_Date__c", parentTargetFields.Start_Date__c);
            component.set("v.simpleNewinternship.Employer__c", parentTargetFields.Employer__c);
            component.set("v.simpleNewinternship.Cohort_Sem__c", parentTargetFields.Cohort_Sem__c);
            component.set("v.simpleNewinternship.Opportunity__c", parentTargetFields.Opportunity__c);
        	component.set("v.simpleNewinternship.Billing_Start_Date__c", parentTargetFields.Billing_Start_Date__c);
        	            
            component.find("internshipRecordCreator").saveRecord(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
					$A.util.toggleClass(spinner, 'slds-hide');
                   //var recordData = component.find("internshipRecordCreator").get("v.recordId");
                    var newRecID = saveResult.recordId;
                    console.log('newRecID '+newRecID);  
                    console.log('recordData '+newRecID); 
					component.set("v.recordSaveError", '');                    
                    // Success! Prepare a toast UI message
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Internship Cloned",
                        "message": "The new internship was cloned Successfully!",
                        "type" : "success"
                    });
                    
                    // Load the new record
                    var navEvt = $A.get("e.force:navigateToSObject");
                        navEvt.setParams({
                          "recordId": newRecID,
                          "slideDevName": "detail"
                        });
                        navEvt.fire();

                    // Update the UI: close panel, show toast, refresh account page
                    $A.get("e.force:closeQuickAction").fire();
                    resultsToast.fire();

                    // Reload the view so components not using force:recordData
                    // are updated
                    //$A.get("e.force:refreshView").fire();
                }
                else if (saveResult.state === "INCOMPLETE") {
                    console.log("User is offline, device doesn't support drafts.");
                }
                else if (saveResult.state === "ERROR") {
                    console.log('Problem saving internship, error: ' +
                                 JSON.stringify(saveResult.error));
                    
                     var errMsg = "";
                    // console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
                    // saveResult.error is an array of errors,
                    // so collect all errors into one message
                    for(var i = 0; i < saveResult.error.length; i++) {
                        errMsg += saveResult.error[i].message + "\n";
                    }
                    component.set("v.recordSaveError", errMsg);
                }
                else {
                    console.log('Unknown problem, state: ' + saveResult.state +
                                ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        //}
	}
})