import React, { Component } from "react";
import Container from "./Container";
import TRow from "./TRow";
import { Input } from "semantic-ui-react";

import moment from "moment";

class Directory extends Component {
	state = {
		result: [],
		filteredResult: [],
		search: ""
	};

	componentDidMount() {
		this.randomPerson();
		// const res = fetch("https://randomuser.me/api/");
		// const json = res.json();
		// console.log("json", json);
		// this.setState({ result: json });
	}

	randomPerson = () => {
		fetch("https://randomuser.me/api/?results=10")
			.then(res => res.json())
			.then(response => {
				console.log("response", response);
				this.setState({ result: response.results });
			});

		// API.search()
		//   .then(res => {
		//     this.setState({ result: res.data.results });
		//     console.log("result", this.state.result[0]);
		//     // console.log("res",res);
		//     // console.log("results", res.data.results);
		//   })
		//   .catch(err => console.log(err));
	};

	handleChange = event => {
		this.setState({ search: event.target.value }, () => {
			this.globalSearch();
		});
	};

	// handleFormSubmit = event => {
	// 	event.preventDefault();
	// 	this.randomPerson();
	// };

	globalSearch = () => {
		let { search, result } = this.state;
		console.log("search", search);
		console.log("before result", result);
		let filteredResult = result.filter(value => {
			return (
				value.name.first.toLowerCase().includes(search.toLowerCase()) ||
				value.name.last.toLowerCase().includes(search.toLowerCase())
			);
		});
		this.setState({ filteredResult });
		console.log("filtered result", filteredResult);
	};

	formatBD = str => {
		const newDate = moment(str).format("LL");
		// console.log("newDate", newDate);
		return newDate;
	};

	results = () => {
		if (this.filteredResult > 0) {
			return this.state.filteredResult.map(person => (
				<TRow
					key={person.login.uuid}
					firstName={person.name.first}
					lastName={person.name.last}
					src={person.picture.thumbnail}
					email={person.email}
					phone={person.cell}
					birthdate={this.formatBD(person.dob.date)}
				/>
			));
		} else {
      return this.state.result.map(person => (
        <TRow
          key={person.login.uuid}
          firstName={person.name.first}
          lastName={person.name.last}
          src={person.picture.thumbnail}
          email={person.email}
          phone={person.cell}
          birthdate={this.formatBD(person.dob.date)}
        />
      ));
    }
	};

	render() {
		// ternary
		// console.log("result", this.state.result);
		return (
			<Container>
				<Input
					size="large"
					name="search"
					value={this.state.search || ""}
					onChange={this.handleChange}
					label="Search"
				/>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Photo</th>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Phone #</th>
							<th scope="col">Birthdate</th>
						</tr>
					</thead>
					<tbody>
						{!this.filteredResult
							? this.state.result.map(person => (
									<TRow
										key={person.login.uuid}
										firstName={person.name.first}
										lastName={person.name.last}
										src={person.picture.thumbnail}
										email={person.email}
										phone={person.cell}
										birthdate={this.formatBD(person.dob.date)}
									/>
							  ))
							: this.state.filteredResult.map(person => (
									<TRow
										key={person.login.uuid}
										firstName={person.name.first}
										lastName={person.name.last}
										src={person.picture.thumbnail}
										email={person.email}
										phone={person.cell}
										birthdate={this.formatBD(person.dob.date)}
									/>
							  ))}
					</tbody>
				</table>
				{/* <Col size="md-4">
						<Card>
							<SearchForm
								// value={this.state.search}
								// handleInputChange={this.handleInputChange}
								handleFormSubmit={this.handleFormSubmit}
							/>
						</Card>
					</Col> */}
			</Container>
		);
	}
}

export default Directory;
