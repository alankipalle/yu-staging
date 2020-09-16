trigger MATCH_SiteCohortEventTrigger on MATCH_Site_Cohort__e (after insert) {
    MATCH_StudentEventTriggerHandler handler = new MATCH_StudentEventTriggerHandler();
    if ( Trigger.isAfter && Trigger.isInsert ) { 
        handler.processSiteCohortEvents(Trigger.new);
    }
}