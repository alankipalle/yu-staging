/**
 * trigger for the  GAUAllocation object
 */
trigger  GAUAllocationTrigger on npsp__Allocation__c (after delete, after insert, after undelete, after update, before delete, before insert, before update) {
   
    /** all events are handled by the GAUAllocationTriggerHandler class */
    System.debug('*********GAUAllocation Trigger*****');
    new GAUAllocationTriggerHandler().run();
}