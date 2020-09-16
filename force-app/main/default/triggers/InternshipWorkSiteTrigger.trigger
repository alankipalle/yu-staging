trigger InternshipWorkSiteTrigger on Internship_Work_Site__c (after delete, after insert, after undelete, after update, before delete, before insert, before update) {    
    new InternshipWorkSiteTriggerHandler().run();
}