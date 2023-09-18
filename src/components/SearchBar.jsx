import { Input, Button, Flex } from "@chakra-ui/react";

function SearchBar({ onSearch }) {
    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = event.target.elements.searchTerm.value;
        onSearch(searchTerm);
    };

    return (
        <Flex as="form" onSubmit={handleSearch}>
            <Input
                type="text"
                name="searchTerm"
                placeholder="Search for tracks..."
            />
            <Button type="submit" ml="2" colorScheme="teal">
                Search
            </Button>
        </Flex>
    );
}

export default SearchBar;
