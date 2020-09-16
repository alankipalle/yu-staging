/**
* @author       Ajay Kumar        
* @date         10/14/2016
* @description  Trigger for ReadinessAssessments
*
*    -----------------------------------------------------------------------------
*    Developer                  Date                Description
*    -----------------------------------------------------------------------------
*   
*    Ajay Kumar                 10/14/2016          Initial creation Case # CA-07763 
*/
trigger ReadinessAssessmentsTrigger on Risk_Assessment__c (after delete, after insert, after undelete, after update, before delete, before insert, before update) {
    /** all events are handled by the ReadinessAssessments class */
    new ReadinessAssessmentTriggerHandler().run();
}