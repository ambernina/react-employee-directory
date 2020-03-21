import React, { Component } from "react";
import Container from "./Container";
// import Row from "./Row";
// import Col from "./Col";
// import Card from "./Card";
import TRow from "./TRow";
// import SearchForm from "./SearchForm";
// import API from "../utils/API";

import moment from "moment";

class Directory extends Component {
	state = {
		result: [],
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
		fetch("https://randomuser.me/api/?results=20")
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

	// handleInputChange = event => {
	//   const { name, value } = event.target;
	//   this.setState({
	//     [name]: value
	//   });
	// };

	// handleFormSubmit = event => {
	// 	event.preventDefault();
	// 	this.randomPerson();
	// };

	formatBD = str => {
		const newDate = moment(str).format("LL");
		// console.log("newDate", newDate);
		return newDate;
	};

	render() {
		// ternary
		console.log("result", this.state.result);
		return (
			<Container>
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
						{this.state.result.map(person => (
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
