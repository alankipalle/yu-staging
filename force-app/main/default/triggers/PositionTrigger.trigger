/**
 * trigger for the  Position object
 */
trigger  PositionTrigger on Position__c(after delete, after insert, after undelete, after update, before delete, before insert, before update) {
   
    /** all events are handled by the PositionTriggerHandler class */
    System.debug('*********Position Trigger*****');
    new PositionTriggerHandler().run();
}