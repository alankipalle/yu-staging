/**
 * trigger for the Employment object
 */
trigger EmploymentTrigger on Employment__c(after delete, after insert, after undelete, after update, before delete, before insert, before update) {
    /** all events are handled by the EmploymentTriggerHandler class */
    new EmploymentTriggerHandler().run();
}