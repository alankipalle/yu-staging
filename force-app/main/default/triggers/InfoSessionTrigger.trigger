/**
 * trigger for the Info Session object
 */
trigger InfoSessionTrigger on Info_Session__c(after delete, after insert, after undelete, after update, before delete, before insert, before update) {
    /** all events are handled by the InfoSessionTriggerHandler class */
    System.debug('****Info Session Trigger');
    new InfoSessionTriggerHandler().run();
}