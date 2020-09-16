/**
 * trigger for the Extra Contacts object
 */
trigger ExtraContactsTrigger on Extra_Contacts__c(after delete, after insert, after undelete, after update, before delete, before insert, before update) {
    /** all events are handled by the ExtraContactsTriggerHandler class */
    new ExtraContactsTriggerHandler().run();
}