trigger MATCH_SeatsEventTrigger on MATCH_Seats_Event__e (after insert) {
	MATCH_SeatsEventTriggerHandler handler = new MATCH_SeatsEventTriggerHandler();
    if ( Trigger.isAfter && Trigger.isInsert ) {  
        handler.process(Trigger.new);   
    }
}