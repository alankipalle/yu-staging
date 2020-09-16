trigger MATCH_MatchingStudentTrigger on MATCH_Matching_Student__c (after delete, after insert, after undelete, 
after update, before delete, before insert, before update) {  
   new MATCH_CustomMDTTriggerHandler().run();

}