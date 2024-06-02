import { gql } from '@apollo/client';

const GET_AUTOCOMPLETE_SUGGESTIONS = gql`
    query GetAutocompleteSuggestions($keyword: String!) {
        autocompleteProperties(keyword: $keyword) {
            project_name
            title
        }
    }
`;

export default GET_AUTOCOMPLETE_SUGGESTIONS;
