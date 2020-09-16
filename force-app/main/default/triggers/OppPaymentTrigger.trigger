/**
 * trigger for the  OppPayment object
 */
trigger  OppPaymentTrigger on npe01__OppPayment__c(after delete, after insert, after undelete, after update, before delete, before insert, before update) {
   
    /** all events are handled by the OppPaymentTriggerHandler class */
    System.debug('*********OppPayment Trigger*****');
    
        if(UtilityRunOnce.IWSTriggerSkip) new OppPaymentTriggerHandler().run(); 
    
}