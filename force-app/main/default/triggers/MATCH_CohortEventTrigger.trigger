trigger MATCH_CohortEventTrigger on MATCH_Cohort_Event__e (after insert) {    
    if ( Trigger.isAfter && Trigger.isInsert ) { 
        MATCH_MatchingRuleTriggerHandler.processCohortEvents(Trigger.new);
    }

}