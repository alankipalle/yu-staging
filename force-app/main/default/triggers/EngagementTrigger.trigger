trigger EngagementTrigger on Engagement__c (after delete, after insert, after undelete, after update, before delete, before insert, before update) {
    //TriggerDispatcher.Run(new EngagementTriggerHandler());
    /** all events are handled by the EngagementTriggerHandler class */
    if(!LCsAndSpecialityPageController.turnTriggerOff){
        new EngagementTriggerHandler().run();
    }
}