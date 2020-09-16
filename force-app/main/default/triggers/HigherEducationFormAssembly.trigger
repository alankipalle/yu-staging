trigger HigherEducationFormAssembly on Higher_Education__c (before insert){
    
    
        String otherId =null;
        for (Account acc: [SELECT Id FROM Account WHERE Name = 'Other']){
            otherId = acc.id;
        }
        for(Higher_Education__c he : trigger.new){
            if (he.Form_Institution__c != null){
                if ((he.Form_Institution__c.equals('Test College')) || (UserInfo.getName().contains('FormAssembly'))){
                    if (he.Currently_in_School__c == 'Yes'){
                        boolean found = false;
                        for(Account a : [SELECT Id, Name FROM Account WHERE Name LIKE :he.Form_Institution__c]){
                            // found a match
                            he.Name_of_College_lookup__c = a.Id;            
                            found = true;       
                        }   
                        
                        if(! found){
                            he.Name_of_College_lookup__c = otherId;
                        }
                    }
                }
            }
        }   
}