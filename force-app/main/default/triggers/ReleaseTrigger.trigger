/**
 * trigger for the  Release object
 */
trigger  ReleaseTrigger on Release__c (after delete, after insert, after undelete, after update, before delete, before insert, before update) {
   
    /** all events are handled by the ReleaseTriggerHandler class */
    System.debug('*********Release Trigger*****');
    new ReleaseTriggerHandler().run();
}