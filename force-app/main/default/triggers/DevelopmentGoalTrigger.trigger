/**
 * trigger for the  Development Goal object
 */
trigger  DevelopmentGoalTrigger on Development_Goal__c(after delete, after insert, after undelete, after update, before delete, before insert, before update) {
   
    /** all events are handled by the DevelopmentGoalTriggerHandler class */
    System.debug('*********Development Goal Trigger*****');
    new DevelopmentGoalTriggerHandler().run();
}