//
// (c) 2014 Appirio, Inc.
//
// Trigger on Evalution Period
//
// Jan 14, 2015     Samarth Sikand      Original( S-274512, T-350510 )
//
trigger EvalPeriodTrigger on Evaluation_Period__c (after insert, after update) {

    if(trigger.isAfter && trigger.isInsert) {
        EvalPeriodTriggerHandler.afterInsertTriggerHanlder(trigger.new);
    }

    if(trigger.isAfter && trigger.isUpdate) {
        EvalPeriodTriggerHandler.afterUpdateTriggerHandler(trigger.new, trigger.oldMap);
        EvalPeriodTriggerHandler.afterUpdateStudentNotification(trigger.new, trigger.oldMap); 
    }
}