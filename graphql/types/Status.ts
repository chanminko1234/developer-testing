import { enumType } from 'nexus';

export const Status = enumType({
    name: 'Status',
    members: ['BUY', 'SALE', 'RENT'],
});
