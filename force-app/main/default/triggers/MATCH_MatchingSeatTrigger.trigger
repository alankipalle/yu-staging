trigger MATCH_MatchingSeatTrigger on MATCH_Matching_Seat__c (after delete, after insert, after undelete, 
after update, before delete, before insert, before update) {  
    new MATCH_CustomMDTTriggerHandler().run();
}