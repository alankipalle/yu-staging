/**
 * trigger for the Higher Education object
 */
trigger HigherEducationTrigger on Higher_Education__c(after delete, after insert, after undelete, after update, before delete, before insert, before update) {
    /** all events are handled by the HigherEducationTriggerHandler class */
    new HigherEducationTriggerHandler().run();
}