/**
 * trigger for the  Radio Goal object
 */
trigger  RadioGoalTrigger on RADIO_Goal__c(after delete, after insert, after undelete, after update, before delete, before insert, before update) {
   
    /** all events are handled by the RadioGoalTriggerHandler class */
    System.debug('*********Radio Goal Trigger*****');
    new RadioGoalTriggerHandler().run();
}