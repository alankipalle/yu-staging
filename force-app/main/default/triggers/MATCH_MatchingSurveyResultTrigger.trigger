trigger MATCH_MatchingSurveyResultTrigger on MATCH_Matching_Survey_Result__c (after delete, after insert, after undelete, 
after update, before delete, before insert, before update) {
  new MATCH_CustomMDTTriggerHandler().run();
}