/**
 * trigger for the  Internship object
 */
trigger InternshipTriggerNew on Apprenticeship__c (after delete, after insert, after undelete, after update, before delete, before insert, before update) {
    /** all events are handled by the InternshipTriggerHandler class */
    System.debug('********Internship Trigger*****');
    new InternshipTriggerHandlerNew().run();
}