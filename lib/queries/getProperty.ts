import { gql } from '@apollo/client';

const GET_PROPERTY = gql`
    query GetProperty($id: Int!) {
        property(id: $id) {
            id
            project_name
            title
            price
            bedroom_count
            bathroom_count
            area
            description
            status
            images {
                url
            }
        }
    }
`;

export default GET_PROPERTY;

