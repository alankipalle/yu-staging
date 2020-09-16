/**
 * trigger for the  LearningCommunity object
 */
trigger  LearningCommunityTriggerNew on Learning_Community__c(after delete, after insert, after undelete, after update, before delete, before insert, before update) {
    /** all events are handled by the LearningCommunityTriggerHandler class */
    system.debug('*******inLCtriggerhandler trigger******');
    new LearningCommunityTriggerHandlerNew().run();
}