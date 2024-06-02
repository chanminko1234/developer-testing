import { objectType } from 'nexus';

export const AutocompleteSuggestion = objectType({
    name: 'AutocompleteSuggestion',
    definition(t) {
        t.nonNull.string('project_name');
        t.nonNull.string('title');
    },
});
