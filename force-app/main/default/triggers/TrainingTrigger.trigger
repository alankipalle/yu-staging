/**
 * trigger for the Training object
 */
trigger TrainingTrigger on Training_YU__c(after delete, after insert, after undelete, after update, before delete, before insert, before update) {
    /** all events are handled by the TrainingTriggerHandler class */
    new TrainingTriggerHandler().run();
}