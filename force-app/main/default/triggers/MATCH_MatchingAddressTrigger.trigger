trigger MATCH_MatchingAddressTrigger on MATCH_Matching_Address__c (after delete, after insert, after undelete, 
after update, before delete, before insert, before update) {
  new MATCH_CustomMDTTriggerHandler().run();
}