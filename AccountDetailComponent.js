import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import STATUS_FIELD from '@salesforce/schema/Account.Status__c';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import CREATED_DATE_FIELD from '@salesforce/schema/Account.CreatedDate';
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';
import DO_NOT_CALL_FIELD from '@salesforce/schema/Contact.DoNotCall';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import CONTACT_CREATED_DATE_FIELD from '@salesforce/schema/Contact.CreatedDate';

export default class AccountDetailComponent extends LightningElement {
    @api recordId;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: [
            ACCOUNT_OBJECT,
            NAME_FIELD,
            STATUS_FIELD,
            ANNUAL_REVENUE_FIELD,
            CREATED_DATE_FIELD,
            CONTACT_NAME_FIELD,
            DO_NOT_CALL_FIELD,
            EMAIL_FIELD,
            CONTACT_CREATED_DATE_FIELD
        ]
    })
    account;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    accountInfo;

    get childAccounts() {
        if (this.account.data) {
            return this.account.data.ChildAccounts.map(childAccount => ({
                Id: childAccount.Id,
                Name: childAccount.Name,
                Status: getFieldValue(childAccount, STATUS_FIELD),
                AnnualRevenue: childAccount.AnnualRevenue,
                CreatedDate: childAccount.CreatedDate
            }));
        }
        return [];
    }

    get relatedContacts() {
        if (this.account.data) {
            return this.account.data.Contacts.map(contact => ({
                Id: contact.Id,
                Name: contact.Name,
                DoNotCall: contact.DoNotCall,
                Email: contact.Email,
                CreatedDate: contact.CreatedDate
            }));
        }
        return [];
    }

    get accountColumns() {
        return [
            { label: 'Name', fieldName: 'Name', type: 'text' },
            { label: 'Status', fieldName: 'Status', type: 'text' },
            { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
            { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' }
        ];
    }

    get contactColumns() {
        return [
            { label: 'Name', fieldName: 'Name', type: 'text' },
            { label: 'Do Not Call', fieldName: 'DoNotCall', type: 'boolean' },
            { label: 'Email', fieldName: 'Email', type: 'email' },
            { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' }
        ];
    }
}
