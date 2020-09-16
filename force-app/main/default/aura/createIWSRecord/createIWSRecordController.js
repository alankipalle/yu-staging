({  
    /**
    * Yearup.
    *
    * @category  Yearup
    * @author    Yearup
    * @copyright Yearup
    * @description This component is for to create IWS record from Opportunity.
    */
    createIWSRecord: function(component, event, helper) {
        helper.createRecord(component,event);        
    },
    doInit: function(component, event, helper) { 
        var device = $A.get("$Browser.formFactor");
         if( device == 'PHONE'){                
            component.set("v.deviceName", "true");            
            }
    },
    recordUpdate: function(component, event, helper) { 
       var cDate = component.get("v.parentOpp").Cohort_Sem__r.End_date__c;
        // Construct the today's date
        var today = new Date();
        var monthDigit = today.getMonth() + 1;
        var dateDigit = today.getDate()
        if (monthDigit <= 9) {
            monthDigit = '0' + monthDigit;
        }
        if (dateDigit <= 9) {
            dateDigit = '0' + dateDigit;
        }
        
        var todayDate = today.getFullYear() + "-" + monthDigit + "-" + dateDigit;
        console.log('v.today'+ today.getFullYear() + "-" + monthDigit + "-" + dateDigit);
        console.log('cDate '+ cDate);
        var device = $A.get("$Browser.formFactor");
         if( device == 'PHONE' ){ 
              console.log('inside device check ');
             if(todayDate > cDate){
                 console.log('inside date check ');
            var cmpMsg = component.find("msg");
                $A.util.toggleClass(cmpMsg, "slds-hide");
                var btn = component.find("createBtn");
                $A.util.toggleClass(btn, "slds-hide"); 
             }else{
                 helper.createRecord(component,event);       
             }
            }
    },
})