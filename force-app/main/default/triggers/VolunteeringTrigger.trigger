/**
 * trigger for the  Volunteering object
 */
trigger  VolunteeringTrigger on Volunteering__c(after delete, after insert, after undelete, after update, before delete, before insert, before update) {
   
    /** all events are handled by the VolunteeringTriggerHandler class */
    System.debug('*********Volunteering Trigger*****');
    new VolunteeringTriggerHandler().run();
}