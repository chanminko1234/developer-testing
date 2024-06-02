import { objectType } from 'nexus';

export const Image = objectType({
    name: 'Image',
    definition(t) {
        t.int('id');
        t.string('url');
        t.int('property_id');
    }
});
