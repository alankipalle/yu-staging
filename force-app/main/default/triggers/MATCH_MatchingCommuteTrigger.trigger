trigger MATCH_MatchingCommuteTrigger on MATCH_Commute__c (after delete, after insert, after undelete, 
after update, before delete, before insert, before update) {
  new MATCH_CustomMDTTriggerHandler().run();
}