trigger MATCH_MatchingRuleTrigger on MATCH_Matching_Rule__c (after delete, after insert, after undelete, 
after update, before delete, before insert, before update) {
  new MATCH_CustomMDTTriggerHandler().run();
}