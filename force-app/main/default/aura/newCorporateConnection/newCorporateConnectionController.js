({
    
     showRecords: function(component, event, helper) {
         var AccountId=document.getElementById("AccountId").value;
         var ContactId=document.getElementById("ContactId").value;
         var createRecord = $A.get("e.force:createRecord");
         createRecord.setParams({
             "entityApiName": "npe5__Affiliation__c",
             "defaultFieldValues": {
                 'npe5__Organization__c' : AccountId,
                 'npe5__Contact__c' : ContactId,
                 'npe5__Primary__c':true
             },
             "isredirect":false
         });
         createRecord.fire();
     }
})