/**
 * trigger for the site object
 */
trigger SiteTrigger on Site__c (before insert, before update, before delete, after insert, after update, after delete, after undelete) {
    /** all events are handled by the SiteTriggerHandler class */
    new SiteTriggerHandler().run();
}