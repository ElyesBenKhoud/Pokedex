import React, { Component } from "react";
import Detail from "./../detail/Detail";
import { Route } from "react-router-dom";
import Filter from "./../filter/Filter";
import { withRouter } from "react-router";
import "./SearchBar.css";
import { Button, Input } from "@chakra-ui/react";
import { SearchIcon, ArrowForwardIcon } from "@chakra-ui/icons";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      showFilters: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //function to handle the change through the given event
  handleChange = (event) => {
    const inputValue = event.target.value;
    this.setState({ searchQuery: inputValue });

    if (!inputValue) return "";
  };
  //function to submit the event after handling it
  handleSubmit = (event) => {
    console.log("event", event);
    const { searchQuery } = this.state;
    event.preventDefault();
    const value = this.state.searchQuery;
    this.setState({ searchQuery: "" });
    if (value) {
      this.props.handleSearchClick();
      return this.props.history.push(`/detail/${searchQuery}`);
    }
  };
  handleFilter = () => {
    this.setState({ showFilters: false });
  };

  render() {
    const { searchQuery, showFilters } = this.state;
    return (
      <React.Fragment>
        <Input
          placeholder="Search Pokemon"
          value={searchQuery}
          onChange={this.handleChange}
          variant="flushed"
          color="gray.700"
          className="searchBar"
          maxW="250px"
          onKeyDown={(e) => (e.key === "Enter" ? this.handleSubmit(e) : null)}
        />
        <Button
          rightIcon={<SearchIcon />}
          colorScheme="red"
          onClick={this.handleSubmit}
        >
          Search
        </Button>
        {/* navigate to the specific pokemon */}
        <Route exact path="detail/:name" component={Detail} />
      </React.Fragment>
    );
  }
}
export default withRouter(SearchBar);
