import { gql } from "@apollo/client";

const GET_PROPERTIES = gql`
    query GetProperties(
        $after: String
        $first: Int!
        $status: Status
        $keyword: String
        $minPrice: Int
        $maxPrice: Int
        $areaMax: Int
        $roomsMin: Int
        $bathsMin: Int
    ) {
        properties(
            after: $after
            first: $first
            status: $status
            keyword: $keyword
            minPrice: $minPrice
            maxPrice: $maxPrice
            areaMax: $areaMax
            roomsMin: $roomsMin
            bathsMin: $bathsMin
        ) {
            edges {
                cursor
                node {
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
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;

export default GET_PROPERTIES;
