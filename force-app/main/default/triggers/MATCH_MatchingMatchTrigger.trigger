trigger MATCH_MatchingMatchTrigger on MATCH_Matching_Match__c (after delete, after insert, after undelete, 
after update, before delete, before insert, before update) {
    new MATCH_CustomMDTTriggerHandler().run();
}