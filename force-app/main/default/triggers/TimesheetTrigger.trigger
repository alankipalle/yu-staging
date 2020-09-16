/**
 * trigger for the  Timesheet object
 */
trigger  TimesheetTrigger on Timesheet__c(after delete, after insert, after undelete, after update, before delete, before insert, before update) {
   
    /** all events are handled by the TimesheetTriggerHandler class */
    System.debug('*********Timesheet Trigger*****');
    new TimesheetTriggerHandler().run();
}