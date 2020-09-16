/**
 * trigger for the student grade object
 */
trigger StudentGradeTrigger on Student_Grade__c (before insert, before update, before delete, after insert, after update, after delete, after undelete) {
    /** all events are handled by the StudentGradeTriggerHandler class */
    new StudentGradeTriggerHandler().run();
}