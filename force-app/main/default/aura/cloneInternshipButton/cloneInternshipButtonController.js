({
    
    /**
    * Yearup.org.
    *
    * @category  CE
    * @author    Yearup.org    
    * @Description   This component is used for cloning of internship using cone internship button on Internship record.
    */    
	
    recordUpdate : function(component, event, helper){        
    	var parentTargetFields = component.get("v.userRecordFields");       
        console.log("Profile Name : "+parentTargetFields.Profile.Name);
        if(parentTargetFields.Profile.Name === "CE Super User" || parentTargetFields.Profile.Name === "System Administrator"){
            component.find("internshipRecordCreator").getNewRecord(
            "Apprenticeship__c", // objectApiName
            null, // recordTypeId
            false, // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newinternship");
                var error = component.get("v.newinternshipError");
                if(error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                }
                else {
                    console.log("Record template initialized: ");
                }
            })
        );
        } else{
            var errMsg = "This Internship cannot be cloned. Please reach out to SalesOperationsAndSupport@YearUp.org for help making changes to the record.";
            component.set("v.recordSaveError", errMsg);
        }       
	},
    
    handleSaveinternship: function(component, event, helper) { 
       helper.saveNewRecord(component);
    },

    handleCancel: function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    },
})