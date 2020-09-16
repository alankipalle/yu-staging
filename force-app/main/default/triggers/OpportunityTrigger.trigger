trigger OpportunityTrigger on Opportunity (after delete, after insert, after undelete, after update, before delete, before insert, before update) {
    
    /** all events are handled by the OpportunityTriggerHandler class */
    System.debug('******************Opportunity Trigger*****');
    new OpportunityTriggerHandler().run();
}