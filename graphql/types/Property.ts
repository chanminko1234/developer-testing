import { objectType, enumType } from 'nexus';
import { Status } from './Status';

export const Property = objectType({
    name: 'Property',
    definition(t) {
        t.nonNull.int('id');
        t.nonNull.string('project_name');
        t.nonNull.string('title');
        t.nonNull.float('price');
        t.nonNull.int('bedroom_count');
        t.nonNull.int('bathroom_count');
        t.nonNull.float('area');
        t.nonNull.string('description');
        t.nonNull.field('status', { type: Status });
        t.nonNull.list.nonNull.field('images', {
            type: 'Image',
            async resolve(parent, _args, ctx) {
                return ctx.prisma.image.findMany({
                    where: { property_id: parent.id },
                });
            },
        });
    },
});
