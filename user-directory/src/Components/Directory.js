import React, { Component } from "react";
import UsersFunc from "./Users";
import Search from "./Search.js";
import API from "../utils/API";

class Directory extends Component {
  state = {
    users: [],
    filterUsers: [],
    search: "",
    filtered: false,
  };


  componentDidMount = () => {
    API.getUsers().then((response) => {
      this.setState({
        users: response.data.results,
      });
    });
  };


  handleSearch = () => {
    let { users, search } = this.state;
    let filterUsers = users.filter((filtered) => {
      return (
        filtered.name.first.toLowerCase().includes(search.toLowerCase()) ||
        filtered.name.last.toLowerCase().includes(search.toLowerCase()) ||
        filtered.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    this.setState({ filterUsers });
  };

  
  handleChange = (event) => {
    this.setState({ search: event.target.value }, () => {
      this.handleSearch();
      this.setState({ filtered: true });
    });
  };

  render = () => {
    return (
      <div>
        <div>
          <h2 className="display-4" style={{color:"blue"}}>User Directory</h2>
          <p> Search for a user by name or email.</p>
          <Search name="search" handleChange={this.handleChange} label="Search" />
        </div>

        <div className="container-fluid">
          <table className="table table-hover">
            <thead className="thead">
              <tr style={{color:"blue"}}>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of Birth</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {
                !this.state.filtered
                  ? this.state.users.map((user) => (
                      <UsersFunc
                        key={user.id.value}
                        firstName={user.name.first}
                        lastName={user.name.last}
                        phone={user.phone}
                        email={user.email}
                        icon={user.picture.medium}
                        dob={user.dob.date}
                        address={
                          user.location.street.number +
                          " " +
                          user.location.street.name +
                          ", " +
                          user.location.city +
                          ", " +
                          user.location.state +
                          " " +
                          user.location.postcode
                        }
                      />
                    ))
                  : this.state.filterUsers.map((user) => (
                      <UsersFunc
                        key={user.id.value}
                        firstName={user.name.first}
                        lastName={user.name.last}
                        phone={user.phone}
                        email={user.email}
                        icon={user.picture.medium}
                        dob={user.dob.date}
                        address={
                          user.location.street.number +
                          user.location.street.name
                        }
                      />
                    ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  };
}

export default Directory;