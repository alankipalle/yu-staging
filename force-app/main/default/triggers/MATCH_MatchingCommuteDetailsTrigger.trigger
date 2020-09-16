trigger MATCH_MatchingCommuteDetailsTrigger on MATCH_Commute_Details__c (after delete, after insert, after undelete, 
after update, before delete, before insert, before update) {
  new MATCH_CustomMDTTriggerHandler().run();
}