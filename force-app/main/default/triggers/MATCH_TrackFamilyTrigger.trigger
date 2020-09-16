trigger MATCH_TrackFamilyTrigger on Track_Family__c (after delete, after insert, after undelete, 
after update, before delete, before insert, before update) {
  new MATCH_CustomMDTTriggerHandler().run();

}