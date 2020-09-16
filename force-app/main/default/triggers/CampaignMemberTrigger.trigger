/**
 * trigger for the campaign member object
 */
trigger CampaignMemberTrigger on CampaignMember (before insert, before update, before delete, after insert, after update, after delete, after undelete) {
    /** all events are handled by the CampaignMemberTriggerHandler class */
    new CampaignMemberTriggerHandler().run();
}