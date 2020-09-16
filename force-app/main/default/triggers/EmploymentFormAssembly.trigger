trigger EmploymentFormAssembly on Employment__c (before insert){
    
        String otherId =null;
        for (Account acc: [SELECT Id FROM Account WHERE Name = 'Other']){
            otherId = acc.id;
        }
        for(Employment__c e : trigger.new){
            if (e.Form_Employer__c != null){
                if ((e.Form_Employer__c.equals('Test College')) || (UserInfo.getName().contains('FormAssembly'))){
                    if (e.Currently_Unemployed__c == 'No'){     
                        boolean found = false;
                        for(Account a : [SELECT Id, Name FROM Account WHERE Name LIKE :e.Form_Employer__c]){
                            // found a match
                            e.Employer__c = a.Id;           
                            found = true;       
                        }
                        
                        if(! found){
                            e.Employer__c = otherId;
                        }
                }
            }
        }
    }
}